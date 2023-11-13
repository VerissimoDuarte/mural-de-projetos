import { IClassProject } from "./Interfaces"



export class Project{

    private props: IClassProject

    constructor(props: IClassProject){
        this.props = props
    }

    get():IClassProject{
        return { ...this.props}
    }

    update(project: IClassProject){
        this.props = project
    }

}