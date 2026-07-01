from fastapi import APIRouter, Depends, HTTPException, Query

from ...application.use_cases.get_pokemon_list import GetPokemonList
from ...application.use_cases.get_pokemon_detail import GetPokemonDetail
from ..schemas.pokemon_schema import PokemonResponse, PokemonListResponse
from ..dependencies import get_pokemon_list_use_case, get_pokemon_detail_use_case

router = APIRouter(prefix="/api/pokemon", tags=["pokemon"])


@router.get(
    "",
    response_model=PokemonListResponse,
    summary="List Pokémon",
    description=(
        "Returns a paginated list of Pokémon ordered by Pokédex number. "
        "On the first call, all Generation I Pokémon (151) are fetched concurrently "
        "from PokéAPI and persisted to the database before the response is returned."
    ),
    responses={
        200: {"description": "Paginated list of Pokémon"},
        422: {"description": "Validation error — offset must be ≥ 0, limit must be between 1 and 100"},
    },
)
async def list_pokemon(
    offset: int = Query(0, ge=0, description="Number of Pokémon to skip"),
    limit: int = Query(20, ge=1, le=100, description="Number of Pokémon to return (max 100)"),
    use_case: GetPokemonList = Depends(get_pokemon_list_use_case),
):
    pokemons, total = await use_case.execute(offset, limit)
    return PokemonListResponse(
        items=[PokemonResponse(**p.__dict__) for p in pokemons],
        total=total,
        offset=offset,
        limit=limit,
    )


@router.get(
    "/{identifier}",
    response_model=PokemonResponse,
    summary="Get Pokémon detail",
    description=(
        "Returns full details for a single Pokémon identified by **name** (e.g. `pikachu`) "
        "or **Pokédex number** (e.g. `25`). "
        "If the Pokémon is not yet cached, it is fetched from PokéAPI and stored."
    ),
    responses={
        200: {"description": "Pokémon detail"},
        404: {"description": "Pokémon not found in PokéAPI"},
    },
)
async def get_pokemon(
    identifier: str,
    use_case: GetPokemonDetail = Depends(get_pokemon_detail_use_case),
):
    id_or_name = int(identifier) if identifier.isdigit() else identifier
    pokemon = await use_case.execute(id_or_name)
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return PokemonResponse(**pokemon.__dict__)
