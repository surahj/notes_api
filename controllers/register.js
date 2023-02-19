const handleRegister = async(req, res, db, bcrypt) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('kindly provide username and password');
  }

  try {
    const user = await db.select('username').from('users').where('username', '=', username).first();
    if (user) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const hashedPassword = await bcrypt.hashSync(password);
    await db.transaction((trx) => {
      trx('users')
        .insert({ username, password: hashedPassword })
        .then(() => {
          return trx('users').where('username', username).select('username', 'id');
        })
        .then(([user]) => {
          res.status(201).json({ user: user.username });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  handleRegister: handleRegister
};
