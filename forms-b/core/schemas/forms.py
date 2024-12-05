from pydantic import BaseModel
from typing import List, Optional


class Fields(BaseModel):
    id: int
    type: str
    label: str
    placeholder: Optional[str] = None
    required: bool


class Form(BaseModel):
    title: str
    description: Optional[str] = None
    fields: List[Fields]
    token: str
