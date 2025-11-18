import express from "express"
import { getProductById, getProducts, addProduct, modifyProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts)

router.get("/:pid", getProductById)

router.post("/", addProduct)

router.put("/:pid", modifyProduct)

router.delete("/:pid", deleteProduct)

export default router