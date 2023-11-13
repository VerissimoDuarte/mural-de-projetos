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
exports.ManagerUser = void 0;
class ManagerUser {
    constructor(data) {
        this.dataBaseUser = data;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseUser.add(user);
            if (!resp)
                throw new Error("Error ao Criar o Usuário!");
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseUser.add(user);
            if (!resp)
                throw new Error("Erro ao atualizar informações do Usuário!");
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dataBaseUser.delete(user);
            if (!resp)
                throw new Error("Erro ao excluir o Usuário!");
        });
    }
    find(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.dataBaseUser.get(param);
            if (users === null)
                throw new Error("Erro na busca do Usuário");
            else
                return users;
        });
    }
}
exports.ManagerUser = ManagerUser;
