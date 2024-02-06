"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlModules = void 0;
const promise_1 = require("mysql2/promise");
class SqlModules {
    constructor() {
        this.pool = (0, promise_1.createPool)({
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
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.conn) {
                this.conn = (yield this.pool.getConnection());
            }
            return this.conn;
        });
    }
    execute(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.getConnection();
            try {
                const result = yield conn.execute(query, params);
                return result;
            }
            finally {
                conn.release();
            }
        });
    }
    insertUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO crud (name, mail, phone) VALUES (?, ?, ?);`;
            let params = [data.name, data.mail, data.phone];
            try {
                let [rows, fields] = yield this.execute(query, params);
                console.log('API -> Usuário criado.');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getUsers(name, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT * FROM crud WHERE deleted_at IS NULL';
            const queryParams = [];
            if (name) {
                query += ' AND name = ?';
                queryParams.push(name);
            }
            if (startDate) {
                if (endDate) {
                    query += ' AND DATE(created_at) BETWEEN ? AND ?';
                    queryParams.push(startDate, endDate);
                }
                else {
                    query += ' AND DATE(created_at) = ?';
                    queryParams.push(startDate);
                }
            }
            try {
                const [rows, fields] = yield this.execute(query, queryParams);
                if (rows.length === 0) {
                    return null;
                }
                console.log(rows);
                return rows;
            }
            catch (error) {
                console.error('Erro ao obter usuários:', error);
                throw error;
            }
        });
    }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE crud SET name = ?, mail = ?, phone = ? WHERE id = ? AND deleted_at IS NULL;`;
            const params = [data.name, data.mail, data.phone, data.id];
            try {
                yield this.execute(query, params);
                console.log('Usuário atualizado com sucesso.');
            }
            catch (error) {
                console.error('Erro ao atualizar usuário:', error);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE crud SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL;`;
            const params = [id];
            try {
                yield this.execute(query, params);
                console.log('Usuário marcado como deletado.');
            }
            catch (error) {
                console.error('Erro ao deletar usuário:', error);
            }
        });
    }
}
exports.SqlModules = SqlModules;
