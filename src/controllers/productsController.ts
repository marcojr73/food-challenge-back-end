import { Request, Response } from "express"
import Food from "../models/foodModel.js"
import * as services from "../services/productsServices.js"

async function apiDetails(req: Request, res: Response){

    const connectionDb = await services.verifyConnectionDb()
    const lastUpate = await services.lastUpdate()
    const performance = await services.performanceNode()

    res.send({connectionDb, lastUpate, performance})
}

async function updateProduct(req: Request, res: Response){
    
    const {code} = req.params
    const updatedVersion: Food = req.body
    await services.callUpdateProductDb(code, updatedVersion)

    res.status(200).send("success when to update product")
}

async function toTrashProduct(req: Request, res: Response){

    const {code} = req.params
    await services.callUpdateDbStatus(code)

    res.status(200).send("success when to trash product")
}

async function getProductInfo(req: Request, res: Response){

    const {code} = req.params
    const product = await services.callGetProduct(code)

    res.status(200).send({product})
}

async function getAllProducts(req: Request, res: Response){

    const page = +req.query.page
    const products = await services.callGetAllProducts(page)

    res.status(200).send(products)
}

export {
    apiDetails, 
    updateProduct,
    toTrashProduct,
    getProductInfo,
    getAllProducts
}