from fastapi import FastAPI, Header, HTTPException

from api.utils import db
from .schemas import UserCreate, UserDelete

app = FastAPI()

def check_token(token: str):
    if not db.valid_token(token):
        raise HTTPException(status_code=401, detail='Invalid token')

# API endpoints

@app.get('/')
@app.get('/version')
async def version():
    return {
        'name': 'Local Drive API',
        'version': '1.0',
    }

@app.post('/create-user')
async def create_user(user: UserCreate):
    new_user_token = db.create_user(**user.dict())

    return {
        'detail': f'User {user.name} created successfully',
        'token': new_user_token
    }

@app.post('/delete-user')
async def delete_user(user: UserDelete, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    db.delete_user(token, user.password)

    return {
        'detail': f'User deleted successfully',
    }

@app.get('/me')
async def me(token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    user = db.get_user_by_token(token)

    return {
        'name': user.name,
        'token': user.token
    }