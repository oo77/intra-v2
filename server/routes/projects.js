import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Безопасный парсинг JSON
function safeJSONParse(jsonString, defaultValue = []) {
    try {
        if (!jsonString) return defaultValue;
        // Если это уже массив или объект, возвращаем как есть
        if (typeof jsonString === 'object') return jsonString;
        return JSON.parse(jsonString);
    } catch (error) {
        // Возвращаем значение по умолчанию при ошибке парсинга
        return defaultValue;
    }
}

// Вспомогательная функция для форматирования проекта
function formatProject(project) {
    try {
        return {
            id: project.id,
            title: {
                en: project.title_en,
                ru: project.title_ru,
                uz: project.title_uz
            },
            description: {
                en: project.description_en,
                ru: project.description_ru,
                uz: project.description_uz
            },
            image: project.image,
            category: {
                en: project.category_en,
                ru: project.category_ru,
                uz: project.category_uz
            },
            status: project.status,
            duration: project.duration,
            team: project.team,
            details: {
                overview: {
                    en: project.overview_en,
                    ru: project.overview_ru,
                    uz: project.overview_uz
                },
                objectives: {
                    en: safeJSONParse(project.objectives_en, []),
                    ru: safeJSONParse(project.objectives_ru, []),
                    uz: safeJSONParse(project.objectives_uz, [])
                },
                technologies: {
                    en: safeJSONParse(project.technologies_en, []),
                    ru: safeJSONParse(project.technologies_ru, []),
                    uz: safeJSONParse(project.technologies_uz, [])
                },
                impact: {
                    en: project.impact_en,
                    ru: project.impact_ru,
                    uz: project.impact_uz
                }
            }
        };
    } catch (error) {
        console.error('Ошибка форматирования проекта:', project.id, error);
        throw error;
    }
}

// Получить все проекты
router.get('/', async (req, res) => {
    try {
        const projects = await query('SELECT * FROM projects ORDER BY id');
        const formattedProjects = projects.map(formatProject);
        res.json(formattedProjects);
    } catch (error) {
        console.error('Ошибка при получении проектов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить один проект по ID
router.get('/:id', async (req, res) => {
    try {
        const projects = await query(
            'SELECT * FROM projects WHERE id = ?',
            [req.params.id]
        );

        if (projects.length === 0) {
            return res.status(404).json({ error: 'Проект не найден' });
        }

        res.json(formatProject(projects[0]));
    } catch (error) {
        console.error('Ошибка при получении проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить новый проект
router.post('/', async (req, res) => {
    try {
        const { title, description, image, category, status, duration, team, details } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Название и описание обязательны' });
        }

        const result = await query(
            `INSERT INTO projects (
                title_en, title_ru, title_uz,
                description_en, description_ru, description_uz,
                image, category_en, category_ru, category_uz,
                status, duration, team,
                overview_en, overview_ru, overview_uz,
                objectives_en, objectives_ru, objectives_uz,
                technologies_en, technologies_ru, technologies_uz,
                impact_en, impact_ru, impact_uz
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title.en, title.ru, title.uz,
                description.en, description.ru, description.uz,
                image,
                category?.en, category?.ru, category?.uz,
                status || 'Planning',
                duration,
                team,
                details?.overview?.en, details?.overview?.ru, details?.overview?.uz,
                JSON.stringify(details?.objectives?.en || []),
                JSON.stringify(details?.objectives?.ru || []),
                JSON.stringify(details?.objectives?.uz || []),
                JSON.stringify(details?.technologies?.en || []),
                JSON.stringify(details?.technologies?.ru || []),
                JSON.stringify(details?.technologies?.uz || []),
                details?.impact?.en, details?.impact?.ru, details?.impact?.uz
            ]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Проект создан'
        });
    } catch (error) {
        console.error('Ошибка при создании проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить проект
router.put('/:id', async (req, res) => {
    try {
        const { title, description, image, category, status, duration, team, details } = req.body;

        const result = await query(
            `UPDATE projects SET
                title_en = ?, title_ru = ?, title_uz = ?,
                description_en = ?, description_ru = ?, description_uz = ?,
                image = ?, category_en = ?, category_ru = ?, category_uz = ?,
                status = ?, duration = ?, team = ?,
                overview_en = ?, overview_ru = ?, overview_uz = ?,
                objectives_en = ?, objectives_ru = ?, objectives_uz = ?,
                technologies_en = ?, technologies_ru = ?, technologies_uz = ?,
                impact_en = ?, impact_ru = ?, impact_uz = ?
             WHERE id = ?`,
            [
                title.en, title.ru, title.uz,
                description.en, description.ru, description.uz,
                image,
                category?.en, category?.ru, category?.uz,
                status,
                duration,
                team,
                details?.overview?.en, details?.overview?.ru, details?.overview?.uz,
                JSON.stringify(details?.objectives?.en || []),
                JSON.stringify(details?.objectives?.ru || []),
                JSON.stringify(details?.objectives?.uz || []),
                JSON.stringify(details?.technologies?.en || []),
                JSON.stringify(details?.technologies?.ru || []),
                JSON.stringify(details?.technologies?.uz || []),
                details?.impact?.en, details?.impact?.ru, details?.impact?.uz,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Проект не найден' });
        }

        res.json({ message: 'Проект обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удалить проект
router.delete('/:id', async (req, res) => {
    try {
        const result = await query(
            'DELETE FROM projects WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Проект не найден' });
        }

        res.json({ message: 'Проект удален' });
    } catch (error) {
        console.error('Ошибка при удалении проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
