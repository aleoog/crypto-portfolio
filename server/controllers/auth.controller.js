import pool from '../config/db.js';
import * as userService from '../services/user.service.js';

export const signUp = async (req, res) => {
    let connection;

    try {
        connection = await pool.getConnection();

        await userService.create(pass);

        await connection.commit();
        console.log('Transaction succesful');
        
    } catch (error) {
        console.error('Transaction failed', error);
    }
};

export const signIn = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export const signOut = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};