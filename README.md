# 📚 Smart Classroom Schedule System

A **Smart Classroom Scheduling System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This system helps institutions efficiently manage **faculty, courses, and classroom schedules**.

The application allows administrators to **create schedules, detect conflicts, view timetables, and manage academic resources** through an easy-to-use dashboard.

---

# 🚀 Features

## 🔐 Authentication
- Secure **Login and Signup**
- Only authorized users can access the system

## 📊 Dashboard
- Overview of the system
- Displays navigation to manage schedules, courses, and faculty

## 👨‍🏫 Faculty Management
- Add and manage faculty members
- Assign faculty to courses
- View faculty allocations

## 📘 Course Management
- Create and manage courses
- Assign courses to faculty

## 📅 Schedule Management
- Create classroom schedules
- Assign:
  - Course
  - Faculty
  - Day
  - Time

## ⚠️ Conflict Detection
- Detects scheduling conflicts automatically
- Alerts if:
  - Same faculty assigned to multiple classes at the same time
  - Same classroom scheduled twice

## 🗓 Calendar View
- Visual calendar view of schedules
- Easy weekly timetable tracking

## 🏫 Timetable System
- Displays program-wise timetable
- Shows:
  - Course
  - Faculty
  - Time slot

## 💡 Smart Suggestions
- Provides available scheduling suggestions
- Helps choose conflict-free time slots

## 🔔 Notification System
- Post important announcements
- View academic notifications

---

# 🛠 Tech Stack

## Frontend
- React.js
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Tools
- Axios
- React Router

---

# 📂 Project Structure

smart_classroom_schedule/

│

├── backend/

│   ├── models/                # MongoDB schemas

│   ├── routes/

│   │   └── schedule.js        # Schedule API routes

│   ├── server.js              # Express server

│   ├── package.json

│   └── package-lock.json

│

├── frontend/

│   ├── public/

│

│   ├── src/

│   │   ├── assets/            # Images and static files

│   │

│   │   ├── components/        # Reusable React components

│   │   │   ├── AvailableSuggestions.js

│   │   │   ├── CalendarView.js

│   │   │   ├── ConflictAlert.js

│   │   │   ├── CourseAllocation.js

│   │   │   ├── FacultyAllocation.js

│   │   │   ├── Navbar.js

│   │   │   ├── Notification.js

│   │   │   ├── ScheduleTable.js

│   │   │   └── Timetable.js

│   │

│   │   ├── pages/

│   │   │   ├── AdminPage.js

│   │   │   ├── CalendarPage.js

│   │   │   ├── CoursePage.js

│   │   │   ├── Dashboard.js

│   │   │   ├── FacultyPage.js

│   │   │   ├── LoginPage.js

│   │   │   ├── NotificationPage.js

│   │   │   ├── SchedulePage.js

│   │   │   ├── SignupPage.js

│   │   │   ├── SuggestionPage.js

│   │   │   └── TimetablePage.js

│   │

│   │   ├── utils/

│   │   │   └── conflictDetection.js

│   │

│   │   ├── App.js

│   │   ├── index.js

│   │   ├── App.css

│   │   └── styles.css

│

├── .gitignore

├── README.md

└── smart_classroom_schedule.zip

---

# ⚙️ Installation

## Clone Repository

git clone (https://github.com/Poornitha2023/Smart-classroom-scheduler-with-conflict-detection-project)

cd smart_classroom_schedule

---

## Backend Setup

cd backend

npm install

node server.js

Backend runs on:

http://localhost:5000

---

## Frontend Setup

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

---

# 📸 Screenshots

 **screenshots**

## login Page
<img width="1860" height="824" alt="image" src="https://github.com/user-attachments/assets/8bdff059-726d-47ab-b4cd-6b60f9f4e5a3" />

## dashboard Page
<img width="1850" height="847" alt="image" src="https://github.com/user-attachments/assets/0144da32-368e-4287-9d18-d032e389308d" />

## Faculty Page
<img width="1848" height="838" alt="image" src="https://github.com/user-attachments/assets/10a90852-f02a-4391-b70c-26720c57a586" />

## CoursesPage
<img width="1860" height="815" alt="image" src="https://github.com/user-attachments/assets/dad50cf0-2417-4e5e-8886-b2ca65593f8f" />

## schedule Page
<img width="1832" height="797" alt="image" src="https://github.com/user-attachments/assets/4e99732f-41f7-48ed-b0f5-bef15bc1d5d9" />

## timetable Page
<img width="1842" height="823" alt="image" src="https://github.com/user-attachments/assets/45645dca-6000-45a3-bfc4-b7a0e3092159" />

## Notifications Page
<img width="1856" height="813" alt="image" src="https://github.com/user-attachments/assets/d25ef263-a779-46d0-ae5c-dc46cef39821" />


---

# 🎯 Future Enhancements

- Improve UI design and responsiveness
- Add role-based access (Admin, Faculty, Student)
- Email notification system for schedule updates
- Export timetable as PDF
- Mobile-friendly interface
- Student portal to view personal timetable
- Advanced timetable filtering and search
---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Author

Poornitha
