import express, { type Application, type Request, type Response } from 'express'
import {Pool} from "pg";

const app : Application = express()
const port = 5000

app.use(express.json()) // for parsing application/json
app.use(express.text()) // for parsing text/plain
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.raw()) // for parsing application/octet-stream

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_iXty0m6dMnPb@ep-dawn-hill-aq1fr2lo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
})

app.get('/', (req : Request, res : Response)=>{
  //res.send('Hello World!');
  res.status(200).json({
    "message": "Express js",
    "author": "Sajid Rahman",
  })
});
app.post('/',async(req:Request,res:Response)=>{
    //console.log(req.body);
    const {name,email,passward}=req.body;
    res.status(201).json({
        message: "Data received successfully",
        data:{
            name,
            email,
        },
    })

})

app.listen(port, () => {
  console.log(`App runing on port ${port} Successfully!`)
})