import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";
import { userRole } from "../../types";
const router=Router();


router.post('/',userController.creatUser);
router.get('/',auth(userRole.contributor,userRole.maintainer),userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

export const userRoute = router;