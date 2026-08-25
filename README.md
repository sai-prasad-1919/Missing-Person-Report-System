# 🔍 Missing Person Finder System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

A full-stack web application to **report, track, and manage missing person cases** digitally — built for both the public and police authorities.

> 🎓 **Academic Minor Project** | Domain: Web Development | Year: 2024–2025

</div>

---

## 📌 Project Overview

The **Missing Person Finder System** is a web-based platform that digitizes the process of reporting and managing missing person cases. It provides two portals:

- **Public / User Portal** — Citizens can register, log in, and view active missing and found person cases.
- **Admin / Police Portal** — Authorized officers can submit new reports with photos, view all cases, and update case statuses throughout the investigation lifecycle.

The project follows a clean **MVC (Model–View–Controller)** architecture with server-side rendering using EJS templates and a secure Express.js backend connected to MongoDB Atlas.

---

## ✨ Features

### 👤 User Features
- Register and log in securely (password hashed with bcrypt)
- View all active **Missing Person** cases
- View all active **Found Person** cases
- Session-based authentication with auto logout

### 👮 Admin Features
- Secure admin login panel
- Submit **Missing Person** reports with photo uploads
- Submit **Found Person** reports with photo uploads
- View all missing and found reports
- Update **Case Status** (`Pending → In Progress → Solved / Closed`)
- Cloud-hosted image storage via **Cloudinary**

### 🔐 Security Features
- Passwords hashed using **bcrypt** (salt rounds: 10)
- Session-based authentication with **express-session**
- Route protection middleware (`isLoggedIn`, `isAdminLoggedIn`)
- Sensitive credentials stored in `.env` (never pushed to GitHub)
- Multer file filter — only `jpeg/jpg/png/gif` files, max **5MB**

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js v5** | Web framework for routing and middleware |
| **MongoDB** | NoSQL database for storing all reports |
| **Mongoose** | ODM for schema modeling and DB queries |
| **bcrypt** | Secure password hashing |
| **express-session** | Session-based user and admin authentication |
| **Multer** | File upload middleware (memory storage) |
| **Cloudinary** | Cloud image storage and CDN delivery |
| **dotenv** | Environment variable management |
| **method-override** | Enables PUT/DELETE requests from HTML forms |

### Frontend
| Technology | Purpose |
|---|---|
| **EJS** | Server-side templating engine |
| **ejs-mate** | Layout and partials support for EJS |
| **Bootstrap** | Responsive CSS framework |
| **HTML / CSS / JavaScript** | Core web technologies |

### Tools
| Tool | Purpose |
|---|---|
| **Git & GitHub** | Version control and code hosting |
| **VS Code** | Development IDE |
| **Postman** | API testing |
| **npm** | Package management |

---

## 📂 Project Structure

```
missing-person-finder/
│
├── models/                         # Mongoose schemas (Database layer)
│   ├── User.js                     # Public user schema + bcrypt hashing
│   ├── Admin.js                    # Police admin schema + role management
│   ├── MissingPersonReport.js      # Missing person case schema
│   └── FoundPersonReport.js        # Found person case schema
│
├── routes/                         # Express routes (Controller layer)
│   ├── home.js                     # GET / → Home page
│   ├── auth.js                     # /register, /login, /logout
│   ├── dashboard.js                # /dashboard (protected)
│   ├── caseRoutes.js               # /cases/parent, /cases/public
│   ├── admin.js                    # /admin/login, /admin/dashboard
│   ├── adminReports.js             # /admin/report-*, /admin/viewReports-*
│   ├── about.js                    # /about
│   ├── guide.js                    # /guide
│   └── woking.js                   # /woking (how it works)
│
├── middleware/
│   └── upload.js                   # Multer config (memoryStorage + Cloudinary)
│
├── views/                          # EJS templates (View layer)
│   ├── partials/
│   │   ├── header.ejs              # Shared navigation header
│   │   └── footer.ejs              # Shared footer
│   ├── home/                       # Home page
│   ├── auth/                       # Login & Register pages
│   ├── dashboard/                  # User dashboard
│   ├── cases/                      # Parent & public case views
│   ├── admin/                      # Admin dashboard, forms, report views
│   ├── about/                      # About page
│   ├── guide/                      # User guide page
│   └── woking/                     # How it works page
│
├── public/                         # Static assets
│   ├── css/                        # Stylesheets
│   ├── js/                         # Client-side JavaScript
│   └── images/                     # Static images
│
├── init/
│   ├── missing.js                  # Data seeder (50 sample missing reports)
│   └── found.js                    # Data seeder (sample found reports)
│
├── uploads/                        # Local upload fallback directory
├── app.js                          # Main application entry point
├── cloudConfig.js                  # Cloudinary SDK configuration
├── package.json
├── .env                            # Environment variables (not tracked by git)
└── .gitignore
```

---

## 🗄️ Database Schema

