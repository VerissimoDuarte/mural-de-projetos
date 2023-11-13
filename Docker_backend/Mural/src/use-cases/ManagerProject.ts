import { Project } from "../entities/Project"
import { IsearchProject } from "../repository/dataBaseProject"
import { Idatabase } from "./Interfaces"

export class ManagerProject{
    private dataBaseProject: Idatabase

    constructor(data: Idatabase){
        this.dataBaseProject = data
    }

    public async create(proj: Project): Promise<void>{

        const resp = await this.dataBaseProject.add(proj)
        if(!resp) throw new Error("Error ao Criar o Projeto!")     
       
    }
    public async save(proj: Project): Promise<void>{
        const resp = await this.dataBaseProject.add(proj)
        if(!resp) throw new Error("Erro ao atualizar informações do Projeto!");
        
    }
    public async delete(proj: Project): Promise<void>{
        const resp = await this.dataBaseProject.delete(proj)
        if(!resp) throw new Error("Erro ao excluir o Projeto!");
            
    }
    public async find(param: IsearchProject| null): Promise<Array<any>>{

        const projs = await this.dataBaseProject.get(param)
        if(projs === null)throw new Error("Erro na busca do Projeto");
        else return projs
        
    }
}  