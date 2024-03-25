import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'

const app = express()
const port = 3000

//Tạo folder upload
initFolder()
//connect to database local
databaseService.connect()
app.use(express.json())

//Khai báo route cho users
app.use('/users', usersRouter)

//Khai báo route cho medias
app.use('/medias', mediasRouter)
// Error handler
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
