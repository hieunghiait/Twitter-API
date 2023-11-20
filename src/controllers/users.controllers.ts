import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import { StatusCodes } from 'http-status-codes'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = async (req: Request, res: Response) => {
  const { user }: any = req
  const user_id = user._id
  throw new Error('Not implemented')
  const result = await usersService.login(undefined as any)
  return res.status(HTTP_STATUS.OK).json({
    message: 'Login successfully',
    data: result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.status(StatusCodes.CREATED).json({
    message: 'Register successfully',
    data: result
  })
}
