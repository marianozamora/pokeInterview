import pytest
from unittest.mock import AsyncMock, MagicMock

from src.domain.entities.pokemon import Pokemon


RAW_BULBASAUR = {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "types": [{"type": {"name": "grass"}}, {"type": {"name": "poison"}}],
    "abilities": [{"ability": {"name": "overgrow"}}, {"ability": {"name": "chlorophyll"}}],
    "sprites": {"front_default": "https://example.com/bulbasaur.png"},
}

RAW_PIKACHU = {
    "id": 25,
    "name": "pikachu",
    "height": 4,
    "weight": 60,
    "types": [{"type": {"name": "electric"}}],
    "abilities": [{"ability": {"name": "static"}}],
    "sprites": {"front_default": "https://example.com/pikachu.png"},
}


@pytest.fixture
def bulbasaur() -> Pokemon:
    return Pokemon(
        id=1,
        name="bulbasaur",
        height=7,
        weight=69,
        types=["grass", "poison"],
        abilities=["overgrow", "chlorophyll"],
        sprite_url="https://example.com/bulbasaur.png",
        color="green",
    )


@pytest.fixture
def pikachu() -> Pokemon:
    return Pokemon(
        id=25,
        name="pikachu",
        height=4,
        weight=60,
        types=["electric"],
        abilities=["static"],
        sprite_url="https://example.com/pikachu.png",
        color="yellow",
    )


@pytest.fixture
def mock_repo(bulbasaur: Pokemon) -> MagicMock:
    repo = MagicMock()
    repo.find_by_id.return_value = bulbasaur
    repo.find_by_name.return_value = bulbasaur
    repo.save.return_value = bulbasaur
    repo.find_all_paginated.return_value = ([bulbasaur], 1)
    return repo


@pytest.fixture
def empty_repo() -> MagicMock:
    repo = MagicMock()
    repo.find_by_id.return_value = None
    repo.find_by_name.return_value = None
    repo.find_all_paginated.return_value = ([], 0)
    repo.save.side_effect = lambda p: p
    return repo


@pytest.fixture
def mock_pokeapi() -> MagicMock:
    client = MagicMock()
    client.fetch_list = AsyncMock(return_value={
        "results": [{"name": "bulbasaur"}, {"name": "pikachu"}],
    })
    client.fetch_pokemon = AsyncMock(return_value=RAW_BULBASAUR)
    return client
