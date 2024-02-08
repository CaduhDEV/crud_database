import { createPool, Pool, Connection } from 'mysql2/promise';

interface MySqlConnection extends Connection {
  release(): void;
}

export class SqlModules {
  private pool: Pool;
  private conn: MySqlConnection | null;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: undefined,
      database: 'public_crud',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    this.conn = null;
  }

  private async getConnection(): Promise<MySqlConnection> {
    if (!this.conn) {
      this.conn = await this.pool.getConnection() as MySqlConnection;
    }
    return this.conn;
  }

  async execute(query: string, params?: any[]): Promise<any> {
    const conn = await this.getConnection();
    try {
      const result = await conn.execute(query, params);
      return result;
    } finally {
      conn.release();
    }
  }

  async insertUser(data: any): Promise<void> {
    
    let query = `INSERT INTO crud (name, mail, phone) VALUES (?, ?, ?);`;
    let params = [ data.name, data.mail, data.phone ];
  
    try {
      let [rows, fields] = await this.execute(query, params);
      console.log('API -> Usuário criado.');
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers(name?: string, startDate?: string, endDate?: string): Promise<any> {
    let query = 'SELECT * FROM crud WHERE deleted_at IS NULL';
  
    const queryParams = [];

    if (name) {
      query += " AND name LIKE ?";
      queryParams.push(`${name}%`);
    }

    if (startDate) {
      if (endDate) {
        query += ' AND DATE(created_at) BETWEEN ? AND ?';
        console.log(startDate, endDate);
        queryParams.push(startDate, endDate);
      } else {
        query += ' AND DATE(created_at) = ?';
        console.log(startDate)
        queryParams.push(startDate);
      }
    }
  
    try {
      console.log(query)
      const [rows, fields] = await this.execute(query, queryParams);
  
      if (rows.length === 0) {
        return null;
      }
      console.log(rows)
      return rows;
      
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      throw error;
    }
  }

  async updateUser(data: any): Promise<void> {
    const query = `UPDATE crud SET name = ?, mail = ?, phone = ? WHERE id = ? AND deleted_at IS NULL;`;
    const params = [data.name, data.mail, data.phone, data.id];
    
    try {
      await this.execute(query, params);
      console.log('Usuário atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }
  
  async deleteUser(id: number): Promise<void> {
    const query = `UPDATE crud SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL;`;
    const params = [id];
    
    try {
      await this.execute(query, params);
      console.log('Usuário marcado como deletado.');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }
}