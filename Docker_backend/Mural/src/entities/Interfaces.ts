import { Project } from "./Project"
import { User } from "./User"

export interface IClassProject {
    id?: string,
    titulo: string,
    idVideo: string,
    descricao: string,
    polo: string,
    ano: string,
    createdAt?: Date,
    updatedAt?: Date,
    members?: Array<User>
}


export interface IClassUser {
    id?: string,
    name: string,
    email: string,
    password: string,
    role: 'USER'|'ADMIN',
    createdAt?: Date,
    updatedAt?: Date
    project?: Array<Project>
    
}
