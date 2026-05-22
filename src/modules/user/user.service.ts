import { pool } from "../../db";
import type { IUser } from "./user.interface";

const creatUserintodb = async(payload:IUser)=>{
    const {name,email,password,role}=payload;
    // console.log(password);
    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
    `,[name,email,password,role])
    console.log(result.rows[0]);
    return result;
}

const getAllUsersdb = async()=>{
    const result = await pool.query(`
            SELECT * FROM users
        `)
    return result;
}
const getSingleUserdb = async(id:string)=>{
        
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
        `,[id])
        return result;
}
const updateUserdb = async(id:string,payload:IUser)=>{
    const {name,password,is_active} = payload;
    const result = await pool.query(`
            UPDATE users SET name =COALESCE($1, name), password =COALESCE($2, password), is_active =COALESCE($3, is_active), updated_at = NOW() WHERE id = $4 RETURNING *
        `,[name,password,is_active,id])
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