import express from "express";
import userController from "../../controllers/userController.js";
import { createUser, login } from "./celebrateValdator.js";
const router = express.Router();

router.post("/register", createUser, userController.register);
router.post("/login", login, userController.login);

export default router;
