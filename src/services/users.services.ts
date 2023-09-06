import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
/**
 * User services
 * class register user
 */
class UserServices {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    try {
      const result = await databaseService.users.insertOne(
        new User({
          email,
          password
        })
      )
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
const userService = new UserServices()
export default userService
