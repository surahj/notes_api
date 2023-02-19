# notes_api

## Introduction
A simple API backend that allows users to create, read, update and delete notes. It includes a login system and the ability to
save notes to a remote database


## Getting Started

This project makes use of **Node**, **Express** for the backend **Knex** and **PostgreSQL** for the database.

**BASE URL**: `https://notes-api-8h14.onrender.com`

## Error Handling

### Response Object

Errors are returned as JSON in the following format:

```
{
    "error": "message"
}
```

### Response Keys

`message` - Accompanying error message.

## Endpoint Library

### Register

### `POST /register`

This register a new user.

#### Query Parameters

This endpoint takes in no query parameter.

#### Request Body

`username`: string <small> (required) </small> - Username of the new user. <br>
`password`: string <small> (required) </small> - Password of the new user. <br>

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE

#### Sample Request

`curl -X POST -H "Content-Type: application/json" -d '{"username": "suraj", "password":"abcd123"}' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/register | jq`

#### Sample Response

```
{
  "user": "suraj"
}
```

### login

### `POST /login`

Log in a new user and return token for authentication, the token expires after one hour.

#### Query Parameters

This endpoint takes in no query parameter.

#### Request Body

`username`: string <small> (required) </small> - Username of the user. <br>
`password`: string <small> (required) </small> - Password of the user. <br>

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE


#### Sample Request

`curl -X POST -H "Content-Type: application/json" -d '{"username": "suraj", "password":"abcd123"}' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/login`

#### Sample Response

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE2NzY3NTkxMDYsImV4cCI6MTY3Njc2MjcwNn0.tG81rm_WO4hZlrLjZfXYMXSvwSgHhlh9817pAO5hGyg"
}
```

### notes

### `POST /notes`

Create a notes for a user and return unique id of the note to perform other operation like UPDATE, DELETE and GET

#### Query Parameters

This endpoint takes in no query parameter.

#### Request Body

`title`: string <small> (required) </small> - Title of the notes. <br>
`content`: string <small> (required) </small> - Content of the notes. <br>

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE


#### Sample Request

`curl -X POST -H "Content-Type: application/json" -d '{ "title": "What i learned today","content": "knex transaction"}' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/notes`

#### Sample Response

```
{
    "message": "note created successfully",
    "uniqueId": "7a92b3eb-a284-4b2f-af33-81e557884710"
}
```


### `PUT /notes`

Updates the title or contents of the notes using a unique notes id

#### Parameters

"uniqueId": "7a92b3eb-a284-4b2f-af33-81e557884710"

#### Request Body

`title`: string <small> (required) </small> - Title of the notes. <br>
`content`: string <small> (required) </small> - Content of the notes. <br>

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE


#### Sample Request

`curl -X PUT -H "Content-Type: application/json" -d '{ "title": "What i learned today","content": "knex transaction and How to use jwt for authentication in node app"}' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/notes/7a92b3eb-a284-4b2f-af33-81e557884710`

#### Sample Response

```
{
    "message": "note updated successfully"
}
```

### `GET /notes`

Get a single note using uniqueId

#### Parameters

"uniqueId": "7a92b3eb-a284-4b2f-af33-81e557884710"

#### Request Body

This endpoint has no request body

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE


#### Sample Request

`curl -X GET -H "Content-Type: application/json" -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/notes/7a92b3eb-a284-4b2f-af33-81e557884710`

#### Sample Response

```
{
    "user_id": 14,
    "title": "What i learned today",
    "content": "knex transaction and How to use jwt for authentication in node app",
    "created_at": "2023-02-19T08:50:19.319Z",
    "updated_at": "2023-02-19T08:50:19.319Z",
    "id": 10,
    "note_id": "7a92b3eb-a284-4b2f-af33-81e557884710"
}
```


### `GET /notes`

Get all notes for a loged in user

#### Parameters

This endpoint has no parameters

#### Request Body

This endpoint has no request body

### Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE

#### Sample Request

`curl -X GET -H "Content-Type: application/json" -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTmFtZSI6InN1cmFoaiIsImlhdCI6MTY3Njc5NjQ1MSwiZXhwIjoxNjc2ODE0NDUxfQ.BQG2G2GcJ5OmPFLmvH57nJv0YrtwKttL6_5iVzFQDmE' https://notes-api-8h14.onrender.com/notes`

#### Sample Response

```
{
    "notes": [
        {
            "user_id": 14,
            "title": " This is title",
            "content": "My forst note api",
            "created_at": "2023-02-19T02:30:15.609Z",
            "updated_at": "2023-02-19T02:30:15.609Z",
            "id": 1,
            "note_id": null
        },
        {
            "user_id": 14,
            "title": "My todo list of the day",
            "content": "complete uptick talent task",
            "created_at": "2023-02-19T08:34:09.546Z",
            "updated_at": "2023-02-19T08:34:09.546Z",
            "id": 9,
            "note_id": "505ebd68-3be8-4ce6-816b-0f86f92463df"
        },
        {
            "user_id": 14,
            "title": "What i learned today",
            "content": "knex transaction and How to use jwt for authentication in node app",
            "created_at": "2023-02-19T08:50:19.319Z",
            "updated_at": "2023-02-19T08:50:19.319Z",
            "id": 10,
            "note_id": "7a92b3eb-a284-4b2f-af33-81e557884710"
        }
    ]
}
```
