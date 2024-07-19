const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    await user.save();
    res.send('User registered successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('Authorization', token).send(token);
});

module.exports = router;
