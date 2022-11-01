import { Router } from "express"
import * as controller from "../controllers/productsController.js"

const productsRouter = Router()

productsRouter.get("/", controller.apiDetails)

export default productsRouter