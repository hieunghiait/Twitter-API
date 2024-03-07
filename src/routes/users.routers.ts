/**
 * Express router for handling user-related routes.
 * @module usersRouter
 */

import Router from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Route for user logout.
 * Path: '/logout'
 * Method: POST
 * Body: {refresh_token: Bear <refresh_token>}
 * Headers: {Authorization: Bearer <access_token>}
 * Success response: {message: 'Logout'}
 */
usersRouter.post(
  '/logout',
  accessTokenValidator,
  wrapRequestHandler((req, res) => {
    res.json({ message: 'Logout' })
  })
)

export default usersRouter
