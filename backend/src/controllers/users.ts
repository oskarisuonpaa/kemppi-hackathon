import {Router,  Request, Response } from 'express';

export const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello from users');
});
