import express from "express"
import "express-async-errors"

import dotenv from "dotenv"
import cors from "cors"
import productsRouter from "./routers/productsRouter.js"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

app.use(productsRouter)

export default app