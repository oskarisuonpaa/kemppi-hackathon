import {Router,  Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';


export const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await User.find({})
    res.json(users)
});

// Create new user
usersRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const { username, name, password } = req.body

    if (password.length < 3) {
        res.status(400).json({ error: 'Password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
});