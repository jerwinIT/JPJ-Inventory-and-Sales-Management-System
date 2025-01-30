const { Pool } = require('pg')

//database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'jpj-salesandinventory-management-system',
    password: 'postgres',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),

}