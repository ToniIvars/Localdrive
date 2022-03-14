import requests

from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)

HEADERS = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

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
    post_data = {
        "username": "fake_user",
        "password": "fake_user_pass"
    }
    response = client.post('/get-my-token', json=post_data, headers=HEADERS)

    assert response.status_code == 200
    assert response.json()['token'] == API_TOKEN

def test_delete_user():
    post_data = {
        "password": "fake_user_pass"
    }

    headers = HEADERS
    headers.update({
        'API_TOKEN': API_TOKEN
    })
    response = client.post('/delete-user', json=post_data, headers=headers)

    assert response.status_code == 200
    assert response.json()['detail'] == "User deleted successfully"