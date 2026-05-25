import type { Request, Response } from "express";
import { pool } from "../../db";
import type { IIssue } from "./issue.interface";


const createIssuedb = async(payload:IIssue,reporter_id:number)=>{
    // console.log(payload);
    const {title, description, type} = payload;
    
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
const getAllIssuesFromDB = async (query: any) => {

    let sql = `SELECT * FROM issues`;
    const allowedTypes = ["bug", "feature_request"];
    const allowedStatus = ["open", "in_progress", "resolved"];
    const allowedSort = ["newest", "oldest"];
    if (query.type && !allowedTypes.includes(query.type)) {
    throw new Error("Invalid issue type");
}
    if (query.status && !allowedStatus.includes(query.status)) {
    throw new Error("Invalid issue status");
}
    if (query.sort && !allowedSort.includes(query.sort)) {
    throw new Error("Invalid sorting option");
}

    const conditions = [];
    const values = [];

    // FILTER TYPE
    if (query.type) {
        values.push(query.type);
        conditions.push(`type = $${values.length}`);
    }

    // FILTER STATUS
    if (query.status) {
        values.push(query.status);
        conditions.push(`status = $${values.length}`);
    }

    // ADD WHERE CONDITION
    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ");
    }

    // SORTING
    if (query.sort === "oldest") {
        sql += ` ORDER BY created_at ASC`;
    } else {
        sql += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(sql, values);

    const reporterIds = result.rows.map(
        issue => issue.reporter_id
    );
    const usersResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id = ANY($1)`,
        [reporterIds]
    );
    const finalData = result.rows.map(issue => {

        const reporter = usersResult.rows.find(
            user => user.id === issue.reporter_id
        );

        return {
            ...issue,
            reporter
        };
    });
    return finalData;
};
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
    getAllIssuesFromDB,
    getSingleIssuedb,
    updateIssuedb,
    deleteIssuedb,
}
