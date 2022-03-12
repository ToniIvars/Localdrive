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
        'status': 'success',
        'detail': f'User {user.name} created successfully',
        'token': new_user_token
    }

@app.post('/delete-user')
async def delete_user(user: UserDelete, token: str = Header(..., alias='API_TOKEN')):
    check_token(token)

    db.delete_user(token, user.password)

    return {
        'status': 'success',
        'detail': f'User deleted successfully',
    }