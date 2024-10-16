from fastapi import FastAPI, status, Request, Depends, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from supabase import create_client, Client
import random

def conectar_supabase() -> Client:
    url = "https://ofqnhcrmsxvrlivqxoqh.supabase.co"  # Substitua por sua URL doSupabase
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcW5oY3Jtc3h2cmxpdnF4b3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MjkyNDgsImV4cCI6MjA0NDEwNTI0OH0.XxXElUoIkUXeux7OqJdUh5IQ9gdLAXHL0boTQ2_yII4"  # Substitua pela sua chave de API do Supabase
    return create_client(url, key)

app = FastAPI()


# Monta os arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configura os templates
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/to_do/")
def get_to_do():
    supabase = conectar_supabase()
    resultado = supabase.table('to_do').select("*").execute()
    return resultado

@app.get("/to_do/{id}")
def get_to_do(id: int):
    supabase = conectar_supabase()
    resultado = supabase.table('to_do').select("*").eq('id', id).execute()
    return resultado

class TodoSchema(BaseModel):
    titulo: str
    descricao: str
    status: str

@app.post("/to_do/", status_code=status.HTTP_201_CREATED)
def create_to_do(to_do: TodoSchema):
    supabase = conectar_supabase()
    id = random.randint(0, 100)

    resultado = supabase.table('to_do').insert({
        "id": id,
        "titulo": to_do.titulo,
        "descricao": to_do.descricao,
        "status": to_do.status
    }).execute()
    
    return resultado

@app.delete("/to_do/{id}")
def delete_to_do(id: int):
    supabase = conectar_supabase()
    resultado = supabase.table('to_do').delete().eq('id', id).execute()
    return resultado

class UpdateStatus(BaseModel):
    status: str

@app.put("/to_do/{id}")
def update_to_do(id: int, status: UpdateStatus):
    supabase = conectar_supabase()
    resultado = supabase.table('to_do').update({"status": status.status}).eq('id', id).execute()
    return resultado
