"""add color to pokemons

Revision ID: b2c3d4e5f6a1
Revises: a1b2c3d4e5f0
Create Date: 2026-07-01 00:01:00.000000
"""
from typing import Union
from alembic import op
import sqlalchemy as sa

revision: str = "b2c3d4e5f6a1"
down_revision: Union[str, None] = "a1b2c3d4e5f0"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add as nullable first so existing rows are not rejected,
    # back-fill with 'unknown', then enforce NOT NULL.
    op.add_column("pokemons", sa.Column("color", sa.String(), nullable=True))
    op.execute("UPDATE pokemons SET color = 'unknown' WHERE color IS NULL")
    op.alter_column("pokemons", "color", nullable=False)


def downgrade() -> None:
    op.drop_column("pokemons", "color")
