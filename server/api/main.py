from fastapi import FastAPI, Header, HTTPException, UploadFile

from api.utils import db, file_handling
from .schemas import UserCreate, UserDelete, DirModel, FileModel, FileModify, DirModify

description = '''
This is a cloud service at home. You can:
- Create your own user
- Upload files and remove them
- Delete your user when you want (**this will remove all your files**)
'''

app = FastAPI(
    title='Local Drive API',
    description=description,
    version='1.0'
)

# Extra functions

def check_token(token: str):
    if not db.valid_token(token):
        raise HTTPException(status_code=401, detail='Invalid token')

# API endpoints

@app.get('/', tags=['Information'])
@app.get('/info', tags=['Information'])
async def info():
    return {
        'name': 'Local Drive API',
        'version': '1.0',
    }

@app.post('/create-user', tags=['Users'])
async def create_user(user: UserCreate):
    new_user_token = db.create_user(**user.dict())

    return {
        'detail': f'User {user.username} created successfully',
        'token': new_user_token
    }

@app.delete('/delete-user', tags=['Users'])
async def delete_user(user: UserDelete, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    db.delete_user(token, user.password)
    file_handling.delete_user_directory(token)

    return {
        'detail': 'User deleted successfully',
    }

@app.post('/get-my-token', tags=['Users'])
async def get_my_token(user: UserCreate):
    token = db.get_user_token(**user.dict())

    return {
        'token': token
    }

@app.post('/upload-file', tags=['Files'])
async def upload_file(post_file: UploadFile, path: str = '', token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    out_file_path = file_handling.get_storage_path(token, path) / post_file.filename

    await file_handling.save_file(post_file, out_file_path)

    return {'detail': 'File uploaded successfully'}

@app.get('/list-files', tags=['Files'])
async def list_files(path: str = '', token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    dir_content = file_handling.list_files_from_dir(token, path)

    return dir_content

@app.put('/change-file-name', tags=['Files'])
async def change_file_name(change_file: FileModify, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    file_path = file_handling.get_storage_path(token, change_file.path)

    old_file_path = file_path / change_file.file_name
    new_file_path = file_path / change_file.new_name

    if not file_handling.path_exists(old_file_path) or file_handling.path_is_dir(old_file_path):
        raise HTTPException(status_code=404, detail="File not found")

    if file_handling.path_exists(new_file_path):
        raise HTTPException(status_code=400, detail="File already exists")

    file_handling.rename(old_file_path, new_file_path)

    return {'detail': 'File name changed successfully'}

@app.put('/change-dir-name', tags=['Files'])
async def change_dir_name(change_dir: DirModify, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    dir_path = file_handling.get_storage_path(token, change_dir.path, mkdir=False)

    new_dir_path = file_handling.Path('/'.join(str(dir_path).split('/')[:-1] + [change_dir.new_name]))

    if not file_handling.path_exists(dir_path) or not file_handling.path_is_dir(dir_path):
        raise HTTPException(status_code=404, detail="Directory not found")

    if file_handling.path_exists(new_dir_path):
        raise HTTPException(status_code=400, detail="Directory already exists")

    file_handling.rename(dir_path, new_dir_path)

    return {'detail': 'Directory name changed successfully'}

@app.delete('/delete-file', tags=['Files'])
async def delete_file(delete_file: FileModel, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    file_to_delete = file_handling.get_storage_path(token, delete_file.path) / delete_file.file_name

    if not file_handling.path_exists(file_to_delete) or file_handling.path_is_dir(file_to_delete):
        raise HTTPException(status_code=404, detail="File not found")

    file_handling.delete(file_to_delete)

    return {'detail': 'File deleted successfully'}

@app.delete('/delete-dir', tags=['Files'])
async def delete_directory(delete_dir: DirModel, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    dir_to_delete = file_handling.get_storage_path(token, delete_dir.path, mkdir=False)

    if not file_handling.path_exists(dir_to_delete) or not file_handling.path_is_dir(dir_to_delete):
        raise HTTPException(status_code=404, detail="Directory not found")

    file_handling.delete(dir_to_delete)

    return {'detail': 'Directory deleted successfully'}