import express from "express"
import ProductManager from "./managers/ProductManager.js"
import CartManager from "./managers/CartManager.js"
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import rootRouter from "./routes/root.route.js"
import { Server } from "socket.io"
import http from "http"
import handlebars from "express-handlebars"


const app = express();
const servidor = http.createServer(app);
const PORT = 8080;

//Servidor websockets -> responde solicitudes que vengan de ws://localhost:8080
const servidorWS = new Server(servidor);
servidorWS.on("connection", (socket) => {
    console.log("nuevo cliente conectado")

    socket.emit("respuesta", "Hola desde el servidor")
})

app.use(express.json());
const basePathProducts = "/api/products"
const basePathCarts = "/api/carts"

app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.use(express.static("public"))


async function init() {
    const productManager = await new ProductManager('products.json').init();
    const cartManager = await new CartManager('carts.json').init();

    app.locals.productManager = productManager;
    app.locals.cartManager = cartManager;

    app.use("/",rootRouter)
    app.use(basePathProducts,productRouter)
    app.use(basePathCarts,cartRouter)

    app.locals.servidorWS = servidorWS;

    /*app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    });*/
    servidor.listen(PORT, () => {
        console.log(`Serivdor iniciado en el puerto ${PORT}`)
    })
}

init().catch(error => {
    console.error("Error inicializando managers:", error);
    process.exit(1);
});