import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri);

let cacheDb = null

export default async function connectDb() {
  if(cacheDb) {
    console.log("cache")
    return cacheDb
  }

  try {
    await client.connect();
    const db = client.db("foodManagerChallenger").collection("teste");
    cacheDb = db
  
    return db
  } catch (e) {
    console.log("connection refused:", e)
  }
}

