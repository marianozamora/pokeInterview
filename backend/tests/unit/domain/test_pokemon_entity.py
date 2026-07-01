import pytest
from src.domain.entities.pokemon import Pokemon


def test_pokemon_created_with_correct_fields():
    p = Pokemon(
        id=1,
        name="bulbasaur",
        height=7,
        weight=69,
        types=["grass", "poison"],
        abilities=["overgrow"],
        sprite_url="https://example.com/bulbasaur.png",
        color="green",
    )
    assert p.id == 1
    assert p.name == "bulbasaur"
    assert p.height == 7
    assert p.weight == 69
    assert p.types == ["grass", "poison"]
    assert p.abilities == ["overgrow"]
    assert p.sprite_url == "https://example.com/bulbasaur.png"
    assert p.color == "green"


def test_pokemon_equality():
    p1 = Pokemon(1, "bulbasaur", 7, 69, ["grass"], ["overgrow"], "img.png", "green")
    p2 = Pokemon(1, "bulbasaur", 7, 69, ["grass"], ["overgrow"], "img.png", "green")
    assert p1 == p2


def test_pokemon_inequality_on_id():
    p1 = Pokemon(1, "bulbasaur", 7, 69, ["grass"], ["overgrow"], "img.png", "green")
    p2 = Pokemon(2, "ivysaur", 10, 130, ["grass"], ["overgrow"], "img.png", "green")
    assert p1 != p2


def test_pokemon_types_is_list():
    p = Pokemon(1, "bulbasaur", 7, 69, ["grass", "poison"], ["overgrow"], "img.png", "green")
    assert isinstance(p.types, list)
    assert len(p.types) == 2


def test_pokemon_abilities_is_list():
    p = Pokemon(1, "bulbasaur", 7, 69, ["grass"], ["overgrow", "chlorophyll"], "img.png", "green")
    assert isinstance(p.abilities, list)
    assert len(p.abilities) == 2
