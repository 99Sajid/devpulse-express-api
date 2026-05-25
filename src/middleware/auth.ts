import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import {pool} from "../db";
import type { Role } from "../types";


const auth = (...roles:Role[]) =>{
    return async(req: Request, res: Response, next: NextFunction) => {
    try{
        // console.log("Authenticating user...");
    // console.log(req.headers.authorization);
    const token=req.headers.authorization;
    console.log("Received token: ", token);
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }
    const decoded= jwt.verify(token as string,config.accessTokenSecret as string) as JwtPayload;
    console.log("Decoded token: ", decoded);
    const userData= await pool.query(`
        SELECT * FROM users WHERE email = $1
    `,[decoded.email]);
    if(userData.rowCount===0){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
    if(!userData.rows[0].is_active){
        return res.status(403).json({
            success: false,
            message: "Forbidden: User is not active",
        });
    }
    const user = userData.rows[0];
    // console.log(userData.rows[0]);
    if (roles.length && !roles.includes(user.role)) {
    return res.status(403).json({
        success: false,
        message: "Forbidden Access"
    });
}   


    req.user = decoded;
    next();

    }catch(error){
       next(error);
    }
}
}
export default auth;