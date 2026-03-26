require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function getProductByName(name) {
    const result = await pool.query(
        "SELECT * FROM products WHERE name=$1",
        [name]
    );
    return result.rows;
}

async function resetProductsTable() {
    await pool.query("TRUNCATE TABLE products RESTART IDENTITY");
    await pool.query(`
        INSERT INTO products(name,price)
        VALUES
        ('Laptop', 1000),
        ('Phone', 500)
        `);
}

module.exports = { getProductByName, resetProductsTable };