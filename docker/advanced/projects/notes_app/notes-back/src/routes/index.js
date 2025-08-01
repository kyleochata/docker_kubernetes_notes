const router = require("express").Router()
const { Notes } = require("../models/notesSchema")
const mongoose = require('mongoose')
const axios = require('axios')
const notebooksAPIURL = process.env.NOTEBOOKS_API_URL
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

/*

curl -X POST http://localhost:8080/api/notes \
     -H "Content-Type: application/json" \
     -d '{"title": "note1", "content":"first note", "notebookId": 688d137a1f96e39c67dd60f0}'
*/

// POST create new note.
router.post("/", async (req, res, next) => {
    try {
        const { title, content, notebookId } = req.body
        let validNotebookId = null
        // Check if notebookId provided, if it's in valid format, if notebook can be found in notebooks db
        if (!notebookId) {
            console.info({
                message: "Notebook Id not provided. Storing note without notebook"
            })
        } else if (!mongoose.Types.ObjectId.isValid(notebookId)) {
            throw new HttpError(400, "Bad notebookId for note")
        } else {
            try {
                //http://reverse-proxy/... will also work 
                await axios.get(`${notebooksAPIURL}/${notebookId}`)
            } catch (err) {
                const jsonError = err.toJSON();

                if (jsonError.status === 404) {
                    return next(new HttpError(404, `"NotebookId not found\n ${notebookId}`))
                } else {
                    console.error({
                        message: "Error verifying notebookId. Notebooks service temporarily unavailable",
                        error: err.message,
                        notebookId,
                    })
                }
            } finally {
                //if axios call is good or responds with anything other than 404
                validNotebookId = notebookId
            }
        }

        if (!title.trim() || !content.trim()) {
            throw new HttpError(400, "Must provide a title and content for this note")
        }


        const cleanedData = {
            title: title.trim(),
            content: content.trim(),
            notebookId: validNotebookId
        }
        const newNote = new Notes(cleanedData)
        await newNote.save()
        res.status(201).json({
            message: "Note successfully created",
            data: newNote
        })
    } catch (err) {
        next(err)
    }
})

// GET all notes /api/notes
router.get("/", async (req, res, next) => {
    try {
        const allNotes = await Notes.find().lean()
        if (!allNotes || allNotes.length === 0) {
            res.status(200).json({ message: "No Notes availabe. Try creating some first" })
        }
        res.status(200).json({ data: allNotes })
    } catch (err) {
        next(err)
    }
})

//GET /api/notes/:id
router.get("/:id", validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const note = await Notes.findById(id).lean()
        if (!note) {
            throw new HttpError(404, "Note not found")
        }
        res.status(200).json({ data: note })
    } catch (err) {
        next(err)
    }
})

// PUT /api/notes/:id
router.put("/:id", validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        if (!title.trim() || !content.trim()) {
            throw new HttpError(400, "title and content must be provided for the note")
        }
        const cleanedData = {
            title: title.trim(),
            content: content.trim()
        }
        const oldNote = await Notes.findById(id).lean()
        if (cleanedData.title === oldNote.title || cleanedData.content === oldNote.content) {
            return res.status(200).json({
                message: "No updates found for existing Note",
                data: oldNote.lean
            })
        }
        const updateNote = await Notes.findByIdAndUpdate(id, cleanedData, { new: true, runValidators: true, lean: true })
        if (!updateNote) {
            throw new HttpError(500, "Internal Service Error: Updating Note")
        }
        return res.status(200).json({
            message: "Note updated successfully",
            data: updateNote
        })


    } catch (err) {
        next(err)
    }
})

router.delete("/:id", validateId, async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteNote = await Notes.findByIdAndDelete(id)
        if (!deleteNote) {
            throw new HttpError(404, "Note not found")
        }
        return res.status(200).json({
            message: "Note successfully deleted",
            data: { id }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router