const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const validateEmail = require('../utils/validateEmail');
const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const isValidEmail = validateEmail(email);

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
    email: email.toLowerCase(),
    password: hashedPass
  });

  try {
    const newUser = await user.save();
    return res.status(201).json({ data: { userId: newUser._id, username: newUser.username } });
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user, err = [];
  if (!email) err.push('email is required to log in');
  if (!password) err.push('password is required to log in');
  if (err.length) return res.status(400).json({ error: err });
  if (validateEmail(email)) user = await User.findOne({ email });
  else user = await User.findOne({ username: email });

  if (!user) return res.status(400).json({ error: 'Invalid username or password' });
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).json({ error: 'Invalid username or password' });
  return res.status(200).json({ data: { message: 'Successful login' } });
});

module.exports = router;
