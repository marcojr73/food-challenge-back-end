import app from "./app.js"
import dotenv from "dotenv"
import cron from "node-cron"
import seed from "../cron/seed.js"

dotenv.config()

const PORT = +process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server up on port ${PORT}`)
    
    cron.schedule("39 8 * * *", () => {
        seed()   
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })
})

