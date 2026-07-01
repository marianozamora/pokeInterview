import pytest
from unittest.mock import AsyncMock, MagicMock, patch

from src.application.use_cases.get_pokemon_list import GetPokemonList
from src.domain.entities.pokemon import Pokemon


async def test_returns_from_db_when_data_exists(mock_repo, mock_pokeapi, bulbasaur):
    use_case = GetPokemonList(mock_repo, mock_pokeapi)
    pokemons, total = await use_case.execute(offset=0, limit=20)

    assert total == 1
    assert pokemons == [bulbasaur]
    mock_pokeapi.fetch_list.assert_not_called()
    mock_pokeapi.fetch_pokemon.assert_not_called()


async def test_seeds_from_pokeapi_when_db_empty(empty_repo, mock_pokeapi, bulbasaur):
    mock_pokeapi.fetch_pokemon = AsyncMock(return_value={
        "id": 1, "name": "bulbasaur", "height": 7, "weight": 69,
        "types": [{"type": {"name": "grass"}}],
        "abilities": [{"ability": {"name": "overgrow"}}],
        "sprites": {"front_default": "https://example.com/bulbasaur.png"},
    })
    empty_repo.find_all_paginated.side_effect = [
        ([], 0),
        ([bulbasaur], 1),
    ]

    use_case = GetPokemonList(empty_repo, mock_pokeapi)
    pokemons, total = await use_case.execute(offset=0, limit=20)

    mock_pokeapi.fetch_list.assert_called_once_with(offset=0, limit=151)
    assert mock_pokeapi.fetch_pokemon.call_count == 2
    assert total == 1


async def test_seed_skips_failed_individual_fetches(empty_repo, mock_pokeapi):
    mock_pokeapi.fetch_pokemon = AsyncMock(side_effect=[
        Exception("timeout"),
        {
            "id": 25, "name": "pikachu", "height": 4, "weight": 60,
            "types": [{"type": {"name": "electric"}}],
            "abilities": [{"ability": {"name": "static"}}],
            "sprites": {"front_default": "https://example.com/pikachu.png"},
        },
    ])
    empty_repo.find_all_paginated.side_effect = [([], 0), ([], 0)]

    use_case = GetPokemonList(empty_repo, mock_pokeapi)
    await use_case.execute(offset=0, limit=20)

    assert empty_repo.save.call_count == 1


async def test_seed_skips_none_responses(empty_repo, mock_pokeapi):
    mock_pokeapi.fetch_pokemon = AsyncMock(return_value=None)
    empty_repo.find_all_paginated.side_effect = [([], 0), ([], 0)]

    use_case = GetPokemonList(empty_repo, mock_pokeapi)
    await use_case.execute(offset=0, limit=20)

    empty_repo.save.assert_not_called()
