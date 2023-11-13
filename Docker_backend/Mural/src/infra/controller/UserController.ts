import { IClassUser } from "../../entities/Interfaces"
import { User } from "../../entities/User"
import { IsearchUser, dataBaseUser } from "../../repository/dataBaseUser"
import { ManagerUser } from "../../use-cases/ManagerUser"
import { Request, Response } from "express"


const jwt = require('jsonwebtoken')

export class UserControler{
    manageruser: ManagerUser

    constructor(manager: ManagerUser){
        this.manageruser = manager
    }

    async get(req: Request, resp: Response ){
        
        const param:IsearchUser = req.query

        
        const users = await this.manageruser.find(param)
        
        resp.json(users)
    }

    async post(req: Request, resp: Response ){
        const { email, name, password, role }:IClassUser = req.body
        
        if(email&&name&&password&&role){
            const user = new User({ email, name, password, role })
         
            await this.manageruser.create(user)
            resp.status(200).json({msg: "Usuario Criado Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros do Usuario."})
        }
        
    
    }

    async delete(req: Request, resp: Response ){
        const {id, name, email, password, role, project }: IClassUser = req.body
        if(id&&name&&email&&password&&role){
            await this.manageruser.delete(new User({ id, name, email, password, role, project }))
            resp.status(200).json({msg: "Usuario excluido Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros de exclusão do Usuario."})
        }
    }

    async put(req: Request, resp: Response ){
        const {id, name, email, password, role, project }: IClassUser = req.body

        if(id&&name&&email&&password&&role){

            await this.manageruser.save(new User({ id, name, email, password, role, project }))
            resp.status(200).json({msg: "Usuario alterado Com Sucesso."})
        }
        else{
            resp.status(500).json({msg: "Erro nos parametros de alteração do Usuario."})
        }
    }

    async login (req: Request, resp: Response ){

        const { email, password } = req.body
       
        if(email&&password){                    
            const user = await this.manageruser.find({email})
            if(user.length > 0){
                if(user[0].get().email === email && user[0].get().password === password ){
                    
                    const token = jwt.sign({id: user[0].get().id, email: email}, process.env.SECRET, {expiresIn: 60 * 60 })

                    return resp.json({ auth: true, data: {},  token: token });
                }
                else{
                    resp.status(401).json({msg: "Acesso negado, verifique seu usuario e senha."})
                }
            }
            else{
                resp.status(401).json({msg: "Acesso negado, verifique seu usuario e senha."})
            }

        }
        else{
            resp.status(401).json({msg: "Usuario e senha são obrigatorios"})
        }
        
    }

    async verifyJWT(req: Request, resp: Response, next:any ){
        const token = req.headers['x-access-token']
        jwt.verify(token, process.env.SECRET, (err:any, decoded:any) =>{
            if(err) return resp.status(401).end()
            next()
        })
    }
}

export const managerUser = new UserControler(new ManagerUser(new dataBaseUser()))