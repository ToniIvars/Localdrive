from pathlib import Path

from api.config import settings

def mkdir_if_not_exists(path: Path) -> None:
    if not path.exists():
        path.mkdir(parents=True)

def get_user_storage_path(token: str, path: str) -> Path:
    path = path.lstrip('/').replace('../', '')

    out_file_dir = settings.store_path / token / path

    mkdir_if_not_exists(out_file_dir)

    return out_file_dir