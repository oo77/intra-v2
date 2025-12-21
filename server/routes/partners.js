import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Получить всех партнеров
router.get('/', async (req, res) => {
    try {
        const partners = await query(
            'SELECT * FROM partners ORDER BY display_order ASC, id ASC'
        );
        res.json(partners);
    } catch (error) {
        console.error('Ошибка при получении партнеров:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить одного партнера по ID
router.get('/:id', async (req, res) => {
    try {
        const partners = await query(
            'SELECT * FROM partners WHERE id = ?',
            [req.params.id]
        );

        if (partners.length === 0) {
            return res.status(404).json({ error: 'Партнер не найден' });
        }

        res.json(partners[0]);
    } catch (error) {
        console.error('Ошибка при получении партнера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить нового партнера
router.post('/', async (req, res) => {
    try {
        const { name, logo_url, website_url, display_order, is_active } = req.body;

        if (!name || !logo_url || !website_url) {
            return res.status(400).json({ error: 'Название, логотип и ссылка обязательны' });
        }

        const result = await query(
            `INSERT INTO partners (name, logo_url, website_url, display_order, is_active) 
             VALUES (?, ?, ?, ?, ?)`,
            [name, logo_url, website_url, display_order || 0, is_active !== false]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Партнер создан'
        });
    } catch (error) {
        console.error('Ошибка при создании партнера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить партнера
router.put('/:id', async (req, res) => {
    try {
        const { name, logo_url, website_url, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE partners SET 
                name = ?, 
                logo_url = ?, 
                website_url = ?, 
                display_order = ?, 
                is_active = ?
             WHERE id = ?`,
            [name, logo_url, website_url, display_order || 0, is_active !== false, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Партнер не найден' });
        }

        res.json({ message: 'Партнер обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении партнера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удалить партнера
router.delete('/:id', async (req, res) => {
    try {
        const result = await query(
            'DELETE FROM partners WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Партнер не найден' });
        }

        res.json({ message: 'Партнер удален' });
    } catch (error) {
        console.error('Ошибка при удалении партнера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

export default router;
