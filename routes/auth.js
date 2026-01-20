const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path if needed



// GET login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// GET register page
router.get('/register', (req, res) => {
    res.render('auth/register');
  });

// POST register form
router.post('/register', async (req, res) => {
  const { fullName, email, password, phone } = req.body;
  console.log("the req.body",req.body);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', {
        title: 'Register',
        error: 'Email already in use.'
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      phone
    });

    await newUser.save();

    // res.send(`Thanks for registering, ${fullName}!`);/
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log("The req.body for login ",req.body);
  try {
    const user = await User.findOne({ email });
console.log("The user deatils ",user)
    if (!user || user==null) {
      return res.render('auth/login', {
        title: 'User Login',
        error: 'Invalid email or password'
      });
    }

    const isMatch = await user.comparePassword(password);
    console.log("is match",isMatch);
    if (isMatch) {
      // Password is correct
      req.session.user = true;
      res.redirect('/dashboard');
    } else {
      res.render('auth/login', {
        title: 'User Login',
        error: 'Invalid email or password'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get("/logout" ,(req,res)=>{
  console.log("Logging out");
  req.session.destroy();
  res.redirect("/");
})
module.exports = router;
















// const express = require('express');
// const router = express.Router();

// // GET login page
// router.get('/login', (req, res) => {
//   res.render('auth/login');
// });

// // POST login handler (for future use)
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
  
//   // Add your user authentication logic here
//   if (email && password) {
//       res.redirect('/dashboard?type=user');
//   } else {
//       res.render('auth/login', {
//           title: 'User Login',
//           error: 'Invalid credentials'
//       });
//   }
// });

// // GET register page
// router.get('/register', (req, res) => {
//     res.render('auth/register');
//   });
  
//   // POST register form
//   router.post('/register', (req, res) => {
//     const { fullName, email, password, phone } = req.body;
  
//     // Simulate storing in DB (MongoDB logic will be added later)
//     console.log('New User:', { fullName, email, password, phone });
  
//     res.send(`Thanks for registering, ${fullName}!`);
//   });
  
// module.exports = router;
