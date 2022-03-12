from fastapi import HTTPException
from pony.orm import *

from .hashing import hash_password, generate_token

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
    hashed_password = hash_password(password)
    token = generate_token()

    try:
        User(name=name, hashed_password=hashed_password, token=token)
        commit()

        return token

    except TransactionIntegrityError:
        raise HTTPException(status_code=400, detail=f'The user {name} alredy exists')
