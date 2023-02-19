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


app.post('/test', async (req, res) => {
  try {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Extract the note data from the request body
    const { title, content } = req.body;

    // Insert the note into the database
    const [note] = await db('notes')
      .insert({ user_id: userId, title, content })
      .returning('*');

    // Return the newly created note
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/login', signin.handleSignin(db, bcrypt, jwt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, jwt) });

app.post('/notes', async (req, res, next) => {
  const { title, content } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!title || !content) {
    return res.status(400).json({ error: 'please provide a title and content for the note' });
  }

  try {
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);
    await db('notes').insert({ user_id: userId, title, content });
    res.status(201).json({ message: 'note created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
