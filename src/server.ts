import express, { type Application, type Request, type Response } from 'express'
import { error } from 'node:console';
import {Pool} from "pg";

const app : Application = express()
const port = 5000

app.use(express.json()) // for parsing application/json
app.use(express.text()) // for parsing text/plain
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.raw()) // for parsing application/octet-stream

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_iXty0m6dMnPb@ep-dawn-hill-aq1fr2lo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
const initdb= async()=>{
    try{
       await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            passward VARCHAR(255) NOT NULL,
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
initdb();

app.get('/', (req : Request, res : Response)=>{
  //res.send('Hello World!');
  res.status(200).json({
    "message": "Express js",
    "author": "Sajid Rahman",
  })
});
app.post('/api/users',async(req:Request,res:Response)=>{
    //console.log(req.body);
    try{
     const {name,email,password,role}=req.body;
    // console.log(password);
    const result = await pool.query(`
        INSERT INTO users (name, email, passward, role) VALUES ($1, $2, $3, $4) RETURNING *
    `,[name,email,password,role])
    console.log(result.rows[0]);
       
    res.status(201).json({
        message: "User created successfully",
        data:result.rows[0]
    })
    }catch(error:any){
        console.error("Error occurred while inserting data:", error);
        res.status(500).json({
            message: error.message,
            error: error
        })
    }

})

app.get('/api/users',async(req : Request,res : Response)=>{
    try{
        const result = await pool.query(`
            SELECT * FROM users
        `)
        res.status(200).json({
            success: true,
            message: "User retrived successfully",
            data: result.rows
        });
    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

})

app.listen(port, () => {
  console.log(`App runing on Port ${port} Successfully!`);
});