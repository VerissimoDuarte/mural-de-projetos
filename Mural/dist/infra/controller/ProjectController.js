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
exports.ProjectControler = void 0;
const User_1 = require("../../entities/User");
const Project_1 = require("../../entities/Project");
const ManagerUser_1 = require("../../use-cases/ManagerUser");
const dataBaseUser_1 = require("../../repository/dataBaseUser");
class ProjectControler {
    constructor(manager) {
        this.managerproject = manager;
    }
    get(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = req.query;
            const proj = yield this.managerproject.find(param);
            resp.json(proj);
        });
    }
    post(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, ano, descricao, idVideo, polo } = req.body;
            const { idusers } = req.body;
            const members = yield Promise.all(idusers.map((email) => __awaiter(this, void 0, void 0, function* () {
                const manageuser = new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser);
                const users = yield manageuser.find({ email });
                return new User_1.User(users[0]);
            })));
            if (titulo && ano && descricao && idVideo && polo && members) {
                const proj = new Project_1.Project({ titulo, ano, descricao, idVideo, polo, members });
                yield this.managerproject.create(proj);
                resp.status(200).json({ msg: "Projeto Criado Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros do Projeto." });
            }
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, titulo, ano, descricao, idVideo, polo } = req.body;
            const { idusers } = req.body;
            const members = yield Promise.all(idusers.map((id) => __awaiter(this, void 0, void 0, function* () {
                const manageuser = new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser);
                const users = yield manageuser.find({ id });
                return new User_1.User(users[0]);
            })));
            if (id && titulo && ano && descricao && idVideo && polo && members) {
                yield this.managerproject.delete(new Project_1.Project({ id, titulo, ano, descricao, idVideo, polo, members }));
                resp.status(200).json({ msg: "Projeto excluido Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros de exclusão do Projeto." });
            }
        });
    }
    put(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, titulo, ano, descricao, idVideo, polo } = req.body;
            const { idusers } = req.body;
            const members = yield Promise.all(idusers.map((email) => __awaiter(this, void 0, void 0, function* () {
                const manageuser = new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser);
                const users = yield manageuser.find({ email });
                return new User_1.User(users[0]);
            })));
            if (id && titulo && ano && descricao && idVideo && polo && members) {
                yield this.managerproject.save(new Project_1.Project({ id, titulo, ano, descricao, idVideo, polo, members }));
                resp.status(200).json({ msg: "Projeto alterado Com Sucesso." });
            }
            else {
                resp.status(500).json({ msg: "Erro nos parametros de alteração do Projeto." });
            }
        });
    }
    getNoLogin(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const proj = yield this.managerproject.find(null);
            proj.forEach(v => {
                const up = v.get();
                up.members = undefined;
                v.update(up);
            });
            resp.json(proj);
        });
    }
}
exports.ProjectControler = ProjectControler;
