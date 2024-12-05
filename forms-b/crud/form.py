from typing import Sequence

from passlib.context import CryptContext

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Form, User
from crud import BaseCRUD


class FormCRUD(BaseCRUD):
    @classmethod
    async def create(cls, session: AsyncSession, username: str, title: str, description: str, fields: list):
        """
            Метод для создания формы
        """
        query = await session.execute(select(User).filter_by(username=username))
        user = query.scalar_one_or_none()
        new_form = Form(user_id=user.id, title=title, description=description, fields=fields)
        
        session.add(new_form)
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise ValueError
        return new_form

    @classmethod
    async def get(cls, session: AsyncSession, username: str):
        """
            Метод для получения формы
        """
        query = await session.execute(select(User).filter_by(username=username))
        user = query.scalar_one_or_none()
        query = await session.execute(
            select(Form).where(Form.user_id == user.id)
        )
        form = query.scalar_one_or_none()
        if form:
            return form
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