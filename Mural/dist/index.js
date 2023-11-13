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
const UserController_1 = require("./infra/controller/UserController");
const ProjectController_1 = require("./infra/controller/ProjectController");
const ManagerUser_1 = require("./use-cases/ManagerUser");
const ManagerProject_1 = require("./use-cases/ManagerProject");
const dataBaseUser_1 = require("./repository/dataBaseUser");
const dataBaseProject_1 = require("./repository/dataBaseProject");
const express_1 = __importDefault(require("express"));
require('dotenv/config');
var cors = require('cors');
const app = (0, express_1.default)();
require('express-async-errors');
app.use(express_1.default.json());
app.use(cors());
//======================= rotas publicas ========================
app.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new ProjectController_1.ProjectControler(new ManagerProject_1.ManagerProject(new dataBaseProject_1.dataBaseProject())).getNoLogin(req, resp);
}));
app.post('/login', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).login(req, resp);
}));
app.post('/users', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).post(req, resp);
}));
//===================== Bloqueio das rotas =================
app.use('*', new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).verifyJWT);
//======================= Users =============================
app.get('/users', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).get(req, resp);
}));
app.put('/users', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).put(req, resp);
}));
app.delete('/users', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new UserController_1.UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser())).delete(req, resp);
}));
// ======================== Projetos ===============================
app.get('/projects', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new ProjectController_1.ProjectControler(new ManagerProject_1.ManagerProject(new dataBaseProject_1.dataBaseProject())).get(req, resp);
}));
app.post('/projects', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new ProjectController_1.ProjectControler(new ManagerProject_1.ManagerProject(new dataBaseProject_1.dataBaseProject())).post(req, resp);
}));
app.put('/projects', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new ProjectController_1.ProjectControler(new ManagerProject_1.ManagerProject(new dataBaseProject_1.dataBaseProject())).put(req, resp);
}));
app.delete('/projects', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    yield new ProjectController_1.ProjectControler(new ManagerProject_1.ManagerProject(new dataBaseProject_1.dataBaseProject())).delete(req, resp);
}));
//=============================== Tratamento de Error ==================================
app.use((erro, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(500).send(erro.message);
}));
// =====================================================================================
app.listen(3000, () => {
    console.log('Rodando na porta 3000 ...');
});
