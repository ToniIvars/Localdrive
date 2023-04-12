from fastapi import Depends, FastAPI, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response

from api.utils import db, file_handling
from .schemas import User, UserDelete, DeleteModel, ModifyModel
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
    version='1.1'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(';'),
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

async def parse_token(authorization: str = Header(...)):   
    try:
        token_type, token = authorization.split()
        assert token_type == 'Bearer'

    except:
        raise HTTPException(
            status_code=400,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return token

# API endpoints

@app.get('/', tags=['Information'])
@app.get('/info', tags=['Information'])
async def info():
    return {
        'name': 'Local Drive API',
        'version': '1.1',
    }

@app.post('/users/create', tags=['Users'])
async def create_user(user: User):
    resp = db.create_user(**user.dict())

    if resp.get('error'):
        raise HTTPException(status_code=400, detail=resp.get('detail'))

    return {
        'detail': f'User {user.username} created successfully',
        'token': resp.get('token')
    }


@app.post('/users/token', tags=['Users'])
async def login(user: User):
    resp = db.get_user_token(**user.dict())

    if resp.get('error'):
        raise HTTPException(status_code=401, detail=resp.get('detail'))

    return {
        'token': resp.get('token'),
        'token_type': 'bearer'
    }

@app.delete('/users/delete', tags=['Users'])
async def delete_user(user: UserDelete, token: str = Depends(parse_token)):
    resp = db.delete_user(token, user.password)
    if resp.get('error'):
        raise HTTPException(status_code=400, detail=resp.get('detail'))
    
    file_handling.delete_user_directory(token)

    return {
        'detail': 'User deleted successfully',
    }

@app.get('/files/list', tags=['Files'])
async def list_files(path: str = '', token: str = Depends(parse_token)):
    dir_content = file_handling.list_files_from_dir(token, path)

    return dir_content

@app.get('/files/download/{name}', tags=['Files'])
async def download(name:str, path: str = '', token: str = Depends(parse_token)):
    local_path = file_handling.get_storage_path(token, path, mkdir=False) / name

    if not local_path.exists():
        raise HTTPException(status_code=404, detail='File or directory not found')

    if local_path.is_dir():
        zip_file = file_handling.get_zipped_dir(local_path)

        return Response(zip_file, media_type='application/zip', headers={
            'Content-Disposition': f'attachment; filename={local_path.name}.zip'
        })

    return FileResponse(path=local_path)

@app.post('/files/upload', tags=['Files'])
async def upload_file(post_file: UploadFile, path: str = '', token: str = Depends(parse_token)):
    out_file_path = file_handling.get_storage_path(token, path) / post_file.filename

    await file_handling.save_file(post_file, out_file_path)

    return {'detail': 'File uploaded successfully'}

@app.post('/files/mkdir', tags=['Files'])
async def make_directory(model: DeleteModel, token: str = Depends(parse_token)):
    path = file_handling.get_storage_path(token, model.path, mkdir=False) / model.name

    if path.exists():
        raise HTTPException(status_code=400, detail='Directory already exists')

    file_handling.mkdir_if_not_exists(path)

    return {'detail': 'Directory created successfully'}

@app.put('/files/rename', tags=['Files'])
async def rename(model: ModifyModel, token: str = Depends(parse_token)):
    storage_path = file_handling.get_storage_path(token, model.path, mkdir=False)
    
    old_path = storage_path / model.name
    new_path = storage_path / model.new_name

    if not old_path.exists():
        raise HTTPException(status_code=404, detail='File or directory not found')

    if new_path.exists():
        raise HTTPException(status_code=400, detail='File or directory already exists')

    file_handling.rename(old_path, new_path)

    return {'detail': 'Name changed successfully'}

@app.delete('/files/delete', tags=['Files'])
async def delete(model: DeleteModel, token: str = Depends(parse_token)):
    path_to_delete = file_handling.get_storage_path(token, model.path, mkdir=False) / model.name

    if not path_to_delete.exists():
        raise HTTPException(status_code=404, detail='File or directory not found')

    file_handling.delete(path_to_delete)

    return {'detail': 'File or directory deleted successfully'}