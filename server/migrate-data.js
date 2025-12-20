import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, testConnection } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateGallery() {
    console.log('📸 Миграция галереи...');

    const galleryPath = path.join(__dirname, '../public/gallery.json');
    const galleryData = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

    let count = 0;

    // Очищаем таблицу
    await pool.query('DELETE FROM gallery');

    // Мигрируем row1
    for (const item of galleryData.row1) {
        await pool.query(
            `INSERT INTO gallery (id, url, alt_ru, alt_en, alt_uz, row_num, position) 
             VALUES (?, ?, ?, ?, ?, 1, ?)`,
            [item.id, item.url, item.alt.ru, item.alt.en, item.alt.uz, count]
        );
        count++;
    }

    // Мигрируем row2
    count = 0;
    for (const item of galleryData.row2) {
        await pool.query(
            `INSERT INTO gallery (id, url, alt_ru, alt_en, alt_uz, row_num, position) 
             VALUES (?, ?, ?, ?, ?, 2, ?)`,
            [item.id, item.url, item.alt.ru, item.alt.en, item.alt.uz, count]
        );
        count++;
    }

    console.log(`✅ Мигрировано ${galleryData.row1.length + galleryData.row2.length} изображений галереи`);
}

async function migrateProjects() {
    console.log('🚀 Миграция проектов...');

    const projectsPath = path.join(__dirname, '../public/projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

    // Очищаем таблицу
    await pool.query('DELETE FROM projects');

    for (const project of projectsData) {
        await pool.query(
            `INSERT INTO projects (
                id, title_en, title_ru, title_uz,
                description_en, description_ru, description_uz,
                image, category_en, category_ru, category_uz,
                status, duration, team,
                overview_en, overview_ru, overview_uz,
                objectives_en, objectives_ru, objectives_uz,
                technologies_en, technologies_ru, technologies_uz,
                impact_en, impact_ru, impact_uz
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                project.id,
                project.title.en,
                project.title.ru,
                project.title.uz,
                project.description.en,
                project.description.ru,
                project.description.uz,
                project.image,
                project.category.en,
                project.category.ru,
                project.category.uz,
                project.status,
                project.duration,
                project.team,
                project.details.overview.en,
                project.details.overview.ru,
                project.details.overview.uz,
                JSON.stringify(project.details.objectives.en),
                JSON.stringify(project.details.objectives.ru),
                JSON.stringify(project.details.objectives.uz),
                JSON.stringify(project.details.technologies.en),
                JSON.stringify(project.details.technologies.ru),
                JSON.stringify(project.details.technologies.uz),
                project.details.impact.en,
                project.details.impact.ru,
                project.details.impact.uz
            ]
        );
    }

    console.log(`✅ Мигрировано ${projectsData.length} проектов`);
}

async function migrateTeamMembers() {
    console.log('👥 Миграция членов команды...');

    const teamPath = path.join(__dirname, '../public/team-members.json');
    const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf8'));

    // Очищаем таблицу
    await pool.query('DELETE FROM team_members');

    let count = 0;
    for (const [id, member] of Object.entries(teamData)) {
        await pool.query(
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
                id,
                member.image,
                member.email,
                member.phone,
                member.ru.name,
                member.en.name,
                member.uz.name,
                member.ru.role,
                member.en.role,
                member.uz.role,
                member.ru.bio,
                member.en.bio,
                member.uz.bio,
                member.ru.biography,
                member.en.biography,
                member.uz.biography,
                JSON.stringify(member.ru.expertise),
                JSON.stringify(member.en.expertise),
                JSON.stringify(member.uz.expertise),
                JSON.stringify(member.ru.education),
                JSON.stringify(member.en.education),
                JSON.stringify(member.uz.education),
                JSON.stringify(member.ru.experience),
                JSON.stringify(member.en.experience),
                JSON.stringify(member.uz.experience),
                JSON.stringify(member.ru.publications),
                JSON.stringify(member.en.publications),
                JSON.stringify(member.uz.publications),
                JSON.stringify(member.ru.achievements),
                JSON.stringify(member.en.achievements),
                JSON.stringify(member.uz.achievements)
            ]
        );
        count++;
    }

    console.log(`✅ Мигрировано ${count} членов команды`);
}

async function runDataMigration() {
    console.log('🔄 Начинаем миграцию данных из JSON в MySQL...\n');

    // Проверяем подключение
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('❌ Не удалось подключиться к базе данных');
        process.exit(1);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    try {
        await migrateGallery();
        console.log();

        await migrateProjects();
        console.log();

        await migrateTeamMembers();
        console.log();

        console.log('='.repeat(60));
        console.log('✅ Миграция данных завершена успешно!\n');

    } catch (error) {
        console.error('\n❌ Ошибка при миграции данных:', error);
        throw error;
    }
}

// Запускаем миграцию данных
runDataMigration()
    .then(() => {
        console.log('🎉 Все данные успешно перенесены в MySQL!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Критическая ошибка:', error);
        process.exit(1);
    });
