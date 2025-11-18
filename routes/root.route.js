import express from "express"
import { rootHandler, getRealTimeProducts } from "../controllers/root.controller.js";

const router = express.Router();

router.get("/", rootHandler)

router.get("/realTimeProducts", getRealTimeProducts)

export default router;