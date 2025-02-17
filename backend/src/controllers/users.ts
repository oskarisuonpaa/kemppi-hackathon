import {Router,  Request, Response } from 'express';

export const usersRouter = Router();

usersRouter.post('/', (req: Request, res: Response) => {
    res.status(201).send('User created');
});
