import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import argv from 'minimist'
const options = argv(process.argv.slice(2))
config()
const app = express()
const port = process.env.PORT || 3000
console.log(options)
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
