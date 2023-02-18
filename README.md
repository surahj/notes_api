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

`curl https://notes-api-8h14.onrender.com/register`

#### Sample Response

```
{
  "categories": {
    "1": "Science",
    "2": "Art",
    "3": "Geography",
    "4": "History",
    "5": "Entertainment",
    "6": "Sports"
  }
}
```
