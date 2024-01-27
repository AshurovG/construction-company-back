const Pool = require('pg').Pool
const pool = new Pool({ // Настройки подключеня к БД
    user: "ashurovgeorgy",
    password: "13082003",
    host: "194.67.74.216",
    port: 5432,
    database: "frolfasd"
})


module.exports = pool