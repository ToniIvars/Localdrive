from fastapi import FastAPI, Header, HTTPException

from api.utils import db
from .schemas import UserCreate, UserDelete

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

@app.post('/delete-user', tags=['Users'])
async def delete_user(user: UserDelete, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    db.delete_user(token, user.password)

    return {
        'detail': f'User deleted successfully',
    }

@app.post('/get-my-token', tags=['Users'])
async def get_my_token(user: UserCreate):
    token = db.get_user_token(**user.dict())

    return {
        'token': token
    }