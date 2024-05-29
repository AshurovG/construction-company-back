const db = require("../db");

class VentilatedFacadesItemsRepository {
  static insertNew(url, ventilatedFacadeId) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO ventilated_facade_items(ventilated_facade_items_url, ventilated_facades_id) VALUES ($1, $2) RETURNING *",
        [url, ventilatedFacadeId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows[0];
            resolve(data);
          }
        }
      );
    });
  }

  static getAll(ventilatedFacadeId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ventilated_facade_items WHERE ventilated_facades_id = $1",
        [ventilatedFacadeId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows;
            resolve(data);
          }
        }
      );
    });
  }

  static getByIdOneToMany(idOne, idMany) {
    // Получение записи по первичному и внешнему ключу для валидации
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ventilated_facade_items WHERE ventilated_facades_id = $1 AND ventilated_facade_items_id = $2",
        [idOne, idMany],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows[0];
            resolve(data);
          }
        }
      );
    });
  }

  static getByIdMany(idMany) {
    // Получение записи по внешнему ключу для валидации
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ventilated_facade_items WHERE ventilated_facades_id = $1",
        [idMany],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows[0];
            resolve(data);
          }
        }
      );
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ventilated_facade_items WHERE ventilated_facade_items_id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows[0];
            resolve(data);
          }
        }
      );
    });
  }

  static deleteById(idOne, idMany) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM ventilated_facade_items WHERE ventilated_facades_id = $1 AND ventilated_facade_items_id = $2",
        [idOne, idMany],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const data = results.rows[0];
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = {
  VentilatedFacadesItemsRepository,
};
