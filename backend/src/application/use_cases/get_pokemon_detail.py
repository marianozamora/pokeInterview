from typing import Optional

from ...domain.entities.pokemon import Pokemon
from ...domain.repositories.pokemon_repository import PokemonRepository
from ...infrastructure.external.pokeapi_client import PokeAPIClient
from ..mappers.pokemon_mapper import raw_to_pokemon


class GetPokemonDetail:
    def __init__(self, repo: PokemonRepository, pokeapi: PokeAPIClient):
        self._repo = repo
        self._pokeapi = pokeapi

    async def execute(self, identifier: str | int) -> Optional[Pokemon]:
        pokemon = self._find_in_repo(identifier)
        if pokemon:
            return pokemon

        raw = await self._pokeapi.fetch_pokemon(str(identifier))
        if not raw:
            return None

        return self._repo.save(raw_to_pokemon(raw))

    def _find_in_repo(self, identifier: str | int) -> Optional[Pokemon]:
        if isinstance(identifier, int):
            return self._repo.find_by_id(identifier)
        return self._repo.find_by_name(identifier)
