import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connectionString,
});
 const initUserdb= async()=>{
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
        console.log("User Database initialized successfully!");
    }catch(err){
        console.error("Error initializing database:", err);
    }
};
const initIssuedb = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    type VARCHAR(50) NOT NULL
    CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(50) DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved')),

    reporter_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
            `)
            console.log("Issue Database initialized successfully!");
    }catch(err){
        console.error("Error initializing database:", err);
    }
}
export const dataFromdb = {
    initUserdb,
    initIssuedb
};
