# Local Drive
This repository is a home cloud, that means you can have your own _Google Drive_ at home!

The client is a UI made with **React JS** and the server is an API made in Python using the **[FastAPI](https://fastapi.tiangolo.com/)** framework.

Clone the repo using `https://github.com/ToniIvars/Localdrive` and start having a Local Drive!

### Setup

>It is highly recommended that you use a **virtual environment** to run the API. You can create one using `python3 -m venv env`.

First of all, you must install the **requirements**. You can do that using `pip install -r requirements.txt` inside the server directory.

After that, you must create a file called _.env_ in the server directory and write `STORE_PATH="<store path>"` inside of it.

You must export an environment variable called **ALLOWED_ORIGINS** as well. You must set its value to a string with the http origins you wanto to allow to access the API (separated by **;**). For example, you can export it as:
`ALLOWED_ORIGINS="http://localhost;http://localhost:5000;http://<YOUR LOCAL IP ADDRESS>"` or, if you want to allow requests of any origin, `ALLOWED_ORIGINS="*"`.

Then, talking about the UI, in the **frontend** directory you must create a _.env_ file and export a variable called `REACT_APP_API_URL`, setting it to the URL of the API.

### Running the app
To start using the API, you must be in the **server directory**.
From here, you can run `uvicorn api.main:app`.

To start using the client, you must be in the **frontend directory**. From here, you can run `npm start`.