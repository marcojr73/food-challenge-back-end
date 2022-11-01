import connectDb from "../config/dataBase.js"

async function connectToDb(){
    return await connectDb()
}

async function getLastTimeUpdateDb(){
    const db = await connectDb()
    return await db.collection("foods").findOne({})
}

async function updateStatusToTrash(code: string){
    const db = await connectDb()
    return await db.collection("foods").updateOne({code}, {$set: {status: "trash"}})
}

async function getProductByCode(code: string){
    const db = await connectDb()
    return await db.collection("foods").findOne({code})
}

export {
    connectToDb,
    getLastTimeUpdateDb,
    updateStatusToTrash,
    getProductByCode
}