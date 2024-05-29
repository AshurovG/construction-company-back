const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ashurovgeorgy",
  password: "12345678",
  host: "frolfasd_db",
  port: 5432,
  database: "frolfasd",
});

module.exports = pool;
