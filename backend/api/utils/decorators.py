from functools import wraps
from fastapi import HTTPException

from api.utils import db

def check_token(func):
    """Checks if an API token is valid"""

    @wraps(func)
    async def wrapper(*args, **kwargs):
        token = kwargs['token']
        if not db.valid_token(token):
            raise HTTPException(status_code=401, detail='Invalid token')

        return await func(*args, **kwargs)

    return wrapper