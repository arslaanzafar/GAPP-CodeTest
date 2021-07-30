import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import env from 'dotenv'

import UserRouter from "./routes/user.js"


env.config()

const app = express()

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/', function (req, res) {
    res.send('API is working');
 })

 app.use('/', UserRouter)


const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => {
        app.listen(5000, "", () => console.log("Server Running..."))
    })
    .catch((error) => console.log("Error : " + error.message))