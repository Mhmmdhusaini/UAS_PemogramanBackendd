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

  static search(name) {
    return new Promise((resolve, reject) => {
      console.log(`Mencari pasien dengan nama: ${name}`); // Cek apakah nama yang dikirim benar
      const query = "SELECT * FROM patients WHERE name LIKE ?";
      
      // Pastikan db.query sudah sesuai dengan pengaturan koneksi database
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
     });
});
}
static findByStatus(status) {
  return new Promise((resolve, reject) => {
    const validStatuses = ["positive", "recovered", "dead"]; // Status yang valid
    if (!validStatuses.includes(status)) {
      return reject(new Error(`Invalid status parameter: ${status}. Valid statuses are ${validStatuses.join(", ")}.`)); // Pesan error lebih informatif
    }

    db.query(
      "SELECT * FROM patients WHERE status = ?",
      [status], // Parameter status, aman dari SQL Injection
      (err, results) => {
        if (err) {
          return reject(err); // Jika terjadi error query, reject dengan error
        }
        resolve(results || []); // Kembalikan array kosong jika tidak ada hasil
      }
    );
  });
}

}


// Export class Patient
module.exports = Patient;
