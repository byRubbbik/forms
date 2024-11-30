import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from api import router as api_router
from core.config import settings
from core.models import db_helper, Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # shutdown
    await db_helper.dispose()


main_app = FastAPI(
    lifespan=lifespan,
)
main_app.include_router(
    api_router,
    prefix=settings.api.prefix
)
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Или используйте "*" для разрешения всех доменов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы, включая POST
    allow_headers=["*"],  # Разрешить все заголовки
)


if __name__ == "__main__":
    uvicorn.run(
        "main:main_app",
        host=settings.run.host,
        port=settings.run.port,
        reload=True
    )
