import { handleMounting, handleUserLogin, handleUserRegisteration, handleNextAuthEntry } from "../controllers/controller.js";
import express from "express";

const router = express.Router();

router.get("/dashboard", handleMounting);
router.post("/UserLogin", handleUserLogin);
router.post("/UserRegisteration", handleUserRegisteration);
router.post("/NextAuthEntry", handleNextAuthEntry);

export default router;
