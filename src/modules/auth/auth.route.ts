import { Router } from "express";
import {authController}  from "./auth.controller";
const route = Router();

route.post("/Login",authController.authLogin);
route.post("/signup",authController.authSignUp);
route.post("/refresh-token",authController.authLogin);

export const authRoute = route;