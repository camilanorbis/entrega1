import ProductModel from "../models/product.model.js"

export const addProduct = async (req,res) => {
    try {
        const product = req.body;
        const respuesta = await ProductModel.create(product)
        res.status(201).json({ status: 'success', payload: respuesta })
    } catch (error) {

        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({ status: 'error', payload: mensajes.join(", ") });
        }

        res.status(500).json({ status: 'error', payload: 'No fue posible agregar el producto a la base de datos'})
    }
}

export const getProducts = async (req,res) => {
    try {
        let { limit = 10, page = 1, query, sort } = req.query
        let consulta
        let filter = {}
        
        limit = Number(limit)
        page = Number(page)
        const skip = limit * (page - 1)
        if (query) {
            const [key, value] = query.split(":");
            filter[key] = value;
            consulta = ProductModel.find(filter).limit(limit).skip(skip)
        } else {
            consulta = ProductModel.find().limit(limit).skip(skip)
        }
        if (sort) consulta = consulta.sort({ price: Number(sort) }) 

        const totalPages = await getTotalPages(filter,limit)
        const hasPrevPage = page > 1
        const  hasNextPage = page < totalPages

        const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

        const prevLink = hasPrevPage
            ? `${baseUrl}?limit=${limit}&page=${page - 1}${query ? `&query=${query}` : ""}${sort ? `&sort=${sort}` : ""}`
            : null;

        const nextLink = hasNextPage
            ? `${baseUrl}?limit=${limit}&page=${page + 1}${query ? `&query=${query}` : ""}${sort ? `&sort=${sort}` : ""}`
            : null;

        const respuesta = await consulta;
        res.status(200).json({ 
            status: 'success', 
            payload: respuesta, 
            page: page, 
            totalPages: totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            prevLink: prevLink,
            nextLink: nextLink
        })
    } catch (error){
        res.status(500).json({ status: 'error', payload: `No fue posible obtener los productos de la base de datos. Detalle: ${error}`})
    }
}

export const getProductById = async (req,res) => {
    try {
        const { pid } = req.params
        const respuesta = await ProductModel.findById(pid)
        res.status(200).json({ status: 'success', payload: respuesta })
    } catch (error) {
        res.status(500).json({ status: 'error', payload: 'No fue posible obtener el producto'})
    }
}

export const modifyProduct = async (req,res) => {
    try {
        const { pid } = req.params
        const product = req.body

        const resultado = await ProductModel.updateOne({ _id: pid }, { $set: product  })
        
        if (resultado) {
            res.status(200).json({ status: 'success', payload: resultado })
        } else {
            res.status(404).json({ status: 'error', payload: `El producto con id ${pid} no existe o el campo que intenta modificar no forma parte del producto.` })
        }

    } catch (error) {
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({ status: 'error', payload: mensajes.join(", ") });
        }

        res.status(500).json({ status: 'error', payload: `No fue posible modificar el producto con id ${req.params.pid}`})
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const { pid } = req.params

        const product = await ProductModel.findById(pid)

        if (product) {
            const resultado = await ProductModel.deleteOne({ _id: pid })

            if (resultado.acknowledged) {
                res.status(200).json({ status: 'success', payload: resultado })
            } else {
                res.status(400).json({ status: 'error', payload: `El producto con id ${pid} no pudo ser eliminado.` })
            }
        } else {
            res.status(400).json({ status: 'error', payload: `El producto con id ${pid} no existe.` })
        }


    } catch (error) {
        res.status(500).json({ status: 'error', payload: `No fue posible eliminar el producto con id ${req.params.pid}` })
    }
}


async function getTotalPages (filter,limit) {
    let totalDocs
    if (filter) {
        totalDocs = await ProductModel.countDocuments(filter)
    } else {
        totalDocs = await ProductModel.countDocuments()
    }
    const totalPages = totalDocs / limit
    return totalPages
}