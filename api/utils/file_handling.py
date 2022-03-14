import aiofiles

from pathlib import Path
from shutil import rmtree

from api.config import settings
from api.main import UploadFile

def mkdir_if_not_exists(path: Path) -> None:
    if not path.exists():
        path.mkdir(parents=True)

def get_storage_path(token: str, path: str = '') -> Path:
    path = path.strip('/').replace('../', '')

    out_file_dir = settings.store_path / token / path

    mkdir_if_not_exists(out_file_dir)

    return out_file_dir

def delete_user_directory(token: str) -> None:
    user_dir = get_storage_path(token)

    rmtree(user_dir)

async def save_file(post_file: UploadFile, path: Path) -> None:
    async with aiofiles.open(path, 'wb') as out_file:
        while content := await post_file.read(1024):  # async read chunk
            await out_file.write(content)  # async write chunk