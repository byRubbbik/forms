import enum
from pydantic import BaseModel


class RoleEnum(enum.Enum):
    user = "User"
    admin = "Admin"


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
