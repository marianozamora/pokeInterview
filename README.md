# Pokémon Full-Stack Coding Challenge

A full-stack web application that consumes the [PokéAPI](https://pokeapi.co/) and displays Pokémon information. The backend acts as a caching proxy — on first request it fetches from PokéAPI and persists to PostgreSQL; subsequent requests are served from the database.

---

## Tech Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS                |
| Backend   | Python 3.12, FastAPI, SQLAlchemy 2, PostgreSQL 16       |
| Testing   | Vitest + Testing Library (FE) · pytest + pytest-asyncio (BE) |
| Storybook | Storybook 8 · `@storybook/react-vite`                  |
| Container | Docker · Docker Compose · nginx                        |

---

## Running the App

### With Docker (recommended)

```bash
docker compose up --build
```

| Service   | URL                    |
|-----------|------------------------|
| App       | http://localhost:8000  |
| Storybook | http://localhost:6006  |

### Local Development

**Prerequisites:** Node 24, pnpm 9, Python 3.12, PostgreSQL

**Backend**

```bash
cd backend
pip install -r requirements.txt
DATABASE_URL=postgresql://pokemon:pokemon@localhost:5432/pokemon uvicorn main:app --reload
# http://localhost:8000
```

**Frontend**

```bash
cd frontend
pnpm install
pnpm dev          # http://localhost:5173
pnpm storybook    # http://localhost:6006
```

---

## API Endpoints

```
GET /api/pokemon?offset=0&limit=20   — paginated list (max 100 per page)
GET /api/pokemon/{id|name}           — full detail for a single Pokémon
```

Both endpoints fetch from PokéAPI on first access and cache the result in PostgreSQL. All subsequent calls are served from the database.

---

## Architecture

### Backend — Clean Architecture

Dependency flow: `api` → `application` → `domain` ← `infrastructure`

```
backend/
├── main.py                                 # FastAPI app, CORS, lifespan, SPA fallback
├── requirements.txt
└── src/
    ├── domain/                             # Pure business rules — no framework deps
    │   ├── entities/pokemon.py             # Pokemon dataclass (id, name, height, weight, types, abilities, sprite)
    │   └── repositories/pokemon_repository.py  # Abstract repository interface
    ├── application/                        # Orchestrates domain objects
    │   ├── use_cases/
    │   │   ├── get_pokemon_list.py         # Paginated list — DB only
    │   │   └── get_pokemon_detail.py       # Cache-or-fetch: DB → PokéAPI → persist
    │   └── mappers/pokemon_mapper.py       # ORM model ↔ domain entity
    ├── infrastructure/                     # All I/O — DB and external HTTP
    │   ├── database/
    │   │   ├── connection.py               # SQLAlchemy engine + session factory
    │   │   ├── models/pokemon_model.py     # ORM model (types/abilities stored as JSON)
    │   │   └── repositories/pokemon_repository_impl.py  # Concrete DB repository
    │   └── external/pokeapi_client.py      # httpx async client for PokéAPI
    └── api/                                # HTTP layer — depends only on application
        ├── routers/pokemon_router.py       # Route handlers
        ├── schemas/pokemon_schema.py       # Pydantic request/response models
        └── dependencies.py                 # FastAPI DI wiring
```

### Frontend — Atomic Design

Component hierarchy: `atoms` → `molecules` → `organisms` → `templates` → `pages`

```
frontend/src/
├── api/pokemon.ts                      # Typed fetch functions for the backend API
├── components/
│   ├── atoms/                          # Smallest reusable UI units
│   │   ├── Badge.tsx                   # Colored type/ability pill
│   │   ├── Button.tsx                  # Generic button with variants
│   │   ├── PokeImage.tsx               # Sprite with loading + error fallback
│   │   └── Spinner.tsx                 # Animated loading indicator
│   ├── molecules/                      # Composed from atoms
│   │   ├── Pagination.tsx              # Prev/next controls with page info
│   │   ├── PokemonCard.tsx             # Grid card (sprite + name, clickable)
│   │   └── StatBox.tsx                 # Height/weight display with label
│   ├── organisms/                      # Feature-level compositions
│   │   ├── PokemonDetailCard.tsx       # Full detail (types, abilities, stats, image)
│   │   └── PokemonGrid.tsx             # Responsive card grid with empty state
│   └── templates/
│       ├── ListTemplate.tsx            # Page shell for list view
│       └── DetailTemplate.tsx          # Page shell for detail view
├── hooks/
│   ├── usePokemonList.ts               # Paginated fetch + loading/error state
│   └── usePokemonDetail.ts             # Single Pokémon fetch + loading/error state
├── pages/
│   ├── PokemonListPage.tsx             # Route: /
│   └── PokemonDetailPage.tsx           # Route: /pokemon/:id
├── types/
│   ├── pokemon.ts                      # API response types
│   └── ui.ts                           # Shared UI prop types
└── utils/pokemon.ts                    # Type-to-color map, formatting helpers
```

Every atom and molecule has a `.stories.tsx` (Storybook) and a `.test.tsx` sibling.

---

## Tests & Coverage

### Frontend — 93 tests · 13 test files

```bash
cd frontend && pnpm test          # watch mode
cd frontend && pnpm test:run      # single run
cd frontend && pnpm coverage      # with coverage report
```

| Layer         | Tested files                                          | Coverage |
|---------------|-------------------------------------------------------|----------|
| api           | `pokemon.ts`                                          | 100%     |
| atoms         | Badge · Button · PokeImage · Spinner                  | 100%     |
| molecules     | Pagination · PokemonCard · StatBox                    | 100%     |
| organisms     | PokemonDetailCard · PokemonGrid                       | 100%     |
| hooks         | usePokemonList · usePokemonDetail                     | ~97%     |
| utils         | `pokemon.ts`                                          | 100%     |
| pages/templates | PokemonListPage · PokemonDetailPage (integration) | —        |

> Pages and templates are exercised through Storybook stories and E2E flows rather than unit tests.

### Backend — 37 tests

```bash
cd backend && python3 -m pytest           # run all
cd backend && python3 -m pytest -v        # verbose
```

| Layer          | Test file                               | Type        |
|----------------|-----------------------------------------|-------------|
| API routes     | `tests/api/test_pokemon_router.py`      | Integration |
| Use cases      | `tests/unit/application/test_get_pokemon_list.py`   | Unit |
|                | `tests/unit/application/test_get_pokemon_detail.py` | Unit |
| Mapper         | `tests/unit/application/test_pokemon_mapper.py`     | Unit |
| Domain entity  | `tests/unit/domain/test_pokemon_entity.py`          | Unit |
| PokéAPI client | `tests/unit/infrastructure/test_pokeapi_client.py`  | Unit |

---

## Docker Setup

The Dockerfile uses a **5-stage multi-stage build** to keep images small and share work between stages:

```
frontend-deps      → installs pnpm deps (shared cache layer)
  ├── frontend-builder  → runs `vite build` → dist/
  └── storybook-builder → runs `storybook build` → storybook-static/
        └── storybook   → nginx:alpine serving storybook-static/ on :80
python:3.12-slim   → copies dist/ from frontend-builder, runs uvicorn on :8000
```

The `frontend-deps` layer is shared between the React and Storybook builds so `pnpm install` only runs once.
