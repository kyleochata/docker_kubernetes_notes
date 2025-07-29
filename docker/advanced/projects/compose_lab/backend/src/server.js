const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const {keyValueRouter} = require("./routes/store")
const {healthRouter} = require("./routes/health")

const username = process.env.KEY_VALUE_USER
const password = process.env.KEY_VALUE_PASSWORD
const port = process.env.PORT
const dbName = process.env.KEY_VALUE_DB
const mongodbHost = process.env.MONGODB_HOST

const app = express()
app.use(bodyParser.json())

app.use('/health', healthRouter)
app.use('/store', keyValueRouter)

// 404 handler
app.use((req,res, next) => {
    res.status(404).json({message: "Not Found"})
})

// CENTRAL ERROR-HANDLE
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).json({message})
})
console.log("Connecting to DB")
// This will only connect if this backend container is on the same named network as the mongodb container
mongoose.connect(`mongodb://${mongodbHost}/${dbName}`, {
    auth: {
        username,
        password 
    },
    connectTimeoutMS: 500,
}).then(()=> {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
    console.log("Connected to DB")
})
.catch(err => console.error(err))
