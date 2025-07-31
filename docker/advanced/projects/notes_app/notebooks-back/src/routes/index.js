const router = require('express').Router()
const mongoose = require('mongoose')
const { Notebooks } = require("../models/notebooks_schema")
class HttpError extends Error {
    constructor(status, msg) {
        super(msg)
        this.status = status
    }
}

// Middleware to validate the id in the params request
const validateId = (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpError(400, "Invalid notebook ID format")
    }
    next()
}

router.get("/health", async (req, res, next) => {
    res.status(200).send("up")
})

// Create new notebook POST
/*
curl -X POST http://localhost:8080/api/notebooks \
     -H "Content-Type: application/json" \
     -d '{"name": "notebook_1", "description":"first notebook"}'
*/
router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body
        if (!name) {
            throw new HttpError(400, "No name provided for new notebook")
        }
        const cleanedData = {
            name: name.trim(),
            description: description ? description.trim() : null
        }
        const newNotebook = new Notebooks(cleanedData)
        await newNotebook.save()
        res.status(201).json({ data: newNotebook })
    } catch (err) {
        next(err)
    }
})

// GET all notebooks '/'
router.get("/", async (req, res, next) => {
    try {
        const allNotebooks = await Notebooks.find().lean()
        if (allNotebooks.length === 0) {
            res.status(204).json({ message: "No notebooks found. Please create one first! " })
        }
        return res.status(200).json({ data: allNotebooks })
    } catch (err) {
        next(err)
    }
})

// retrieve single notebook '/:id'
router.get("/:id", validateId, async (req, res, next) => {
    try {
        const {id} = req.params
        const notebook = await Notebooks.findById(id).lean()
        if (!notebook) {
            throw new HttpError(404, `Notebook with ${id} not found`)
        }
        res.status(200).json({ data: notebook })
    } catch (err) {
        next(err)
    }
})

//update single notebook PUT '/:id'
router.put("/:id", validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        if (!name.trim() || typeof name !== 'string') {
            throw new HttpError(400, "Name must be a non-empty string to update the notebook")
        }

        const oldNotebook = await Notebooks.findById(id).lean().select("name description")
        if (!oldNotebook) {
            throw new HttpError(404, "Notebook not found")
        }

        const cleanedData = {
            name: name.trim(),
            description: description ? description.trim() : null
        }

        if (cleanedData.name === oldNotebook.name && cleanedData.description === oldNotebook.description) {
            return res.status(200).json({
                message: "No changes detected - notebook unchanged",
                data: oldNotebook
            })
        }

        const updatedNotebook = await Notebooks.findByIdAndUpdate(id, cleanedData, { new: true, runValidators: true, lean: true })
        res.status(200).json({
            message: "Notebook updated successfully",
            data: updatedNotebook
        })
    } catch (err) {
        next(err)
    }
})
// delete single notebook DELETE '/:id'
router.delete("/:id", validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const ok = await Notebooks.findById(id)
        if (!ok) {
            throw new HttpError(404, "Notebook to be deleted not found")
        }
        await Notebooks.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Notebook deleted successfully",
            data: { id }
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router