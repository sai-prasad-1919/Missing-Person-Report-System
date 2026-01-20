const express = require('express');
const router = express.Router();

function isLoggedIn(req,res,next){
  if(!req.session.user){
    return res.redirect("/login");
  }
  next();
}

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard/index', { 
        title: 'Dashboard',
        userType: req.query.type || 'user'
    });
});

module.exports = router;