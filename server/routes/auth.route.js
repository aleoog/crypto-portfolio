import { Router } from 'express';
import { signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', (req, res) => { signUp });

// authRouter.post('/signin', (req, res) => { signIn });

// authRouter.post('/signout', (req, res) => { signOut });

authRouter.get('/ping', (req, res) => {
  console.log('Ping endpoint hit');
  res.json({ message: 'pong' });
});


export default authRouter;