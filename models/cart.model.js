import { Schema, model } from "mongoose";
import { productSchema } from "./product.model.js";

//Schema
const cartSchema = new Schema({
    //id se crea automaticamente.
    products: [
        {
            //type: productSchema,
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})


//Modelo
const CartModel = model("Cart", cartSchema)

export default CartModel;