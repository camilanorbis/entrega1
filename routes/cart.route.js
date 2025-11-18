import express from "express"
import { addProductToCart, createCart, getCartProducts } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", createCart)

router.get("/:cid", getCartProducts)

router.post("/:cid/product/:pid", addProductToCart)

export default router