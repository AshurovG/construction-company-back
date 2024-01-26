
const db = require('../db')
class VentilatedFacadesRepository {
  static insertNew(title, url, desc) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url, ventilated_facades_description) VALUES ($1, $2, $3) RETURNING *', [title, url, desc], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ventilated_facades', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows;
          resolve(data);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ventilated_facades WHERE ventilated_facades_id = $1', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }

  static updateById(id, title, url, desc) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ventilated_facades set ventilated_facades_title = $1, ventilated_facades_url = $2, ventilated_facades_description = $4 where ventilated_facades_id = $3 RETURNING *', [title, url, id, desc], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }

  static updateByIdWithoutUrl(id, title, desc) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ventilated_facades set ventilated_facades_title = $1, ventilated_facades_description = $2 where ventilated_facades_id = $3 RETURNING *', [title, desc, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ventilated_facades where ventilated_facades_id = $1', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }
}

module.exports = {
  VentilatedFacadesRepository
}