import express, { type Application, type Request, type Response } from 'express'
import { userRoute } from './modules/user/user.route';

const app : Application = express()
app.use(express.json()) // for parsing application/json
app.use(express.text()) // for parsing text/plain
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.raw()) // for parsing application/octet-stream
app.get('/', (req : Request, res : Response)=>{
  //res.send('Hello World!');
  res.status(200).json({
    "message": "Express js",
    "author": "Sajid Rahman",
  })
});

app.use('/api/users',userRoute);

export default app;