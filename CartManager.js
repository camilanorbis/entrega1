import fs from "fs/promises";
import ProductManager from "./ProductManager.js";
import { nanoid } from "nanoid";

let carts = [];
const productManager = await new ProductManager('products.json').init();

async function ensureFile(path) {
    try {
        await fs.access(path);
    } catch {
        await fs.writeFile(path, JSON.stringify([], null, 2));
    }
}
export default class CartManager {

    constructor (path) {
        this.path = path;
    }

    async init() {
        await ensureFile(this.path);
        return this;
    }

    async createCart () {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            const id = nanoid(5);
            const newCart = {id: id, products: []};
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts,null,2));
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartProducts (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            const cart = carts.find(cart => cart.id === id);

            let productsOnCart = [];
            if (!cart) return null;

            const products = cart.products;
            if (!products) return [];

            for (const product of products) {
                const productToAdd = await productManager.getProductById(product.id);
                productsOnCart.push(productToAdd);
            }
            
            return productsOnCart;

        } catch (error) {
            throw error;
        }
    }

    async addProductToCart (productId,cartId) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);

            const cart = carts.find(cart => cart.id === cartId);
            if (!cart) return null;
            if (!cart.products) cart.products = [];

            let product = cart.products.find(product => product.id === productId);
            if (product) {
                product.quantity += 1;
            } else {
                const productExists = await productManager.getProductById(productId)
                if (!productExists) return null;
                cart.products.push({ id: productId, quantity: 1 });
            }
            
            await fs.writeFile(this.path,JSON.stringify(carts,null,2));
            return cart;

        } catch (error) {
            throw error;
        }
    }



}