from fastapi import Depends
from sqlalchemy.orm import Session
from ..infrastructure.database.connection import get_db
from ..infrastructure.database.repositories.pokemon_repository_impl import PostgresPokemonRepository
from ..infrastructure.external.pokeapi_client import PokeAPIClient
from ..application.use_cases.get_pokemon_list import GetPokemonList
from ..application.use_cases.get_pokemon_detail import GetPokemonDetail


def get_pokemon_repository(db: Session = Depends(get_db)) -> PostgresPokemonRepository:
    return PostgresPokemonRepository(db)


def get_pokeapi_client() -> PokeAPIClient:
    return PokeAPIClient()


def get_pokemon_list_use_case(
    repo: PostgresPokemonRepository = Depends(get_pokemon_repository),
    pokeapi: PokeAPIClient = Depends(get_pokeapi_client),
) -> GetPokemonList:
    return GetPokemonList(repo, pokeapi)


def get_pokemon_detail_use_case(
    repo: PostgresPokemonRepository = Depends(get_pokemon_repository),
    pokeapi: PokeAPIClient = Depends(get_pokeapi_client),
) -> GetPokemonDetail:
    return GetPokemonDetail(repo, pokeapi)
