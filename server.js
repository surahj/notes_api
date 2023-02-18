require("dotenv").config();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const config = require('./knexfile');


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



db.select('*')
  .from('mytable')
  .then(rows => {
    console.log(rows);
  })
  .catch(error => {
    console.log(error);
  });

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
