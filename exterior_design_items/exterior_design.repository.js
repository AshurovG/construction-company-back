const db = require('../db')
class ExteriorDesignItemsRepository {
    static insertNew(url, ventilatedFacadeId) {    
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO exterior_design_items(exterior_design_items_url, exterior_designs_id) VALUES ($1, $2) RETURNING *', [url, ventilatedFacadeId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const data = results.rows[0];
                    resolve(data);
                }
            });
        });
    }

    static getAll(ventilatedFacadeId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM exterior_design_items WHERE exterior_designs_id = $1', [ventilatedFacadeId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const data = results.rows;
                    resolve(data);
                }
            });
        });
    }

    static getByIdOneToMany(idOne, idMany) { // Получение записи по первичному и внешнему ключу для валидации
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM exterior_design_items WHERE exterior_designs_id = $1 AND exterior_design_items_id = $2', [idOne, idMany], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const data = results.rows[0];
              resolve(data);
            }
          });
        });
    }

    static getByIdMany(idMany) { // Получение записи по внешнему ключу для валидации
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM exterior_design_items WHERE exterior_designs_id = $1', [idMany], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const data = results.rows[0];
              resolve(data);
            }
          });
        });
      }

    static deleteById(idOne, idMany) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM exterior_design_items WHERE exterior_designs_id = $1 AND exterior_design_items_id = $2', [idOne, idMany], (error, results) => {
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
    ExteriorDesignItemsRepository
}