const router = require('express').Router();
const { ErrRequest } = require("../err_reqs")
const { Notebooks } = require("../../models/notebooks")

router.post("/", async (req, res, next) => {
    let { name, description } = req.body
    name = name.trim()
    description = description.trim()
    try {
        if (!name || name === "" || typeof name !== 'string') {
           throw ErrRequest(400, "A name for the notebook must be provided.")
        }
        const existingNotebook = await Notebooks.findOne({name})
        if (existingNotebook) {
           throw ErrRequest(400, "This notebook already exists. Try updating it instead")
        }
        const newNotebook = await Notebooks.create({ name, description })
        return res.status(201).json(newNotebook)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const allNotebooks = await Notebooks.find()
        return res.status(200).json(allNotebooks)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const existingNotebook = await Notebooks.exists({_id: id})
        if (!existingNotebook) {
            throw ErrRequest(404, "Not found")
        }
        const notebook = await Notebooks.findById(id)
        if (!notebook) {
            throw ErrRequest() // default is 500, Internal Server Error
        }
        return res.status(200).json(notebook)

    } catch (err) {
        next(err)
    }

})

router.put("/:id", async (req, res, next) => {
    const {id} = req.params
    const {name, description} = req.body
    try{
        if (!id) {
            throw ErrRequest(400, "No id provided.")
        }
        const existingNotebook = await Notebooks.exists({_id: id})
        if (!existingNotebook) {
            throw ErrRequest(404, "Notebook not found.")
        }
        const updatedNotebook = await Notebooks.findByIdAndUpdate(
            id, 
            {name, description}, 
            {new: true})
            return res.status(200).json({
                message: "Notebook updated",
                name: updatedNotebook.name,
                description: updatedNotebook.description,
                id: updatedNotebook.id
            })
    }catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    const {id} = req.params
    try {
        if (!id) {
            throw ErrRequest(400, "No id provided")
        }
        const deleteNotebook = await Notebooks.findByIdAndDelete(id)
        console.log(deleteNotebook)
        if (!deleteNotebook) {
            throw ErrRequest(404, "Notebook not deleted")
        }
        return res.status(204).json({message:`Notebook with id ${id} deleted successfully`})
    }catch(err) {
        next(err)
    }
})

module.exports = router