import pytest
import httpx
from unittest.mock import AsyncMock, MagicMock, patch

from src.infrastructure.external.pokeapi_client import PokeAPIClient
from tests.conftest import RAW_BULBASAUR


async def test_fetch_list_returns_results():
    mock_response = MagicMock()
    mock_response.json.return_value = {"results": [{"name": "bulbasaur"}]}
    mock_response.raise_for_status = MagicMock()

    with patch("httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

        client = PokeAPIClient()
        result = await client.fetch_list(offset=0, limit=151)

    assert result == {"results": [{"name": "bulbasaur"}]}
    mock_client.get.assert_called_once()


async def test_fetch_list_passes_correct_params():
    mock_response = MagicMock()
    mock_response.json.return_value = {"results": []}
    mock_response.raise_for_status = MagicMock()

    with patch("httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

        client = PokeAPIClient()
        await client.fetch_list(offset=20, limit=40)

    call_kwargs = mock_client.get.call_args
    assert call_kwargs.kwargs["params"] == {"offset": 20, "limit": 40}


async def test_fetch_pokemon_returns_data():
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = RAW_BULBASAUR
    mock_response.raise_for_status = MagicMock()

    with patch("httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

        client = PokeAPIClient()
        result = await client.fetch_pokemon("bulbasaur")

    assert result == RAW_BULBASAUR


async def test_fetch_pokemon_returns_none_on_404():
    mock_response = MagicMock()
    mock_response.status_code = 404

    with patch("httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

        client = PokeAPIClient()
        result = await client.fetch_pokemon("nonexistent")

    assert result is None


async def test_fetch_pokemon_calls_correct_url():
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = RAW_BULBASAUR
    mock_response.raise_for_status = MagicMock()

    with patch("httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.get = AsyncMock(return_value=mock_response)
        mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

        client = PokeAPIClient()
        await client.fetch_pokemon("bulbasaur")

    url = mock_client.get.call_args.args[0]
    assert url.endswith("/pokemon/bulbasaur")
