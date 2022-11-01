import { Request, Response } from "express"
import * as services from "../services/productsServices.js"

async function apiDetails(req: Request, res: Response){

    const connectionDb = await services.verifyConnectionDb()
    const lastUpate = await services.lastUpdate()
    const performance = await services.performanceNode()

    res.send({connectionDb, lastUpate, performance})
}

async function productUpdate(req: Request, res: Response){
    
    const {code} = req.params
    await services.callUpdateDbStatus(code)

    res.status(200).send("success when updating product")
}

export {
    apiDetails, 
    productUpdate
}