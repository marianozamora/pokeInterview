import pytest
from src.application.mappers.pokemon_mapper import raw_to_pokemon
from tests.conftest import RAW_BULBASAUR


def test_maps_id():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.id == 1


def test_maps_name():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.name == "bulbasaur"


def test_maps_height():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.height == 7


def test_maps_weight():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.weight == 69


def test_maps_types():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.types == ["grass", "poison"]


def test_maps_abilities():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.abilities == ["overgrow", "chlorophyll"]


def test_maps_sprite_url():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.sprite_url == "https://example.com/bulbasaur.png"


def test_empty_sprite_url_becomes_empty_string():
    raw = {**RAW_BULBASAUR, "sprites": {"front_default": None}}
    pokemon = raw_to_pokemon(raw)
    assert pokemon.sprite_url == ""


def test_color_defaults_to_empty_string():
    pokemon = raw_to_pokemon(RAW_BULBASAUR)
    assert pokemon.color == ""


def test_color_passed_explicitly():
    pokemon = raw_to_pokemon(RAW_BULBASAUR, color="green")
    assert pokemon.color == "green"
