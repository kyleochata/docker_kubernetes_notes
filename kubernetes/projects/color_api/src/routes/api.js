const apiRouter = require('express').Router()
const { getHostname, HttpError } = require('../utils')
const { getColors, getColor, deleteColor, saveColor } = require('../db/color')

apiRouter.get('/', async (req, res) => {
    const { format, colorKey } = req.query //localhost/api?format=<text | json>

    const color = await getColor({ key: colorKey })
    const hostname = getHostname()

    if (format === 'json') {
        return res.json({
            color,
            hostname
        })
    }
    return res.send(`Color: ${color}\t Hostname: ${hostname} `)
})

//get all colors
apiRouter.get('/color', async (req, res, next) => {
    try {
        const colors = await getColors()
        if (colors.length < 1) {
            throw new HttpError(404, "no colors found")
        }
        return res.send({ data: colors })
    } catch (err) {
        next(err)
    }
})

//get single color by key
apiRouter.get('/color/:key', async (req, res, next) => {
    try {
        let { key } = req.params
        const color = await getColor({ key, strict: true })
        if (!color) {
            throw new HttpError(404, `Color with key: ${key} not found`)
        }
        return res.send({ data: color })
    } catch (err) {
        next(err)
    }
})

//create color by key
apiRouter.post('/color/:key', async (req, res, next) => {
    try {
        const { key } = req.params
        let colorExist = await getColor({ key, strict: true })
        if (colorExist) {
            throw new HttpError(400, "Key already exists. Update instead")
        }

        const { value } = req.body
        if (!value) {
            throw new HttpError(400, "Must include value for key")
        }

        const newColor = await saveColor({ key, value })
        return res.status(201).send({ data: newColor })
    } catch (err) {
        next(err)
    }
})

//update color by key
apiRouter.delete('/color/:key', async (req, res) => {
    try {
        const {key} = req.params
        const colorExist = await getColor({key, strict: true})
        if (!colorExist) {
            throw new HttpError(404, "key not found")
        }

        await deleteColor({key})
        return res.status(201)
    } catch (err) {
        return
    }
})


module.exports = {
    apiRouter
}