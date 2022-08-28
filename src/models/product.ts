import Client from '../database';

export type Product = {
    id? : number;
    name : string;
    price : number;
    category? : string;
}

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`couldn't get products ! Error: ${err}`);
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw new Error(`product id ${id} is not found !`)
            }
        } catch(err) {
            throw new Error(`couldn't get product ${id} ! Error: ${err}`);
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();
            const product = result.rows[0];
            return product;
        } catch(err) {
            throw new Error(`couldn't create new entry ! Error: ${err}`);
        }
    }
} 