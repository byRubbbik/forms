import enum
from pydantic import BaseModel


class RoleEnum(enum.Enum):
    user = "User"
    admin = "Admin"


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


# class UserReadResponse(BaseModel):
#     id: int
#     username: str
#     role: str
