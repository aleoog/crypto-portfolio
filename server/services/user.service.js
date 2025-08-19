import pool from '../config/db.js';

export const findOne = async (email) => {
    const [result] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return result[0];
};

export const getById = async (id) => {
    const [result] = await pool.query(
        'SELECT * FROM users WHERE id_user = ?',
        [id]
    );
    return result[0];
};


export const create = async (full_name, email, pass_hash) => {
    const [result] = await pool.query(
        'INSERT INTO users (full_name, email, pass_hash) VALUES (?, ?, ?)',
        [full_name, email, pass_hash]
    );
    return { id_user: result.insertId, full_name, email };
};
