import pytest
from unittest.mock import AsyncMock

from src.application.use_cases.get_pokemon_detail import GetPokemonDetail
from src.domain.entities.pokemon import Pokemon


async def test_returns_from_db_by_name(mock_repo, mock_pokeapi, bulbasaur):
    use_case = GetPokemonDetail(mock_repo, mock_pokeapi)
    result = await use_case.execute("bulbasaur")

    assert result == bulbasaur
    mock_repo.find_by_name.assert_called_once_with("bulbasaur")
    mock_pokeapi.fetch_pokemon.assert_not_called()


async def test_returns_from_db_by_id(mock_repo, mock_pokeapi, bulbasaur):
    use_case = GetPokemonDetail(mock_repo, mock_pokeapi)
    result = await use_case.execute(1)

    assert result == bulbasaur
    mock_repo.find_by_id.assert_called_once_with(1)
    mock_pokeapi.fetch_pokemon.assert_not_called()


async def test_fetches_from_pokeapi_when_not_in_db(empty_repo, mock_pokeapi):
    mock_pokeapi.fetch_pokemon = AsyncMock(return_value={
        "id": 1, "name": "bulbasaur", "height": 7, "weight": 69,
        "types": [{"type": {"name": "grass"}}, {"type": {"name": "poison"}}],
        "abilities": [{"ability": {"name": "overgrow"}}, {"ability": {"name": "chlorophyll"}}],
        "sprites": {"front_default": "https://example.com/bulbasaur.png"},
    })

    use_case = GetPokemonDetail(empty_repo, mock_pokeapi)
    result = await use_case.execute("bulbasaur")

    mock_pokeapi.fetch_pokemon.assert_called_once_with("bulbasaur")
    empty_repo.save.assert_called_once()
    assert result is not None
    assert result.name == "bulbasaur"
    assert result.types == ["grass", "poison"]


async def test_returns_none_when_not_found_anywhere(empty_repo, mock_pokeapi):
    mock_pokeapi.fetch_pokemon = AsyncMock(return_value=None)

    use_case = GetPokemonDetail(empty_repo, mock_pokeapi)
    result = await use_case.execute("unknownpokemon")

    assert result is None
    empty_repo.save.assert_not_called()


async def test_persists_fetched_pokemon(empty_repo, mock_pokeapi):
    raw = {
        "id": 25, "name": "pikachu", "height": 4, "weight": 60,
        "types": [{"type": {"name": "electric"}}],
        "abilities": [{"ability": {"name": "static"}}],
        "sprites": {"front_default": "https://example.com/pikachu.png"},
    }
    mock_pokeapi.fetch_pokemon = AsyncMock(return_value=raw)
    empty_repo.save.side_effect = lambda p: p

    use_case = GetPokemonDetail(empty_repo, mock_pokeapi)
    result = await use_case.execute("pikachu")

    assert result is not None
    assert result.name == "pikachu"
    assert result.types == ["electric"]
