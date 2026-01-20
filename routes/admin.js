const express = require('express');
const session = require('express-session');
const router = express.Router();

// // Use express-session middleware (this should be in your main app.js/server.js file)
// const app = express();
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));

// Middleware to protect admin dashboard
function isAdminLoggedIn(req, res, next) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// GET admin login
router.get('/admin/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login', error: null });
});

// updated working condition good
// POST admin login
router.post('/admin/login', (req, res) => {
  const { adminId, password } = req.body;

  if (adminId !== 'admin') {
    return res.render('admin/login', {
      title: 'Admin Login',
      error: 'Invalid ID',
      adminId: adminId
    });
  }

  if (password !== 'admin123') {
    return res.render('admin/login', {
      title: 'Admin Login',
      error: 'Invalid Password',
      adminId: adminId
    });
  }

  req.session.isAdmin = true;
  res.redirect('/admin/dashboard');
});


// -------------Good Working -----------
// Comment out if get any error for above one 

// POST admin login
// router.post('/admin/login', (req, res) => {
//   const { adminId, password } = req.body;

//   if (adminId === 'admin' && password === 'admin123') {
//     req.session.isAdmin = true; // Mark user as logged in
//     res.redirect('/admin/dashboard');
//   } else {
//     res.render('admin/login', {
//       title: 'Admin Login',
//       error: 'Invalid credentials'
//     });
//   }
// });

// GET admin dashboard (protected)
router.get('/admin/dashboard', isAdminLoggedIn, (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Optional: admin logout
router.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

module.exports = router;
