var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('client/front_end/public/index.html', { root: '.' });
});

module.exports = router;
