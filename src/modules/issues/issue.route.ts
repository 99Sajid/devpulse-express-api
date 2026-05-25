import { Router } from "express";
import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { userRole } from "../../types";

const router = Router();

router.post("/",auth(userRole.contributor,userRole.maintainer), issueController.createIssue);
router.get("/", auth(userRole.contributor,userRole.maintainer),issueController.getAllIssues);
router.get("/:id",auth(userRole.contributor,userRole.maintainer),issueController.getSingleIssue);
router.put("/:id",auth(userRole.contributor,userRole.maintainer),issueController.updateIssue);
router.delete("/:id",auth(userRole.maintainer),issueController.deleteIssue);


export const issueRoute = router;
