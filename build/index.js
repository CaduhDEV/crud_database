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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sql_modules_1 = require("./sql_modules");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const sql = new sql_modules_1.SqlModules();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield sql.getUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuário.' });
    }
}));
app.get('/api/search/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const users = yield sql.getUsers(req.params.name);
        res.json(users);
        console.log(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Usuários não encontrados2.' });
    }
}));
app.post('/api/endpoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield sql.insertUser(data);
        res.status(200).json({ message: 'Dados inseridos com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
    }
}));
app.post('/api/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield sql.updateUser(data);
        res.status(200).json({ message: 'Dados inseridos com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
    }
}));
app.post('/api/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield sql.deleteUser(data.id);
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir os dados.' });
    }
}));
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
