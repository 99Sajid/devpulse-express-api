import { Router } from "express";
import {authController}  from "./auth.controller";
const route = Router();

route.post("/signin",authController.authSignIn);

export const authRoute = route;