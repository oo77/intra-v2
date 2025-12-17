import express from 'express';
import { query, transaction } from '../config/database.js';

const router = express.Router();

// Получить все проекты
router.get('/', async (req, res) => {
    try {
        const projects = await query(`
      SELECT id, image, status, duration, team, created_at, updated_at
      FROM projects
      ORDER BY created_at DESC
    `);

        const result = [];

        for (const project of projects) {
            // Получаем переводы
            const translations = await query(`
        SELECT language, title, category, description, overview, impact
        FROM projects_i18n
        WHERE project_id = ?
      `, [project.id]);

            // Получаем массивы
            const arrays = await query(`
        SELECT language, field_type, value, sort_order
        FROM projects_arrays
        WHERE project_id = ?
        ORDER BY sort_order
      `, [project.id]);

            // Формируем структуру
            const projectData = {
                id: project.id,
                image: project.image,
                status: project.status,
                duration: project.duration,
                team: project.team,
                title: { ru: '', en: '', uz: '' },
                category: { ru: '', en: '', uz: '' },
                description: { ru: '', en: '', uz: '' },
                details: {
                    overview: { ru: '', en: '', uz: '' },
                    objectives: { ru: [], en: [], uz: [] },
                    technologies: { ru: [], en: [], uz: [] },
                    impact: { ru: '', en: '', uz: '' }
                }
            };

            // Заполняем переводы
            translations.forEach(t => {
                projectData.title[t.language] = t.title || '';
                projectData.category[t.language] = t.category || '';
                projectData.description[t.language] = t.description || '';
                projectData.details.overview[t.language] = t.overview || '';
                projectData.details.impact[t.language] = t.impact || '';
            });

            // Заполняем массивы
            arrays.forEach(a => {
                if (projectData.details[a.field_type]) {
                    projectData.details[a.field_type][a.language].push(a.value);
                }
            });

            result.push(projectData);
        }

        res.json(result);
    } catch (error) {
        console.error('Ошибка получения проектов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Создать или обновить проект
router.post('/', async (req, res) => {
    try {
        const projectData = req.body;

        const result = await transaction(async (connection) => {
            let projectId = projectData.id;

            if (projectId) {
                // Обновляем существующий
                await connection.execute(
                    'UPDATE projects SET image = ?, status = ?, duration = ?, team = ?, updated_at = NOW() WHERE id = ?',
                    [projectData.image, projectData.status, projectData.duration, projectData.team, projectId]
                );

                // Удаляем старые переводы и массивы
                await connection.execute('DELETE FROM projects_i18n WHERE project_id = ?', [projectId]);
                await connection.execute('DELETE FROM projects_arrays WHERE project_id = ?', [projectId]);
            } else {
                // Создаем новый
                const [insertResult] = await connection.execute(
                    'INSERT INTO projects (image, status, duration, team) VALUES (?, ?, ?, ?)',
                    [projectData.image, projectData.status, projectData.duration, projectData.team]
                );
                projectId = insertResult.insertId;
            }

            // Добавляем переводы
            for (const lang of ['ru', 'en', 'uz']) {
                await connection.execute(
                    'INSERT INTO projects_i18n (project_id, language, title, category, description, overview, impact) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        projectId,
                        lang,
                        projectData.title[lang] || '',
                        projectData.category[lang] || '',
                        projectData.description[lang] || '',
                        projectData.details.overview[lang] || '',
                        projectData.details.impact[lang] || ''
                    ]
                );

                // Добавляем objectives
                if (projectData.details.objectives[lang] && Array.isArray(projectData.details.objectives[lang])) {
                    for (let i = 0; i < projectData.details.objectives[lang].length; i++) {
                        const value = projectData.details.objectives[lang][i];
                        if (value && value.trim()) {
                            await connection.execute(
                                'INSERT INTO projects_arrays (project_id, language, field_type, value, sort_order) VALUES (?, ?, ?, ?, ?)',
                                [projectId, lang, 'objectives', value, i]
                            );
                        }
                    }
                }

                // Добавляем technologies
                if (projectData.details.technologies[lang] && Array.isArray(projectData.details.technologies[lang])) {
                    for (let i = 0; i < projectData.details.technologies[lang].length; i++) {
                        const value = projectData.details.technologies[lang][i];
                        if (value && value.trim()) {
                            await connection.execute(
                                'INSERT INTO projects_arrays (project_id, language, field_type, value, sort_order) VALUES (?, ?, ?, ?, ?)',
                                [projectId, lang, 'technologies', value, i]
                            );
                        }
                    }
                }
            }

            return projectId;
        });

        res.json({ success: true, message: 'Проект сохранен', id: result });
    } catch (error) {
        console.error('Ошибка сохранения проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

// Удалить проект
router.delete('/:id', async (req, res) => {
    try {
        await query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Проект удален' });
    } catch (error) {
        console.error('Ошибка удаления проекта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
