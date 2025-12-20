import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Вспомогательная функция для форматирования члена команды
function formatTeamMember(member) {
    try {
        return {
            id: member.id,
            image: member.image,
            email: member.email,
            phone: member.phone,
            ru: {
                name: member.name_ru,
                role: member.role_ru,
                bio: member.bio_ru,
                biography: member.biography_ru,
                expertise: safeJSONParse(member.expertise_ru, []),
                education: safeJSONParse(member.education_ru, []),
                experience: safeJSONParse(member.experience_ru, []),
                publications: safeJSONParse(member.publications_ru, []),
                achievements: safeJSONParse(member.achievements_ru, [])
            },
            en: {
                name: member.name_en,
                role: member.role_en,
                bio: member.bio_en,
                biography: member.biography_en,
                expertise: safeJSONParse(member.expertise_en, []),
                education: safeJSONParse(member.education_en, []),
                experience: safeJSONParse(member.experience_en, []),
                publications: safeJSONParse(member.publications_en, []),
                achievements: safeJSONParse(member.achievements_en, [])
            },
            uz: {
                name: member.name_uz,
                role: member.role_uz,
                bio: member.bio_uz,
                biography: member.biography_uz,
                expertise: safeJSONParse(member.expertise_uz, []),
                education: safeJSONParse(member.education_uz, []),
                experience: safeJSONParse(member.experience_uz, []),
                publications: safeJSONParse(member.publications_uz, []),
                achievements: safeJSONParse(member.achievements_uz, [])
            }
        };
    } catch (error) {
        console.error('Ошибка форматирования члена команды:', member.id, error);
        throw error;
    }
}

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

// Получить всех членов команды
router.get('/', async (req, res) => {
    try {
        const members = await query('SELECT * FROM team_members ORDER BY id');

        // Преобразуем массив в объект с ключами по id
        const result = {};
        members.forEach(member => {
            result[member.id] = formatTeamMember(member);
        });

        res.json(result);
    } catch (error) {
        console.error('Ошибка при получении команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить одного члена команды по ID
router.get('/:id', async (req, res) => {
    try {
        const members = await query(
            'SELECT * FROM team_members WHERE id = ?',
            [req.params.id]
        );

        if (members.length === 0) {
            return res.status(404).json({ error: 'Член команды не найден' });
        }

        res.json(formatTeamMember(members[0]));
    } catch (error) {
        console.error('Ошибка при получении члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить нового члена команды
router.post('/', async (req, res) => {
    try {
        const { id, image, email, phone, ru, en, uz } = req.body;

        if (!id || !ru?.name || !en?.name || !uz?.name) {
            return res.status(400).json({ error: 'ID и имена на всех языках обязательны' });
        }

        const result = await query(
            `INSERT INTO team_members (
                id, image, email, phone,
                name_ru, name_en, name_uz,
                role_ru, role_en, role_uz,
                bio_ru, bio_en, bio_uz,
                biography_ru, biography_en, biography_uz,
                expertise_ru, expertise_en, expertise_uz,
                education_ru, education_en, education_uz,
                experience_ru, experience_en, experience_uz,
                publications_ru, publications_en, publications_uz,
                achievements_ru, achievements_en, achievements_uz
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id, image, email, phone,
                ru.name, en.name, uz.name,
                ru.role, en.role, uz.role,
                ru.bio, en.bio, uz.bio,
                ru.biography, en.biography, uz.biography,
                JSON.stringify(ru.expertise || []),
                JSON.stringify(en.expertise || []),
                JSON.stringify(uz.expertise || []),
                JSON.stringify(ru.education || []),
                JSON.stringify(en.education || []),
                JSON.stringify(uz.education || []),
                JSON.stringify(ru.experience || []),
                JSON.stringify(en.experience || []),
                JSON.stringify(uz.experience || []),
                JSON.stringify(ru.publications || []),
                JSON.stringify(en.publications || []),
                JSON.stringify(uz.publications || []),
                JSON.stringify(ru.achievements || []),
                JSON.stringify(en.achievements || []),
                JSON.stringify(uz.achievements || [])
            ]
        );

        res.status(201).json({
            id,
            message: 'Член команды добавлен'
        });
    } catch (error) {
        console.error('Ошибка при добавлении члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить члена команды
router.put('/:id', async (req, res) => {
    try {
        const { image, email, phone, ru, en, uz } = req.body;

        const result = await query(
            `UPDATE team_members SET
                image = ?, email = ?, phone = ?,
                name_ru = ?, name_en = ?, name_uz = ?,
                role_ru = ?, role_en = ?, role_uz = ?,
                bio_ru = ?, bio_en = ?, bio_uz = ?,
                biography_ru = ?, biography_en = ?, biography_uz = ?,
                expertise_ru = ?, expertise_en = ?, expertise_uz = ?,
                education_ru = ?, education_en = ?, education_uz = ?,
                experience_ru = ?, experience_en = ?, experience_uz = ?,
                publications_ru = ?, publications_en = ?, publications_uz = ?,
                achievements_ru = ?, achievements_en = ?, achievements_uz = ?
             WHERE id = ?`,
            [
                image, email, phone,
                ru.name, en.name, uz.name,
                ru.role, en.role, uz.role,
                ru.bio, en.bio, uz.bio,
                ru.biography, en.biography, uz.biography,
                JSON.stringify(ru.expertise || []),
                JSON.stringify(en.expertise || []),
                JSON.stringify(uz.expertise || []),
                JSON.stringify(ru.education || []),
                JSON.stringify(en.education || []),
                JSON.stringify(uz.education || []),
                JSON.stringify(ru.experience || []),
                JSON.stringify(en.experience || []),
                JSON.stringify(uz.experience || []),
                JSON.stringify(ru.publications || []),
                JSON.stringify(en.publications || []),
                JSON.stringify(uz.publications || []),
                JSON.stringify(ru.achievements || []),
                JSON.stringify(en.achievements || []),
                JSON.stringify(uz.achievements || []),
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Член команды не найден' });
        }

        res.json({ message: 'Член команды обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удалить члена команды
router.delete('/:id', async (req, res) => {
    try {
        const result = await query(
            'DELETE FROM team_members WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Член команды не найден' });
        }

        res.json({ message: 'Член команды удален' });
    } catch (error) {
        console.error('Ошибка при удалении члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
