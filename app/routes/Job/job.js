import express from "express";
import jobController from "../../controllers/jobController.js";
import { verifyToken } from "../../middlewares/authJWT.js";
import { createjob } from "./celebrateValdator.js";
const router = express.Router();

router.get("/position/:id", [verifyToken], jobController.getPositionById);
router.post("/add-job", createjob, jobController.addJobs);
router.get("/getAllPositions", [verifyToken], jobController.getAllPositions);

export default router;
