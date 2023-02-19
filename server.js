require("dotenv").config();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const config = require('./knexfile');
const jwt = require('jsonwebtoken');

const express = require('express');
const cors = require('cors');

const db = knex(config);

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const notes = require('./controllers/notes');

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('status OK');
});


const secret = process.env.JWT_SECRET;
const encodedSecret = Buffer.from(secret).toString('base64');


app.post('/login', signin.handleSignin(db, bcrypt, jwt, encodedSecret));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post('/notes', (req, res) => {notes.createNotes(req, res, db, jwt, encodedSecret)});
app.put('/notes/:id', (req, res) => {notes.updateNote(req, res, db, jwt, encodedSecret)});
app.get('/notes/:id', (req, res) => { notes.getNote(req, res, db, jwt, encodedSecret) });
app.delete('/notes/:id', (req, res) => { notes.deleteNote(req, res, db, jwt, encodedSecret) });
app.get('/notes', (req, res) => { notes.readNotes(req, res, db, jwt, encodedSecret) });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
