import express, {} from 'express';
import { Pool } from "pg";
import config from './config';
const app = express();
const port = 8000;
app.use(express.json()); // for parsing application/json
app.use(express.text()); // for parsing text/plain
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.raw()); // for parsing application/octet-stream
const pool = new Pool({
    connectionString: config.connectionString,
});
const initdb = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            role VARCHAR(50) DEFAULT 'user',

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

        )
               
        `);
        console.log("Database initialized successfully!");
    }
    catch (err) {
        console.error("Error initializing database:", err);
    }
};
initdb();
app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.status(200).json({
        "message": "Express js",
        "author": "Sajid Rahman",
    });
});
app.post('/api/users', async (req, res) => {
    //console.log(req.body);
    try {
        const { name, email, password, role } = req.body;
        // console.log(password);
        const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
    `, [name, email, password, role]);
        console.log(result.rows[0]);
        res.status(201).json({
            message: "User created successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error("Error occurred while inserting data:", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    }
});
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
        `);
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, password, is_active } = req.body;
    try {
        const result = await pool.query(`
            UPDATE users SET name =COALESCE($1, name), password =COALESCE($2, password), is_active =COALESCE($3, is_active), updated_at = NOW() WHERE id = $4 RETURNING *
        `, [name, password, is_active, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.listen(port, () => {
    console.log(`App runing on Port ${port} Successfully!`);
});
//# sourceMappingURL=server.js.map