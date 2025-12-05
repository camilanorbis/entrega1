import CartModel from "../models/cart.model.js";

export const createCart = async (req,res) => {
    try {
        const response = await CartModel.create({})

        if (!response) {
            res.status(400).json({ status: 'error', payload: 'No fue posible crear el carrito' })
        } else {
            res.status(201).json({ status: 'success', payload: response })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', payload: `No fue posible crear el carrito. Detalle: ${error}` })
    }
}

export const getCartProducts = async (req,res) => {
    try {
        const { cid } = req.params
        const cart = await CartModel.findById(cid)

        if (cart) {
            const response = cart.products;
            res.status(200).json({ status: 'success', payload: response })
        } else {
            res.status(404).json({ status: 'error', payload: `El carrito con id ${cid} no existe` })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', payload: `No fue posible obtener los productos del carrito ${req.params.cid}` })
    }
}

export const addProductToCart = async (req,res) => {
    try {
        const { pid } = req.params
        const { cid } = req.params 

        const cart = await CartModel.findById(cid)

        if(!cart) {
            res.status(404).json({ status: 'error', payload: `El carrito con id ${req.params.cid} no existe` })
        } 
        
        const productInCart = cart.products.find(product => product.productId === pid);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ productId: pid,quantity: 1 });
        }

        const updated = await cart.save();
        res.status(200).json({ status: 'success', payload: updated });



    } catch (error) {
        res.status(500).json({ status: 'error', payload: `No fue posible agregar el producto al carrito. Detalle: ${error}` })
    }
}