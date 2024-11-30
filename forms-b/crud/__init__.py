from abc import ABC, abstractmethod


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
