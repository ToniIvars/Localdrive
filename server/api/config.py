from pathlib import Path
from pydantic import BaseSettings, validator

class Settings(BaseSettings):
    store_path: Path = Path.home()
    allowed_origins: str

    class Config:
        env_file = 'api/.env'

    @validator('store_path')
    def validate_path(cls, path):
        path = Path(path)

        if not path.exists() or not path.is_dir():
            path = Path.home() / 'Localdrive'

        else:
            path = path / 'Localdrive'

        if not path.exists():
            path.mkdir()

        return path

settings = Settings()