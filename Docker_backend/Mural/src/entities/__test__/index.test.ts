import { Project } from "../Project";
import { User } from "../User";
import { IClassUser, IClassProject } from "../Interfaces";

describe('testing entities', ()=>{

    test('testing instances Usuarios', ()=>{
        const props: IClassUser ={
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role: 'USER'
           
        }
        const user = new User(props)

        expect(user).toBeInstanceOf(User)

        const user1 = user.get()

        expect(user.get()).toEqual({
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role: 'USER'
           
        })

        user1.role = 'ADMIN'
        user1.id = 1
        user.update(user1)

        expect(user.get()).toEqual({
            id: 1,
            name: 'john doe',
            email: 'email@email',
            password: '1234',
            role: 'ADMIN'
           
        })
       
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
       
        expect(new Project(props)).toBeInstanceOf(Project)

        const proj = new Project(props)
        const objproj = proj.get()

        expect(proj.get()).toEqual({
            descricao: 'Projeto integrador 2',
            ano: '2023',
            idVideo:'1234',
            polo: 'sorocaba',
            titulo: 'Mural',
            members: [usuario1]
        })

        objproj.id = 1
        objproj.ano = '2024'
        objproj.members.push(usuario2)

        proj.update(objproj)

        expect(proj.get()).toEqual({
            id: 1,
            descricao: 'Projeto integrador 2',
            ano: '2024',
            idVideo:'1234',
            polo: 'sorocaba',
            titulo: 'Mural',
            members: [usuario1, usuario2]
        })
        
    })

})
