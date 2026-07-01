from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from ....domain.entities.pokemon import Pokemon
from ....domain.repositories.pokemon_repository import PokemonRepository
from ..models.pokemon_model import PokemonModel


class PostgresPokemonRepository(PokemonRepository):
    def __init__(self, session: Session):
        self._session = session

    def find_by_id(self, pokemon_id: int) -> Optional[Pokemon]:
        model = self._session.query(PokemonModel).filter(PokemonModel.id == pokemon_id).first()
        return self._to_entity(model) if model else None

    def find_by_name(self, name: str) -> Optional[Pokemon]:
        model = self._session.query(PokemonModel).filter(PokemonModel.name == name).first()
        return self._to_entity(model) if model else None

    def save(self, pokemon: Pokemon) -> Pokemon:
        existing = self._session.query(PokemonModel).filter(PokemonModel.id == pokemon.id).first()
        if existing:
            return self._to_entity(existing)
        model = PokemonModel(
            id=pokemon.id,
            name=pokemon.name,
            height=pokemon.height,
            weight=pokemon.weight,
            types=pokemon.types,
            abilities=pokemon.abilities,
            sprite_url=pokemon.sprite_url,
            color=pokemon.color,
        )
        self._session.add(model)
        self._session.commit()
        self._session.refresh(model)
        return self._to_entity(model)

    def find_all_paginated(self, offset: int, limit: int) -> Tuple[List[Pokemon], int]:
        total = self._session.query(PokemonModel).count()
        models = (
            self._session.query(PokemonModel)
            .order_by(PokemonModel.id)
            .offset(offset)
            .limit(limit)
            .all()
        )
        return [self._to_entity(m) for m in models], total

    def _to_entity(self, model: PokemonModel) -> Pokemon:
        return Pokemon(
            id=model.id,
            name=model.name,
            height=model.height,
            weight=model.weight,
            types=list(model.types),
            abilities=list(model.abilities),
            sprite_url=model.sprite_url,
            color=model.color,
        )
