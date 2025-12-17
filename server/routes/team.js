import express from 'express';
import { query, transaction } from '../config/database.js';

const router = express.Router();

// Получить всех членов команды
router.get('/', async (req, res) => {
    try {
        const members = await query(`
      SELECT DISTINCT tm.id, tm.image, tm.email, tm.phone
      FROM team_members tm
      ORDER BY tm.created_at DESC
    `);

        const result = {};

        for (const member of members) {
            // Получаем переводы
            const translations = await query(`
        SELECT language, name, role, bio, biography
        FROM team_members_i18n
        WHERE member_id = ?
      `, [member.id]);

            // Получаем массивы данных
            const arrays = await query(`
        SELECT language, field_type, value, sort_order
        FROM team_members_arrays
        WHERE member_id = ?
        ORDER BY sort_order
      `, [member.id]);

            // Формируем структуру данных
            const memberData = {
                id: member.id,
                image: member.image,
                email: member.email,
                phone: member.phone,
                ru: { name: '', role: '', bio: '', biography: '', expertise: [], education: [], experience: [], publications: [], achievements: [] },
                en: { name: '', role: '', bio: '', biography: '', expertise: [], education: [], experience: [], publications: [], achievements: [] },
                uz: { name: '', role: '', bio: '', biography: '', expertise: [], education: [], experience: [], publications: [], achievements: [] }
            };

            // Заполняем переводы
            translations.forEach(t => {
                if (memberData[t.language]) {
                    memberData[t.language].name = t.name || '';
                    memberData[t.language].role = t.role || '';
                    memberData[t.language].bio = t.bio || '';
                    memberData[t.language].biography = t.biography || '';
                }
            });

            // Заполняем массивы
            arrays.forEach(a => {
                if (memberData[a.language] && memberData[a.language][a.field_type]) {
                    memberData[a.language][a.field_type].push(a.value);
                }
            });

            result[member.id] = memberData;
        }

        res.json(result);
    } catch (error) {
        console.error('Ошибка получения команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Создать или обновить члена команды
router.post('/', async (req, res) => {
    try {
        const memberData = req.body;

        await transaction(async (connection) => {
            // Проверяем существование
            const [existing] = await connection.execute(
                'SELECT id FROM team_members WHERE id = ?',
                [memberData.id]
            );

            if (existing.length > 0) {
                // Обновляем
                await connection.execute(
                    'UPDATE team_members SET image = ?, email = ?, phone = ?, updated_at = NOW() WHERE id = ?',
                    [memberData.image, memberData.email, memberData.phone, memberData.id]
                );

                // Удаляем старые переводы и массивы
                await connection.execute('DELETE FROM team_members_i18n WHERE member_id = ?', [memberData.id]);
                await connection.execute('DELETE FROM team_members_arrays WHERE member_id = ?', [memberData.id]);
            } else {
                // Создаем нового
                await connection.execute(
                    'INSERT INTO team_members (id, image, email, phone) VALUES (?, ?, ?, ?)',
                    [memberData.id, memberData.image, memberData.email, memberData.phone]
                );
            }

            // Добавляем переводы
            for (const lang of ['ru', 'en', 'uz']) {
                if (memberData[lang]) {
                    await connection.execute(
                        'INSERT INTO team_members_i18n (member_id, language, name, role, bio, biography) VALUES (?, ?, ?, ?, ?, ?)',
                        [memberData.id, lang, memberData[lang].name, memberData[lang].role, memberData[lang].bio, memberData[lang].biography]
                    );

                    // Добавляем массивы
                    const fields = ['expertise', 'education', 'experience', 'publications', 'achievements'];
                    for (const field of fields) {
                        if (memberData[lang][field] && Array.isArray(memberData[lang][field])) {
                            for (let i = 0; i < memberData[lang][field].length; i++) {
                                const value = memberData[lang][field][i];
                                if (value && value.trim()) {
                                    await connection.execute(
                                        'INSERT INTO team_members_arrays (member_id, language, field_type, value, sort_order) VALUES (?, ?, ?, ?, ?)',
                                        [memberData.id, lang, field, value, i]
                                    );
                                }
                            }
                        }
                    }
                }
            }
        });

        res.json({ success: true, message: 'Член команды сохранен' });
    } catch (error) {
        console.error('Ошибка сохранения члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

// Удалить члена команды
router.delete('/:id', async (req, res) => {
    try {
        await query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Член команды удален' });
    } catch (error) {
        console.error('Ошибка удаления члена команды:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
