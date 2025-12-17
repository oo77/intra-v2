import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
    console.log('🚀 Запуск миграций базы данных...\n');

    // Проверяем подключение
    const connected = await testConnection();
    if (!connected) {
        console.error('❌ Не удалось подключиться к базе данных');
        process.exit(1);
    }

    const migrationsDir = __dirname;
    const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();

    if (migrationFiles.length === 0) {
        console.log('ℹ️  Нет файлов миграций для выполнения');
        return;
    }

    for (const file of migrationFiles) {
        console.log(`📄 Выполнение миграции: ${file}`);

        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        // Разделяем SQL на отдельные запросы
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));

        try {
            for (const statement of statements) {
                await pool.query(statement);
            }
            console.log(`✅ Миграция ${file} выполнена успешно\n`);
        } catch (error) {
            console.error(`❌ Ошибка выполнения миграции ${file}:`, error.message);
            throw error;
        }
    }

    console.log('🎉 Все миграции выполнены успешно!');
}

// Запускаем миграции
runMigrations()
    .then(() => {
        console.log('\n✅ Процесс завершен');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Ошибка:', error);
        process.exit(1);
    });
