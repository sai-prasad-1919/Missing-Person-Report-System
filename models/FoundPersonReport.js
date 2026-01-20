
const mongoose = require('mongoose');

const foundPersonReportSchema = new mongoose.Schema({
  reporterName: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  childName: String,
  approximateAge: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  foundLocation: {
    type: String,
    required: true
  },
  foundDate: {
    type: Date,
    required: true
  },
  photo: String,
  description: {
    type: String,
    required: true
  },

  district: {
    type: String,
    required: true
  },

  stationInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
    // Optional: Add officerInCharge, stationId, etc.
    // officerInCharge: String
  },

  caseStatus: {
    type: String,
    enum: ['Pending', 'In Progress', 'Solved', 'Closed'],
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

module.exports = mongoose.model('FoundPersonReport', foundPersonReportSchema);















// part-1 model
// const mongoose = require('mongoose');

// const foundPersonReportSchema = new mongoose.Schema({
//   reporterName: {
//     type: String,
//     required: true
//   },
//   contactInfo: {
//     phone: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     }
//   },
//   childName: String,
//   approximateAge: {
//     type: Number,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'],
//     required: true
//   },
//   foundLocation: {
//     type: String,
//     required: true
//   },
//   foundDate: {
//     type: Date,
//     required: true
//   },
//   photo: String,
//   description: {
//     type: String,
//     required: true
//   },
//   handedToPolice: {
//     type: Boolean,
//     default: false
//   },

//   // Case status tracking
//   caseStatus: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Solved', 'Closed'],
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

// module.exports = mongoose.model('FoundPersonReport', foundPersonReportSchema);
