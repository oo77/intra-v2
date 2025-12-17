import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import teamRoutes from './routes/team.js';
import projectsRoutes from './routes/projects.js';
import galleryRoutes from './routes/gallery.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Логирование запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/team', teamRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', async (req, res) => {
    const dbConnected = await testConnection();
    res.json({
        status: 'ok',
        database: dbConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
async function startServer() {
    try {
        // Проверяем подключение к БД
        const connected = await testConnection();
        if (!connected) {
            console.error('❌ Не удалось подключиться к базе данных');
            console.log('\n📝 Проверьте настройки в файле .env:');
            console.log('   - DB_HOST');
            console.log('   - DB_USER');
            console.log('   - DB_PASSWORD');
            console.log('   - DB_NAME');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log('\n🚀 Сервер запущен!');
            console.log(`📡 API доступен по адресу: http://localhost:${PORT}`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
            console.log(`📊 База данных: ${process.env.DB_NAME}`);
            console.log(`\n📚 Доступные эндпоинты:`);
            console.log(`   GET  /api/health - Проверка состояния`);
            console.log(`   GET  /api/team - Получить команду`);
            console.log(`   POST /api/team - Создать/обновить члена команды`);
            console.log(`   DELETE /api/team/:id - Удалить члена команды`);
            console.log(`   GET  /api/projects - Получить проекты`);
            console.log(`   POST /api/projects - Создать/обновить проект`);
            console.log(`   DELETE /api/projects/:id - Удалить проект`);
            console.log(`   GET  /api/gallery - Получить галерею`);
            console.log(`   POST /api/gallery - Создать/обновить изображение`);
            console.log(`   DELETE /api/gallery/:id - Удалить изображение`);
            console.log(`\n✅ Готов к работе!\n`);
        });
    } catch (error) {
        console.error('❌ Ошибка запуска сервера:', error);
        process.exit(1);
    }
}

startServer();
