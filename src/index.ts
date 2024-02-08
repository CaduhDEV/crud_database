import express from 'express';
import { SqlModules } from './sql_modules';
import cors from 'cors';
import moment from 'moment';

const app = express();
const port = 8000;

const sql = new SqlModules();

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
  try {
    const users = await sql.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuário.' });
  }
});

app.get('/api/search/:filters', async (req: any, res: any) => {
  try {
    const data = req.params.filters.split('+');

    const users = await sql.getUsers(data[0], data[1], data[2]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Usuários não encontrados.' });
  }
});

app.post('/api/endpoint', async (req, res) => {
  try {
    const data = req.body;

    await sql.insertUser(data);

    res.status(200).json({ message: 'Dados inseridos com sucesso.' });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
  }
});


app.post('/api/update', async (req, res) => {
  try {
    const data = req.body;
    await sql.updateUser(data);

    res.status(200).json({ message: 'Dados inseridos com sucesso.' });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
  }
});

app.post('/api/delete', async (req, res) => {
  try {
    const data = req.body;
    await sql.deleteUser(data.id);

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
