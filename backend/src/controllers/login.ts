import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const loginRouter = express.Router();

interface UserType {
    username: string;
    passwordHash: string;
    _id: string;
    name: string;
}

loginRouter.post('/', async (request: express.Request, response: express.Response) => {
    
    const { username, password } = request.body;

    const user: UserType | null = await User.findOne({ username });
    const passwordCorrect = user
        ? await bcrypt.compare(password, user.passwordHash)
        : false;
        
    if (!user || !passwordCorrect) {
        response.status(401).json({
            error: 'Invalid username or password',
        });
        return
    }

    const userForToken = {
        username: user.username,
        id: user._id.toString(),
    };

    const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: 60 * 60 });

    response.status(200).send({ token, username: user.username, name: user.name });
});