import express from 'express';
import { SqlModules } from './sql_modules';
import cors from 'cors';

const app = express();
const port = 8000;

const sql = new SqlModules();

app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await sql.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuário.' });
  }
});

app.get('/api/users/search', async (req: any, res: any) => {
  const { name, startDate, endDate } = req.query;
  try {
    const users = await sql.getUsers(name, startDate, endDate);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Usuários não encontrados2.' });
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
