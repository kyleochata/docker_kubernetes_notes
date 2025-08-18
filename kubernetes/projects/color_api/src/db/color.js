const { Color } = require("../model/color")

const saveColor = async ({ key, value }) => {
    let color = await Color.findOne({ key });

    if (color) {
        color.set({ value })
    } else {
        color = new Color({ key, value })
    }
    await color.save()

    return color
}

const getColor = async ({ key, strict = false }) => {
    let color = await Color.findOne({ key })

    if (strict && !color) {
        return undefined
    }

    if (color) {
        return color.value 
    }

    return process.env.DEFAULT_COLOR || 'blue'
}

const getColors = async () => {
    return await Color.find()
}

const deleteColor = async ({ key }) => {
    await Color.deleteOne({ key })
}

module.exports = {
    saveColor,
    getColors,
    getColor,
    deleteColor
}