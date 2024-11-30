from typing import Sequence

from passlib.context import CryptContext

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import User
from crud import BaseCRUD

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCRUD(BaseCRUD):
    @classmethod
    def __hash_password(cls, password: str) -> str:
        return pwd_context.hash(password)

    @classmethod
    async def create(cls, session: AsyncSession, username: str, email: str, password: str, role: str = "User"):
        hashed_password = cls.__hash_password(password) 
        new_user = User(username=username, password=hashed_password, email=email, role=role)
        session.add(new_user)
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise ValueError(f"Username {username} already exists")
        return new_user

    @classmethod
    async def get(cls, session: AsyncSession, username: str):
        result = await session.execute(select(User).filter_by(username=username))
        user = result.scalar_one_or_none()
        if user:
            return user
        raise ValueError("User not found")

    @classmethod
    async def update(cls, session: AsyncSession, username: str, new_password: str, new_role: str = None):
        user = await cls.get(session, username)
        user.password = new_password
        if new_role:
            user.role = new_role
        session.add(user)
        await session.commit()
        return user
    
    @classmethod
    async def delete(cls, session: AsyncSession, username: str):
        user = await cls.get(session, username)
        await session.delete(user)
        await session.commit()
        return user