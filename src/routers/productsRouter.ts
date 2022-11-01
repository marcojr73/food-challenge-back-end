import { Router } from "express"
import * as controller from "../controllers/productsController.js"

const productsRouter = Router()

productsRouter.get("/", controller.apiDetails)
productsRouter.put("/products/:code", controller.productUpdate)
productsRouter.get("/products/:code", controller.getProductInfo)

export default productsRouter