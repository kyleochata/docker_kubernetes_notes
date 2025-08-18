// const fs = require('fs')
// const path = require('path')
const os = require('os')


const getHostname = () => {
    return os.hostname()
}

class HttpError extends Error {
    constructor(status, msg) {
        super(msg)
        this.status = status
    }
}

module.exports = {
    // getColor,
    getHostname,
    HttpError
    
}
// Replaced with db/color.js getColor
// //Gets the set color from the env or the ConfigMap
// const getColor = () => {
//     let color = process.env.DEFAULT_COLOR
//     const filePath = process.env.COLOR_CONFIG_PATH
//     if (filePath) {
//         try{
//             const colorFromFile = fs.readFileSync(path.resolve(filePath), 'utf8')
//             color = colorFromFile.trim()
//         } catch(err) {
//             console.error(`Failed to read contents of ${filePath}`)
//             console.error(err)
//         }
//     }
//     return color || 'blue'
// }