import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js'
import * as userService from '../services/user.service.js';

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id_user } = jwt.verify(token, JWT_SECRET);

        const user = await userService.getById(id_user);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authorize;
