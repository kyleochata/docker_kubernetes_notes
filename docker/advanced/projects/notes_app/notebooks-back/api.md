POST /api/notebooks
- wants a name, return 400 otherwise
- optional: receives description info in body
- saves notebook info return 201

GET /api/notebooks
- return all notebooks

GET /api/notebooks/:id
- if id doesn't exist return 404
- return notebook info

PUT /api/notebooks/:id
- return 404 if id doesn't exist
- if id exists update notebook info and return 200

DELETE /api/notebooks/:id
- return 404 if id doesn't exist
delete and return 204

GET /health
- return 200 and text up