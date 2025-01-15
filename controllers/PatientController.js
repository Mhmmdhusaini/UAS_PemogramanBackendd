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
    console.log(`Mencari dengan nama: ${name}`);  // Log nilai yang diterima
    
    if (!name) {
      return res.status(400).json({
        message: "Nama pasien harus diberikan",
      });
    }
  
    try {
      // Memastikan nama yang diterima adalah string yang valid
      const patients = await Patient.search(name);
      console.log(patients);  // Log hasil pencarian
      
      if (patients.length === 0) {
        return res.status(404).json({
          message: "Pasien tidak ditemukan",
        });
      }
  
      res.status(200).json({
        message: "Data pasien ditemukan",
        data: patients,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan saat mencari data pasien",
        error: error.message,
   });
}
}

  // Get patients by status
  async positive(req, res) {
    try {
      const patients = await Patient.findByStatus("positive");
      const message = patients.length
        ? "Get positive resource"
        : "No data available for positive patients";
      res.status(200).json({
        message,
        data: patients,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  
  async recovered(req, res) {
    try {
      const patients = await Patient.findByStatus("recovered");
      const message = patients.length
        ? "Get recovered resource"
        : "No data available for recovered patients";
      res.status(200).json({
        message,
        data: patients,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  
  async dead(req, res) {
    try {
      const patients = await Patient.findByStatus("dead");
      const message = patients.length
        ? "Get dead resource"
        : "No data available for dead patients";
      res.status(200).json({
        message,
        data: patients,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
// Create an object of PatientController
const patientController = new PatientController();

// Export the PatientController object
module.exports = patientController;
