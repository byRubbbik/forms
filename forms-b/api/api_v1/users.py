from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext

from jose import jwt, JWTError
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from core.models import User 

from core.schemas.user import UserCreate
from core.schemas.auth import TokenResponse, AuthRequest
from core.config import settings
from crud.user import UserCRUD


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.auth.SECRET_KEY
ALGORITHM = settings.auth.ALGORITM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.auth.ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix=settings.api.v1.users,
    tags=["Users"]
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")
        if not username or not role:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return {"username": username, "role": role}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    

async def admin_required(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admins only"
        )
    return current_user

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
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
