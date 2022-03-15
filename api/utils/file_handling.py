import aiofiles
import mimetypes

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

def list_files_from_dir(token: str, path: str) -> None:
    files_dir = get_storage_path(token, path)

    content = []
    for item in files_dir.iterdir():
        is_dir = item.is_dir()

        new_content = {
            'name': item.name,
            'is_dir': is_dir,
        }

        if not is_dir:
            new_content['mime_type'] = mimetypes.guess_type(item)[0]

        content.append(new_content)

    return content