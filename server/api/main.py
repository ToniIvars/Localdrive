from fastapi import FastAPI, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response

from api.utils import db, file_handling
from .schemas import UserCreate, UserDelete, DeleteModel, ModifyModel
from .config import settings

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(';'),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.post('/users/create', tags=['Users'])
async def create_user(user: UserCreate):
    new_user_token = db.create_user(**user.dict())

    return {
        'detail': f'User {user.username} created successfully',
        'token': new_user_token
    }


@app.post('/users/get-my-token', tags=['Users'])
async def get_my_token(user: UserCreate):
    token = db.get_user_token(**user.dict())

    return {
        'token': token
    }

@app.delete('/users/delete', tags=['Users'])
async def delete_user(user: UserDelete, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    db.delete_user(token, user.password)
    file_handling.delete_user_directory(token)

    return {
        'detail': 'User deleted successfully',
    }

@app.get('/files/list', tags=['Files'])
async def list_files(path: str = '', token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    dir_content = file_handling.list_files_from_dir(token, path)

    return dir_content

@app.get('/files/download/{name}', tags=['Files'])
async def download(name:str, path: str = '', token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    local_path = file_handling.get_storage_path(token, path, mkdir=False) / name

    if not file_handling.path_exists(local_path):
        raise HTTPException(status_code=404, detail="File or directory not found")

    if file_handling.path_is_dir(local_path):
        zip_file = file_handling.get_zipped_dir(local_path)

        return Response(zip_file, media_type="application/zip", headers={
            'Content-Disposition': f'attachment; filename={local_path.name}.zip'
        })

    return FileResponse(path=local_path)

@app.post('/files/upload', tags=['Files'])
async def upload_file(post_file: UploadFile, path: str = '', token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    out_file_path = file_handling.get_storage_path(token, path) / post_file.filename

    await file_handling.save_file(post_file, out_file_path)

    return {'detail': 'File uploaded successfully'}

@app.post('/files/mk-dir', tags=['Files'])
async def make_directory(model: DeleteModel, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    path = file_handling.get_storage_path(token, model.path, mkdir=False) / model.name

    if file_handling.path_exists(path):
        raise HTTPException(status_code=400, detail="Directory already exists")

    file_handling.mkdir_if_not_exists(path)

    return {'detail': 'Directory created successfully'}

@app.put('/files/change-name', tags=['Files'])
async def change_name(model: ModifyModel, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    old_path = file_handling.get_storage_path(token, model.path, mkdir=False) / model.name

    new_path = file_handling.get_storage_path(token, model.path, mkdir=False) / model.new_name

    if not file_handling.path_exists(old_path):
        raise HTTPException(status_code=404, detail="File or directory not found")

    if file_handling.path_exists(new_path):
        raise HTTPException(status_code=400, detail="File or directory already exists")

    file_handling.rename(old_path, new_path)

    return {'detail': 'Name changed successfully'}

@app.delete('/files/delete', tags=['Files'])
async def delete(model: DeleteModel, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    path_to_delete = file_handling.get_storage_path(token, model.path, mkdir=False) / model.name

    if not file_handling.path_exists(path_to_delete):
        raise HTTPException(status_code=404, detail="File or directory not found")

    file_handling.delete(path_to_delete)

    return {'detail': 'File or directory deleted successfully'}