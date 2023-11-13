import { User } from "../../entities/User"
import { IClassProject } from "../../entities/Interfaces"
import { Project } from "../../entities/Project"
import { IsearchProject, dataBaseProject } from "../../repository/dataBaseProject"
import { ManagerProject } from "../../use-cases/ManagerProject"
import { Request, Response } from "express"
import { ManagerUser } from "../../use-cases/ManagerUser"
import { dataBaseUser } from "../../repository/dataBaseUser"

export class ProjectControler{
    managerproject: ManagerProject

    constructor(manager: ManagerProject){
        this.managerproject = manager
    }

    async get(req: Request, resp: Response ){
        
        const param:IsearchProject = req.query

        
        const proj = await this.managerproject.find(param)
        
        resp.json(proj)
    }

    async post(req: Request, resp: Response ){
        const { titulo, ano, descricao, idVideo, polo }:IClassProject = req.body
        const { idusers }: {idusers: Array<string>} = req.body


        
        const members: User[] = await  Promise.all(idusers.map(async (email: string) =>{
            const manageuser = new ManagerUser(new dataBaseUser)
            const users = await manageuser.find({email})
            
            return new User(users[0])
           
            
        }))

        
        if(titulo&&ano&&descricao&&idVideo&&polo&&members){
            
            const proj = new Project({ titulo, ano, descricao, idVideo, polo, members })

            await this.managerproject.create(proj)
            resp.status(200).json({msg: "Projeto Criado Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros do Projeto."})
        }
        
    
    }

    async delete(req: Request, resp: Response ){
        const { id, titulo, ano, descricao, idVideo, polo }:IClassProject = req.body


        const { idusers }: {idusers: Array<string>} = req.body


        
        const members: User[] = await  Promise.all(idusers.map(async (id: string) =>{
            const manageuser = new ManagerUser(new dataBaseUser)
            const users = await manageuser.find({id})
            
            return new User(users[0])
           
            
        }))

        if(id&&titulo&&ano&&descricao&&idVideo&&polo&&members){
            await this.managerproject.delete(new Project({ id, titulo, ano, descricao, idVideo, polo, members  }))
            resp.status(200).json({msg: "Projeto excluido Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros de exclusão do Projeto."})
        }
    }

    async put(req: Request, resp: Response ){
        const { id, titulo, ano, descricao, idVideo, polo }:IClassProject = req.body

        const { idusers }: {idusers: Array<string>} = req.body


        
        const members: User[] = await  Promise.all(idusers.map(async (email: string) =>{
            const manageuser = new ManagerUser(new dataBaseUser)
            const users = await manageuser.find({email})
            
            return new User(users[0])
           
            
        }))

        if(id&&titulo&&ano&&descricao&&idVideo&&polo&&members){

            await this.managerproject.save(new Project({ id, titulo, ano, descricao, idVideo, polo, members  }))
            resp.status(200).json({msg: "Projeto alterado Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros de alteração do Projeto."})
        }
    }

    async getNoLogin(req: Request, resp: Response ){
        
        const proj: Project[] = await this.managerproject.find(null)

        proj.forEach(v=>{
            const up = v.get()
            up.members = undefined
            v.update(up)
        })
            
            resp.json(proj)
        
    
    }
}

