from ...domain.entities.pokemon import Pokemon


def raw_to_pokemon(raw: dict, color: str = "") -> Pokemon:
    """
    Map a raw PokéAPI /pokemon response to the domain entity.
    Pass `color` separately — it comes from /pokemon-species/{id}, not /pokemon/{id}.
    """
    return Pokemon(
        id=raw["id"],
        name=raw["name"],
        height=raw["height"],
        weight=raw["weight"],
        types=[t["type"]["name"] for t in raw["types"]],
        abilities=[a["ability"]["name"] for a in raw["abilities"]],
        sprite_url=raw["sprites"]["front_default"] or "",
        color=color,
    )
