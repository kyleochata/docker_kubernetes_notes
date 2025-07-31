const router = require('express').Router()
//const apiRoutes = require('./api')

//router.use('/api', apiRoutes)
router.use('/api/health', (req, res) => {
    return res.status(200).send('up')
})

module.exports = router