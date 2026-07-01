import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient

from main import app
from src.api.dependencies import get_pokemon_list_use_case, get_pokemon_detail_use_case
from src.domain.entities.pokemon import Pokemon


BULBASAUR = Pokemon(
    id=1,
    name="bulbasaur",
    height=7,
    weight=69,
    types=["grass", "poison"],
    abilities=["overgrow", "chlorophyll"],
    sprite_url="https://example.com/bulbasaur.png",
    color="green",
)

PIKACHU = Pokemon(
    id=25,
    name="pikachu",
    height=4,
    weight=60,
    types=["electric"],
    abilities=["static"],
    sprite_url="https://example.com/pikachu.png",
    color="yellow",
)


@pytest.fixture(autouse=True)
def skip_db_init():
    with patch("main.Base.metadata.create_all"):
        yield


def make_list_use_case(pokemons: list[Pokemon], total: int) -> MagicMock:
    uc = MagicMock()
    uc.execute = AsyncMock(return_value=(pokemons, total))
    return uc


def make_detail_use_case(pokemon: Pokemon | None) -> MagicMock:
    uc = MagicMock()
    uc.execute = AsyncMock(return_value=pokemon)
    return uc


def test_list_pokemon_returns_200():
    app.dependency_overrides[get_pokemon_list_use_case] = lambda: make_list_use_case([BULBASAUR], 1)
    with TestClient(app) as client:
        response = client.get("/api/pokemon")
    app.dependency_overrides.clear()

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["name"] == "bulbasaur"


def test_list_pokemon_default_pagination():
    app.dependency_overrides[get_pokemon_list_use_case] = lambda: make_list_use_case([BULBASAUR], 151)
    with TestClient(app) as client:
        response = client.get("/api/pokemon")
    app.dependency_overrides.clear()

    data = response.json()
    assert data["offset"] == 0
    assert data["limit"] == 20


def test_list_pokemon_custom_pagination():
    app.dependency_overrides[get_pokemon_list_use_case] = lambda: make_list_use_case([BULBASAUR], 151)
    with TestClient(app) as client:
        response = client.get("/api/pokemon?offset=40&limit=10")
    app.dependency_overrides.clear()

    data = response.json()
    assert data["offset"] == 40
    assert data["limit"] == 10


def test_list_pokemon_rejects_invalid_limit():
    app.dependency_overrides[get_pokemon_list_use_case] = lambda: make_list_use_case([], 0)
    with TestClient(app) as client:
        response = client.get("/api/pokemon?limit=200")
    app.dependency_overrides.clear()

    assert response.status_code == 422


def test_get_pokemon_by_name_returns_200():
    app.dependency_overrides[get_pokemon_detail_use_case] = lambda: make_detail_use_case(BULBASAUR)
    with TestClient(app) as client:
        response = client.get("/api/pokemon/bulbasaur")
    app.dependency_overrides.clear()

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "bulbasaur"
    assert data["types"] == ["grass", "poison"]
    assert data["abilities"] == ["overgrow", "chlorophyll"]


def test_get_pokemon_by_id_returns_200():
    app.dependency_overrides[get_pokemon_detail_use_case] = lambda: make_detail_use_case(PIKACHU)
    with TestClient(app) as client:
        response = client.get("/api/pokemon/25")
    app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json()["name"] == "pikachu"


def test_get_pokemon_returns_404_when_not_found():
    app.dependency_overrides[get_pokemon_detail_use_case] = lambda: make_detail_use_case(None)
    with TestClient(app) as client:
        response = client.get("/api/pokemon/missingno")
    app.dependency_overrides.clear()

    assert response.status_code == 404
    assert response.json()["detail"] == "Pokemon not found"


def test_response_schema_has_all_fields():
    app.dependency_overrides[get_pokemon_detail_use_case] = lambda: make_detail_use_case(BULBASAUR)
    with TestClient(app) as client:
        response = client.get("/api/pokemon/bulbasaur")
    app.dependency_overrides.clear()

    data = response.json()
    assert set(data.keys()) == {"id", "name", "height", "weight", "types", "abilities", "sprite_url", "color"}
