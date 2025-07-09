const express = require('express');
const router = express.Router();

// Placeholder routes
router.get('/', (req, res) => {
  res.send('GET all messages');
});

module.exports = router;