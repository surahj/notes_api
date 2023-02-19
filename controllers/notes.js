const { v4: uuidv4 } = require('uuid');


const createNotes = async (req, res, db, jwt, secret) => {
  const { title, content } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const uniqueId = uuidv4();

  if (!title || !content) {
    return res.status(400).json({ error: 'please provide a title and content for the note' });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    await db('notes').insert({ user_id: userId, title, content, note_id: uniqueId });
    res.status(201).json({ message: 'note created successfully', uniqueId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const updateNote = async (req, res, db, jwt, secret) => {
  const { title, content } = req.body;
  const noteId = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!title && !content) {
    return res.status(400).json({ error: 'please provide a title or content to update the note' });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    // Check if the note belongs to the user
    const note = await db('notes').where({ note_id: noteId, user_id: userId }).first();
    if (!note) {
      return res.status(404).json({ error: 'note not found' });
    }

    // Update the note
    await db('notes').where({ note_id: noteId }).update({ title, content });

    res.status(200).json({ message: 'note updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getNote = async (req, res, db, jwt, secret) => {
  const noteId = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    // Check if the note belongs to the user
    const note = await db('notes').where({ note_id: noteId, user_id: userId }).first();
    if (!note) {
      return res.status(404).json({ error: 'note not found' });
    }

    res.status(200).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const deleteNote = async (req, res, db, jwt, secret) => {
  const noteId = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    // Check if the note belongs to the user
    const note = await db('notes').where({ note_id: noteId, user_id: userId }).first();
    if (!note) {
      return res.status(404).json({ error: 'note not found' });
    }

    // Delete the note
    await db('notes').where({ note_id: noteId }).del();

    res.status(200).json({ message: 'note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const readNotes = async (req, res, db, jwt, secret) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;

    // Retrieve all notes belonging to the user
    const notes = await db('notes').where({ user_id: userId });

    res.status(200).json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = {
  createNotes,
  updateNote,
  getNote,
  deleteNote,
  readNotes
};
