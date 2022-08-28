import express, { Request, Response } from 'express'
import { Product, ProductModel } from '../models/product'
import { verify } from 'jsonwebtoken'

const productsModel = new ProductModel()

const productRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
}

const index = async(_req: Request, res: Response) => {
    try {
        const products = await productsModel.index();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
}

const show = async(req: Request, res: Response) => {
    try {
        const product = await productsModel.show(parseInt(req.params.id));
        return res.status(200).json(product);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }

}

const create = async(req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        verify(token, process.env.TOKEN_SECRET!);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    const product: Product = {
        name: req.body.name,
        price : req.body.price,
        category : req.body.category
    };
    try {
        const newProduct = await productsModel.create(product);
        return res.status(200).json(newProduct);
    } catch (err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
    
    
}

export default productRoutes