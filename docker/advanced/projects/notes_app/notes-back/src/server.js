const express = require('express')
const mongoose = require("mongoose")
const app = express()

app.get('/api/notes', (req, res) => res.json({message: "hello from notes"}))

const port = process.env.PORT

mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(port, ()=> {
        console.log('connected to mongodb. starting server')
        console.log(`listening on port: ${port}`)
        })
    }).catch((err) => {
        console.error('something went wrong')
        console.error(err)
    })