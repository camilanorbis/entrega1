import express from "express";
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"

const app = express();
const PORT = 8080;
app.use(express.json());
const basePathProducts = "/api/products"
const basePathCarts = "/api/carts"

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carts.json');


app.get(`${basePathProducts}`, async (req,res) => {
    try {
        const fileContent = await productManager.getProducts();
        if (fileContent != null) {
            res.status(200).json({ status: 'success', result: JSON.parse(fileContent) });
        } else {
            res.status(400).json({ status: 'error', result: 'No fue posible obtener los productos' })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al obtener los productos. Detalle: ${error}` });
    }
})


app.get(`${basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);

        if (!product) {
            return res.status(404).json({ status: 'error', result: `Producto con id ${pid} no encontrado` });
        } 

        res.status(200).json({ status: 'success', result: product });

    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al obtener el producto con id ${req.params.pid}. Detalle: ${error}` })
    }
})


app.post(`${basePathProducts}`, async (req,res) => {
    try{
        const product = req.body;
        const productAdded = await productManager.addProduct(product);
        if (productAdded) {
            res.status(201).json({ status: 'success', result: 'El producto fue agregado con éxito' })
        } else {
            res.status(400).json({ status: 'error', result: 'No fue posible agregar el producto'});
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible agregar el producto. Detalle: ${error}` });
    }
})


app.put(`${basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = req.params.pid;
        const product = req.body;
        const productModified = await productManager.modifyProduct(pid,product)

        if (productModified) {
            res.status(200).json( {status: 'success', result: productModified })
        } else {
            res.status(404).json({ status: 'error', result: `El producto con id ${pid} no existe` })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', result: `Error al intentar modificar el producto. Detalle: ${error}` })
    }
})


app.delete(`${basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = req.params.pid;
        const productDeleted = await productManager.deleteProduct(pid);
        if (productDeleted){
            res.status(200).json({ status: 'success', result:`Producto con id ${pid} eliminado con éxito` })
        } else {
            res.status(404).json({ status: 'error', result: `No existe producto con id ${pid}` })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible eliminar el producto con id ${req.params.pid}. Detalle: ${error}`})
    }
})


app.post(`${basePathCarts}`, async (req,res) => {
    try {
        const newCart = await cartManager.createCart(); 
        
        if (!newCart) {
            res.status(400).json({ status: 'error', result: 'No fue posible crear el carrito' })
        } else {
            res.status(201).json({ status: 'success', result: 'Carrito creado con éxito' })
        }
        
    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible crear el carrito. Detalle: ${error}` })
    }
})


app.get(`${basePathCarts}/:cid`, async (req,res) => {
    try {
        const cid = req.params.cid;
    
        const products = await cartManager.getCartProducts(cid);

        if (products === null) 
            res.json({ status: 'error', result: 'El carrito no existe o no tiene productos en él todavía' })
        else 
            res.json({ status: 'success', result: products });

    } catch (error) {
        res.status(500).json({ status: 'error', result: `No fue posible obtener los productos del carrito ${req.params.cid}. Detalle: ${error} ` })
    }
})


app.post(`${basePathCarts}/:cid/product/:pid`, async (req,res) => {
    try {
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
})


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})