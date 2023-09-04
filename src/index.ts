import express from 'express'
import usersRouter from './routes/users.routers'
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
router.get('/tweets', (req, res) => {
  res.json({
    data: [
      {
        _id: 1,
        text: 'Le Hieu Nghia'
      },
      {
        _id: 2,
        text: 'Nguyen Van A'
      }
    ]
  })
})
app.use('/users', usersRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
