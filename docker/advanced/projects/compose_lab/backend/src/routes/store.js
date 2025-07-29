const express = require('express')
const keyValueRouter = express.Router()
const {KeyValue} = require("../models/keyValue")

const reqError = (status=400, msg) => {
    const err = new Error(msg)
    err.status = status 
    throw err
}

keyValueRouter.post('/', async (req, res, next) => {
    try {
        const {key, value} = req.body
        // Bad value handle in req.body
        if (key === undefined || value === undefined) {
            reqError("Key and Value must be provided. Try again")
        }
        const existingKey = await KeyValue.findOne({key})
        if (existingKey) {
            reqError("Key already in use. Either update or delete key")
        }
        // create new key-value doc in mongodb 
        const doc = await KeyValue.create({key, value})
        res.status(201).json(doc)

    } catch(err) {
        next(err)       // hand off to central err handler
    }

})

keyValueRouter.get('/:key', async (req, res, next) => {
    try{
        const key = req.params.key
        const doc = await KeyValue.findOne({key})
        if (!doc) {
            reqError(404, "Not found. Unable to find key")
        }
        res.status(200).json(doc)
    } catch(err) {
        next(err)
    }
})

keyValueRouter.put('/:key', async (req, res, next) => {
    try{
        const key = req.params.key
        const {value} = req.body
        if (!key) {
            reqError(404, "Not Found. No key provided")
        }
        if (!value) {
            reqError(400, "Value for key not provided")
        }
        const updateDoc = await KeyValue.findOneAndUpdate({key}, {value}, {new: true})
        if (!updateDoc) {
            reqError(404, "Not Found. Unable to find key")
        }
        res.status(200).json({
            message: "Key-value pair updated successfully",
            key: updateDoc.key,
            value: keyValueRouter.value
        })
    } catch(err) {
        next(err)
    }
})

keyValueRouter.delete('/:key', async (req, res, next) => {
    try{
        const key = req.params
        if (!key) {
            reqError(404, "Not Found. Unable to find key")
        }
        const deleteKey = await KeyValue.findOneAndDelete(key)
        if (!deleteKey) {
            reqError(404, "Not found. Unable to find key")
        }
        res.status(204).json({message: `Deleted key: ${key}`})
    }catch(err) {
        next(err)
    }
})

module.exports = {
    keyValueRouter
}