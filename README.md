# Local Drive

This repository is a home cloud, that means you can have your own _Google Drive_ at home!

The frontend is a UI made with **React JS** and the backend is an API made in Python using the **[FastAPI](https://fastapi.tiangolo.com/)** framework.

Clone the repo using `https://github.com/ToniIvars/Localdrive` and start having a Local Drive!

## Docker setup

The easiest way to setup this project is with Docker. Just run the following commands:

```bash
git clone https://github.com/ToniIvars/localdrive
cd localdrive
docker compose up -d
```
> You can change the ports in the _docker-compose.yml_ file

## Manual Setup

> It is highly recommended that you use a **virtual environment** to run the API. You can create one using `python3 -m venv env`.

First of all, you must install the **requirements**. You can do that using `pip install -r requirements.txt` inside the server directory.

After that, you must create a file called _.env_ in the `backend/api` directory and write `STORE_PATH="<store path>"` inside of it.

You must export an environment variable called **ALLOWED_ORIGINS** as well. You must set its value to a string with the http origins you want to allow to access the API (separated by **;**). For example, you can export it as:
`ALLOWED_ORIGINS="http://localhost;http://localhost:5000;http://<YOUR LOCAL IP ADDRESS>"` or, if you want to allow requests of any origin, `ALLOWED_ORIGINS="*"`.

Then, talking about the UI, in the `frontend` directory you must create a _.env_ file and export a variable called `REACT_APP_API_URL`, setting it to the URL of the API.

### Running the app

To start the backend, you must be in the **backend directory**.
From here, you can run `uvicorn api.main:app`.

To start the frontend, you must be in the **frontend directory**. From here, you can run `npm start`.

### Testing the backend

In order tu run some basic test for the backend, navigate to its directory and run `python -m pytest api/testing/tests.py`. 

> Remember to activate your virtual environment if you are using one.