from fastapi import FastAPI


app = FastAPI()


@app.get('/api/hello')
async def hello():
    return {"hello": "world"}
