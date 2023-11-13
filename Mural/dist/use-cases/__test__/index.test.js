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
const Project_1 = require("../../entities/Project");
const User_1 = require("../../entities/User");
const dataBaseUser_1 = require("../../repository/dataBaseUser");
const ManagerUser_1 = require("../ManagerUser");
describe('testing use cases', () => {
    test('testing ManegerUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const props = {
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role: 'USER'
        };
        const user = new User_1.User(props);
        const mUser = new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser());
        expect(mUser).toBeInstanceOf(ManagerUser_1.ManagerUser);
        yield mUser.create(user);
        const resp = yield mUser.find(null);
        const instUser = Object.assign({}, resp[0]);
        expect(instUser.name).toEqual('john doe');
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield new ManagerUser_1.ManagerUser(new dataBaseUser_1.dataBaseUser()).create(user);
        })).rejects.toThrow('Error ao Criar o Usuário!');
    })),
        test('testing instances Projeto', () => {
            const propsUsuario1 = {
                name: 'john doe',
                email: 'email@email',
                password: '1234',
                role: 'USER'
            };
            const propsUsuario2 = {
                name: 'john doe',
                email: 'email2@email',
                password: '1234',
                role: 'USER'
            };
            const usuario1 = new User_1.User(propsUsuario1);
            const usuario2 = new User_1.User(propsUsuario2);
            const props = {
                descricao: 'Projeto integrador 2',
                ano: '2023',
                idVideo: '1234',
                polo: 'sorocaba',
                titulo: 'Mural',
                members: [usuario1]
            };
            const proj = new Project_1.Project(props);
        });
});
