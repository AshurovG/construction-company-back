
const db = require('../db')
class QuestionsReoisitory {
    static insertNew(title, text) {    
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO questions(questions_title, questions_text) VALUES ($1, $2) RETURNING *', [title, text], (error, results) => {
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
            db.query('SELECT * FROM questions', (error, results) => {
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
          db.query('SELECT * FROM questions WHERE questions_id = $1', [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const data = results.rows[0];
              resolve(data);
            }
          });
        });
      }

    static updateById(id, title, text) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE questions set questions_title = $1, questions_text = $2 where questions_id = $3 RETURNING *', [title, text, id], (error, results) => {
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
            db.query('DELETE FROM questions where questions_id = $1', [id], (error, results) => {
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
  QuestionsReoisitory
}