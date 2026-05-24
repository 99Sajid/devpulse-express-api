import { pool } from "../../db";
import type { IAuth } from "./auth.interface"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import type { IUser } from "../user/user.interface";
const authLogindb = async (payload:IAuth)=>{
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
   const accessToken = await jwt.sign(jwtPayload, config.accessTokenSecret,{
    expiresIn: "1d",
   })
   // console.log(config.accessTokenSecret);
   const RefreshToken = await jwt.sign(jwtPayload, config.refreshTokenSecret,{
    expiresIn: "1d",
   })

    return {  accessToken, RefreshToken };
}

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const authSignupintodb = async(payload:IUser)=>{
    const {name,email,password,role}=payload;
    // console.log(password);
    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
    `,[name,email,await hashPassword(password),role])
    delete result.rows[0].password;
    return result;
}
export const authService = {
    authLogindb,
    authSignupintodb
}