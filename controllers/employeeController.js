const Employee = require("../models/Employee.js");

const addEmployee = async (req, res) => {
    try {
        const { name, email, position, department } = req.body;
        const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

        const employee = new Employee({ name, email, position, department, profilePic });
        await employee.save();

        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        // only update if values exist
        if (req.body.name) employee.name = req.body.name;
        if (req.body.email) employee.email = req.body.email;
        if (req.body.position) employee.position = req.body.position;
        if (req.body.department) employee.department = req.body.department;

        // update file
        if (req.file) {
            employee.profilePic = `/uploads/${req.file.filename}`;
        }

        await employee.save();
        res.json(employee);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchEmployees = async (req, res) => {
    try {
        const query = req.query.query || "";
        const employees = await Employee.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { position: { $regex: query, $options: "i" } },
                { department: { $regex: query, $options: "i" } },
            ],
        });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
};
