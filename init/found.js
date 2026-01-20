require('dotenv').config();
const mongoose = require('mongoose');
const FoundPersonReport = require('../models/FoundPersonReport'); // Adjust the path if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/missing-person-db2")
.then(() => {
  console.log('Connected to DB');
  seedData();
}).catch(err => console.error('MongoDB connection error:', err));

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const genders = ['Male', 'Female', 'Other'];
const locations = ['City Park', 'Train Station', 'Downtown', 'Mall', 'Hospital', 'Bus Stop'];
const descriptions = [
  'Wearing a red jacket and jeans.',
  'Appears disoriented and unable to speak clearly.',
  'Seen near the entrance repeatedly.',
  'Possibly underage and alone.',
  'May require medical attention.',
  'Very quiet and not responding to questions.'
];
const names = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Casey', 'Jamie', 'Morgan', 'Riley'];

async function seedData() {
  try {
    await FoundPersonReport.deleteMany({}); // Clear existing data (optional)

    const reports = [];

    for (let i = 0; i < 50; i++) {
      const report = new FoundPersonReport({
        reporterName: `Reporter ${i + 1}`,
        contactInfo: {
          phone: `999-000-${String(i).padStart(4, '0')}`,
          email: `reporter${i + 1}@example.com`
        },
        approximateAge: Math.floor(Math.random() * 50) + 5,
        gender: getRandomItem(genders),
        foundLocation: getRandomItem(locations),
        foundDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // last 30 days
        photo: '', // can be a placeholder or left blank
        description: getRandomItem(descriptions),
        handedToPolice: Math.random() > 0.5,
        caseStatus: 'Pending'
      });

      reports.push(report);
    }

    await FoundPersonReport.insertMany(reports);
    console.log('✅ Seeded 50 found person reports.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding found person reports:', err);
    process.exit(1);
  }
}
