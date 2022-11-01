import { NextFunction, Request, Response } from "express"
import productSchema from "../schemas/productSchema.js"

async function validateDataProduct(req: Request, res: Response, next: NextFunction){
    await productSchema.validateAsync(req.body)
    next()
}

export default validateDataProduct