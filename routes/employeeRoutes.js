const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
} = require("../controllers/employeeController");

router.post("/", auth, upload.single("profilePic"), addEmployee);
router.get("/", auth, getEmployees);
router.get("/search", auth, searchEmployees);
router.get("/:id", auth, getEmployee);
router.put("/:id", auth, upload.single("profilePic"), updateEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
