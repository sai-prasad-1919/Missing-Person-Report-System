const express = require('express');
const router = express.Router();

// Route for user guide
router.get('/user-guide', (req, res) => {
  res.render('guide/user-guide', { title: 'User Guide - Missing Person Report System' });
});

module.exports = router;
