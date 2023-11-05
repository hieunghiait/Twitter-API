import express from 'express'
import usersRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const app = express()
const port = 3000
const router = express.Router()

app.use(express.json())
app.use('/users', usersRouter)
databaseService.connect()
// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
