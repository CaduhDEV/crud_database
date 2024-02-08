# CRUD Database

Este é o backend para o repositório First CRUD, desenvolvido por CaduhDEV.

## Descrição

Este projeto consiste em um CRUD (Create, Read, Update, Delete) básico para manipulação de dados em um banco de dados. Ele fornece uma API para realizar operações de criação, leitura, atualização e exclusão de registros.

## Tecnologias Utilizadas

- Node.js
- Express.js
- SQL (ou substitua pelo banco de dados de sua escolha)

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/CaduhDEV/crud_database.git
   ```

2. Instale as dependências:
   ```
   cd crud_database
   npm install
   ```

3. Configure as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e ajuste as variáveis de acordo com o seu ambiente.

4. Inicie o servidor:
   ```
   npm start
   ```

## Endpoints

- **GET /api/search**: Retorna todos os registros armazenados no banco de dados.
- **GET /api/search/:filters**: Retorna um registro específico com base nos filtros fornecidos.
- **POST /api/endpoint**: Insere um novo registro com os dados fornecidos no corpo da requisição.
- **POST /api/update**: Atualiza um registro existente com base nos dados fornecidos no corpo da requisição.
- **POST /api/delete**: Deleta um registro com base no ID fornecido no corpo da requisição.

## Frontend

O frontend correspondente a este projeto pode ser encontrado [aqui](https://github.com/CaduhDEV/first_crud).

## Como usar

Para usar este backend, você pode fazer solicitações HTTP para os endpoints fornecidos usando um cliente HTTP ou integrando-o diretamente com seu frontend.

Exemplo de solicitação GET para obter todos os usuários:

```http
GET /api/search HTTP/1.1
Host: localhost:8000
```

Exemplo de solicitação POST para inserir um novo usuário:

```http
POST /api/endpoint HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "name": "Nome do usuário",
  "email": "email@example.com",
  "phone": 43984244218
}
```

Lembre-se de ajustar o host e a porta de acordo com o ambiente onde o servidor está sendo executado.