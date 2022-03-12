from fastapi import HTTPException
from pony.orm import *

from . import hashing

db = Database()

db.bind(provider='sqlite', filename='database.db', create_db=True)

# Models

class User(db.Entity):
    _table_ = 'users'

    name = Required(str, unique=True, max_len=30)
    hashed_password = Required(str)
    token = Required(str, unique=True)

db.generate_mapping(create_tables=True)

# Functions to communicate with the database

@db_session
def create_user(name: str, password: str) -> str:
    hashed_password = hashing.hash_password(password)
    token = hashing.generate_token()

    try:
        User(name=name, hashed_password=hashed_password, token=token)
        commit()

        return token

    except TransactionIntegrityError:
        raise HTTPException(status_code=400, detail=f'The user {name} alredy exists')

@db_session
def delete_user(token: str, password: str) -> str:
    user = User.get(token=token)

    if hashing.check_password(user, password):
        user.delete()

    else:
        raise HTTPException(status_code=401, detail=f'The password is incorrect')

@db_session
def valid_token(token: str) -> bool:
    return bool(User.get(token=token))
