export const getProducts = async (req,res) => {
    try {
        const productManager = req.app.locals.productManager;
        const fileContent = await productManager.getProducts();
        if (fileContent != null) {
            const products = JSON.parse(fileContent);
            res.status(200).json({ status: 'success', result: products });
        } else {
            res.status(400).json({ status: 'error', result: 'No fue posible obtener los productos' })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al obtener los productos. Detalle: ${error}` });
    }
}

export const getProductById = async (req,res) => {
    try {
        const productManager = req.app.locals.productManager;
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);

        if (!product) {
            return res.status(404).json({ status: 'error', result: `Producto con id ${pid} no encontrado` });
        } 

        res.status(200).json({ status: 'success', result: product });

    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al obtener el producto con id ${req.params.pid}. Detalle: ${error}` })
    }
}

export const addProduct = async (req,res) => {
    try{
        const productManager = req.app.locals.productManager;
        const product = req.body;
        const productAdded = await productManager.addProduct(product);
        if (productAdded) {
            const productsUpdated = JSON.parse(await productManager.getProducts());
            req.app.locals.servidorWS.emit("productsUpdated", productsUpdated);
            res.status(201).json({ status: 'success', result: productAdded })
        } else {
            res.status(400).json({ status: 'error', result: 'Faltan campos obligatorios o algún campo es incorrecto' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible agregar el producto. Detalle: ${error}` });
    }
}

export const modifyProduct = async (req,res) => {
    try {
        const productManager = req.app.locals.productManager;
        const pid = req.params.pid;
        const product = req.body;
        const productModified = await productManager.modifyProduct(pid,product)

        if (productModified) {
            res.status(200).json( {status: 'success', result: productModified })
        } else {
            res.status(404).json({ status: 'error', result: `El producto con id ${pid} no existe o el campo que intenta modificar no forma parte del producto.` })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al intentar modificar el producto. Detalle: ${error}` })
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const productManager = req.app.locals.productManager;
        const pid = req.params.pid;
        const productDeleted = await productManager.deleteProduct(pid);
        if (productDeleted){
            const productsUpdated = JSON.parse(await productManager.getProducts());
            req.app.locals.servidorWS.emit("productsUpdated", productsUpdated);
            res.status(200).json({ status: 'success', result:`Producto con id ${pid} eliminado con éxito` })
        } else {
            res.status(404).json({ status: 'error', result: `No existe producto con id ${pid}` })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible eliminar el producto con id ${req.params.pid}. Detalle: ${error}`})
    }
}