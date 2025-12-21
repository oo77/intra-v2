#!/usr/bin/env node

/**
 * Скрипт для ручного запуска миграции базы данных
 * Использование: npm run migrate
 */

import { initializeDatabase, forceMigration } from './config/migrations.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const args = process.argv.slice(2);
    const force = args.includes('--force') || args.includes('-f');

    try {
        if (force) {
            console.log('⚠️  Принудительная миграция...\n');
            await forceMigration();
        } else {
            await initializeDatabase();
        }

        console.log('✅ Миграция завершена успешно!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Ошибка миграции:', error.message);
        process.exit(1);
    }
}

main();
