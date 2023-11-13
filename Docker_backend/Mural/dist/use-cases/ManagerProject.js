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
exports.ManagerProject = void 0;
class ManagerProject {
    constructor(data) {
        this.dataBaseProject = data;
    }
    create(proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseProject.add(proj);
            if (!resp)
                throw new Error("Error ao Criar o Projeto!");
        });
    }
    save(proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseProject.add(proj);
            if (!resp)
                throw new Error("Erro ao atualizar informações do Projeto!");
        });
    }
    delete(proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseProject.delete(proj);
            if (!resp)
                throw new Error("Erro ao excluir o Projeto!");
        });
    }
    find(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const projs = yield this.dataBaseProject.get(param);
            if (projs === null)
                throw new Error("Erro na busca do Projeto");
            else
                return projs;
        });
    }
}
exports.ManagerProject = ManagerProject;
