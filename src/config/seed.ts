import axios from "axios"
import dotenv from "dotenv"
import dayjs from "dayjs"
import fs from "fs"
import https from "https"
import gunzip from "gunzip-file"

import chain from 'stream-chain';
import parser from 'stream-json';
import pick from 'stream-json/filters/Pick.js';
import ignore from 'stream-json/filters/Ignore.js';
import streamValues from 'stream-json/streamers/StreamValues.js';

import JSONStream from "JSONStream"

import Parser from "parse-json-stream"

import ndJson from "ndjson"
import { pipeline } from "stream"

import lineReader from "line-reader"
import Food from "../models/foodModel.js"
import connectDb from "./dataBase.js"


dotenv.config()

setInterval(() => {
    const hour = dayjs().hour()
    if (hour === 3)  deleteCollection(), getFilesNames()
}, 3540000)

deleteCollection(), getFilesNames()

async function getFilesNames() {
    try {
        let { data: filesNames } = await axios.get(process.env.FILES_URI)
        filesNames = filesNames.split("json.gz")
        filesNames = filesNames.forEach(async (fileName) => {
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

function downloadFiles(url: string, fileName: String) {
    console.log("downloading...")
    https.get(url, (res) => {
        const path = `downloads/zip/${fileName}`
        const filePath = fs.createWriteStream(path)
        res.pipe(filePath)
        filePath.on('finish', () => {
            filePath.close()
            console.log('Download Completed!')
            extractGzFiles(fileName)
        })
    })
    console.log("Update completed")
}

function extractGzFiles(fileName: String) {
    console.log("extrating...")
    gunzip(`downloads/zip/${fileName}`, `downloads/unzip/${fileName}.json`, () => {
        console.log('extract completed!')
        convertoToObjJs(fileName)
    })
}

async function convertoToObjJs(fileName: String) {

    let cont = 0
    const date = dayjs()

    await lineReader.eachLine(`downloads/unzip/${fileName}.json`, function(line: string, last: any) {
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
            populateDataBase(food, fileName)
        } cont ++
    })
    deleteFiles(fileName)
}

async function populateDataBase(food: Food, fileName: String){
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

function deleteFiles(fileName: String){
    fs.unlinkSync(`downloads/unzip/${fileName}.json`)
    fs.unlinkSync(`downloads/zip/${fileName}`)
}
