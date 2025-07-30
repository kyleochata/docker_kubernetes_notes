// Get env variables
const notesDB = process.env.NOTES_DB
const notesUser = process.env.NOTES_USER
const notesPassword = process.env.NOTES_PASSWORD
console.log("init notes user")

// Get the db named 'key-value-db'
db = db.getSiblingDB(notesDB)

// Create a suser with the role of readWrite for key-value-db
db.createUser({
    user: notesUser,
    pwd: notesPassword,
    roles: [
        {
            role: 'readWrite',
            db: notesDB
        }
    ]
})