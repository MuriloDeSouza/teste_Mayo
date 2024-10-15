from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à aplicação de gerenciamento de tarefas!"}
