const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

  courseCode: String,

  courseName: String,

  program: String,

  year: String,

  branch: String

});

module.exports = mongoose.model("Course", courseSchema);