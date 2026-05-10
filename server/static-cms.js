import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();
const PORT = 3005;
const SECRET_TOKEN = process.env.CMS_SECRET_TOKEN || 'default_token';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CMS Server is running! Use /api/static endpoints.');
});

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-cms-token'];
    if (token !== SECRET_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(rootDir, 'public/projects-images/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/api/static/upload', authMiddleware, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/projects-images/${req.file.filename}` });
});

// Универсальный эндпоинт для сохранения любых данных в JSON
app.post('/api/static/:type', authMiddleware, async (req, res) => {
    const { type } = req.params; // projects, team-members, gallery
    try {
        const fileName = type === 'team' ? 'team-members.json' : `${type}.json`;
        const filePath = path.join(rootDir, 'public', fileName);
        
        let items = [];
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            items = JSON.parse(data);
        } catch (e) { console.log(`Creating new ${fileName}`); }

        const newItem = req.body;
        if (!newItem.id) newItem.id = Date.now();

        const index = items.findIndex(p => p.id === newItem.id);
        if (index !== -1) {
            items[index] = newItem;
        } else {
            items.push(newItem);
        }

        await fs.writeFile(filePath, JSON.stringify(items, null, 2));
        res.json({ success: true, item: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.delete('/api/static/:type/:id', authMiddleware, async (req, res) => {
    const { type, id } = req.params;
    try {
        const fileName = type === 'team' ? 'team-members.json' : `${type}.json`;
        const filePath = path.join(rootDir, 'public', fileName);
        
        const data = await fs.readFile(filePath, 'utf-8');
        let items = JSON.parse(data);
        const newItems = items.filter(p => String(p.id) !== String(id));
        
        await fs.writeFile(filePath, JSON.stringify(newItems, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

app.listen(PORT, () => {
    console.log(`CMS Server started on http://localhost:${PORT}`);
});
