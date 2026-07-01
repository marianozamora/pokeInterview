import httpx
from typing import Optional

POKEAPI_BASE = "https://pokeapi.co/api/v2"


class PokeAPIClient:
    async def fetch_list(self, offset: int = 0, limit: int = 151) -> dict:
        async with httpx.AsyncClient(timeout=30) as client:
            r = await client.get(f"{POKEAPI_BASE}/pokemon", params={"offset": offset, "limit": limit})
            r.raise_for_status()
            return r.json()

    async def fetch_pokemon(self, identifier: str) -> Optional[dict]:
        async with httpx.AsyncClient(timeout=30) as client:
            r = await client.get(f"{POKEAPI_BASE}/pokemon/{identifier}")
            if r.status_code == 404:
                return None
            r.raise_for_status()
            return r.json()
