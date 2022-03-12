from fastapi import FastAPI

from api.utils import db
from .schemas import UserCreate

app = FastAPI()


@app.get('/')
@app.get('/version')
async def version():
    return {
        'name': 'Local Drive API',
        'version': '1.0',
    }

@app.post('/create-user')
async def create_user(user: UserCreate):
    db.create_user(**user.dict())

    return {
        'status': 'success',
        'message': f'User {user.name} created successfully'
    }