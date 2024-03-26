import express, {Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import mainRouter from './routes'

dotenv.config()

const server = express()
server.use(express.static(path.join(__dirname,'../public')))
server.use(cors())
server.use(express.json())
server.use('/api',mainRouter)
server.use('/', (req: Request, res:Response) =>{
 res.status(404).send("Rota não encontrada.")
})


server.listen(process.env.PORT,()=>{
        console.log(`Server rodando na porta ${process.env.PORT}`)
})
