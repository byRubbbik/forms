from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from crud.current_user import get_current_user
from crud.form import FormCRUD

from core.models import db_helper

from core.schemas.forms import CreateForm


router = APIRouter(
    prefix=settings.api.v1.forms,
    tags=["Forms"]
)


@router.get("")
async def get_forms(
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_getter)
):
    form = await FormCRUD.get(session=session, username=current_user.username)

    return form


@router.post("")
async def create_form(
    form: CreateForm,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_getter)
):
    fields_as_dict = [field.dict() for field in form.fields]
    new_form = await FormCRUD.create(
        session=session,
        username=current_user["username"],
        title=form.title,
        description=form.description,
        fields=fields_as_dict
    )
    return new_form
