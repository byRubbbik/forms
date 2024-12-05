from typing import Sequence

from passlib.context import CryptContext

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import User
from crud import BaseCRUD


class FormCRUD(BaseCRUD):
    @classmethod
    async def create(cls, session: AsyncSession, username: str):
        """
            Метод для создания формы
        """
        session.add()
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise ValueError(f"Username {username} already exists")
        return 

    @classmethod
    async def get(cls, session: AsyncSession, username: str):
        """
            Метод для получения формы
        """
        result = await session.execute(select(User).filter_by(username=username))
        user = result.scalar_one_or_none()
        if user:
            return user
        raise ValueError("Form not found")

    @classmethod
    async def update(cls, session: AsyncSession):
        """
            Метод для редактирования формы
        """
        
    
    @classmethod
    async def delete(cls, session: AsyncSession, username: str):
        """
            Метод для удаления формы
        """