import { Request, Response } from 'express'
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
