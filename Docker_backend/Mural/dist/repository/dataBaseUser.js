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
exports.dataBaseUser = void 0;
const Project_1 = require("../entities/Project");
const User_1 = require("../entities/User");
const Prisma_1 = require("./prisma/Prisma");
class dataBaseUser {
    add(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = param.get();
            if (user.id) {
                try {
                    const data = yield Prisma_1.prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            email: user.email,
                            name: user.name,
                            password: user.password,
                            role: user.role
                        }
                    });
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
            else {
                try {
                    yield Prisma_1.prisma.user.create({ data: { email: user.email,
                            name: user.name,
                            password: user.password,
                            role: user.role
                        } });
                    return true;
                }
                catch (_b) {
                    return false;
                }
            }
        });
    }
    delete(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = param.get();
                if (user.id) {
                    const resp = yield Prisma_1.prisma.user.delete({ where: {
                            id: user.id
                        } });
                }
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    get(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (param === null) {
                    const resp = yield Prisma_1.prisma.user.findMany({ include: { project: true } });
                    const users = [];
                    resp.forEach((value) => {
                        users.push(new User_1.User(Object.assign(Object.assign({}, value), { project: value.project.map(v => new Project_1.Project(v)) })));
                    });
                    return users;
                }
                else {
                    const resp = yield Prisma_1.prisma.user.findMany({ where: Object.assign({}, param), include: { project: true } });
                    const users = [];
                    resp.forEach((value) => {
                        users.push(new User_1.User(Object.assign(Object.assign({}, value), { project: value.project.map(v => new Project_1.Project(v)) })));
                    });
                    return users;
                }
            }
            catch (_a) {
                return null;
            }
        });
    }
}
exports.dataBaseUser = dataBaseUser;
