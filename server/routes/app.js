var express = require('express');
var router = express.Router();

// Basic root test route
router.get('/', function (req, res, next) {
  res.send('API is working');
});

module.exports = router;