const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
const users = []

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Hello World")
})
/*
    curl -X POST http://localhost:3000/users \
    -H "Content-type: application/json" \
    -d '{"userId": "alice123"}'
*/
//Register a new user 
app.post('/users', (req, res) => {
    const newUserId = req.body.userId;
    if (!newUserId) {
        // Return bad request status
        return res.status(400).send('Missing userId')
    }
    if (users.includes(newUserId)) {
        return res.status(400).send('userId passed already exits. Try again')
    }
    users.push(newUserId)
    return res.status(200).send(`User with ${newUserId} registered`)
})

// curl http://localhost:3000/users
//Get a registered user 

app.get('/users', (req, res) => {
    return res.json({users})
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

