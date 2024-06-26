import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}
export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params // get name form params
  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    console.log('log error', err)
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}
