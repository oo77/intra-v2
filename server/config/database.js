import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Конфигурация подключения к базе данных
const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 60000, // 60 секунд
    acquireTimeout: 60000,
    timeout: 60000,
    charset: 'utf8mb4'
};

// Создаем пул подключений
const pool = mysql.createPool(dbConfig);

// Проверка подключения
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Успешное подключение к MySQL базе данных');
        console.log(`📊 База данных: ${process.env.DB_NAME}`);
        console.log(`🌐 Хост: ${process.env.DB_HOST}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Ошибка подключения к базе данных:', error.message);
        return false;
    }
}

// Выполнить запрос
async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Ошибка выполнения запроса:', error);
        throw error;
    }
}

// Получить одну запись
async function queryOne(sql, params) {
    const results = await query(sql, params);
    return results[0] || null;
}

// Транзакция
async function transaction(callback) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const result = await callback(connection);
        await connection.commit();
        connection.release();
        return result;
    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
}

export {
    pool,
    query,
    queryOne,
    transaction,
    testConnection
};
