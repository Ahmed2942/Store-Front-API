import Client from '../database';

export type Order = {
    id? : number;
    user_id : number;
    status : string;
}

export type OrderProduct = {
    id?: number;
    order_id?: number;
    product_id: number;
    product_quantity: number;
}

export class OrderModel {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`couldn't get orders ! Error: ${err}`);
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE id=$1";
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw new Error(`order id ${id} is not found !`)
            }
        } catch(err) {
            throw new Error(`couldn't get order ${id} ! Error: ${err}`);
        }
    }
    async create(ord: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
            const result = await conn.query(sql, [ord.user_id, ord.status]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch(err) {
            throw new Error(`couldn't create new entry ! Error: ${err}`);
        }
    }
   async addProductToOrder(orderProduct: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO order_products (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [orderProduct.order_id, orderProduct.product_id, orderProduct.product_quantity]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch(err) {
            throw new Error(`couldn't create new entry ! Error: ${err}`);
        }
   }
   async currentOrderByUser(user_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='active'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch(err) {
            throw new Error(`couldn't create new entry ! Error: ${err}`);
        }
    }
    async completedOrdersByUser(user_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='completed'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch(err) {
            throw new Error(`couldn't create new entry ! Error: ${err}`);
        }
    }
   
}