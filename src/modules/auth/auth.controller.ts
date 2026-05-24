import type { Request, Response } from "express";
import { authService } from "./auth.service";

const authLogin = async(req: Request, res:Response)=>{
    const {email, password} = req.body;
    try {
        const result = await authService.authLogindb({email, password});
        const {  RefreshToken } = result;

        res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "lax",
           
        });

        res.status(201).json({
            message: "User sign in  successfully",
            data: result,
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error creating issue",
            error: error
        })
    }
}
const authSignUp = async(req:Request,res:Response)=>{
    //console.log(req.body);
    try{
     const result= await authService.authSignupintodb(req.body);

    res.status(201).json({
        message: "signup successfully",
        data: result.rows[0],
    })
    }catch(error:any){
        console.error("Error occurred while inserting data:", error);
        res.status(500).json({
            message: error.message,
            error: error
        })
    }

}
export const authController = {
    authLogin,
    authSignUp
}