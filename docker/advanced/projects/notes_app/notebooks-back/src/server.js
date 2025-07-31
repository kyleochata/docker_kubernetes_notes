const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./routes")
const app = express()

const port = process.env.PORT || 3000
// const mongoHost = process.env.MONGODB_HOST
// const mongoDBName = process.env.NOTEBOOKS_DB
const username = process.env.NOTEBOOKS_USER
const password = process.env.NOTEBOOKS_PASSWORD
const dbURL = process.env.DB_URL
console.log("dbURL", dbURL)
app.use(bodyParser.json())

// app.use(routes)

app.use("/api/notebooks", (req, res)=> {
    res.status(200).json({message: "hello from notebooks"})
})

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


mongoose.connect(dbURL,{
    auth: {
        username,
        password
    },
    connectTimeoutMS: 500,
}).then(() => {
    app.listen(port, () => {
        console.log(`Notebooks serving listening on port: ${port}`)
    })
    console.log("Connected to notebooks db")
}).catch(err => console.error(err))
