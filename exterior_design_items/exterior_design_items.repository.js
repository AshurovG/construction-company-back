const db = require("../db");
class ExteriorDesignItemsRepository {
  static insertNew(url, exteriorDesignId) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO exterior_design_items(exterior_design_items_url, exterior_design_id) VALUES ($1, $2) RETURNING *",
        [url, exteriorDesignId],
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

  static getAll(exteriorDesignId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM exterior_design_items WHERE exterior_design_id = $1",
        [exteriorDesignId],
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
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM exterior_design_items WHERE exterior_design_id = $1 AND exterior_design_items_id = $2",
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
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM exterior_design_items WHERE exterior_design_id = $1",
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
        "SELECT * FROM exterior_design_items WHERE exterior_design_items_id = $1",
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
        "DELETE FROM exterior_design_items WHERE exterior_design_id = $1 AND exterior_design_items_id = $2",
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
  ExteriorDesignItemsRepository,
};
