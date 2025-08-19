import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import pool from '../config/db.js';
import * as userService from '../services/user.service.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res) => {
    
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const { full_name, email, password } = req.body;

        const user = await userService.findOne(email);

        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;

            throw error;
        }

        
        const salt = await bcrypt.genSalt(10);
        const pass_hash = await bcrypt.hash(password, salt);

        
        const newUser = await userService.create(full_name, email, password);

        
        const token = jwt.sign({ id_user: newUser.id_user }, JWT_SECRET,{ expiresIn: JWT_EXPIRES_IN });

        await connection.commit();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error('Transaction failed', error);
        res.status(error.statusCode || 500).json({ message: error.message });
    
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
