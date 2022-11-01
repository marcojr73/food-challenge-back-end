import { Router } from "express"
import * as controller from "../controllers/productsController.js"
import validateDataProduct from "../middlewares/validateDataProduct.js"

const productsRouter = Router()

productsRouter.get("/", controller.apiDetails)
productsRouter.put("/products/:code", validateDataProduct, controller.updateProduct)
productsRouter.delete("/products/:code", controller.toTrashProduct)
productsRouter.get("/products/:code", controller.getProductInfo)

export default productsRouter