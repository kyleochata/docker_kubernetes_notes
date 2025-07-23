"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const users = [];
app.get('/', (req, res) => res.send('hello from express.ts'));
//Register a new user 
app.post('/users', (req, res) => {
    const newUserId = req.body.userId;
    if (!newUserId) {
        // Return bad request status
        return res.status(400).send('Missing userId');
    }
    if (users.includes(newUserId)) {
        return res.status(400).send('userId passed already exits. Try again');
    }
    users.push(newUserId);
    return res.status(200).send(`User with ${newUserId} registered`);
});
// curl http://localhost:3000/users
//Get a registered user 
app.get('/users', (req, res) => {
    return res.json({ users });
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
