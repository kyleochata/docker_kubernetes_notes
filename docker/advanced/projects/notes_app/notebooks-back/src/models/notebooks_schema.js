const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotebooksSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
            default: null
        }
    },
    {timestamps: true}      // createdAt + updatedAt
)

const Notebooks = mongoose.model("Notebooks", NotebooksSchema)

module.exports = {
    Notebooks
}