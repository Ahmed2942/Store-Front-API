import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
    password_digest?: string;
}

export class UserModel {
    async index() {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to get users ! Error: ${err}`);
        }
    }
    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw new Error(`order id ${id} is not found !`)
            }
        } catch (err) {
            throw new Error(`Unable to get user ${id} ! Error: ${err}`);
        }
    }
    async create(u: User) {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds!));
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch(err) {
            throw new Error(`Unable to create user (${u.first_name} ${u.last_name}): ${err}`);
        }
    }
    async authenticate(u: User) {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE first_name=$1 AND last_name=$2';
            const result = await conn.query(sql, [u.first_name, u.last_name]);
            conn.release();
            if(result.rows.length) {
                for(let i=0; i<result.rows.length; i++) {
                    const user = result.rows[i];    
                    if(bcrypt.compareSync(u.password + pepper, user.password_digest)) {
                        return user;
                    }
                }
            }
            return null;

        } catch(err) {
            throw new Error(`Unable to authenticate user (${u.first_name} ${u.last_name}): ${err}`);
        }
    }
}