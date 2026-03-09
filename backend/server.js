const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
mongoose.connect("mongodb://127.0.0.1:27017/smart_classroom");

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});

// ================= IMPORT MODELS =================
const Faculty = require("./models/faculty");
const Course = require("./models/course");
const Schedule = require("./models/schedule");

// ================= CONSTANTS =================
const rooms = ["Room A", "Room B", "Room C", "Room D"];

const timeSlots = [
  "09:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 01:30",
  "01:30 - 02:30",
  "02:30 - 03:30",
];

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// =======================================================
// ================= FACULTY APIs ========================
// =======================================================

app.post("/api/faculty", async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.send("Faculty Added Successfully");
  } catch {
    res.status(500).send("Error Adding Faculty");
  }
});

app.get("/api/faculty", async (req, res) => {
  try {
    const data = await Faculty.find();
    res.json(data);
  } catch {
    res.status(500).send("Error Fetching Faculty");
  }
});

app.delete("/api/faculty/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.send("Faculty Deleted Successfully");
  } catch {
    res.status(500).send("Error Deleting Faculty");
  }
});


// =======================================================
// ================= COURSE APIs =========================
// =======================================================

app.post("/api/course", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send("Course Added Successfully");
  } catch {
    res.status(500).send("Error Adding Course");
  }
});

app.get("/api/course", async (req, res) => {
  try {
    const data = await Course.find();
    res.json(data);
  } catch {
    res.status(500).send("Error Fetching Course");
  }
});

app.delete("/api/course/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.send("Course Deleted Successfully");
  } catch {
    res.status(500).send("Error Deleting Course");
  }
});


// =======================================================
// ================= SCHEDULE APIs =======================
// =======================================================

// 🔹 Helper Function: Get Available Suggestions
async function getAvailableSuggestions(day) {
  const bookedSchedules = await Schedule.find({ day });

  let suggestions = [];

  for (let room of rooms) {
    for (let time of timeSlots) {
      const conflict = bookedSchedules.find(
        (s) => s.room === room && s.time === time
      );

      if (!conflict) {
        suggestions.push({ room, time });
      }
    }
  }

  return suggestions.slice(0, 5); // Return top 5 available combinations
}


// ================= ADD SCHEDULE WITH CONFLICT DETECTION =================
app.post("/api/schedule", async (req, res) => {
  try {
    const { program, facultyId, day, time, room } = req.body;

    // 🔴 1. ROOM CONFLICT
    const roomConflict = await Schedule.findOne({ day, time, room });

    if (roomConflict) {
      const suggestions = await getAvailableSuggestions(day);
      return res.status(400).json({
        message: "Room already booked at this time!",
        suggestions,
      });
    }

    // 🔴 2. FACULTY CONFLICT
    const facultyConflict = await Schedule.findOne({ day, time, facultyId });

    if (facultyConflict) {
      return res.status(400).json({
        message: "Faculty already has a class at this time!",
      });
    }

    // 🔴 3. PROGRAM CONFLICT
    const programConflict = await Schedule.findOne({ day, time, program });

    if (programConflict) {
      return res.status(400).json({
        message: "This program already has a subject scheduled at this time!",
      });
    }

    // ✅ Save if no conflicts
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();

    res.send("Schedule Added Successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error Adding Schedule");
  }
});


// GET ALL SCHEDULE
app.get("/api/schedule", async (req, res) => {
  try {
    const data = await Schedule.find();
    res.json(data);
  } catch {
    res.status(500).send("Error Fetching Schedule");
  }
});

// DELETE SCHEDULE
app.delete("/api/schedule/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.send("Schedule Deleted Successfully");
  } catch {
    res.status(500).send("Error Deleting Schedule");
  }
});


// =======================================================
// ================= DASHBOARD API =======================
// =======================================================

app.get("/api/dashboard", async (req, res) => {
  try {
    const facultyCount = await Faculty.countDocuments();
    const courseCount = await Course.countDocuments();
    const scheduleCount = await Schedule.countDocuments();

    res.json({
      faculty: facultyCount,
      courses: courseCount,
      schedules: scheduleCount,
    });

  } catch {
    res.status(500).send("Dashboard Error");
  }
});


// ================= START SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});