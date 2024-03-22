/**
 * Express router for handling user-related routes.
 * @module usersRouter
 */

import Router from 'express'
import {
  followController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  unfollowController,
  updateMeController,
  verifyEmailController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common/common.middlewares'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  unfollowedValidator,
  updateMeValidator,
  verifiedUserValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeRequestBody } from '~/models/requests/User.request'
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
  filterMiddleware<UpdateMeRequestBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)
/**
 * Description. Get user profile
 * Path: /:username
 * Method: GET
 */
usersRouter.get('/:username', wrapRequestHandler(getProfileController))
/**
 * Description. Follow user
 * Path: /:username
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: {user_id: string}
 */
//check xem user_id co ton tai khong va user_id phai la onjcet
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)
/**
 * Description. Unfollow user
 * Path: /follow/user_id
 * Header {Authorization: Bearer <access_token>}
 * Body: {user_id: string}
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowedValidator,
  wrapRequestHandler(unfollowController)
)
export default usersRouter
