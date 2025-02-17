import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { usersRouter } from './controllers/users';
import { dataRouter } from './controllers/data';
import { loginRouter } from './controllers/login'

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/data', dataRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});