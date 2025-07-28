// Get env variables
const keyValueDB = process.env.KEY_VALUE_DB
const keyValueUser = process.env.KEY_VALUE_USER
const keyValuePassword = process.env.KEY_VALUE_PASSWORD


// Get the db named 'key-value-db'
db = db.getSiblingDB(keyValueDB)

// Create a suser with the role of readWrite for key-value-db
db.createUser({
    user: keyValueUser,
    pwd: keyValuePassword,
    roles: [
        {
            role: 'readWrite',
            db: keyValueDB
        }
    ]
})