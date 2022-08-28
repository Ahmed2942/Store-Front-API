import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/user'
import { sign, verify, JwtPayload } from 'jsonwebtoken'


const usersModel = new UserModel();

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.post("/users/login", authenticate);
}

const index = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        verify(token, process.env.TOKEN_SECRET!);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
    try {
        const users = await usersModel.index();
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
}

const show = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.id);
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader!.split(" ")[1];
        const payload = verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        if(payload.user_id !== user_id) {
            throw new Error("You are not authorized to access this user data");
        }
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`)
    }
    try {
        const user = await usersModel.show(user_id);
        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }
    try {
        const newUser = await usersModel.create(user);
        const token = sign({ user_id: newUser.id }, process.env.TOKEN_SECRET!);
        return res.status(200).send(token);
    } catch(err) {
        return res.status(500).send(`Internal server error ! \nError: ${err}`);
    }
    
}

const authenticate = async (req: Request, res: Response) => {
    const u: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    }
    try {
        const user = await usersModel.authenticate(u);
        if(user === null) {
            throw new Error("Incorrect user information");
        }
        const token = sign({ user_id: user.id }, process.env.TOKEN_SECRET!);
        return res.status(200).json(token);
    } catch(err) {
        return res.status(401).send(`Authentication error ! \nError: ${err}`);
    }
}

export default userRoutes;

