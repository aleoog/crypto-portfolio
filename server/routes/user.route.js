import { Router } from 'express';
import { getUser, findOne } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

// userRouter.get('/', );

userRouter.get('/:id_user', authorize, getUser);

userRouter.get('/email/:email', findOne);

// userRouter.put('/:id_user', );

// userRouter.delete('/:id_user', );

export default userRouter;  