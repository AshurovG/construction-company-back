const Pool = require('pg').Pool
const pool = new Pool({
    user: "ashurovgeorgy",
    password: "13082003",
    host: "frolfasd_db", // Используйте имя сервиса вместо IP-адреса
    port: 5432,
    database: "frolfasd"
})


module.exports = pool