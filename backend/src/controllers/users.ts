import {Router,  Request, Response } from 'express';
import User from '../models/user';


export const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await User.find({})
    res.json(users)
});
