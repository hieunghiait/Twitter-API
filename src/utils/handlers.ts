import { Request, Response, NextFunction, RequestHandler } from 'express'
/**
 * Wrap request handler to catch error
 */
export const wrapRequestHandler = <P>(func: RequestHandler<P>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
/**
 * Mong muốn nhận vào là: Request<{username: string}>
 */
/**
 * Thực nhận là: RequestParamDictionary<[key: string]: string>
 */
