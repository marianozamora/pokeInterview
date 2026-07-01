from pydantic import BaseModel, Field
from typing import List

_BULBASAUR_EXAMPLE = {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "types": ["grass", "poison"],
    "abilities": ["overgrow", "chlorophyll"],
    "sprite_url": (
        "https://raw.githubusercontent.com/PokeAPI/sprites"
        "/master/sprites/pokemon/1.png"
    ),
    "color": "green",
}


class PokemonResponse(BaseModel):
    id: int = Field(..., examples=[1], description="National Pokédex number")
    name: str = Field(..., examples=["bulbasaur"], description="Lowercase Pokémon name")
    height: int = Field(..., examples=[7], description="Height in decimetres")
    weight: int = Field(..., examples=[69], description="Weight in hectograms")
    types: List[str] = Field(..., examples=[["grass", "poison"]], description="List of type names")
    abilities: List[str] = Field(
        ..., examples=[["overgrow", "chlorophyll"]], description="List of ability names"
    )
    sprite_url: str = Field(..., description="URL of the front-default sprite")
    color: str = Field(..., examples=["green"], description="Pokémon species color from PokéAPI")

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {"example": _BULBASAUR_EXAMPLE},
    }


class PokemonListResponse(BaseModel):
    items: List[PokemonResponse] = Field(..., description="Pokémon in this page")
    total: int = Field(..., examples=[151], description="Total number of Pokémon in the database")
    offset: int = Field(..., examples=[0], description="Current page offset")
    limit: int = Field(..., examples=[20], description="Page size requested")

    model_config = {
        "json_schema_extra": {
            "example": {
                "items": [_BULBASAUR_EXAMPLE],
                "total": 151,
                "offset": 0,
                "limit": 20,
            }
        }
    }
