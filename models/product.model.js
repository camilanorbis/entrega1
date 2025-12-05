import { Schema, model } from "mongoose";
import validator from "validator";


//Schema
export const productSchema = new Schema({
    //id se crea automaticamente.
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    stock: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    thumbnails: [
        {
            type: String,
            validate: {
                validator : (valor) => {
                    const isValid = validator.isURL(valor)
                    return isValid
                },
                message: "Image url is not valid"
            }
        }
    ]
})


//Modelo
const ProductModel = model("Product", productSchema)

export default ProductModel;