import type { Request, Response } from "express";
import { authService } from "./auth.service";

const authSignIn = async(req: Request, res:Response)=>{
    const {email, password} = req.body;
    try {
        const result = await authService.authSignIndb({email, password});
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
export const authController = {
    authSignIn,
}