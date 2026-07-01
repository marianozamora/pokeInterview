import asyncio
from typing import List, Tuple

from ...domain.entities.pokemon import Pokemon
from ...domain.repositories.pokemon_repository import PokemonRepository
from ...infrastructure.external.pokeapi_client import PokeAPIClient
from ..mappers.pokemon_mapper import raw_to_pokemon


class GetPokemonList:
    def __init__(self, repo: PokemonRepository, pokeapi: PokeAPIClient):
        self._repo = repo
        self._pokeapi = pokeapi

    async def execute(self, offset: int, limit: int) -> Tuple[List[Pokemon], int]:
        pokemons, total = self._repo.find_all_paginated(offset, limit)

        if total == 0:
            await self._seed_initial_data()
            pokemons, total = self._repo.find_all_paginated(offset, limit)

        return pokemons, total

    async def _seed_initial_data(self) -> None:
        raw_list = await self._pokeapi.fetch_list(offset=0, limit=151)
        names = [item["name"] for item in raw_list["results"]]

        raws = await asyncio.gather(
            *[self._pokeapi.fetch_pokemon(name) for name in names],
            return_exceptions=True,
        )

        for raw in raws:
            if isinstance(raw, Exception) or raw is None:
                continue
            self._repo.save(raw_to_pokemon(raw))
