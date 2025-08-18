import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', (req, res) => {res.send({ title: 'sign up' })});

userRouter.get('/:id', userController.getUser);

userRouter.post('/', (req, res) => {res.send({ title: 'sign up' })});

userRouter.put('/:id', (req, res) => {res.send({ title: 'sign up' })});

userRouter.delete('/:id', (req, res) => {res.send({ title: 'sign up' })});

export default userRouter;  