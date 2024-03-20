import express from 'express'
import usersRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { MongoClient } from 'mongodb'
import { pick } from 'lodash'
const app = express()
const port = 3000
//connect to database local
databaseService.connect()

app.use(express.json())

app.use('/users', usersRouter)
// Error handler
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
