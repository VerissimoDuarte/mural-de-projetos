import { UserControler } from "./infra/controller/UserController"
import { ProjectControler } from "./infra/controller/ProjectController"
import { ManagerUser } from "./use-cases/ManagerUser"
import { ManagerProject } from "./use-cases/ManagerProject"
import { dataBaseUser } from "./repository/dataBaseUser"
import { dataBaseProject } from "./repository/dataBaseProject"
import { Response, Request } from "express"
import  express from "express"

require('dotenv/config')

var cors = require('cors')

const app = express()
require('express-async-errors')

app.use(express.json())
app.use(cors())

//======================= rotas publicas ========================

app.get('/', async (req: Request, resp: Response) =>{

    await new ProjectControler(new ManagerProject(new dataBaseProject())).getNoLogin(req, resp)

})

app.post('/login', async (req: Request, resp: Response)=>{

    await new UserControler(new ManagerUser(new dataBaseUser())).login(req, resp)
    
})

app.post('/users', async (req: Request, resp: Response) =>{

    await new UserControler(new ManagerUser(new dataBaseUser())).post(req, resp)
    
})

//===================== Bloqueio das rotas =================

app.use( '*', new UserControler(new ManagerUser(new dataBaseUser())).verifyJWT)

//======================= Users =============================


app.get('/users',async (req: Request, resp: Response) =>{

    await new UserControler(new ManagerUser(new dataBaseUser())).get(req, resp)

})



app.put('/users',async (req: Request, resp: Response) =>{

    await new UserControler(new ManagerUser(new dataBaseUser())).put(req, resp)
    
})

app.delete('/users',async (req: Request, resp: Response) =>{

    await new UserControler(new ManagerUser(new dataBaseUser())).delete(req, resp)
    
})


// ======================== Projetos ===============================

app.get('/projects',async (req: Request, resp: Response) =>{

    await new ProjectControler(new ManagerProject(new dataBaseProject())).get(req, resp)

})

app.post('/projects',async (req: Request, resp: Response) =>{

    await new ProjectControler(new ManagerProject(new dataBaseProject())).post(req, resp)
    
})

app.put('/projects',async (req: Request, resp: Response) =>{

    await new ProjectControler(new ManagerProject(new dataBaseProject())).put(req, resp)
    
})

app.delete('/projects',async (req: Request, resp: Response) =>{

    await new ProjectControler(new ManagerProject(new dataBaseProject())).delete(req, resp)
    
})
//=============================== Tratamento de Error ==================================

app.use(async (erro: Error, req: Request, res: Response, next: Function) => {
    return res.status(500).send(erro.message)
})

// =====================================================================================

app.listen(3000, ()=>{
    console.log('Rodando na porta 3000 ...')
})