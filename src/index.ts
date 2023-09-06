import express from 'express'
import usersRouter from './routes/users.routers'
import databaseService from './services/database.services'
const app = express()
const port = 1234
const router = express.Router()
app.use(express.json()) //Xử lý JSON đầu vào
router.use(
  (req, res, next) => {
    console.log('Time 1', Date.now())
    next()
  },
  (req, res, next) => {
    console.log('Time 2', Date.now())
    next()
  }
)
app.use('/users', usersRouter)
databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
