import db from '../config/db.js';

export const getById = async () => {
    const [result] = await pool.query('SELECT * FROM user where id_user = ?', [id]);

    return result[0];
}

export const create = async () => {
    const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?, ?)',
        [full_name, email, pass_hash]
    );
    return { id_user: result.id_user, full_name, email, pass_hash };
};

