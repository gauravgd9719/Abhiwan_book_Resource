const express = require("express")
const mongoose = require("mongoose")

const app = express()
const route = require("./Routes/route")

app.use(express.json())

mongoose.connect("mongodb+srv://gauravdhiman123:hiFunctionUp@gd-cluster.kufg7lx.mongodb.net/PROJECT_BOOK_RESOURCES")
.then(()=>console.log("mongoDb is connected"))
.catch((error)=>console.log(error))


app.use("/",route)


const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Express Running on PORT No${PORT}`)
})
