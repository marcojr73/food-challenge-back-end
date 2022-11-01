import connectDb from "../config/dataBase.js"

async function connectToDb(){
    return await connectDb()
}

async function getLastTimeUpdateDb(){
    const db = await connectDb()
    return await db.collection("foods").findOne({})
}

export {
    connectToDb,
    getLastTimeUpdateDb
}