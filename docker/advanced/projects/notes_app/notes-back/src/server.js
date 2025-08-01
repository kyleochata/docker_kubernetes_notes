const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
const notesRoutes = require('./routes')

app.use(bodyParser.json())
app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
    res.status(404).json({error: "Not found"})
})

// CENTRAL ERROR-HANDLE
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).json({error: message})
})


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