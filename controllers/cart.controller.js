export const createCart = async (req,res) => {
    try {
        const cartManager = req.app.locals.productManager;
        const newCart = await cartManager.createCart(); 
        
        if (!newCart) {
            res.status(400).json({ status: 'error', result: 'No fue posible crear el carrito' })
        } else {
            res.status(201).json({ status: 'success', result: newCart })
        }
        
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible crear el carrito. Detalle: ${error}` })
    }
}

export const getCartProducts = async (req,res) => {
    try {
        const cartManager = req.app.locals.productManager;
        const cid = req.params.cid;
    
        const products = await cartManager.getCartProducts(cid);

        if (products === null) 
            res.json({ status: 'error', result: 'El carrito no existe' })
        else 
            res.json({ status: 'success', result: products });

    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible obtener los productos del carrito ${req.params.cid}. Detalle: ${error} ` })
    }
}

export const addProductToCart = async (req,res) => {
    try {
        const cartManager = req.app.locals.productManager;
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await cartManager.addProductToCart(pid,cid);

        if (cart) {
            res.status(200).json({ status: 'success', result: cart })
        } else {
            res.status(404).json({ status: 'error', result: `No se encontró el carrito con id ${cid} o el producto ${pid} no existe` })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible agregar el producto al carrito. Detalle: ${error}` });
    }
}