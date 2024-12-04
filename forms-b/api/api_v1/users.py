from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta

from core.models import db_helper
from core.schemas.user import UserCreate
from core.schemas.auth import TokenResponse, AuthRequest
from core.config import settings
from crud.current_user import admin_required

from crud import ACCESS_TOKEN_EXPIRE_MINUTES
from crud.token import verify_password, create_access_token, verify_token
from crud.user import UserCRUD


router = APIRouter(
    prefix=settings.api.v1.users,
    tags=["Users"]
)



@router.post("/auth", response_model=TokenResponse)
async def auth(
    auth_request: AuthRequest,
    session: AsyncSession = Depends(db_helper.session_getter)
):
    user = await UserCRUD.get(session=session, username=auth_request.username)
    
    if not user or not verify_password(auth_request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
    data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires
    )

    print(verify_token(access_token))
     
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("")
async def create_user(
    new_user: UserCreate,
    current_user: dict = Depends(admin_required),
    session: AsyncSession = Depends(db_helper.session_getter)
):
    user = await UserCRUD.create(
        session=session,
        username=new_user.username,
        email=new_user.email,
        password=new_user.password
    )
    return user
