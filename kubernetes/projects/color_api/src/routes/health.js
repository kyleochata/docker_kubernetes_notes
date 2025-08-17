const healthRouter = require('express').Router()


const fail_liveness = process.env.FAIL_LIVENESS === 'true'
// if fail readieness is true then randmize if the container will fail or not
const fail_readiness = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false

console.log(`Fail liveness: ${fail_liveness}`)
console.log(`Fail ready: ${fail_readiness}`)


// readiness probe endpoint
healthRouter.get('/ready', (req, res) => {
    if (fail_readiness) {
       return res.sendStatus(503) 
    }
    return res.send('ok')
})

//liveness probe endpoint
healthRouter.get('/health', (req, res) => {
    if (fail_liveness) {
        return res.sendStatus(503)
    }
    return res.send('ok')
})

// startup probe endpoint
healthRouter.get('/up', (req, res) => {
    return res.send('ok')
})

module.exports = {
    healthRouter
}