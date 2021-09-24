const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = emailRegex.test(email.toLowerCase());

  if (!isValidEmail) return res.status(400).json({ error: 'Invalid email format'});
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be 6 or more characters in length' });

  const doesEmailExist = await User.findOne({ email });
  if (doesEmailExist) return res.status(400).json({ error: 'Account with this email already exists' });

  const doesUsernameExist = await User.findOne({ username });
  if (doesUsernameExist) return res.status(400).json({ error: 'Username is taken' });

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPass
  });

  try {
    const newUser = await user.save();
    res.json({ data: { userId: newUser._id, username: newUser.username } });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
