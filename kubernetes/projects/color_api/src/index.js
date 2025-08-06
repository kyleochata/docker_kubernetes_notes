const express = require('express')
const os = require('os')

const app = express()
const port= 80
const color = "blue"
const hostname = os.hostname()
app.get("/", (req, res) => {
    res.send(`<h1 style="color:${color}"> Hello from Color-API </h1>
<h2>Hostname: ${hostname}</h2>`)
})

app.get('/api', (req, res) => {
    const {format} = req.query //localhost/api?format=<text | json>
    if (format === 'json') {
        return  res.json({
        color,
        hostname
    })
    }
    return res.send(`Color: ${color}\t Hostname: ${hostname} `)
})

app.listen(port, () => {
    console.log(`server connected. Listening on port: ${port}`)
})