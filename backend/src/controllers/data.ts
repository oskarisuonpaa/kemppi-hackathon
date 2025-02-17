import {Router, Request, Response } from 'express';

export const dataRouter = Router();

dataRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello from data');
});