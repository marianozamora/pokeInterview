from abc import ABC, abstractmethod
from typing import List, Optional, Tuple
from ..entities.pokemon import Pokemon


class PokemonRepository(ABC):
    @abstractmethod
    def find_by_id(self, pokemon_id: int) -> Optional[Pokemon]: ...

    @abstractmethod
    def find_by_name(self, name: str) -> Optional[Pokemon]: ...

    @abstractmethod
    def save(self, pokemon: Pokemon) -> Pokemon: ...

    @abstractmethod
    def find_all_paginated(self, offset: int, limit: int) -> Tuple[List[Pokemon], int]: ...
