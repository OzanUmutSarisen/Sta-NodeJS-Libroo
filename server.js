const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotevn = require('dotenv')
const librooRouter = require("./routers/libroo")

const app = express()
app.use(express.json())
app.use(cors())
dotevn.config()

app.use('/libroo', librooRouter)

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }) // MongoDB connecting function
    .then(() => {
        console.log("Connect MongoDB")
        app.get('/', (req, res) => {
            console.log("Here")
        })
        
    })
    .catch((err) =>{
        console.log("Connecting error ",err)
    })

app.listen(process.env.PORT)
