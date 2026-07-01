# Stage 1: Install frontend dependencies (shared base)
FROM node:24-alpine AS frontend-deps
WORKDIR /app/frontend
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY frontend/.npmrc ./
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

# Stage 2: Build React frontend
FROM frontend-deps AS frontend-builder
COPY frontend/ .
RUN pnpm run build

# Stage 3: Build Storybook static site
FROM frontend-deps AS storybook-builder
WORKDIR /app/frontend
COPY frontend/ .
RUN pnpm run build-storybook

# Stage 4: Serve Storybook with nginx
FROM nginx:alpine AS storybook
COPY --from=storybook-builder /app/frontend/storybook-static /usr/share/nginx/html
EXPOSE 80

# Stage 5: Python backend serving everything
FROM python:3.12-slim
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends libpq-dev gcc \
  && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Copy built React app into static dir served by FastAPI
COPY --from=frontend-builder /app/frontend/dist ./static

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
