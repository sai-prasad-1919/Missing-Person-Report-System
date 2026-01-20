const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/index', { title: 'Missing Person Report System' });
});

// router.get('/woking/learn-working', (req, res) => {
//   res.render('woking/learn-working');
// });

module.exports = router;
