import { Router } from "express";
import {authController}  from "./auth.controller";
const route = Router();

route.post("/signin",authController.authLogin);
route.post("/signup",authController.authSignUp);

export const authRoute = route;