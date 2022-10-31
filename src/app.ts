import express from "express"
import "express-async-errors"

import dotenv from "dotenv"
import cors from "cors"

import connectDb from "./config/dataBase.js"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

app.use()

export default app