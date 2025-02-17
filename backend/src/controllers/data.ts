import {Router, Request, Response } from 'express';
import {WeldingData} from '../models/weldingData';

export const dataRouter = Router();

// @TODO: Implement user restrictions

dataRouter.get('/', async (req: Request, res: Response) => {
    try {
        const {model} = req.query as {[key: string]: string};


        const filter: any = {};

        if (model) {
            filter['weldingMachine.model'] = model;
        }

        res.json(filter);
    } catch (error) {
        
    }
});

