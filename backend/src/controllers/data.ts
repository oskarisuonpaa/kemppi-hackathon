import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/data', (req: Request, res: Response) => {
    res.status(201).send('Data created');
});

router.get('/data', (req: Request, res: Response) => {
    res.status(200).send('All data fetched');
});

router.get('/data/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send(`Data fetched with ID: ${id}`);
});

router.put('/data/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send(`Data updated with ID: ${id}`);
});

router.delete('/data/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send(`Data deleted with ID: ${id}`);
});

export default router;