import { testConnection, query } from './config/database.js';

async function runDatabaseTest() {
    console.log('🔍 Начинаем тестирование подключения к MySQL базе данных...\n');

    // Тест 1: Проверка подключения
    console.log('Тест 1: Проверка подключения к базе данных');
    const isConnected = await testConnection();

    if (!isConnected) {
        console.log('\n❌ Не удалось подключиться к базе данных. Проверьте настройки в .env файле.');
        process.exit(1);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Тест 2: Проверка версии MySQL
    try {
        console.log('Тест 2: Получение версии MySQL');
        const versionResult = await query('SELECT VERSION() as version');
        console.log(`✅ Версия MySQL: ${versionResult[0].version}`);
    } catch (error) {
        console.error('❌ Ошибка при получении версии MySQL:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Тест 3: Проверка существующих таблиц
    try {
        console.log('Тест 3: Список таблиц в базе данных');
        const tables = await query('SHOW TABLES');

        if (tables.length === 0) {
            console.log('⚠️  В базе данных пока нет таблиц');
        } else {
            console.log(`✅ Найдено таблиц: ${tables.length}`);
            tables.forEach((table, index) => {
                const tableName = Object.values(table)[0];
                console.log(`   ${index + 1}. ${tableName}`);
            });
        }
    } catch (error) {
        console.error('❌ Ошибка при получении списка таблиц:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Тест 4: Проверка текущей базы данных
    try {
        console.log('Тест 4: Информация о текущей базе данных');
        const dbInfo = await query('SELECT DATABASE() as current_db');
        console.log(`✅ Текущая база данных: ${dbInfo[0].current_db}`);
    } catch (error) {
        console.error('❌ Ошибка при получении информации о базе данных:', error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');
    console.log('✅ Тестирование завершено успешно!\n');

    process.exit(0);
}

// Запускаем тест
runDatabaseTest().catch(error => {
    console.error('\n❌ Критическая ошибка при тестировании:', error);
    process.exit(1);
});
