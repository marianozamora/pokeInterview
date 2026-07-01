import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from src.api.routers.pokemon_router import router as pokemon_router
from src.infrastructure.database.connection import Base, engine
from src.infrastructure.database.models import pokemon_model  # noqa: F401 — registers model with Base.metadata

_DOCS_PATHS = frozenset({"docs", "redoc", "openapi.json"})


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="PokéInterview API",
    description=(
        "REST API that acts as a **proxy and cache layer** on top of [PokéAPI](https://pokeapi.co/). "
        "On first request, Pokémon data is fetched concurrently from PokéAPI and persisted to PostgreSQL; "
        "subsequent requests are served directly from the database."
    ),
    version="1.0.0",
    contact={"name": "PokéInterview"},
    license_info={"name": "MIT"},
    openapi_tags=[
        {
            "name": "pokemon",
            "description": (
                "Paginated list and detail endpoints. "
                "Data is automatically seeded from PokéAPI on first access."
            ),
        }
    ],
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pokemon_router)

static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_frontend(full_path: str):
        if full_path in _DOCS_PATHS:
            from fastapi import HTTPException
            raise HTTPException(status_code=404)
        return FileResponse(os.path.join(static_dir, "index.html"))
