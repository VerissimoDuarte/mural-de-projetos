import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { Idatabase } from '../use-cases/Interfaces'
import { prisma } from './prisma/Prisma';

export interface IsearchUser{
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    role?: 'USER'|'ADMIN'
}

export class dataBaseUser implements Idatabase{
    
    async add(param: User ): Promise<boolean> {
        const user = param.get()
        if(user.id){
            try {
                const data = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data:{
                        email: user.email,
                        name: user.name,
                        password: user.password,
                        role: user.role
                    }
                })
                return true
            } 
            catch {
                return false
            }
    
        }
        else{
            try{
                await prisma.user.create({data: {  email: user.email,
                    name: user.name,
                    password: user.password,
                    role: user.role
                }})
                return true
            }
            catch{
                return false

            }
            
        }
    }

    async delete(param: User): Promise<boolean> {
        try{
            const user = param.get()
            if(user.id){
                const resp = await prisma.user.delete({where:{
                    id: user.id
                }})
            }
            return true
        }
        catch{

            return false
        }
       
        
        
    }

    async get(param: IsearchUser | null): Promise<User[]|null> {
        try{
            
            if(param === null){
                const resp = await prisma.user.findMany({include:{ project: true}})
                const users: User[] = []

                resp.forEach((value)=>{ users.push(new User({...value, 
                    project: value.project.map(v => new Project(v))}))})
                return users
            }
            else {
                const resp = await prisma.user.findMany({where:{ ...param }, include:{ project: true}})
                const users: User[] = []

                resp.forEach((value)=>{ users.push(new User({...value, 
                    project: value.project.map(v => new Project(v))}))})
                return users
            }
        }
        catch{
            return null
        }
        
    }
}