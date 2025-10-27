import fs from "fs/promises";
import ProductManager from "./ProductManager.js";
import { nanoid } from "nanoid";

let carts = [];

export default class CartManager {

    constructor (path) {
        this.path = path;
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

    async getCartById (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            carts = JSON.parse(fileContent);
            
            const cart = carts.filter(cart => cart.id === id);
            return cart;
            
        } catch (error) {
            throw error;
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
            } 


        } catch (error) {
            throw error;
        }
    }



}