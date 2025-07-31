const router = require('express').Router()
const notebooksRoute = require("./notebooks")

router.use("/notebooks", notebooksRoute)

module.exports = router