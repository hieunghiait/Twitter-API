import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'
type FilterKeys<T> = Array<keyof T>
/**
 * Middleware function that filters the request body based on the provided filter keys.
 * @param filterKeys - The keys to filter the request body.
 * @returns A middleware function that filters the request body.
 */
export const filterMiddleware =
  <T>(filterKeys: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
