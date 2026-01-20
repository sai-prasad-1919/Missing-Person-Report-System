# 🧑‍🚀 Missing Person Finder System

A web-based application designed to report, manage, and search missing person cases efficiently.  
This system helps authorities and the public by digitizing missing person records with image uploads and search functionality.

> 🎓 Academic Minor Project  
> Domain: Web Development

---

## 📌 Project Overview

The **Missing Person Finder System** allows users to register missing persons, upload images, and search through existing records.  
It follows a clean **MVC architecture** and provides a secure backend for data handling.

---

## ✨ Features

- Add missing person details
- Upload and store images securely
- Search missing persons
- View complete person information
- Delete records
- MVC architecture
- Secure environment variables
- Clean UI using EJS templates

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (File Upload)
- Cloudinary (Image Storage)
- dotenv

### Frontend
- EJS Templates
- HTML, CSS, JavaScript
- Bootstrap

### Tools
- Git & GitHub
- VS Code
- Postman
- npm

---

## 📂 Project Structure

missing-person-finder/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
├── public/
├── uploads/
│
├── app.js
├── cloudConfig.js
├── package.json
└── .env

---

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sai-prasad-1919/Minor-Project.git

2️⃣ Go to project folder
cd missing-person-finder

3️⃣ Install dependencies
npm install

4️⃣ Create .env file
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

5️⃣ Start the server
npm start


Open browser:

http://localhost:3000

## Screen Shots
Create a folder named screenshots/ and add images.

![Home](screenshots/home.png)
![Add Person](screenshots/add.png)
![List Page](screenshots/list.png)

🔐 Security Features

Environment variables for secrets
Input validation
Secure file uploads
Modular MVC structure

👨‍🎓 Academic Information

Project Type: Minor Project
Submitted by: Sai Prasad
Technology: Node.js, Express, MongoDB
Year: 2025–2026

⭐ Acknowledgement

If you like this project, please give it a ⭐ on GitHub!
