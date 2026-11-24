### 1. GET /api/stats (before changes)

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 127
ETag: W/"7f-IqxckOgFzSZX5lfek/CP+vyLA8w"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"total":7,"read":4,"unread":3,"averageRating":4.5,"byGenre":{"fantasy":2,"fiction":1,"science":2,"history":1,"non-fiction":1}}

### 2. GET list with two query parameters

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 235
ETag: W/"eb-ppgQX4eSHWrSTPUR709jLwGqLKg"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":5,"title":"The Name of the Wind","author":"Patrick Rothfuss","year":2007,"genre":"fantasy","read":false,"rating":null},{"id":1,"title":"The Hobbit","author":"J.R.R. Tolkien","year":1937,"genre":"fantasy","read":true,"rating":5}]

### 3. GET one book

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 108
ETag: W/"6c-wksYbf6e3ZJvQpjSjKuybvZ7BPQ"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":1,"title":"The Hobbit","author":"J.R.R. Tolkien","year":1937,"genre":"fantasy","read":true,"rating":5}

### 4. POST 201 Created

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-3Ef/rOy4GIlukhDBH+/Y2SNElj0"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Request body is not valid JSON"}curl: (3) unmatched close brace/bracket in position 39:
Herbert","year":1965,"genre":"fiction"}
^

### 5. POST 400 invalid body

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 57
ETag: W/"39-2hxkQVGUygT77eAZY8u2BQSh9Ts"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"year must be an integer between 1000 and 2026"}

### 6. GET 400 repeated query parameter

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 58
ETag: W/"3a-6mT0mDMdSpAfOdjXJoHaV9ooo4w"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Query parameter \"genre\" must not be repeated"}

### 7. GET 404 missing book

HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-NCNuNg8Bq8kpSh64K6XedJL3BrE"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Book with id 999 not found"}

### 8. POST 409 duplicate

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-3Ef/rOy4GIlukhDBH+/Y2SNElj0"
Date: Tue, 24 Nov 2026 20:41:05 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Request body is not valid JSON"}curl: (3) unmatched close brace/bracket in position 39:
HERBERT","year":1965,"genre":"fiction"}
^

### 9. PATCH book 4

curl: (56) Recv failure: Connection was reset

### 10. PUT book 4

curl: (56) Recv failure: Connection was reset
curl: (6) Could not resolve host: Noah
curl: (3) unmatched close brace/bracket in position 38:
Harari","year":2011,"genre":"history"}
^

### 11. DELETE 204

HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Date: Tue, 24 Nov 2026 20:41:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### 12. DELETE again, 404

HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 36
ETag: W/"24-Lp+oxIj9Y3qlelrrZ9nE//0f6yY"
Date: Tue, 24 Nov 2026 20:41:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Book with id 6 not found"}

### 13. GET /api/stats (after changes)

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 127
ETag: W/"7f-1ofhDiJfHfMBTpWzIcAHZQlk7VA"
Date: Tue, 24 Nov 2026 20:41:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"total":6,"read":3,"unread":3,"averageRating":4.3,"byGenre":{"fantasy":2,"fiction":1,"science":1,"history":1,"non-fiction":1}}

## Self-Study and Research

During the development of this project, I researched several JavaScript, Vite, and Express techniques that were not fully covered in lectures.

### 1. URLSearchParams

I researched the `URLSearchParams` API to understand how to construct query strings safely. I used it to encode query parameters automatically and avoid problems with special characters and spaces.

### 2. localeCompare

I learned how JavaScript's `localeCompare()` method compares strings alphabetically. I applied it when sorting string values to achieve more reliable alphabetical ordering.

### 3. Vite Environment Variables

I researched how to access environment variables using `import.meta.env` in Vite. I learned that client-side environment variables must use the `VITE_` prefix to be exposed to application code. I applied this technique to manage configuration values.

### 4. HTTP 204 in Express

I researched how Express handles HTTP 204 responses. I learned that a 204 response must not contain a response body. I used `res.status(204).end()` when an operation completed successfully without needing to return data.

### 5. AbortController and AbortError

I researched how to cancel asynchronous fetch requests using `AbortController`. I learned how to pass an abort signal to `fetch()` and recognize an `AbortError` when a request is cancelled. This technique helps prevent unnecessary requests and handle cancellation properly.
