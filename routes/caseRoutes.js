

const express = require('express');
const router = express.Router();

const MissingPersonReport = require('../models/MissingPersonReport');
const FoundPersonReport = require('../models/FoundPersonReport');

function isLoggedIn(req,res,next){
  if(!req.session.user){
    return res.redirect("/login");
  }
  next();
}

// Parent-reported (Missing Person) cases
router.get('/cases/parent', isLoggedIn, async (req, res) => {
    try {
        const reports = await MissingPersonReport.find({
            caseStatus: { $in: ['Pending', 'In Progress'] }
        }).sort({ createdAt: -1 });

        res.render('cases/parentCases', { 
            title: 'Parent Report Cases',
            isDashboard: true,
            reports
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching parent-reported cases');
    }
});

// Public-reported (Found Person) cases
router.get('/cases/public', isLoggedIn, async (req, res) => {
    try {
        const reports = await FoundPersonReport.find({
            caseStatus: { $in: ['Pending', 'In Progress'] }
        }).sort({ createdAt: -1 });

        res.render('cases/publicCases', { 
            title: 'Public Reported Cases',
            isDashboard: true,
            reports
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching public-reported cases');
    }
});


module.exports = router;
