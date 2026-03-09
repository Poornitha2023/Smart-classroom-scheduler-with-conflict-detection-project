const express = require("express");
const router = express.Router();

const rooms = ["Room A", "Room B", "Room C", "Room D"];

const timeSlots = [
  "09:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 01:30",
  "01:30 - 02:30",
  "02:30 - 03:30",
];

// ================= GET ALL =================
router.get("/schedule", async (req, res) => {
  const data = await Schedule.find();
  res.json(data);
});

// ================= HELPER FUNCTION =================
async function getAvailableCombinations(day) {
  const booked = await Schedule.find({ day });

  let suggestions = [];

  for (let room of rooms) {
    for (let time of timeSlots) {
      const conflict = booked.find(
        (b) => b.room === room && b.time === time
      );

      if (!conflict) {
        suggestions.push({ room, time });
      }
    }
  }

  return suggestions.slice(0, 5); // return top 5 suggestions
}

// ================= ADD SCHEDULE =================
router.post("/schedule", async (req, res) => {
  const { program, facultyId, facultyName, subject, day, time, room } = req.body;

  try {
    // 🔴 ROOM conflict
    const roomConflict = await Schedule.findOne({ day, time, room });

    if (roomConflict) {
      const suggestions = await getAvailableCombinations(day);

      return res.status(400).json({
        message: "Room already booked!",
        suggestions,
      });
    }

    // 🔴 FACULTY conflict
    const facultyConflict = await Schedule.findOne({ day, time, facultyId });

    if (facultyConflict) {
      return res.status(400).json({
        message: "Faculty already has class at this time!",
      });
    }

    // 🔴 PROGRAM conflict
    const programConflict = await Schedule.findOne({ day, time, program });

    if (programConflict) {
      return res.status(400).json({
        message: "Program already has a subject scheduled at this time!",
      });
    }

    const newSchedule = new Schedule(req.body);
    await newSchedule.save();

    res.status(200).send("Schedule added successfully");

  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ================= DELETE =================
router.delete("/schedule/:id", async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.send("Schedule deleted successfully");
});

module.exports = router;