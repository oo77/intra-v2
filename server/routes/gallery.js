import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Получить все изображения галереи
router.get('/', async (req, res) => {
    try {
        const images = await query(
            'SELECT * FROM gallery ORDER BY row_num, id'
        );

        // Преобразуем в формат с row1 и row2
        const result = {
            row1: images.filter(img => img.row_num === 1).map(img => ({
                id: img.id,
                url: img.url,
                alt: {
                    ru: img.alt_ru,
                    en: img.alt_en,
                    uz: img.alt_uz
                }
            })),
            row2: images.filter(img => img.row_num === 2).map(img => ({
                id: img.id,
                url: img.url,
                alt: {
                    ru: img.alt_ru,
                    en: img.alt_en,
                    uz: img.alt_uz
                }
            }))
        };

        res.json(result);
    } catch (error) {
        console.error('Ошибка при получении галереи:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить одно изображение по ID
router.get('/:id', async (req, res) => {
    try {
        const images = await query(
            'SELECT * FROM gallery WHERE id = ?',
            [req.params.id]
        );

        if (images.length === 0) {
            return res.status(404).json({ error: 'Изображение не найдено' });
        }

        const image = images[0];
        res.json({
            id: image.id,
            url: image.url,
            alt: {
                ru: image.alt_ru,
                en: image.alt_en,
                uz: image.alt_uz
            },
            row_num: image.row_num
        });
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить новое изображение
router.post('/', async (req, res) => {
    try {
        const { url, alt, row_num = 1 } = req.body;

        if (!url || !alt || !alt.ru || !alt.en || !alt.uz) {
            return res.status(400).json({ error: 'URL и описания на всех языках обязательны' });
        }

        const result = await query(
            `INSERT INTO gallery (url, alt_ru, alt_en, alt_uz, row_num) 
             VALUES (?, ?, ?, ?, ?)`,
            [url, alt.ru, alt.en, alt.uz, row_num]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Изображение создано'
        });
    } catch (error) {
        console.error('Ошибка при добавлении изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить изображение
router.put('/:id', async (req, res) => {
    try {
        const { url, alt, row_num } = req.body;

        const result = await query(
            `UPDATE gallery 
             SET url = ?, alt_ru = ?, alt_en = ?, alt_uz = ?, row_num = ?
             WHERE id = ?`,
            [url, alt.ru, alt.en, alt.uz, row_num, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Изображение не найдено' });
        }

        res.json({ message: 'Изображение обновлено' });
    } catch (error) {
        console.error('Ошибка при обновлении изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удалить изображение
router.delete('/:id', async (req, res) => {
    try {
        const result = await query(
            'DELETE FROM gallery WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Изображение не найдено' });
        }

        res.json({ message: 'Изображение удалено' });
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
