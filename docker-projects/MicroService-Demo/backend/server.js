const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function connectDB() {
    try {
        await pool.query("SELECT 1");
        console.log("Connected to PostgreSQL database");
    } catch (err) {
        console.log("Database not ready. Retrying in 3 seconds...");
        setTimeout(connectDB, 3000);
    }
}
connectDB();

app.use(cors());
app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 }
];

let idCounter = 3;

app.get("/health", (req, res) => {
    res.json({ status: "Backend running" });
});

//before database
// app.get("/products", (req, res) => {
//     res.json(products);
// });

//after database
app.get("/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching products");
    }
});

//before database
/*
app.post("/products", (req, res) => {
    const product = {
        id: idCounter++,
        name: req.body.name,
        price: req.body.price
    };

    products.push(product);

    res.json(product);
});
*/
app.post("/products", async (req, res) => {

    const { name, price } = req.body;

    try {
        const result = await pool.query(
            //"INSERT INTO products (name, price) VALUES ($1,$2) RETURNING *",
            "INSERT INTO products (name, price) VALUES ($1,$2)",
            [name, price]
        );
        // res.json(result.rows[0]);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});

app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const { price } = req.body;
    try {
        await pool.query("UPDATE products SET price=$1 where id=$2", [price, id])
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
})

app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("DELETE from products where id =$1", [id]);
        res.sendStatus(204)

    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
})

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});