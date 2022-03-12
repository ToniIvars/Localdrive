from fastapi import FastAPI

app = FastAPI()


@app.get('/')
@app.get('/version')
async def version():
    return {
        'name': 'Local Drive API',
        'version': '1.0',
    }