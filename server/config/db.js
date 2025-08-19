import mysql from 'mysql2/promise';

import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config/env.js';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

(async () => {
    try {
        const [rows] = await pool.query('SELECT @@port AS port');
        console.log(`✅ DB connection OK on port ${rows[0].port}`);
    } catch (error) {
        console.error('❌ DB connection failed:', error.message);
    }
})();

export default pool;