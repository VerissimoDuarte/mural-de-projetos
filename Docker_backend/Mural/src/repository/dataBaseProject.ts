import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { Idatabase } from '../use-cases/Interfaces'
import { prisma } from './prisma/Prisma';

export interface IsearchProject{
    id?: string,
    titulo?: string,
    idVideo?: string,
    descricao?: string,
    polo?: string,
    ano?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class dataBaseProject implements Idatabase{
    async add(param: Project ): Promise<boolean> {
        const proj = param.get()
        if(proj.id){
            try {
                const data = await prisma.project.update({
                    where: {
                        id: proj.id
                    },
                    include:{
                        members: true
                    },
                    data:{
                        ano: proj.ano,
                        idVideo: proj.idVideo,
                        polo: proj.polo,
                        titulo: proj.titulo,
                        descricao: proj.descricao,
                        members: {
                            connect: proj.members?.map(value => ({id: value.id}))
                        }
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
                if(proj.members){
    
                    await prisma.project.create({
                        include:{members: true}, 
                        data:{...proj, members: 
                            {
                                connect: proj.members.map(v => ({id: v.id}))
                            }
                        }
                })

                return true

        
                }
                return false
            }
            catch (error){
                console.log(error)
                return false

            }
            
        }
    }

    async delete(param: Project): Promise<boolean> {
        try{
            const proj = param.get()
            if(proj.id){
                const resp = await prisma.project.delete({where:{
                    id: proj.id
                }})
            }
            return true
        }
        catch{

            return false
        }
       
        
        
    }

    async get(param: IsearchProject | null): Promise<Project[] | null> {
        try{
            if(param === null){
                const resp = await prisma.project.findMany({include:{ members: true}})
                const projs: Project[] = []

                resp.forEach((value)=>{ projs.push(new Project({ ...value, 
                                            members: value.members.map((value=>new User(value)))}))})
                return projs
            }
            else{
                const resp = await prisma.project.findMany({
                    where:{ 
                        ...param
                    },
                    include:{
                        members: true
                    }
                
                })
                const projs: Project[] = []

                resp.forEach((value)=>{ projs.push(new Project({ ...value, 
                    members: value.members.map((value=>new User(value)))}))})
                return projs
            }
        }
        catch{
            return null
        }
        
    }
}