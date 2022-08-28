import app from '../../server';
import supertest from 'supertest';
import { Product } from '../../models/product';

const request = supertest(app);
describe('Testing /products endpoint', () => {
    const product: Product = {
        name: "Shirt",
        price: 10,
        category: "Clothes"
    };
    let token: string;
    let product_id: number;
    beforeAll(async () => {
        const response = await request.post('/users').send({
            first_name: "Ahmed",
            last_name: "Heaba",
            password: "qwerty123"
        });
        // expect(response.status).toEqual(200);
        token = response.text;
    });
    it('Testing create endpoint with valid token', async () => {
        const response = await request.post('/products').send(product).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        product_id = response.body.id;
    });
    it('Testing create endpoint with invalid token', async () => {
        const response = await request.post('/products').send(product).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the index endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toEqual(200);
    });
    it('Testing the show endpoint', async () => {
        const response = await request.get(`/products/${product_id}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the show endpoint with invalid user ID', async () => {
        const response = await request.get('/products/999');
        expect(response.status).toEqual(500);
    });
});