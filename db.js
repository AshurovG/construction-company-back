const Pool = require('pg').Pool
const pool = new Pool({ // Настройки подключеня к БД
    user: "ashurov",
    password: "9897695555",
    host: "localhost",
    port: 5432,
    database: "construction_company"
})


module.exports = pool