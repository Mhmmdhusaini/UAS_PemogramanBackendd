// Import the Patient model
const Patient = require("../models/Patient");

// Create PatientController class
class PatientController {
  // Get all patients
  async index(req, res) {
    try {
      const patients = await Patient.all();
      if (patients.length === 0) {
        return res.status(200).json({
          message: "Data is empty",
          data: [],
        });
      }
      res.status(200).json({
        message: "Get all patients successfully",
        data: patients,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Add a new patient
  async store(req, res) {
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      return res.status(422).json({
        message: "All fields must be filled correctly",
      });
    }

    try {
      const newPatient = await Patient.create({
        name,
        phone,
        address,
        status,
        in_date_at,
        out_date_at,
      });

      res.status(201).json({
        message: "Resource is added successfully",
        data: newPatient,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a patient's information
  async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const patient = await Patient.find(id);
      if (!patient) {
        return res.status(404).json({ message: "Resource not found" });
      }

      const updatedPatient = await Patient.update(id, updatedData);
      res.status(200).json({
        message: "Resource is updated successfully",
        data: updatedPatient,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a patient
  async destroy(req, res) {
    const { id } = req.params;

    try {
      const patient = await Patient.find(id);
      if (!patient) {
        return res.status(404).json({ message: "Resource not found" });
      }

      await Patient.delete(id);
      res.status(200).json({ message: "Resource is deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get details of a single patient
  async show(req, res) {
    const { id } = req.params;

    try {
      const patient = await Patient.find(id);
      if (!patient) {
        return res.status(404).json({ message: "Resource not found" });
      }

      res.status(200).json({
        message: "Get single resource successfully",
        data: patient,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Search patients by name
  async search(req, res) {
    const { name } = req.params;

    try {
      const results = await Patient.searchByName(name);

      if (results.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }

      res.status(200).json({
        message: "Get searched resource successfully",
        data: results,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get patients by status
  async findByStatus(req, res) {
    const { status } = req.params;

    try {
      const results = await Patient.findByStatus(status);

      if (results.length === 0) {
        return res.status(404).json({
          message: "No patients found with the given status",
        });
      }

      res.status(200).json({
        message: `Get ${status} resource successfully`,
        total: results.length,
        data: results,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Create an object of PatientController
const patientController = new PatientController();

// Export the PatientController object
module.exports = patientController;
