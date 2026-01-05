# 📝 Online Examination System

A full-stack **Online Examination System** that allows administrators to create exams and students to attempt them securely with timed assessments, automatic grading, and result tracking.

---

## 🚀 Features

### 👩‍💼 Admin
- Secure login (JWT based)
- Create exams with time limits
- Add MCQ & subjective questions
- View student results

### 👨‍🎓 Student
- Secure authentication
- Attempt exams with live timer
- Answer MCQ & subjective questions
- Auto-submission on timeout
- View results & result history

### ⚙️ System
- JWT authentication & role-based access
- Auto grading for MCQs
- MongoDB database
- RESTful API architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- JWT Decode
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

---

## 📁 Project Structure

online-examination-system/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── auth/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file inside **backend/**

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

yaml
Copy code

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/online-examination-system.git
cd online-examination-system
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
Server will run on:

arduino
Copy code
http://localhost:5000
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Frontend will run on:

arduino
Copy code
http://localhost:3000
🔐 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user

Exams
Method	Endpoint	Description
POST	/api/exams	Create exam (Admin)
GET	/api/exams/:id	Get exam

Results
Method	Endpoint	Description
POST	/api/results/submit	Submit exam
GET	/api/results/my	Get student results

🧪 Sample Admin Credentials
json
Copy code
{
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}

🎯 Learning Outcomes
Full-stack web development

JWT authentication & authorization

REST API design

MongoDB schema modeling

React routing & hooks

Secure exam handling

🔒 Security Features
Password hashing using bcrypt

JWT token authentication

Role-based route protection

Randomized questions (optional)

🚧 Future Enhancements
Negative marking

Question randomization

Admin analytics dashboard

Export results as PDF

Email notifications

👩‍💻 Author
Lakshita Sharma
🎓 Computer Science Student
💻 Full-Stack Developer

⭐ Support
If you like this project, please ⭐ the repository on GitHub!

yaml
Copy code

---

## ✅ NEXT RECOMMENDED STEP
Want me to also provide:
- `.gitignore`
- Resume project description
- Viva explanation
- Deployment guide (Render / Vercel)
- Admin UI styling

Just tell me 🔥






