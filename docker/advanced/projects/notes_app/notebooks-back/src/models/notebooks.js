const mongoose = require('mongoose')

const notebooksSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: false}
})

const Notebooks = mongoose.model("Notebooks", notebooksSchema)

module.exports = {
    Notebooks
}