import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express'
//import User from '../models/user'
import express from 'express'

export const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response): Promise<> => {
    const { username, password } = req.body

    const user  = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    res.status(200).send({ token, username: user.username, name: user.name })
})

