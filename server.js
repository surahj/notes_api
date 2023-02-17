const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

const config = require('./knexfile');

const db = knex(config.development);
const express = require('express');

const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const app = express();
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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
