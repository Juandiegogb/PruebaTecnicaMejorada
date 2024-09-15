// RutasWeb.js
import express from "express";
const router = express.Router();
import userController from "../controllers/usersController.js";
import { verify } from "../tools/token.js";
import recordController from "../controllers/recordController.js";

router.post("/createUser",  userController.createUser);
router.get("/getUsers",  userController.findUsers);
router.post("/deleteUser/:id",  userController.deleteUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/createRecord/:id",  recordController.createRecord);
router.get("/getRecords/:ownerid",  recordController.getRecords);
export default router;
