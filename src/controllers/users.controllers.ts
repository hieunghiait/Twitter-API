import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  FollowReqBody,
  ForgotPasswordReqBody,
  GetProfileReqParams,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UnfollowReqParams,
  UpdateMeRequestBody,
  VerifyEmailReqBody
} from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'
import User from '~/models/schemas/User.schema'

/**
 * Handles the login functionality for users.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response with a success message and the login result.
 */
export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify })
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

/**
 * Handles the registration of a user.
 *
 * @param req - The request object containing the user registration data.
 * @param res - The response object used to send the registration success message and result.
 * @param next - The next function to be called in the middleware chain.
 * @returns A JSON response with the registration success message and result.
 */
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

/**
 * Logout controller function.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The JSON response containing the result of the logout operation.
 */
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}

/**
 * Controller function to verify user email.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns A JSON response with the verification result.
 */
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  // Nếu không tìm thấy user thì mình sẽ báo lỗi
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  // Đã verify rồi thì mình sẽ không báo lỗi
  // Mà mình sẽ trả về status OK với message là đã verify trước đó rồi
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await usersService.verifyEmail(user_id)
  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload //Lấy user_id từ TokenPayLoad
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) }) //Tùm user trong database
  if (!user) {
    //Nếu user không tìm thấy
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  } //Nếu user đã verify rồi thì trả về message là đã verify trước đó rồi
  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  } //Nếu user chưa verify thì gửi lại email verify
  const result = await usersService.resendVerifyEmail(user_id)
  return res.json(result)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, verify } = req.user as User
  const result = await usersService.forgotPassword({ user_id: (_id as ObjectId).toString(), verify })
  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  const result = await usersService.resetPassword(user_id, password)
  return res.json(result)
}
/**
 * Controller function to get the current user's information.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the success message and the user's information.
 */
export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  console.log(user_id)
  const user = await usersService.getMe(user_id)
  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: user
  })
}

export const getProfileController = async (req: Request<GetProfileReqParams>, res: Response, next: NextFunction) => {
  const { username } = req.params
  console.log(username)
  const user = await usersService.getProfile(username)
  return res.json({
    message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
    result: user
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { body } = req
  const user = await usersService.updateMe(user_id, body)
  return res.json({
    message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
    result: user
  })
}

export const followController = async (
  req: Request<ParamsDictionary, any, FollowReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { followed_user_id } = req.body
  console.log('log user_id: ' + user_id)
  console.log('log followed_user_id: ' + followed_user_id)
  const user = await usersService.followers(user_id, followed_user_id)
  return res.json({
    message: USERS_MESSAGES.FOLLOW_SUCCESS,
    result: user
  })
}
export const unfollowController = async (
  req: Request<ParamsDictionary, any, UnfollowReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { user_id: followed_user_id } = req.params
  const user = await usersService.unfollowers(user_id, followed_user_id)
  return res.json({
    message: USERS_MESSAGES.UNFOLLOW_SUCCESS,
    result: user
  })
}
export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { old_password, new_password } = req.body
  if (old_password !== new_password) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: USERS_MESSAGES.PASSWORD_NOT_MATCH
    })
  }
  const result = await usersService.changePassword(user_id, old_password, new_password)
  if (!result) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: USERS_MESSAGES.CHANGE_PASSWORD_FAIL
    })
  }
  return res.json({
    message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS,
    result
  })
}
