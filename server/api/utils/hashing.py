import secrets

from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password: str) -> str:
    hashed = generate_password_hash(password)

    return hashed

def check_password(user, password: str) -> bool:
    return check_password_hash(user.hashed_password, password)

def generate_token() -> str:
    token = secrets.token_hex(24)

    return token