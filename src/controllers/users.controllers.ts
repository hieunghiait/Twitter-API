import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'
import usersService from '~/services/users.services'
import { StatusCodes } from 'http-status-codes'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'lehieunghia2402@gmail.com' && password === 'Nghia2002') {
    return res.status(StatusCodes.OK).json({
      message: 'Login successfully'
    })
  }
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: 'Login failed'
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
