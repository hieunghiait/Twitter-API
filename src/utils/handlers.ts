import { Request, Response, NextFunction, RequestHandler } from 'express'
/**
 * Wrap request handler to catch error
 */
export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
