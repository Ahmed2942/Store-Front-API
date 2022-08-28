import app from '../../server';
import supertest from 'supertest';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);
describe('Testing /users endpoint', () => {
    const user: User = {
        first_name: "Ahmed",
        last_name: "Heaba",
        password: "qwerty123"
    };
    let token: string;
    let user_id: string;
    it('Testing create endpoint', async () => {
        const response = await request.post('/users').send(user);
        expect(response.status).toEqual(200);
        token = response.text;
        const payloadJWT = verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        user_id = payloadJWT.user_id;
    });

    it('Testing the index endpoint with valid token', async () => {
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it('Testing the index endpoint with invalid token', async () => {
        const response = await request.get('/users').set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });

    it('Testing the show endpoint with valid token and valid user ID', async () => {
        const response = await request.get(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('Testing the show endpoint with invalid token and invalid user ID', async () => {
        const response = await request.get(`/users/999`).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the show endpoint with invalid token and valid user ID', async () => {
        const response = await request.get(`/users/${user_id}`).set('Authorization', `Bearer NOTvalidtokenJUSTblablabla`);
        expect(response.status).toEqual(401);
    });
    it('Testing the show endpoint with valid token and invalid user ID', async () => {
        const response = await request.get(`/users/999`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });
    it('Testing the authorization endpoint with valid user', async () => {
        const response = await request.post('/users/login').send(user);
        expect(response.status).toEqual(200);
    });

    it('Testing the authorization endpoint with invalid user', async () => {
        const response = await request.post('/users/login').send({
            first_name: "Mohamed",
            last_name: "Heaba",
            password: "qwerty123"
        });
        expect(response.status).toEqual(401);
        expect(response.text).toContain('Incorrect user information');
    });
});