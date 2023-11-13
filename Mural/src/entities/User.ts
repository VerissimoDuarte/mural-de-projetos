import { IClassUser } from "./Interfaces"



export class User{

    private props: IClassUser

    constructor(props:IClassUser){
        
        this.props = props
           
    }

    get():IClassUser{
        return this.props
    }

    update(user: IClassUser){
        this.props = user
    }

    get id (): string | undefined{
        return this.props.id
    }
}