from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserDelete(BaseModel):
    password: str

class FileDelete(BaseModel):
    path: str = ''
    file_name: str

class DirDelete(BaseModel):
    path: str