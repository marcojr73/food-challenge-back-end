import * as repository from "../repositories/productsRepository.js"
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

async function callUpdateDbStatus(code: string){
    const update = await repository.updateStatusToTrash(code)
    if(update.modifiedCount === 0) throw error.notFound("product not found")
}

export {
    verifyConnectionDb,
    lastUpdate,
    performanceNode,
    callUpdateDbStatus
}