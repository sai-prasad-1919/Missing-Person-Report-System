const express = require('express');
const MissingPersonReport = require('../models/MissingPersonReport');
const FoundPersonReport = require('../models/FoundPersonReport');
const upload = require('../middleware/upload'); // Adjust path if needed
const router = express.Router();

function isAdminLoggedIn(req, res, next) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Get all Missing Reports



router.get('/reports-missing', isAdminLoggedIn, async (req, res) => {
  try {
    // const reports = await MissingPersonReport.find();
    res.render("admin/report-missing.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving missing reports.');
  }
});

// Get all Found Reports
router.get('/reports-found', isAdminLoggedIn, async (req, res) => {
  try {
    // const reports = await FoundPersonReport.find();
    res.render("admin/report-found.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving found reports.');
  }
});







router.post('/report-missing', upload.single('photo'), async (req, res) => {
  try {
    const {
      reporterName, reporterType, phone, email, address,
      childName, age, gender, lastSeenLocation, lastSeenDate, description,
      district, stationName, stationPhone, stationLocation
    } = req.body;

    const photo = req.file ? req.file.path : null;

    const report = new MissingPersonReport({
      reporterName,
      reporterType,
      contactInfo: { phone, email, address },
      childName,
      age,
      gender,
      lastSeenLocation,
      lastSeenDate,
      photo,
      description,
      district,
      stationInfo: {
        name: stationName,
        phone: stationPhone,
        location: stationLocation
      }
    });

    await report.save();
    console.log("✅ Missing person report submitted successfully.");
    res.redirect("/admin/viewReports-missing");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting missing report.');
  }
});



// part-1 code working
// router.post('/report-missing', upload.single('photo'), async (req, res) => {
//   try {
//     const {
//       reporterName, reporterType, phone, email, address,
//       childName, age, gender, lastSeenLocation, lastSeenDate, description
//     } = req.body;

//     const photo = req.file ? req.file.path : null;

//     const report = new MissingPersonReport({
//       reporterName,
//       reporterType,
//       contactInfo: { phone, email, address },
//       childName,
//       age,
//       gender,
//       lastSeenLocation,
//       lastSeenDate,
//       photo,
//       description
//     });

//     await report.save();
//     console.log("Missing person report submitted successfully.");
//     res.redirect("/admin/viewReports-missing");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error submitting missing report.');
//   }
// });




router.post('/report-found', upload.single('photo'), async (req, res) => {
  try {
    const {
      reporterName, phone, email,
      approximateAge, gender, foundLocation, foundDate, description,
      district,
      stationName, stationPhone, stationLocation
    } = req.body;

    const photo = req.file ? req.file.path : null;

    const report = new FoundPersonReport({
      reporterName,
      contactInfo: { phone, email },
      childName: req.body.childName || '',
      approximateAge,
      gender,
      foundLocation,
      foundDate,
      description,
      district,
      photo,
      stationInfo: {
        name: stationName,
        phone: stationPhone,
        location: stationLocation
      }
    });

    await report.save();
    console.log("✅ Found person report submitted.");
    res.redirect("/admin/viewReports-found");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting found report.');
  }
});



// part-1 part under update
// router.post('/report-found', upload.single('photo'), async (req, res) => {
//   try {
//     const {
//       reporterName, phone, email,
//       approximateAge, gender, foundLocation, foundDate, description,
//       handedToPolice
//     } = req.body;

//     const photo = req.file ? req.file.path : null;

//     const report = new FoundPersonReport({
//       reporterName,
//       contactInfo: { phone, email },
//       childName: req.body.childName || '',
//       approximateAge,
//       gender,
//       foundLocation,
//       foundDate,
//       description,
//       handedToPolice: handedToPolice === 'on',
//       photo
//     });

//     await report.save();
//     console.log("📷 Found person report submitted with photo.");
//     res.redirect("/admin/viewReports-found");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error submitting found report.');
//   }
// });



// Get all Missing Reports
router.get('/viewReports-missing',isAdminLoggedIn, async (req, res) => {
  try {
    const reports = await MissingPersonReport.find().sort({ createdAt: -1 });
    console.log("The reports : ",reports)
    res.render("admin/viewReport-missings.ejs", { reports });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving missing reports.');
  }
});

// Render the status‐edit form
router.get('/reports-missing/:id/edit',isAdminLoggedIn, async (req, res) => {
  try {
    const report = await MissingPersonReport.findById(req.params.id);
    if (!report) return res.status(404).send('Report not found');
    res.render('admin/edit-missing-status.ejs', { report });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading status form.');
  }
});

// Handle form submission to update status
router.post('/reports-missing/:id/edit', async (req, res) => {
  try {
    const { caseStatus } = req.body;
    await MissingPersonReport.findByIdAndUpdate(
      req.params.id,
      { caseStatus },
      { new: true, runValidators: true }
    );
    res.redirect('/admin/viewReports-missing');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating case status.');
  }
});








// Get all Found Reports (Card View)
router.get('/viewReports-found',isAdminLoggedIn, async (req, res) => {
  try {
    const reports = await FoundPersonReport.find().sort({ createdAt: -1 });
    console.log("the found report ares : ",reports);
    res.render("admin/viewReport-found.ejs", { reports });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving found reports.');
  }
});

// GET form
router.get('/reports-found/:id/edit',isAdminLoggedIn, async (req, res) => {
  try {
    const report = await FoundPersonReport.findById(req.params.id);
    if (!report) {
      return res.status(404).send('Report not found');
    }
    res.render('admin/edit-found-status.ejs', { report });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading status form.');
  }
});

// POST update
router.post('/reports-found/:id/edit', async (req, res) => {
  try {
    const { caseStatus } = req.body;
    await FoundPersonReport.findByIdAndUpdate(req.params.id, { caseStatus });
    res.redirect('/admin/viewReports-found');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating case status.');
  }
});


router.get("/dashboard", isAdminLoggedIn, (req,res)=>{
  res.render("admin/dashboard.ejs");
})
module.exports = router;
