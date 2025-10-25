import fs from "fs/promises";

let products = [];

async function ensureFile(path) {
    try {
        await fs.access(path); 
    } catch {
        await fs.writeFile(path, JSON.stringify([], null, 2));
    }
}

export default class ProductManager {

    constructor (path) {
        this.path = path;
    }

    async addProduct (newProduct) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            const { title, description, code, price, status, stock, category, thumbnails } = newProduct;
            const productToAdd = {id: products.length + 1, title, description, code, price, status, stock, category, thumbnails};
            products = JSON.parse(fileContent);
            products.push(productToAdd);
            await fs.writeFile(this.path, JSON.stringify(products,null,2));
            console.log(`Se agrego el producto ${productToAdd}`);
        } catch (error) {
            console.error(`No fue posible agregar el producto - ${error}`);
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
                console.log(`Producto actualizado correctamente`);
                return products[index];
            } else {
                console.log(`No existe producto con id ${id}`);
                return null;
            }


        } catch (error) {
            console.error(`No fue posible modificar el producto - ${error}`)
        }
    }

    async getProducts () {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            return fileContent;
        } catch (error) {
            console.error(`Error al obtener la lista de productos - ${error}`);
        }
    }

    async getProductById (id) {
        try {
            const fileContent = await fs.readFile(this.path,'utf-8');
            products = JSON.parse(fileContent);
            const product = products.filter(product => product.id === id);
            if (!product) {
                console.log(`No existe ningun producto con id ${id}`);
            } else {
                console.log(`El producto solicitado es ${JSON.stringify(product)}`);
            }
            return product;
        } catch (error) {
            console.error(`Error al obtener producto con id ${id}`);
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
                console.log(`No existe producto con id ${id}`);
                return false;
            }

        } catch (error) {
            console.error(`No fue posible eliminar el producto - ${error}`);
        }
    }

}


ensureFile('products.json').then(async () => {

    const manager = new ProductManager('products.json');

    /*await manager.addProduct({
        "title": "Botella",
        "description": "Botella transparente",
        "code": "1234",
        "price": 2563,
        "status": true,
        "stock": 3,
        "category": "cocina",
        "thumbnails": ["img1","img2","img3"]
    });

    await manager.addProduct({
        "title": "Botella",
        "description": "Botella azul",
        "code": "1235",
        "price": 2563,
        "status": true,
        "stock": 2,
        "category": "cocina",
        "thumbnails": ["img1","img2","img3"]
    })

    await manager.modifyProduct({
        "id": 1,
        "description": "Botella rosa",
        "price": 2573,
    })

    await manager.getProducts();
    await manager.getProductById(2);

    await manager.addProduct({
        "title": "Auriculares",
        "description": "Redmi",
        "code": "1236",
        "price": 12563,
        "status": true,
        "stock": 15,
        "category": "tecnologia",
        "thumbnails": ["img1","img2","img3"]
    });

    await manager.addProduct({
        "title": "Monitor",
        "description": "Botella azul",
        "code": "1237",
        "price": 26563,
        "status": true,
        "stock": 9,
        "category": "tecnologia",
        "thumbnails": ["img1","img2","img3"]
    })*/

   // await manager.deleteProduct(2);

  /*  await manager.addProduct({
        "title": "Laptop",
        "description": "Lenovo",
        "code": "1236",
        "price": 125563,
        "status": true,
        "stock": 6,
        "category": "tecnologia",
        "thumbnails": ["img1","img2","img3"]
    });*/

})


