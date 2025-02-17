import {Router,  Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

const hashedPassword = async (password: string) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    return passwordHash
}
export const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await User.find({})
    res.json(users)
});

// Create new user
usersRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const { username, name, password } = req.body
    console.log(password.length)

    if (password.length < 3) {
        res.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
    const passwordHash = await hashedPassword(password)
    

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
});

// Update user

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, name, password, role } = req.body;

    const oldUser = await User.findById(id);
    if (!oldUser) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { 
            username: username ?? oldUser.username, 
            name: name ?? oldUser.name, 
            password: password ? await hashedPassword(password): oldUser.passwordHash, 
            role: role ?? oldUser.role 
        },
        { new: true, runValidators: true, context: 'query' }
    );

    res.json(updatedUser);
});
