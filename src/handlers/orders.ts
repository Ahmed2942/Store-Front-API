import express, { Request, Response } from 'express'
import { Order, OrderModel, OrderProduct } from '../models/order'
import { verify, JwtPayload } from 'jsonwebtoken'

const ordersModel = new OrderModel();

const orderRoutes = (app: express.Application) => {
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", create);
    app.post("/orders/:id/products", addProductToOrder);
    app.get("/orders/users/:id/current", currentOrderByUser);
    app.get("/orders/users/:id/completed", completedOrdersByUser);
}

const index = async(req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        verify(token, process.env.TOKEN_SECRET!);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    try {
        const orders = await ordersModel.index();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);    
    }
}

const show = async(req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        verify(token, process.env.TOKEN_SECRET!);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    try {
        const order = await ordersModel.show(parseInt(req.params.id));
        return res.status(200).json(order); 
    } catch (err) {
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
    const order: Order = {
        user_id: req.body.user_id,
        status : req.body.status
    };
    try {
        const newOrder = await ordersModel.create(order);
        return res.status(200).json(newOrder);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
    
}

const addProductToOrder = async(req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        verify(token, process.env.TOKEN_SECRET!);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    const orderProduct: OrderProduct = {
        order_id: parseInt(req.params.id),
        product_id: req.body.product_id,
        product_quantity: req.body.product_quantity
    }
    
    try {
        const order = await ordersModel.addProductToOrder(orderProduct);
        return res.status(200).json(order);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
}

const currentOrderByUser = async(req: Request, res: Response) => {
    const user_id = parseInt(req.params.id);
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const payload = verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        if(payload.user_id !== user_id) {
            throw new Error("You are not authorized to access this order");
        }
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    try {
        const currentOrder = await ordersModel.currentOrderByUser(user_id);
        return res.status(200).json(currentOrder);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
}

const completedOrdersByUser = async(req: Request, res: Response) => {
    const user_id = parseInt(req.params.id);
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const payload = verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        if(payload.user_id !== user_id) {
            throw new Error("You are not authorized to access this order");
        }
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`)
    }
    try {
        const completedOrder = await ordersModel.completedOrdersByUser(user_id);
        return res.status(200).json(completedOrder);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
    
}

export default orderRoutes