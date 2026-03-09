const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({

 facultyId: String,

 name: String,

 program: String,

 year: String,

 branch: String,

 subject: String

});

module.exports = mongoose.model("Faculty", FacultySchema);