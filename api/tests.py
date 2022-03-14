import requests

from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)

HEADERS = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

FILE_HEADERS = {'accept': 'application/json'}

API_TOKEN = ''

def test_create_user():
    global API_TOKEN

    post_data = {
        "username": "fake_user",
        "password": "fake_user_pass"
    }
    response = client.post('/create-user', json=post_data, headers=HEADERS)

    assert response.status_code == 200
    assert response.json()['detail'] == "User fake_user created successfully"

    API_TOKEN = response.json()['token']

def test_get_user_token():
    global HEADERS, FILE_HEADERS

    post_data = {
        "username": "fake_user",
        "password": "fake_user_pass"
    }
    response = client.post('/get-my-token', json=post_data, headers=HEADERS)

    assert response.status_code == 200
    assert response.json()['token'] == API_TOKEN

    HEADERS.update({'API_TOKEN': API_TOKEN})
    FILE_HEADERS.update({'API_TOKEN': API_TOKEN})

def test_upload_file():
    file_to_upload = {'post_file': open('api/upload_test_file.txt' ,'rb')}

    response = client.post('/upload-file?path=test', files=file_to_upload, headers=FILE_HEADERS)

    assert response.status_code == 200
    assert response.json()['detail'] == "File uploaded successfully"

def test_delete_user():
    post_data = {
        "password": "fake_user_pass"
    }

    response = client.post('/delete-user', json=post_data, headers=HEADERS)

    assert response.status_code == 200
    assert response.json()['detail'] == "User deleted successfully"