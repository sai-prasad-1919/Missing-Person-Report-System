const express = require('express');
const router = express.Router();

router.get('/learn-working', (req, res) => {
  res.render('woking/learn-working');
});

module.exports = router;

