# teste_Mayo
Criação de um "To-Do List" como teste técnico para a empresa Mayo

# Projeto de Backend e Frontend com Docker (To_Do list)

## Objetivo do Projeto

&emsp; O objetivo deste projeto é criar um sistema completo de backend e frontend dockerizado, com a utilização do FastAPI no backend e Nginx no frontend. O projeto foi desenvolvido para demonstrar como conectar as duas partes da aplicação de forma eficiente, utilizando Docker para gerenciar containers e facilitar o deploy. A aplicação serve uma interface frontend estática e uma API no backend, que pode ser acessada por diferentes serviços.

## Tecnologias Usadas

&emsp; Este projeto utilizou as seguintes tecnologias:

- **FastAPI:** Framework para o desenvolvimento do backend (API).

- **Nginx:** Servidor web para o frontend.

- **Docker:** Gerenciamento de containers, para facilitar a execução e o deploy.

- **Python 3.10:** Linguagem de programação utilizada no backend.

- **Supabase:** Banco de dados e autenticação como serviço, sendo uma solução backend-as-a-service.

- **Uvicorn:** Servidor ASGI utilizado para rodar a aplicação FastAPI.
Jinja2: Motor de templates utilizado no FastAPI para renderizar as páginas HTML do frontend.

## Entendendo o Supabase

&emsp; O Supabase é uma plataforma de backend as a service (BaaS) que fornece funcionalidades como banco de dados (PostgreSQL), autenticação e API de dados. Ele oferece uma maneira simples e escalável de gerenciar dados e autenticação sem a necessidade de configurar um backend do zero. Neste projeto, ele foi integrado ao FastAPI para manipulação de dados e autenticação.

### Recursos do Supabase no projeto:

- **Autenticação:** Gerenciamento de usuários e permissões.
- **Banco de Dados:** Utilizado para armazenar e acessar os dados persistidos.
- **API RESTful:** Conectada ao backend para operações CRUD.

## Dockerizando o projeto

&emsp; Para garantir que o projeto seja facilmente executável em qualquer ambiente, utilizamos o Docker. Isso permite isolar as dependências e o ambiente de execução, garantindo que a aplicação funcione da mesma forma em diferentes máquinas.

Estrutura de containers:

- **Backend (FastAPI):** Um container que roda a API utilizando o Uvicorn como servidor.
- **Frontend (Nginx):** Um container para servir arquivos estáticos do frontend usando Nginx.
- **Supabase (opcional):** O Supabase pode ser usado externamente como banco de dados, não sendo necessário rodar localmente.

# Como rodar o projeto

## Passos para rodar o projeto localmente:

1 - Clone o repositório do projeto:
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2 - Acesse a pasta do projeto:
```bash
cd src/backend
```

3 - Instale as dependências do backend:
```bash
pip install -r backend/requirements.txt
```

4 - Suba os containers utilizando Docker Compose:
(Garanta que esteja em "src" e não em "backend" por que o docker-compose.yml está na raiz do "src")
```bash
docker-compose up --build
```

5 - A aplicação estará disponível:

**Backend: http://localhost:8000**
**Frontend: http://localhost:8080**

Caso precise parar os containers, execute:
```bash
docker-compose down
```

# Conclusão

&emsp; Este projeto demonstra como criar e integrar um backend e frontend usando containers Docker, garantindo que a aplicação seja facilmente executável em qualquer ambiente. O uso do Supabase facilita a autenticação e a manipulação de dados, enquanto o Docker permite a replicação do ambiente de desenvolvimento com simplicidade.
