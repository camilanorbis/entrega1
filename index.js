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

//rutas bajo /api/products/

//GET => /
//debe listar todos los productos en el archivo products.json
app.get(`{basePathProducts}`, async (req,res) => {
    try {
        const fileContent = await productManager.getProducts();
        res.json({ products: JSON.parse(fileContent) });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

//GET => /pid
//debe traer solo el producto con el id proporcionado
app.get(`{basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);

        if (!product) {
            return res.status(404).json({ error: `Producto con id ${pid} no encontrado` });
        } 

        res.json(product);

    } catch (error) {
        res.status(500).json({ error: `Error al obtener el producto con id ${parseInt(req.params.pid)}` })
    }
})

//POST => /
//debe agregar un nuevo producto con los campos { id (autogenerado), title, description, code, price, status, stock, category, thumbnails }
app.post(`{basePathProducts}`, async (req,res) => {
    try{
        const product = req.body;
        await productManager.addProduct(product);
        res.status(201).json({ success: 'El producto fue agregado con éxito' })
    } catch (error) {
        res.status(500).json({ error: 'No fue posible agregar el producto' });
    }
})

//PUT => /pid
//actualiza un producto por los campos enviados desde el body, no se debe actualizar ni eliminar el id al momento de hacer la actualizacion
app.put(`{basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = req.body;
        const productModified = await productManager.modifyProduct(pid,product)

        if (productModified) {
            res.json( {success: 'Producto modificado', producto: productModified })
        } else {
            res.status(404).json({ error: `El producto con id ${pid} no existe` })
        }

    } catch (error) {
        res.status(500).json({ error: `Error al intentar modificar el producto` })
    }
})

//DELETE => /pid
//elimina el producto con  el pid indicado.
app.delete(`{basePathProducts}/:pid`, async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        const productDeleted = await productManager.deleteProduct(pid);
        if (productDeleted){
            res.json({ success: `Producto con id ${pid} eliminado con éxito` })
        } else {
            res.status(404).json({ error: `No existe producto con id ${pid}` })
        }
    } catch (error) {
        res.status(500).json({ error: `No fue posible eliminar el producto con id ${parseInt(req.params.pid)}`})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})