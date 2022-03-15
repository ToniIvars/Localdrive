from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserDelete(BaseModel):
    password: str