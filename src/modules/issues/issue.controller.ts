import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueService } from "./issue.service";

const createIssue = async(req: Request,res: Response)=>{
    try{
        const reporter_id = req.user?.id;
        const result = await issueService.createIssuedb(req.body,reporter_id);
        res.status(201).json({
            message: "Issue created successfully",
            data: result.rows[0],
        })
        console.log(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "Error creating issue",
            error: error
        })
    }


}
const getAllIssues = async(req: Request,res: Response)=>{
    try{
        const result = await issueService.getAllIssuesdb();
        res.status(200).json({
            message: "Issues retrieved successfully",
            data: result.rows
        })
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving issues",
            error: error
        })
    }
}
const getSingleIssue = async(req: Request,res: Response)=>{
    const {id} = req.params;
    try{
        const result = await issueService.getSingleIssuedb(id as string);
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Issue not found"
            });
        }
        res.status(200).json({
            message: "Issue retrieved successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving issue",
            error: error
        })
    }
}
const updateIssue = async(req: Request,res: Response)=>{
    const {id} = req.params;
    try{
        const existingIssue = await issueService.getSingleIssuedb(id as string);
        if (existingIssue.rows.length === 0) {
        return res.status(404).json({
            message: "Issue not found"
        });
        }
        const issue = existingIssue.rows[0];
        const user = req.user!;
            if (
                user.role === "contributor" &&
                user.id !== issue.reporter_id
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Contributors can only update their own issues"
                });
            }
        const result = await issueService.updateIssuedb(id as string, req.body);
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Issue not found"
            });
        }
        res.status(200).json({
            message: "Issue updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating issue",
            error: error
        })
    }
}
const deleteIssue = async(req: Request,res: Response)=>{
    const {id} = req.params;
    try{
        const result = await issueService.deleteIssuedb(id as string);
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Issue not found"
            });
        }
        res.status(200).json({
            message: "Issue deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting issue",
            error: error
        })
    }
}
export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
}