POST /api;notes
- title, content or return 400
- optional: notebookId in body
    - 404 if id doesn't exist
- If notebooks service is down, stores note with provided notebookId
- saves info and return 201

GET /api/notes
- return all notes

GET /api/notes/:id
- 404 id doesn't exist
- return note information

PUT /api/notes/:id
- 404 id doesn't exist
- update note, 200

DELETE /api/notes/:id
- 404 id doesn't exist
- delete and return 204

GET /health
- return 200 and text up