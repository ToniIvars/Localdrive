from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class UserDelete(BaseModel):
    password: str

class DeleteModel(BaseModel):
    path: str = ''
    name: str

class ModifyModel(DeleteModel):
    new_name: str