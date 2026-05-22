import { pool } from "../../db";
import type { IIssue } from "./issue.interface";


const createIssuedb = async(payload:IIssue)=>{
    const {title, description, type, reporter_id} = payload;
       const result = await pool.query(
        `
        INSERT INTO issues
        (title, description, type, reporter_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [title, description, type, reporter_id]
        );
        return result;

}
const getAllIssuesdb = async()=>{
    const result = await pool.query(`
            SELECT * FROM issues
        `)
    return result;
}
const getSingleIssuedb = async(id:string)=>{
    const result = await pool.query(`
            SELECT * FROM issues WHERE id = $1
        `,[id])
    return result;
}
const updateIssuedb = async(id:string,payload:IIssue)=>{
    const {title, description, type} = payload;
    const result = await pool.query(`
            UPDATE issues
            SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type)
            WHERE id = $4
            RETURNING *
        `,[title, description, type, id])
    return result;
}
const deleteIssuedb = async(id:string)=>{
    const result = await pool.query(`
            DELETE FROM issues
            WHERE id = $1
            RETURNING *
        `,[id])
    return result;
}
export const issueService = {
    createIssuedb,
    getAllIssuesdb,
    getSingleIssuedb,
    updateIssuedb,
    deleteIssuedb,
}
