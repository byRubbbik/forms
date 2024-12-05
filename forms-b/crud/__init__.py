from abc import ABC, abstractmethod

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext

from core.config import settings


class BaseCRUD(ABC):
    @abstractmethod
    async def get(cls):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    async def update(cls):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    async def create(cls):
        raise NotImplementedError("Subclasses must implement this method")

    @abstractmethod
    async def delete(cls):
        raise NotImplementedError("Subclasses must implement this method")



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/users/auth")

SECRET_KEY = settings.auth.SECRET_KEY
ALGORITHM = settings.auth.ALGORITM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.auth.ACCESS_TOKEN_EXPIRE_MINUTES
