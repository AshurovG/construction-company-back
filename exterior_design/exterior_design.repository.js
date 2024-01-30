
const db = require('../db')
class ExteriorDesignReoisitory {
  static insertNew(title, url, desc) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO exterior_design(exterior_design_title, exterior_design_url, exterior_design_description) VALUES ($1, $2, $3) RETURNING *', [title, url, desc], (error, results) => {
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
      db.query('SELECT * FROM exterior_design', (error, results) => {
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
      db.query('SELECT * FROM exterior_design WHERE exterior_design_id = $1', [id], (error, results) => {
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
      db.query('UPDATE exterior_design set exterior_design_title = $1, exterior_design_url = $2, exterior_design_description = $4 where exterior_design_id = $3 RETURNING *', [title, url, id, desc], (error, results) => {
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
      db.query('UPDATE exterior_design set exterior_design_title = $1, exterior_design_description = $2 where exterior_design_id = $3 RETURNING *', [title, desc, id], (error, results) => {
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
      db.query('DELETE FROM exterior_design where exterior_design_id = $1', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results.rows[0];
          resolve(data);
        }
      });
    });
  }

  static updateImportant(id, isImportant) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE exterior_design set is_important = $1 where exterior_design_id = $2 RETURNING *', [isImportant, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
            const data = results.rows[0];
            resolve(data);
        }
      });
    });
  }

  static getImportant() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM exterior_design where is_important = true', (error, results) => {
        if (error) {
          reject(error);
        } else {
            const data = results.rows;
            resolve(data);
        }
      });
    });
  }
}



module.exports = {
  ExteriorDesignReoisitory
}