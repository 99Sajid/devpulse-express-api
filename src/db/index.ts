import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connectionString,
});
export const initdb= async()=>{
    try{
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
               
        `)
        console.log("Database initialized successfully!");
    }catch(err){
        console.error("Error initializing database:", err);
    }
}