import Food from "../models/foodModel.js"
import {repository} from "../repositories/productsRepository.js"
import * as error from "../utils/errors.js"

async function verifyConnectionDb(){
    const db = await repository.connectToDb()
    if(!db) return "error"
    return "ok"
}

async function lastUpdate(){
    const lastUpdateTime = await repository.getLastTimeUpdateDb()
    if(!lastUpdateTime) throw error.notFound("no data registered on database")
    return lastUpdateTime.imported_t
}

async function performanceNode(){
    const timeOriginMs = performance.timeOrigin
    const memoryInfo = process.memoryUsage()
    return {timeOriginMs, memoryInfo}
}

async function callUpdateProductDb(code: string, product: Food){
    const att = await repository.updateProduct(code, product)
    if(att.modifiedCount === 0) throw error.notFound("product not found")
}

async function callUpdateDbStatus(code: string){
    const update = await repository.updateStatusToTrash(code)
    if(update.modifiedCount === 0) throw error.notFound("product not found")
}

async function callGetProduct(code: string){
    const product = await repository.getProductByCode(code)
    if(!product) throw error.notFound("product not found")
    return product
}

async function callGetAllProducts(page: number){
    const products = await repository.getAllProducts(page)
    if(products.length === 0) throw error.notFound("Not found products, wait for update")
    return products
}

export const service = {
    verifyConnectionDb,
    lastUpdate,
    performanceNode,
    callUpdateProductDb,
    callUpdateDbStatus,
    callGetProduct,
    callGetAllProducts
}