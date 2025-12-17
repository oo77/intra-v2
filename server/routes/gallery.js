const express = require('express');
const router = express.Router();
const { query, transaction } = require('../config/database');

// Получить всю галерею
router.get('/', async (req, res) => {
    try {
        const images = await query(`
      SELECT gi.id, gi.row_number, gi.url, gi.sort_order
      FROM gallery_images gi
      ORDER BY gi.row_number, gi.sort_order
    `);

        const result = { row1: [], row2: [] };

        for (const image of images) {
            // Получаем переводы
            const translations = await query(`
        SELECT language, alt_text
        FROM gallery_images_i18n
        WHERE image_id = ?
      `, [image.id]);

            const imageData = {
                id: image.id,
                url: image.url,
                alt: { ru: '', en: '', uz: '' }
            };

            translations.forEach(t => {
                imageData.alt[t.language] = t.alt_text || '';
            });

            if (image.row_number === 1) {
                result.row1.push(imageData);
            } else if (image.row_number === 2) {
                result.row2.push(imageData);
            }
        }

        res.json(result);
    } catch (error) {
        console.error('Ошибка получения галереи:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Создать или обновить изображение
router.post('/', async (req, res) => {
    try {
        const { id, url, alt, rowNumber, sortOrder } = req.body;

        await transaction(async (connection) => {
            let imageId = id;

            if (imageId) {
                // Обновляем
                await connection.execute(
                    'UPDATE gallery_images SET url = ?, row_number = ?, sort_order = ?, updated_at = NOW() WHERE id = ?',
                    [url, rowNumber, sortOrder || 0, imageId]
                );

                // Удаляем старые переводы
                await connection.execute('DELETE FROM gallery_images_i18n WHERE image_id = ?', [imageId]);
            } else {
                // Создаем новое
                const [insertResult] = await connection.execute(
                    'INSERT INTO gallery_images (url, row_number, sort_order) VALUES (?, ?, ?)',
                    [url, rowNumber, sortOrder || 0]
                );
                imageId = insertResult.insertId;
            }

            // Добавляем переводы
            for (const lang of ['ru', 'en', 'uz']) {
                if (alt && alt[lang]) {
                    await connection.execute(
                        'INSERT INTO gallery_images_i18n (image_id, language, alt_text) VALUES (?, ?, ?)',
                        [imageId, lang, alt[lang]]
                    );
                }
            }
        });

        res.json({ success: true, message: 'Изображение сохранено' });
    } catch (error) {
        console.error('Ошибка сохранения изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

// Удалить изображение
router.delete('/:id', async (req, res) => {
    try {
        await query('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Изображение удалено' });
    } catch (error) {
        console.error('Ошибка удаления изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить порядок изображений
router.put('/reorder', async (req, res) => {
    try {
        const { images } = req.body; // [{ id, sortOrder }]

        await transaction(async (connection) => {
            for (const img of images) {
                await connection.execute(
                    'UPDATE gallery_images SET sort_order = ? WHERE id = ?',
                    [img.sortOrder, img.id]
                );
            }
        });

        res.json({ success: true, message: 'Порядок обновлен' });
    } catch (error) {
        console.error('Ошибка обновления порядка:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
