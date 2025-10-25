import fs from "fs/promises";
import ProductManager from "./ProductManager.js";

let carts = [];

export default class CartManager {

    constructor (path) {
        this.path = path;
    }

    async createCart () {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            const newCart = {id: carts.length + 1, products: []};
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts,null,2));
            console.log(`Carrito creado correctamente`);
        } catch (error) {
            console.error(`No se pudo crear el carrito`);
        }
    }

    async getCartById (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            
            const cart = carts.filter(cart => cart.id === id);
            if (!cart){
                console.log(`No existe carrito con el id ${id}`);
            } else {
                console.log(`El carrito solicitado es ${cart}`);
            }

            return cart;
            
        } catch (error) {
            console.error(`No se pudo obtener el carrito con id ${id}`);
        }
    }

    async addProductToCart (product,cart) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            cart = carts.filter(cart => cart.id === id);

            if (cart) {
                cart.products.push(product);
                await fs.writeFile(this.path,JSON.stringify(carts,null,2));
            } else {
                console.log(`No existe el carrito seleccionado`);
            }


        } catch (error) {
            console.error(`No se pudo agregar el producto`);
        }
    }



}