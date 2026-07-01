"""initial

Revision ID: a1b2c3d4e5f0
Revises:
Create Date: 2026-07-01 00:00:00.000000
"""
from typing import Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "a1b2c3d4e5f0"
down_revision: Union[str, None] = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "pokemons",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("height", sa.Integer(), nullable=False),
        sa.Column("weight", sa.Integer(), nullable=False),
        sa.Column("types", postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column("abilities", postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column("sprite_url", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pokemons_id"), "pokemons", ["id"], unique=False)
    op.create_index(op.f("ix_pokemons_name"), "pokemons", ["name"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_pokemons_name"), table_name="pokemons")
    op.drop_index(op.f("ix_pokemons_id"), table_name="pokemons")
    op.drop_table("pokemons")
