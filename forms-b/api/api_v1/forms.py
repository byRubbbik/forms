from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from crud.current_user import get_current_user

from core.models import db_helper

from core.schemas.forms import Form


router = APIRouter(
    prefix=settings.api.v1.forms,
    tags=["Forms"]
)


@router.get("")
def get_forms(
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_getter)
):
    
    return


@router.post("")
def create_form(
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_getter)
):
    return
