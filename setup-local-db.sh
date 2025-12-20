#!/bin/bash

echo "🔧 Настройка локальной MySQL базы данных для разработки"
echo "=========================================================="
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Параметры базы данных
DB_NAME="intra_local"
DB_USER="root"

echo "📋 Параметры:"
echo "   База данных: $DB_NAME"
echo "   Пользователь: $DB_USER"
echo ""

# Проверяем, запущен ли MySQL
echo "🔍 Проверка MySQL сервера..."
if ! mysql.server status > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  MySQL сервер не запущен. Запускаем...${NC}"
    mysql.server start
    sleep 2
fi

if mysql.server status > /dev/null 2>&1; then
    echo -e "${GREEN}✅ MySQL сервер запущен${NC}"
else
    echo -e "${RED}❌ Не удалось запустить MySQL сервер${NC}"
    echo "Попробуйте запустить вручную: brew services start mysql"
    exit 1
fi

echo ""
echo "🗄️  Создание базы данных..."

# Создаем базу данных
mysql -u $DB_USER -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ База данных '$DB_NAME' создана${NC}"
else
    echo -e "${RED}❌ Ошибка при создании базы данных${NC}"
    echo "Возможно, требуется пароль. Попробуйте выполнить вручную:"
    echo "mysql -u root -p -e \"CREATE DATABASE IF NOT EXISTS $DB_NAME;\""
    exit 1
fi

echo ""
echo "📝 Обновление .env файла..."

# Создаем резервную копию .env
cp .env .env.backup

# Обновляем .env файл
cat > .env << EOF
# Database Configuration (LOCAL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=$DB_USER
DB_PASSWORD=
DB_NAME=$DB_NAME

# Server Configuration
PORT=3001
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dnni9ruhs
CLOUDINARY_API_KEY=213595995685896
CLOUDINARY_API_SECRET=8zkJr0baZBgwo23u0NqNqfYrSnE

# Frontend URL
FRONTEND_URL=http://localhost:5173
EOF

echo -e "${GREEN}✅ Файл .env обновлен${NC}"
echo -e "${YELLOW}📌 Резервная копия сохранена в .env.backup${NC}"

echo ""
echo "=========================================================="
echo -e "${GREEN}🎉 Локальная база данных настроена!${NC}"
echo ""
echo "Следующие шаги:"
echo "1. Запустите миграции: node server/migrations/run-migrations.js"
echo "2. Перенесите данные: node server/migrate-data.js"
echo "3. Запустите сервер: node server/index.js"
echo ""
