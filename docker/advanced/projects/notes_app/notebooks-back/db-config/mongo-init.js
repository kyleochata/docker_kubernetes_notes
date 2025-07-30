// Get env variables
const notebooksDB = process.env.NOTEBOOKS_DB
const notebooksUser = process.env.NOTEBOOKS_USER
const notebooksPassword = process.env.NOTEBOOKS_PASSWORD
console.log("init notebooks user")

// Get the db named 'key-value-db'
db = db.getSiblingDB(notebooksDB)

// Create a suser with the role of readWrite for key-value-db
db.createUser({
    user: notebooksUser,
    pwd: notebooksPassword,
    roles: [
        {
            role: 'readWrite',
            db: notebooksDB
        }
    ]
})