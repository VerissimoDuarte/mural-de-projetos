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
exports.managerUser = exports.UserControler = void 0;
const User_1 = require("../../entities/User");
const dataBaseUser_1 = require("../../repository/dataBaseUser");
const ManagerUser_1 = require("../../use-cases/ManagerUser");
const jwt = require('jsonwebtoken');
class UserControler {
    constructor(manager) {
        this.manageruser = manager;
    }
    get(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = req.query;
            const users = yield this.manageruser.find(param);
            resp.json(users);
        });
    }
    post(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password, role } = req.body;
            if (email && name && password && role) {
                const user = new User_1.User({ email, name, password, role });
                yield this.manageruser.create(user);
                resp.status(200).json({ msg: "Usuario Criado Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros do Usuario." });
            }
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password, role, project } = req.body;
            if (id && name && email && password && role) {
                yield this.manageruser.delete(new User_1.User({ id, name, email, password, role, project }));
                resp.status(200).json({ msg: "Usuario excluido Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros de exclusão do Usuario." });
            }
        });
    }
    put(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password, role, project } = req.body;
            if (id && name && email && password && role) {
                yield this.manageruser.save(new User_1.User({ id, name, email, password, role, project }));
                resp.status(200).json({ msg: "Usuario alterado Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros de alteração do Usuario." });
            }
        });
    }
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (email && password) {
                const user = yield this.manageruser.find({ email });
                if (user.length > 0) {
                    if (user[0].get().email === email && user[0].get().password === password) {
                        const token = jwt.sign({ id: user[0].get().id, email: email }, process.env.SECRET, { expiresIn: 60 * 2 });
                        return resp.json({ auth: true, data: {}, token: token });
                    }
                    else {
                        resp.status(401).json({ msg: "Acesso negado, verifique seu usuario e senha." });
                    }
                }
                else {
                    resp.status(401).json({ msg: "Acesso negado, verifique seu usuario e senha." });
                }
            }
            else {
                resp.status(401).json({ msg: "Usuario e senha são obrigatorios" });
            }
        });
    }
    verifyJWT(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'];
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    return resp.status(401).end();
                next();
            });
        });
    }
}
exports.UserControler = UserControler;
exports.managerUser = new UserControler(new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser()));
