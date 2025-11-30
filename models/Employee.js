const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // add email to match frontend
    position: { type: String },
    department: { type: String },
    profilePic: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
