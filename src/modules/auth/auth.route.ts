import { Router } from "express";
import {authController}  from "./auth.controller";
const route = Router();

route.post("/login",authController.authLogin);
route.post("/signup",authController.authSignUp);
route.post("/refresh-token",authController.authRefrshtoken);

export const authRoute = route;