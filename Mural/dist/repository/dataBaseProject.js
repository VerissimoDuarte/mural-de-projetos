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
exports.dataBaseProject = void 0;
const Project_1 = require("../entities/Project");
const User_1 = require("../entities/User");
const Prisma_1 = require("./prisma/Prisma");
class dataBaseProject {
    add(param) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const proj = param.get();
            if (proj.id) {
                try {
                    const data = yield Prisma_1.prisma.project.update({
                        where: {
                            id: proj.id
                        },
                        include: {
                            members: true
                        },
                        data: {
                            ano: proj.ano,
                            idVideo: proj.idVideo,
                            polo: proj.polo,
                            titulo: proj.titulo,
                            descricao: proj.descricao,
                            members: {
                                connect: (_a = proj.members) === null || _a === void 0 ? void 0 : _a.map(value => ({ id: value.id }))
                            }
                        }
                    });
                    return true;
                }
                catch (_b) {
                    return false;
                }
            }
            else {
                try {
                    if (proj.members) {
                        yield Prisma_1.prisma.project.create({
                            include: { members: true },
                            data: Object.assign(Object.assign({}, proj), { members: {
                                    connect: proj.members.map(v => ({ id: v.id }))
                                } })
                        });
                        return true;
                    }
                    return false;
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            }
        });
    }
    delete(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const proj = param.get();
                if (proj.id) {
                    const resp = yield Prisma_1.prisma.project.delete({ where: {
                            id: proj.id
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
                    const resp = yield Prisma_1.prisma.project.findMany({ include: { members: true } });
                    const projs = [];
                    resp.forEach((value) => {
                        projs.push(new Project_1.Project(Object.assign(Object.assign({}, value), { members: value.members.map((value => new User_1.User(value))) })));
                    });
                    return projs;
                }
                else {
                    const resp = yield Prisma_1.prisma.project.findMany({
                        where: Object.assign({}, param),
                        include: {
                            members: true
                        }
                    });
                    const projs = [];
                    resp.forEach((value) => {
                        projs.push(new Project_1.Project(Object.assign(Object.assign({}, value), { members: value.members.map((value => new User_1.User(value))) })));
                    });
                    return projs;
                }
            }
            catch (_a) {
                return null;
            }
        });
    }
}
exports.dataBaseProject = dataBaseProject;
