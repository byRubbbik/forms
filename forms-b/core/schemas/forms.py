from pydantic import BaseModel
from typing import List, Optional
from .auth import TokenResponse

class Fields(BaseModel):
    id: int
    type: str
    label: str
    placeholder: Optional[str] = None
    required: bool


class CreateForm(BaseModel):
    title: str
    description: Optional[str] = None
    fields: List[Fields]
