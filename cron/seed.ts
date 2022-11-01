import axios from "axios"
import dotenv from "dotenv"
import dayjs from "dayjs"
import fs from "fs"
import https from "https"
import gunzip from "gunzip-file"
import lineReader from "line-reader"
import Food from "../src/models/foodModel.js"
import connectDb from "../src/config/dataBase.js"

dotenv.config()

export default function seed() {
    console.log("seed is running...")
    deleteCollection(), getFilesNames()
}

async function getFilesNames() {
	try {
        let { data: filesNames } = await axios.get(process.env.FILES_URI)
        filesNames = filesNames.split("json.gz")
        filesNames.forEach(async (fileName) => {
            fileName = fileName.concat("json.gz").replace("\n", "")
            if (fileName !== "json.gz") {
                const url = `https://challenges.coode.sh/food/data/json/${fileName}`
                downloadFiles(url, fileName)
            }
        })
    } catch (e) {
        console.log("An error occurent to generate seed:", e)
    }
}

function downloadFiles(url: string, fileName: string) {
    console.log("downloading...")
    try {
        https.get(url, (res) => {
            const path = `downloads/zip/${fileName}`
            const filePath = fs.createWriteStream(path)
            res.pipe(filePath)
            filePath.on("finish", () => {
                filePath.close()
                console.log("Download Completed!")
                extractGzFiles(fileName)
            })
        })
    } catch (e) {
        console.error(e)
    }
}

function extractGzFiles(fileName: string) {
    console.log("extrating...")
    gunzip(`downloads/zip/${fileName}`, `downloads/unzip/${fileName}.json`, () => {
        console.log("extract completed!")
        convertoToObjJs(fileName)
    })
}

async function convertoToObjJs(fileName: string) {

    let cont = 0
    const date = dayjs().format()

    await lineReader.eachLine(`downloads/unzip/${fileName}.json`, function(line: string) {
        if(cont < 99){
            const ans = JSON.parse(line)
            const food = new Food(
                ans.code, 
                "trash", 
                date, 
                ans.url, 
                ans.creator, 
                ans.created_t, 
                ans.last_modified_t, 
                ans.product_name, 
                ans.quantity, 
                ans.brands, 
                ans.categories, 
                ans.labels, 
                ans.cities, 
                ans.purchase_places, 
                ans.stores, 
                ans.ingredients_text,
                ans.traces, 
                ans.serving_size, 
                ans.serving_quantity, 
                ans.nutriscore_score, 
                ans.nutriscore_grade, 
                ans.main_category, 
                ans.image_url
                )
            populateDataBase(food)
        } cont ++
    })
    deleteFiles(fileName)
}

async function populateDataBase(food: Food){
    try {
        const db = await connectDb()
        await db.collection("foods").insertOne(food)
        await db.collection("historic").insertOne(food)
    } catch (e) {
        console.log(e)
    }
}

async function deleteCollection(){
    const db = await connectDb()
    await db.collection("foods").deleteMany({})
}

function deleteFiles(fileName: string){
    fs.unlinkSync(`downloads/unzip/${fileName}.json`)
    fs.unlinkSync(`downloads/zip/${fileName}`)
}
