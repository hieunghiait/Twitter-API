import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

/**
 * Represents the request body for user login.
 */
export interface LoginReqBody {
  email: string
  password: string
}

/**
 * Represents the request body for verifying an email.
 */
export interface VerifyEmailReqBody {
  email_verify_token: string
}

/**
 * Represents the request body for user registration.
 */
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
