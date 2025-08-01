const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        notebookId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: null
        }
    },
    {timestamps: true}      // createdAt + updatedAt
)

const Notes = mongoose.model("Notes", NotesSchema)

module.exports = {
    Notes
}