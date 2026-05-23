import { pool } from "../../db";
import type { IAuth } from "./auth.interface"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const authSignIndb = async (payload:IAuth)=>{
    const {email, password} = payload;
    const result = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `,[email])
    console.log(result);
    if(result.rows.length === 0){
        throw new Error("User not found");
    }
    const user = result.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    // console.log(matchPassword);
    if(!matchPassword){
        throw new Error("Invalid password");
    }
    //generate token

   const jwtPayload ={
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
   }
   const accessToken = await jwt.sign(jwtPayload, config.secret,{
    expiresIn: "1d",
   })
   // console.log(config.secret);

    return {  accessToken };
}
export const authService = {
    authSignIndb,
}