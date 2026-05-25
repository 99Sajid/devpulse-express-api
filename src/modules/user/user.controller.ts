import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";
const creatUser = async(req:Request,res:Response)=>{
    //console.log(req.body);
    try{
     const result= await userService.creatUserintodb(req.body);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result.rows[0],
    })
    }catch(error:any){
        console.error("Error occurred while inserting data:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

}
const getAllUsers = async(req : Request,res : Response)=>{
    try{
        const result = await userService.getAllUsersdb();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

}
const getSingleUser = async(req:Request,res:Response)=>{
      const {id} = req.params;
    try{
        const result =await userService.getSingleUserdb(id as string);
        if(result.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result.rows[0]
        });

    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

}
const updateUser = async(req:Request,res:Response)=>{
    const {id} = req.params;
    
    try{
        const result = await userService.updateUserdb(id as string,req.body);
        
        if(result.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });

    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}
const deleteUser = async(req:Request,res:Response)=>{
    const {id} = req.params;
    try{
        const result = await userService.deleteUserdb(id as string);
        if(result.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result.rows[0]
        });
    }catch(error:any){
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}
export const userController = {
    creatUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}