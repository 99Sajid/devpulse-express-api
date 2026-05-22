import { Router } from "express";
import type { Request, Response } from "express";
import { pool } from "../../db";
import { issueController } from "./issue.controller";


const router = Router();

router.post("/", issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id",issueController.getSingleIssue);
router.put("/:id",issueController.updateIssue);
router.delete("/:id",issueController.deleteIssue);

export const issueRoute = router;