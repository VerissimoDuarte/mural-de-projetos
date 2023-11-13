import { User } from "../entities/User";
import { Project } from "../entities/Project";

export interface Idatabase {
    get(param: any|null): Promise<User[]|Project[]|null>
    add(param: User|Project): Promise<boolean>
    delete(param: User | Project): Promise<boolean>
}