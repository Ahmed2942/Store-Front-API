import app from '../../server';
import supertest from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken';
import { Order, OrderProduct } from '../../models/order';
import { Product } from '../../models/product';

const request = supertest(app);
describe('Testing /orders endpoint', () => {
    let activeOrder: Order = {
        user_id : 1,
        status : "active"
    };
    let completedOrder: Order = {
        user_id : 1,
        status : "completed"
    };
    let orderProduct: OrderProduct = {
        product_id: 1,
        product_quantity: 5
    };
    let token: string;
    let user_id: number;
    let product_id: number;
    let order_id: string;
    beforeAll(async () => {
        let response = await request.post('/users').send({
            first_name: "Ahmed",
            last_name: "Heaba",
            password: "qwerty123"
        }).expect(200);
        token = response.text;
        const payloadJWT = verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        user_id = payloadJWT.user_id;
        activeOrder.user_id = user_id;
        completedOrder.user_id = user_id;

        response = await request.post('/products').send({
            name: "Shirt",
            price: 10,
            category: "Clothes"
        }).set('Authorization', `Bearer ${token}`).expect(200);
        product_id = response.body.id;
        orderProduct.product_id = product_id;
    });
    it('Testing create endpoint with valid token: /orders [POST]', async () => {
        let response = await request.post('/orders').send(activeOrder).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        order_id = response.body.id;
        // create completed order
        response = await request.post('/orders').send(completedOrder).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing create endpoint with invalid token: /orders [POST]', async () => {
        let response = await request.post('/orders').send(activeOrder).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the index endpoint with valid token: /orders [GET]', async () => {
        const response = await request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the index endpoint with invalid token: /orders [GET]', async () => {
        const response = await request.get('/orders').set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the show endpoint with valid token: /orders/:id [GET]', async () => {
        const response = await request.get(`/orders/${order_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the show endpoint with invalid token: /orders/:id [GET]', async () => {
        const response = await request.get(`/orders/${order_id}`).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the addProduct endpoint with valid token: /orders/:id/products [POST]', async () => {
        const response = await request.post(`/orders/${order_id}/products`).send(orderProduct).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the addProduct endpoint with invalid token: /orders/:id/products [POST]', async () => {
        const response = await request.post(`/orders/${order_id}/products`).send(orderProduct).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the current order by user endpoint using valid token: /orders/users/:id/current [GET]', async () => {
        const response = await request.get(`/orders/users/${activeOrder.user_id}/current`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the current order by user endpoint using invalid token: /orders/users/:id/current [GET]', async () => {
        const response = await request.get(`/orders/users/${activeOrder.user_id}/current`).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the completed order by user endpoint using valid token: /orders/users/:id/completed [GET]', async () => {
        const response = await request.get(`/orders/users/${completedOrder.user_id}/completed`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the completed order by user endpoint using invalid token: /orders/users/:id/completed [GET]', async () => {
        const response = await request.get(`/orders/users/${completedOrder.user_id}/completed`).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
});