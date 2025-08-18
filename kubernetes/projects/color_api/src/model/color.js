const mongoose = require('mongoose')

//ex: {key: "primary", value: "purple"}
const ColorSchema = mongoose.Schema(
    {
        key: String,
        value: String,
    }
)
const Color = mongoose.model(
    "Color",
    ColorSchema
)

module.exports = {Color}