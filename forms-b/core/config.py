from pydantic import BaseModel, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000


class ApiV1Prefix(BaseModel):
    prefix: str = "/v1"
    users: str = "/users"


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    v1: ApiV1Prefix = ApiV1Prefix()


class DatabaseConfig(BaseModel):
    echo: bool = False
    echo_pool: bool = False
    max_overflow: int = 10
    pool_size: int = 50
    url: PostgresDsn 


class AuthConfig(BaseModel):
    ALGORITM: str = "HS256"
    SECRET_KEY: str = "SECRET_SUPER_KEY"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",
        env_file=".env"
    )
    run: RunConfig = RunConfig()
    api: ApiPrefix = ApiPrefix()
    db: DatabaseConfig
    auth: AuthConfig = AuthConfig()


settings = Settings()
