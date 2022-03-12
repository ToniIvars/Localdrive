from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    password: str

class UserDelete(BaseModel):
    password: str