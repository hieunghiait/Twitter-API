import { createHash } from 'crypto'
import { config } from 'dotenv'

config()
export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}
//Function to hash password before saving to database
export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRECT)
}
