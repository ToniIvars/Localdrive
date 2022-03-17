from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserDelete(BaseModel):
    password: str

class FileModel(BaseModel):
    path: str = ''
    file_name: str

class DirModel(BaseModel):
    path: str

class FileModify(FileModel):
    new_name: str

class DirModify(DirModel):
    new_name: str