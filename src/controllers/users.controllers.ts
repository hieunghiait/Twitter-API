import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'lehieunghia2402@gmail.com' && password === 'Nghia2002') {
    return res.status(200).json({
      message: 'Login successfully'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}
// create funtion registerController
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
    return res.status(201).json({
      message: 'Register successfully',
      data: result
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
