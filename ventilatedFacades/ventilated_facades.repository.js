class ventilatedFacadesRepository {
    static insertNew(title, url) {    
        db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url) VALUES ($1, $2) RETURNING *', [title, url], (error, results) => {
            if (error) {
                throw error;
            }
            const data = results.rows[0];
            return data
        });
    }

    static getAll() {
        db.query('SELECT * FROM ventilated_facades', (error, results) => {
            if (error) {
                throw error;
            }
            const data = results.rows; // В этой переменной содержится массив объектов запроса
            return data
        });
    }

    static getById(id) {
        db.query('SELECT * FROM ventilated_facades where ventilated_facades_id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            const data = results.rows[0]; // В этой переменной содержится полученный объект
            return data
        });
    }

    static updateById(id, title, url) {
        db.query('UPDATE ventilated_facades set ventilated_facades_title = $1, ventilated_facades_url = $2 where ventilated_facades_id = $3 RETURNING *', [id, title, url], (error, results) => {
            if (error) {
                throw error;
            }
            const data = results.rows[0];
            return data
        });
    }

    static deleteById(id) {
        db.query('DELETE FROM ventilated_facades where ventilated_facades_id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            const data = results.rows[0];
            return data
        });
    }
}

module.exports = {
    ventilatedFacadesRepository
}