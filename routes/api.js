// Import PatientController
const PatientController = require("../controllers/PatientController");

// Import express
const express = require("express");

// Create a router object
const router = express.Router();

/**
 * API routes
 */

// Default route
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Patient routes
router.get("/patients", PatientController.index); // Get all patients
router.post("/patients", PatientController.store); // Create a new patient
router.put("/patients/:id", PatientController.update); // Update patient by ID
router.delete("/patients/:id", PatientController.destroy); // Delete patient by ID
router.get("/patients/:id", PatientController.show); // Get patient by ID
router.get("/patients/search/:name", PatientController.search); // Search patients by name
router.get("/patients/status/positive", PatientController.positive)
router.get("/patients/status/recovered", PatientController.recovered)
router.get("/patients/status/dead", PatientController.dead)

// Export router
module.exports = router;
