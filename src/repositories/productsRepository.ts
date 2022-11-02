import { Db } from "mongodb"
import connectDb from "../config/dataBase.js"
import Food from "../models/foodModel.js"

async function connectToDb(){
    return await connectDb()
}

async function getLastTimeUpdateDb(){
    const db: Db = await connectDb()
    return await db.collection("foods").findOne({})
}

async function updateProduct(code: string, product: Food){
    const db: Db = await connectDb()
    return await db.collection("foods").updateOne({code}, {$set: product})
}

async function updateStatusToTrash(code: string){
    const db: Db = await connectDb()
    return await db.collection("foods").updateOne({code}, {$set: {status: "trash"}})
}

async function getProductByCode(code: string){
    const db: Db = await connectDb()
    return await db.collection("foods").findOne({code})
}

async function getAllProducts(page: number){
    const db: Db = await connectDb()
    return await db.collection("foods").find({}).skip(50 * page).limit(50).toArray()
}



export const repository = {
    connectToDb,
    getLastTimeUpdateDb,
    updateProduct,
    updateStatusToTrash,
    getProductByCode,
    getAllProducts
}