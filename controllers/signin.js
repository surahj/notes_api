const handleSignin = (db, bcrypt, jwt, secret) => async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('kindly provide username and password');
  }

  try {
    const user = await db.select('*').from('users').where('username', '=', username).first();
    if (!user) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  handleSignin: handleSignin
}
