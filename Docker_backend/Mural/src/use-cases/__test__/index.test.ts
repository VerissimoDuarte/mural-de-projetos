import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import { IClassUser, IClassProject } from "../../entities/Interfaces";
import { dataBaseUser } from "../../repository/dataBaseUser";
import { ManagerUser } from "../ManagerUser";
import { prisma } from "../../repository/prisma/Prisma";

describe('testing use cases', ()=>{

    test('testing ManegerUser',async ()=>{
        const props: IClassUser ={
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role: 'USER'
           
        }
        const user = new User(props)

        const mUser = new ManagerUser(new dataBaseUser())

        expect(mUser).toBeInstanceOf(ManagerUser)
        
        await mUser.create(user)
        const resp = await mUser.find(null)
        const instUser = { ...resp[0]}
        expect(instUser.name).toEqual('john doe')

       await expect(async  ()=> {
            await new ManagerUser(new dataBaseUser()).create(user)
        }).rejects.toThrow('Error ao Criar o Usuário!')
        
        
       
    }),

    test('testing instances Projeto', ()=>{
        const propsUsuario1: IClassUser ={
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role:'USER'
        }

        const propsUsuario2: IClassUser ={
            name: 'john doe',
            email: 'email2@email',
            password: '1234',
            role:'USER'
        }

        const usuario1 = new User(propsUsuario1)
        const usuario2 = new User(propsUsuario2)

        const props: IClassProject ={
            descricao: 'Projeto integrador 2',
            ano: '2023',
            idVideo:'1234',
            polo: 'sorocaba',
            titulo: 'Mural',
            members: [usuario1]
        }
       
       

        const proj = new Project(props)
        
    })

})
