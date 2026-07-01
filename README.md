# Pokémon Full-Stack Coding Challenge

A full-stack web application that consumes the [PokéAPI](https://pokeapi.co/) and displays Pokémon information. The backend acts as a caching proxy — on first request it fetches from PokéAPI and persists to a local database; subsequent requests are served from the database.

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS        |
| Backend   | Python 3.12, FastAPI, SQLAlchemy, PostgreSQL    |
| Testing   | Vitest + Testing Library (FE), pytest (BE)      |
| Storybook | Storybook 8 with `@storybook/react-vite`        |
| Container | Docker + Docker Compose                         |

---

## Running the App

### With Docker (recommended)

```bash
docker compose up
```

| Service   | URL                    |
|-----------|------------------------|
| App       | http://localhost:8000  |
| Storybook | http://localhost:6006  |

### Local Development

**Backend**

```bash
cd backend
pip install -r requirements.txt
DATABASE_URL=postgresql://pokemon:pokemon@localhost:5432/pokemon uvicorn main:app --reload
```

**Frontend**

```bash
cd frontend
pnpm install
pnpm dev          # http://localhost:5173
pnpm storybook    # http://localhost:6006
```

**Tests**

```bash
# Frontend
cd frontend && pnpm test

# Backend
cd backend && pytest
```

---

## API Endpoints

```
GET /api/pokemon?offset=0&limit=20   — paginated list
GET /api/pokemon/{id|name}           — single Pokémon detail
```

---

## Frontend Structure

Follows **Atomic Design** — components are organized by complexity from atoms up to pages.

```
frontend/src/
├── api/
│   └── pokemon.ts              # Fetch functions for the backend API
├── components/
│   ├── atoms/
│   │   ├── Badge.tsx           # Type/ability pill badge
│   │   ├── Button.tsx          # Generic button
│   │   ├── PokeImage.tsx       # Pokémon sprite with fallback
│   │   └── Spinner.tsx         # Loading indicator
│   ├── molecules/
│   │   ├── Pagination.tsx      # Prev/next page controls
│   │   ├── PokemonCard.tsx     # Grid card (sprite + name)
│   │   └── StatBox.tsx         # Height/weight stat display
│   ├── organisms/
│   │   ├── PokemonDetailCard.tsx   # Full detail layout (types, abilities, stats)
│   │   └── PokemonGrid.tsx         # Responsive card grid
│   └── templates/
│       ├── ListTemplate.tsx    # Page shell for list view
│       └── DetailTemplate.tsx  # Page shell for detail view
├── hooks/
│   ├── usePokemonList.ts       # Paginated list data + state
│   └── usePokemonDetail.ts     # Single Pokémon data + state
├── pages/
│   ├── PokemonListPage.tsx     # Route: /
│   └── PokemonDetailPage.tsx   # Route: /pokemon/:id
├── types/
│   ├── pokemon.ts              # API response types
│   └── ui.ts                   # Shared UI prop types
└── utils/
    └── pokemon.ts              # Type color map, formatting helpers
```

Every atom and molecule has a `.stories.tsx` and a `.test.tsx` sibling.

---

## Backend Structure

Follows **Clean Architecture** — domain logic is fully isolated from infrastructure concerns.

```
backend/
├── main.py                         # FastAPI app, CORS, lifespan, static file serving
├── requirements.txt
└── src/
    ├── domain/
    │   ├── entities/
    │   │   └── pokemon.py          # Pokemon dataclass (pure domain model)
    │   └── repositories/
    │       └── pokemon_repository.py   # Abstract repository interface
    ├── application/
    │   ├── use_cases/
    │   │   ├── get_pokemon_list.py     # Paginated list use case
    │   │   └── get_pokemon_detail.py   # Single Pokémon use case (cache-or-fetch)
    │   └── mappers/
    │       └── pokemon_mapper.py       # ORM model ↔ domain entity conversion
    ├── infrastructure/
    │   ├── database/
    │   │   ├── connection.py           # SQLAlchemy engine + session factory
    │   │   ├── models/
    │   │   │   └── pokemon_model.py    # SQLAlchemy ORM model
    │   │   └── repositories/
    │   │       └── pokemon_repository_impl.py  # Concrete DB repository
    │   └── external/
    │       └── pokeapi_client.py       # HTTP client for PokéAPI (httpx)
    └── api/
        ├── routers/
        │   └── pokemon_router.py   # GET /api/pokemon, GET /api/pokemon/{id}
        ├── schemas/
        │   └── pokemon_schema.py   # Pydantic request/response models
        └── dependencies.py         # FastAPI dependency injection wiring
```

```
backend/tests/
├── conftest.py                         # Shared fixtures (test DB, HTTP client)
├── api/
│   └── test_pokemon_router.py          # Integration tests for API routes
└── unit/
    ├── application/
    │   ├── test_get_pokemon_list.py
    │   ├── test_get_pokemon_detail.py
    │   └── test_pokemon_mapper.py
    ├── domain/
    │   └── test_pokemon_entity.py
    └── infrastructure/
        └── test_pokeapi_client.py
```
