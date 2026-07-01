from sqlalchemy import Column, Integer, String, ARRAY
from ..connection import Base


class PokemonModel(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    height = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    types = Column(ARRAY(String), nullable=False)
    abilities = Column(ARRAY(String), nullable=False)
    sprite_url = Column(String, nullable=False)
    color = Column(String, nullable=False)
