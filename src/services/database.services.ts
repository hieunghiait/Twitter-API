import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitterapi.wxtxn8x.mongodb.net/?retryWrites=true&w=majority`

class DataService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('There was an error connecting to MongoDB. Check your connection uri.')
      console.log(error)
    }
  }
  //Get collection user
  get users(): Collection<User> {
    //Return collection users
    console.log(process.env.DB_USERS_COLLECTION)
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}
//Create instance of DataService
const databaseService = new DataService()
//Export instance of DataService
export default databaseService