### 4 MongoDB Collections

**Users** — Public user accounts
```
fullName | email (unique) | password (hashed) | phone
```

**Admins** — Police officer accounts
```
adminId (unique) | name | station | email | password (hashed) | role (Admin/SuperAdmin)
```

**MissingPersonReports**
```
reporterType | reporterName | contactInfo { phone, email, address }
childName | age | gender | lastSeenLocation | lastSeenDate | photo (Cloudinary URL)
district | stationInfo { name, phone, location }
caseStatus (Pending/In Progress/Solved/Closed) | solvedBy (ref: Admin) | createdAt
```

**FoundPersonReports**
```
reporterName | contactInfo { phone, email }
childName | approximateAge | gender | foundLocation | foundDate | photo (Cloudinary URL) | description
district | stationInfo { name, phone, location }
caseStatus (Pending/In Progress/Solved/Closed) | solvedBy (ref: Admin) | createdAt
```

---

## 🔄 Case Status Lifecycle

```
[Submitted] → PENDING → IN PROGRESS → SOLVED
                                   ↘ CLOSED
```

---

## 🛣️ API Routes

### Public Routes
| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page |
| GET | `/register` | Registration page |
| POST | `/register` | Create user account |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Destroy session |
| GET | `/about` | About page |
| GET | `/guide` | User guide |
| GET | `/woking` | How it works |

### Protected User Routes (`isLoggedIn`)
| Method | Route | Description |
|---|---|---|
| GET | `/dashboard` | User dashboard |
| GET | `/cases/parent` | Active missing person cases |
| GET | `/cases/public` | Active found person cases |

### Admin Routes (`isAdminLoggedIn`)
| Method | Route | Description |
|---|---|---|
| GET | `/admin/login` | Admin login page |
| POST | `/admin/login` | Authenticate admin |
| GET | `/admin/dashboard` | Admin dashboard |
| GET | `/admin/reports-missing` | Add missing report form |
| POST | `/admin/report-missing` | Submit missing report + photo |
| GET | `/admin/reports-found` | Add found report form |
| POST | `/admin/report-found` | Submit found report + photo |
| GET | `/admin/viewReports-missing` | View all missing reports |
| GET | `/admin/viewReports-found` | View all found reports |
| GET | `/admin/reports-missing/:id/edit` | Edit missing case status |
| POST | `/admin/reports-missing/:id/edit` | Update missing case status |
| GET | `/admin/reports-found/:id/edit` | Edit found case status |
| POST | `/admin/reports-found/:id/edit` | Update found case status |
| GET | `/admin/logout` | Admin logout |

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Cloudinary account](https://cloudinary.com/) (free tier is fine)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sai-prasad-1919/Minor-Project.git
cd missing-person-finder
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create `.env` file in the root directory
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

ADMIN_ID= secure_admin_Id
ADMIN_PASSWORD=secure_admin_password
SESSION_SECRET=random_session_secret_string
```

### 4️⃣ Start the server
```bash
npm start
```

### 5️⃣ Open in browser
```
http://localhost:3000
```

### 🔐 Admin Access
```
URL:      http://localhost:3000/admin/login
Admin ID: (Set via ADMIN_ID in .env)
Password: (Set via ADMIN_PASSWORD in .env)
```

---

## 🌩️ Image Upload Flow

```
User selects photo on form
        ↓
Multer middleware (memoryStorage)
  → Validates: jpeg/jpg/png/gif only, max 5MB
  → File stored in RAM as Buffer (not on disk)
        ↓
Cloudinary SDK
  → Buffer converted to base64 string
  → Uploaded to 'missing-person-finder' folder
  → Returns secure HTTPS URL
        ↓
URL saved in MongoDB report document
        ↓
EJS template displays image via <img src="...">
```

---

## 👨‍🎓 Academic Information

| Field | Details |
|---|---|
| **Project Type** | Minor Project |
| **Submitted by** | Sai Prasad |
| **Technology** | Node.js, Express.js, MongoDB |
| **Architecture** | MVC (Model-View-Controller) |
| **Year** | 2024–2025 |

---

## 🔮 Future Scope

- 🤖 **Face Recognition** — Auto-match missing and found person photos using AI
- 🗺️ **Map Integration** — Show last-seen/found locations on Google Maps
- 📱 **Mobile App** — React Native app for on-the-go access
- 🔔 **Real-time Alerts** — Socket.io notifications for new reports
- 📧 **Email/SMS Alerts** — Notify reporters when case status changes
- 🔍 **Advanced Search** — Filter by name, age, gender, district, date range
- 🔑 **JWT Authentication** — Stateless token-based auth for scalability

---

## ⭐ Acknowledgement

If you found this project useful or interesting, please give it a ⭐ on GitHub — it means a lot!

---

<div align="center">
  Made with ❤️ by <strong>Sai Prasad</strong>
</div>
