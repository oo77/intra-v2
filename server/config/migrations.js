import { pool, query } from './database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Список необходимых таблиц
const REQUIRED_TABLES = [
    'team_members',
    'projects',
    'gallery',
    'partners'
];

/**
 * Проверяет существование таблицы в базе данных
 */
async function checkTableExists(tableName) {
    try {
        const result = await query(
            `SELECT COUNT(*) as count 
             FROM information_schema.tables 
             WHERE table_schema = DATABASE() 
             AND table_name = ?`,
            [tableName]
        );
        return result[0].count > 0;
    } catch (error) {
        console.error(`❌ Ошибка проверки таблицы ${tableName}:`, error.message);
        return false;
    }
}

/**
 * Проверяет все необходимые таблицы
 */
async function checkAllTables() {
    console.log('🔍 Проверка структуры базы данных...');

    const missingTables = [];

    for (const tableName of REQUIRED_TABLES) {
        const exists = await checkTableExists(tableName);
        if (!exists) {
            missingTables.push(tableName);
            console.log(`⚠️  Таблица "${tableName}" не найдена`);
        } else {
            console.log(`✅ Таблица "${tableName}" существует`);
        }
    }

    return {
        allExist: missingTables.length === 0,
        missingTables
    };
}

/**
 * Запускает миграцию базы данных
 */
async function runMigration() {
    try {
        console.log('🚀 Запуск миграции базы данных...');

        // Путь к файлу схемы
        const schemaPath = path.join(__dirname, '..', 'migrations', 'schema.sql');

        // Читаем SQL файл
        const schemaSql = await fs.readFile(schemaPath, 'utf-8');

        // Получаем соединение из пула
        const connection = await pool.getConnection();

        try {
            // Разбиваем SQL на отдельные команды
            // Удаляем комментарии и пустые строки
            const statements = schemaSql
                .split(';')
                .map(stmt => stmt.trim())
                .filter(stmt => {
                    // Убираем пустые строки и комментарии
                    return stmt.length > 0 &&
                        !stmt.startsWith('--') &&
                        !stmt.startsWith('/*');
                });

            console.log(`📝 Выполнение ${statements.length} SQL команд...`);

            // Выполняем каждую команду
            for (const statement of statements) {
                if (statement.trim()) {
                    await connection.query(statement);
                }
            }

            console.log('✅ Миграция успешно выполнена!');
            console.log('📊 Созданы таблицы:');
            REQUIRED_TABLES.forEach(table => console.log(`   - ${table}`));

            return true;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('❌ Ошибка при выполнении миграции:');
        console.error('   Сообщение:', error.message);
        if (error.sql) {
            console.error('   SQL:', error.sql.substring(0, 200) + '...');
        }
        throw error;
    }
}

/**
 * Инициализирует базу данных
 * Проверяет таблицы и запускает миграцию при необходимости
 */
export async function initializeDatabase() {
    try {
        console.log('\n' + '='.repeat(60));
        console.log('📦 ИНИЦИАЛИЗАЦИЯ БАЗЫ ДАННЫХ');
        console.log('='.repeat(60) + '\n');

        // Проверяем все таблицы
        const { allExist, missingTables } = await checkAllTables();

        if (allExist) {
            console.log('\n✅ Все таблицы присутствуют в базе данных');
            console.log('='.repeat(60) + '\n');
            return true;
        }

        // Если есть отсутствующие таблицы - запускаем миграцию
        console.log(`\n⚠️  Обнаружено отсутствующих таблиц: ${missingTables.length}`);
        console.log('📋 Отсутствующие таблицы:', missingTables.join(', '));
        console.log('\n🔧 Запуск автоматической миграции...\n');

        await runMigration();

        // Повторная проверка
        const { allExist: allExistAfter } = await checkAllTables();

        if (allExistAfter) {
            console.log('\n✅ База данных успешно инициализирована!');
            console.log('='.repeat(60) + '\n');
            return true;
        } else {
            throw new Error('Не все таблицы были созданы');
        }
    } catch (error) {
        console.error('\n❌ ОШИБКА ИНИЦИАЛИЗАЦИИ БАЗЫ ДАННЫХ');
        console.error('='.repeat(60));
        console.error('Причина:', error.message);
        console.error('='.repeat(60) + '\n');
        throw error;
    }
}

/**
 * Принудительный запуск миграции (для ручного использования)
 */
export async function forceMigration() {
    console.log('⚠️  ПРИНУДИТЕЛЬНАЯ МИГРАЦИЯ');
    console.log('='.repeat(60) + '\n');
    await runMigration();
}

export { checkTableExists, checkAllTables, runMigration };
