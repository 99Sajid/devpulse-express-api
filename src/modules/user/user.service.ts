import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const creatUserintodb = async(payload:IUser)=>{
    const {name,email,password,role}=payload;
    // console.log(password);
    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
    `,[name,email,await hashPassword(password),role])
    delete result.rows[0].password;
    return result;
}

const getAllUsersdb = async()=>{
    const result = await pool.query(`
            SELECT * FROM users
        `)
    result.rows.forEach((user) => delete user.password);
    return result;
}
const getSingleUserdb = async(id:string)=>{
        
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
        `,[id])
        delete result.rows[0].password;
        return result;
}
const updateUserdb = async(id:string,payload:IUser)=>{
    const {name,password,is_active} = payload;
    const result = await pool.query(`
            UPDATE users SET name =COALESCE($1, name), password =COALESCE($2, password), is_active =COALESCE($3, is_active), updated_at = NOW() WHERE id = $4 RETURNING *
        `,[name,await hashPassword(password),is_active,id])
    delete result.rows[0].password;
    return result;
}
const deleteUserdb = async(id:string)=>{
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *
        `,[id])
   
    return result;
}
export const userService = {
    creatUserintodb,
    getAllUsersdb,
    getSingleUserdb,
    updateUserdb,
    deleteUserdb,
}