// Import database
const db = require("../config/database");

// Membuat class Model Patient
class Patient {
  // Mendapatkan semua data pasien
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";
      db.query(query, (err, results) => {
        if (err) {
          return reject(new Error("Error fetching patients: " + err.message));
        }
        resolve(results);
      });
    });
  }

  // Menambahkan data pasien baru
  static async create(data) {
    try {
      const id = await new Promise((resolve, reject) => {
        const sql = "INSERT INTO patients SET ?";
        db.query(sql, data, (err, results) => {
          if (err) {
            return reject(new Error("Error inserting patient: " + err.message));
          }
          resolve(results.insertId);
        });
      });

      // Mengembalikan data pasien yang baru ditambahkan
      const patient = await this.find(id);
      return patient;
    } catch (err) {
      throw new Error("Error creating patient: " + err.message);
    }
  }

  // Mendapatkan data pasien berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          return reject(new Error("Error finding patient: " + err.message));
        }
        if (results.length === 0) {
          return reject(new Error("Patient not found with ID: " + id));
        }
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mengupdate data pasien berdasarkan ID
  static async update(id, data) {
    try {
      await new Promise((resolve, reject) => {
        const sql = "UPDATE patients SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
          if (err) {
            return reject(new Error("Error updating patient: " + err.message));
          }
          if (results.affectedRows === 0) {
            return reject(new Error("No patient found with ID: " + id));
          }
          resolve(results);
        });
      });

      // Mengembalikan data pasien yang telah diperbarui
      const patient = await this.find(id);
      return patient;
    } catch (err) {
      throw new Error("Error updating patient: " + err.message);
    }
  }

  // Menghapus data pasien berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          return reject(new Error("Error deleting patient: " + err.message));
        }
        if (results.affectedRows === 0) {
          return reject(new Error("No patient found with ID: " + id));
        }
        resolve({ message: "Patient deleted successfully" });
      });
    });
  }
}

// Export class Patient
module.exports = Patient;
