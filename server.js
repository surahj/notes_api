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

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('status OK');
});

const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(32).toString('hex');
console.log(JWT_SECRET);



app.post('/login', signin.handleSignin(db, bcrypt, jwt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, jwt) });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
