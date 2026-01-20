const mongoose = require('mongoose');
const MissingPersonReport = require('../models/MissingPersonReport'); // Adjust the path if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/missing-person-db2").then(() => {
  console.log('✅ Connected to MongoDB');
  seedData();
}).catch(err => console.error('❌ MongoDB connection error:', err));

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const reporterTypes = ['Parent', 'Guardian'];
const genders = ['Male', 'Female', 'Other'];
const locations = ['School', 'Market', 'Playground', 'Home', 'Park', 'Street'];
const names = ['Ava', 'Liam', 'Noah', 'Mia', 'Emma', 'Lucas', 'Zara', 'Ethan', 'Sophia', 'Jayden'];
const descriptions = [
  'Was last seen wearing a yellow hoodie.',
  'Very active and playful, usually stays nearby.',
  'Reported missing after a family gathering.',
  'Went missing during a festival.',
  'Disappeared while playing with friends.',
  'May have wandered off looking for a pet.'
];

async function seedData() {
  try {
    await MissingPersonReport.deleteMany({}); // Clear existing data (optional)

    const reports = [];

    for (let i = 0; i < 50; i++) {
      const report = new MissingPersonReport({
        reporterType: getRandomItem(reporterTypes),
        reporterName: `Reporter ${i + 1}`,
        contactInfo: {
          phone: `888-000-${String(i).padStart(4, '0')}`,
          email: `parent${i + 1}@example.com`,
          address: `Street ${i + 10}, City`
        },
        childName: getRandomItem(names),
        age: Math.floor(Math.random() * 12) + 3, // Age between 3 and 15
        gender: getRandomItem(genders),
        lastSeenLocation: getRandomItem(locations),
        lastSeenDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000), // last 30 days
        photo: '', // Optional: Add a placeholder or leave blank
        description: getRandomItem(descriptions),
        caseStatus: Math.random() > 0.5 ? 'Pending' : 'In Progress'
      });

      reports.push(report);
    }

    await MissingPersonReport.insertMany(reports);
    console.log('✅ Seeded 50 missing person reports.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding missing reports:', err);
    process.exit(1);
  }
}
