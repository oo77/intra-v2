import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
    console.log('🚀 Начинаем выполнение миграций...\n');

    // Проверяем подключение
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('❌ Не удалось подключиться к базе данных');
        process.exit(1);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Получаем список файлов миграций
    const migrationsDir = __dirname;
    const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();

    if (migrationFiles.length === 0) {
        console.log('⚠️  Файлы миграций не найдены');
        return;
    }

    console.log(`📁 Найдено миграций: ${migrationFiles.length}\n`);

    // Выполняем каждую миграцию
    for (const file of migrationFiles) {
        console.log(`📝 Выполняется: ${file}`);

        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        // Разделяем SQL на отдельные запросы
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        try {
            for (const statement of statements) {
                await pool.query(statement);
            }
            console.log(`✅ Успешно: ${file}\n`);
        } catch (error) {
            console.error(`❌ Ошибка в ${file}:`, error.message);
            throw error;
        }
    }

    console.log('='.repeat(60));
    console.log('✅ Все миграции выполнены успешно!\n');
}

// Запускаем миграции
runMigrations()
    .then(() => {
        console.log('🎉 Миграции завершены!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Критическая ошибка:', error);
        process.exit(1);
    });
