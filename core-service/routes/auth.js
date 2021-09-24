const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = emailRegex.test(email.toLowerCase());

  if (!isValidEmail) return res.status(400).json({ err: 'Invalid email format'})

  const user = new User({
    username,
    email,
    password
  });

  try {
    const newUser = await user.save();
    res.json({ data: newUser});
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
