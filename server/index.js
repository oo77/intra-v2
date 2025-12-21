import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './config/database.js';
import { initializeDatabase } from './config/migrations.js';
import teamRoutes from './routes/team-members.js';
import projectsRoutes from './routes/projects.js';
import galleryRoutes from './routes/gallery.js';
import partnersRoutes from './routes/partners.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// CORS - разрешаем все origins для простоты (или настройте под свой домен)
app.use(cors({
    origin: true,
    credentials: true
}));

// Парсинг JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/team', teamRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/partners', partnersRoutes);

// Health check
app.get('/api/health', async (req, res) => {
    const dbConnected = await testConnection();
    res.json({
        status: 'ok',
        database: dbConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// API 404 handler - только для /api маршрутов
app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API маршрут не найден' });
});

// Production: раздача статических файлов из dist/
if (isProduction) {
    const distPath = path.join(__dirname, '..', 'dist');

    // Статические файлы
    app.use(express.static(distPath));

    // SPA fallback - все остальные маршруты отдают index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error('Ошибка:', err.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск
async function start() {
    try {
        // Проверяем подключение к базе данных
        const connected = await testConnection();
        if (!connected) {
            console.error('❌ Не удалось подключиться к базе данных');
            console.error('💡 Проверьте настройки подключения в .env файле');
            process.exit(1);
        }

        // Автоматическая инициализация и миграция БД
        await initializeDatabase();

        // Запускаем сервер
        app.listen(PORT, () => {
            console.log('='.repeat(60));
            console.log('🚀 СЕРВЕР УСПЕШНО ЗАПУЩЕН');
            console.log('='.repeat(60));
            console.log(`📍 URL: http://localhost:${PORT}`);
            console.log(`📊 База данных: ${process.env.DB_NAME}`);
            console.log(`🌍 Режим: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
            console.log('='.repeat(60) + '\n');
        });
    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА ЗАПУСКА СЕРВЕРА');
        console.error('='.repeat(60));
        console.error('Причина:', error.message);
        console.error('='.repeat(60) + '\n');
        process.exit(1);
    }
}

start();
