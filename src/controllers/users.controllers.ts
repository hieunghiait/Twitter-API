import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/schemas/requests/User.request'
import userService from '~/services/users.services'
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

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.status(StatusCodes.CREATED).json({
      message: 'Register successfully',
      data: result
    })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Register failed'
    })
  }
}
