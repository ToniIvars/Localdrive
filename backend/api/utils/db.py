from pony.orm import *

from api.config import settings
from . import hashing

db = Database()

db.bind(provider='sqlite', filename=f'{settings.store_path}/localdrive.db', create_db=True)

# Models

class User(db.Entity):
    _table_ = 'users'

    username = Required(str, unique=True, max_len=30)
    hashed_password = Required(str)
    token = Required(str, unique=True)

db.generate_mapping(create_tables=True)

# Functions to communicate with the database

@db_session
def create_user(username: str, password: str) -> str:
    hashed_password = hashing.hash_password(password)
    token = hashing.generate_token()

    try:
        User(username=username, hashed_password=hashed_password, token=token)
        commit()

        return {'error': False, 'token': token}

    except TransactionIntegrityError:
        return {'error': True, 'detail': 'User alredy exists'}

@db_session
def delete_user(token: str, password: str) -> str:
    user = User.get(token=token)

    if hashing.check_password(user, password):
        user.delete()
        return {'error': False}

    return {'error': True, 'detail': 'Incorrect password'}

@db_session
def get_user_token(username: str, password: str) -> str:
    user = User.get(username=username)

    if not user:
        return {'error': True, 'detail': 'Incorrect user or password'}


    if hashing.check_password(user, password):
        return {'error': False, 'token': user.token}

    return {'error': True, 'detail': 'Incorrect user or password'}

@db_session
def valid_token(token: str) -> bool:
    return bool(User.get(token=token))
