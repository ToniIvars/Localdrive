# Local Drive
This repository is a home cloud, that means you can have your own _Google Drive_ at home!

Clone the repo using `https://github.com/ToniIvars/Localdrive` and start having a Local Drive!

## Server
The server is an **API** made in Python (v3.10) using the **[FastAPI](https://fastapi.tiangolo.com/)** framework.

### Setup

>It is highly recommended that you use a **virtual environment** to run this API. You can create one using `python3 -m venv env`.

First of all, you must install the **requirements**. You can do that using `pip install -r requirements.txt`.

After that, you must export an environment variable called **STORE_PATH** and set it to wherever you want to store all the uploaded files. You can do it in a couple of different ways:

- **RECOMMENDED:** Create a file called _.env_ in the server directory and write `STORE_PATH="<store path>"` inside of it. By using this way, you ensure the API always get the variable.

- Exporting a variable from the command line (`set STORE_PATH="<store path>"` in _Windows CMD_ or `export STORE_PATH="<store path>"` in _Linux or Mac_).

### Running the server
To start using the API, you must be in the **server directory**.
From here, you can run `uvicorn api.main:app --reload` and you will have the server running.

**IMPORTANT: Do not use the _--reload flag_ in production.**

### Testing
To run the tests, go to the server directory and run the command `pytest api/testing/tests.py`.