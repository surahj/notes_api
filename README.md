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

#### Sample Request

`curl -X POST -H "Content-Type: application/json" -d '{"username": "suraj", "password":"abcd123"}' https://notes-api-8h14.onrender.com/register | jq`

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

#### Sample Request

`curl -X POST -H "Content-Type: application/json" -d '{"username": "suraj", "password":"abcd123"}' https://notes-api-8h14.onrender.com/login | jq`

#### Sample Response

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE2NzY3NTkxMDYsImV4cCI6MTY3Njc2MjcwNn0.tG81rm_WO4hZlrLjZfXYMXSvwSgHhlh9817pAO5hGyg"
}
```


