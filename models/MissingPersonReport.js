// const mongoose = require('mongoose');

// const missingPersonReportSchema = new mongoose.Schema({
//   reporterType: {
//     type: String,
//     enum: ['Parent', 'Guardian'],
//     required: true
//   },
//   reporterName: String,
//   contactInfo: {
//     phone: String,
//     email: String,
//     address: String
//   },
//   childName: String,
//   age: Number,
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other']
//   },
//   lastSeenLocation: String,
//   lastSeenDate: Date,
//   photo: String, // image URL or path
//   description: String,

//   // Case status tracking
//   caseStatus: {
//     type: String,
//     enum: ['Pending', 'Solved', 'Closed',"In Progress"],
//     default: 'Pending'
//   },
//   solvedAt: Date,
//   solvedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Admin'
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('MissingPersonReport', missingPersonReportSchema);
// part-1 model working








const mongoose = require('mongoose');

const missingPersonReportSchema = new mongoose.Schema({
  reporterType: {
    type: String,
    enum: ['Parent', 'Guardian', 'Other'],
    required: true
  },
  reporterName: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  childName: String,
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  lastSeenLocation: String,
  lastSeenDate: Date,
  photo: String,
  description: String,

  // New district and stationInfo fields
  district: {
    type: String,
    required: true
  },
  stationInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true }
  },

  caseStatus: {
    type: String,
    enum: ['Pending', 'Solved', 'Closed', 'In Progress'],
    default: 'Pending'
  },
  solvedAt: Date,
  solvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MissingPersonReport', missingPersonReportSchema);
