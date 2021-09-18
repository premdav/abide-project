const { Router } = require('express');
const router = Router();

router.route('/')
  .get((req, res) => res.send('getting users'));

router.route('/:id')
  .get((req, res) => res.status(200));

module.exports = router;
