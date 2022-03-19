import aiofiles
import mimetypes
import os

from io import BytesIO
from pathlib import Path
from shutil import rmtree
from zipfile import ZipFile

from api.config import settings
from api.main import UploadFile

def path_exists(path: Path) -> bool:
    return path.exists()

def path_is_dir(path: Path) -> bool:
    return path.is_dir()

def mkdir_if_not_exists(path: Path) -> None:
    if not path.exists():
        path.mkdir(parents=True)

def get_storage_path(token: str, path: str = '', mkdir: bool = True) -> Path:
    path = path.strip('/').replace('../', '')

    out_file_dir = settings.store_path / token / path

    if mkdir:
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

        new_content['mime_type'] = mimetypes.guess_type(item)[0] if not is_dir else 'folder'

        content.append(new_content)

    return content

def rename(old_path: Path, new_path: Path) -> None:
    old_path.rename(new_path)

def delete(path: Path) -> None:
    if path_is_dir(path):
        rmtree(path)

    else:
        path.unlink()

def get_zipped_dir(path: Path) -> BytesIO:
    zip_file = BytesIO()
    str_path = str(path)

    with ZipFile(zip_file, 'w') as buffer:
        for root, dirs, files in os.walk(path):
            for f in files:
                buffer.write(os.path.join(root, f), arcname=f'{root.replace(str_path, path.name)}/{f}')

    return zip_file.getvalue()