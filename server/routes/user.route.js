import { Router } from 'express';
import { getUser, findOne } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', (req, res) => {res.send({ title: 'sign up' })});

userRouter.get('/:id_user', getUser);

userRouter.get('/email/:email', findOne);

userRouter.post('/', (req, res) => {res.send({ title: 'sign up' })});

userRouter.put('/:id_user', (req, res) => {res.send({ title: 'sign up' })});

userRouter.delete('/:id_user', (req, res) => {res.send({ title: 'sign up' })});

export default userRouter;  