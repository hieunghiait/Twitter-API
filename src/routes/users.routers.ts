/**
 * Express router for handling user-related routes.
 * @module usersRouter
 */

import Router from 'express'
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  updateMeController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  updateMeValidator,
  verifiedUserValidator
} from '~/middlewares/users.middlewares'
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
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
/**
 * Description. Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> } //dang nhap vao roi moi co the resend
 * Body: { }
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))
/**
 * Description. Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description. Get my profile
 * Path: /me
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))
/**
 * Description. Update my profile
 * Path: /me
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 *  Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  updateMeValidator,
  verifiedUserValidator,
  wrapRequestHandler(updateMeController)
)

export default usersRouter
