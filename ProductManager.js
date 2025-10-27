import fs from "fs/promises";
import { nanoid } from "nanoid";

let products = [];

export default class ProductManager {

    constructor (path) {
        this.path = path;
    }

    async addProduct (newProduct) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            const { title, description, code, price, status, stock, category, thumbnails } = newProduct;
            const id = nanoid(5);
            const productToAdd = {id, title, description, code, price, status, stock, category, thumbnails};
            products = JSON.parse(fileContent);
            products.push(productToAdd);
            await fs.writeFile(this.path, JSON.stringify(products,null,2));
            return productToAdd;
        } catch (error) {
            throw error;
        }
    }

    async modifyProduct (id,productModified) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            products = JSON.parse(fileContent);

            //const { id, title, description, code, price, status, stock, category, thumbnails } = productModified;
            const index = products.findIndex(product => product.id === id);

            if (index !== -1){
                products[index] = { ...products[index], ...productModified };
                await fs.writeFile(this.path, JSON.stringify(products,null,2));
                return products[index];
            } else {
                return null;
            }


        } catch (error) {
            throw error;
        }
    }

    async getProducts () {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            return fileContent;
        } catch (error) {
            throw error;
        }
    }

    async getProductById (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            products = JSON.parse(fileContent);
            const product = products.find(product => product.id === id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            products = JSON.parse(fileContent);
            
            if (products.find(product => product.id === id)){
                products = products.filter(product => product.id !== id);
                await fs.writeFile(this.path,JSON.stringify(products,null,2));
                return true;
            } else {
                return false;
            }

        } catch (error) {
            throw error;
        }
    }

}


