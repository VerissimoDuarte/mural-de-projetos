import { User } from "../entities/User"
import { Idatabase } from "./Interfaces"
import { IsearchUser } from "../repository/dataBaseUser"

export class ManagerUser{
    private dataBaseUser: Idatabase

    constructor(data: Idatabase){
        this.dataBaseUser = data
    }

    public async create(user: User): Promise<void>{

        const resp = await this.dataBaseUser.add(user)
        if(!resp) throw new Error("Error ao Criar o Usuário!")     
       
    }
    public async save(user: User): Promise<void>{
        const resp = await this.dataBaseUser.add(user)
        if(!resp) throw new Error("Erro ao atualizar informações do Usuário!");
        
    }
    public async delete(user: User): Promise<void>{
        const resp = await this.dataBaseUser.delete(user)
        if(!resp) throw new Error("Erro ao excluir o Usuário!");
            
    }
    public async find(param: IsearchUser| null): Promise<Array<any>>{

        const users = await this.dataBaseUser.get(param)
        if(users === null)throw new Error("Erro na busca do Usuário");
        else return users
        
    }
}  