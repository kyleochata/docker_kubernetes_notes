const express = require('express')
const mongoose = require("mongoose")
const app = express()

app.get('/', (req, res) => res.json({message: "hello from notes"}))

const port = process.env.port

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to mongodb. starting server')
    }).catch((err) => {
        console.error('something went wrong')
        console.error(err)
    })