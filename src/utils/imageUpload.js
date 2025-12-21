/**
 * Утилита для загрузки изображений в Cloudinary
 * 
 * Преимущества Cloudinary для SEO:
 * - Автоматическая конвертация в WebP/AVIF
 * - Оптимизация размера без потери качества
 * - CDN для быстрой загрузки
 * - Адаптивные изображения
 */

// Cloudinary конфигурация
const CLOUDINARY_CLOUD_NAME = 'dnni9ruhs'
const CLOUDINARY_UPLOAD_PRESET = 'intra_uploads'
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

/**
 * Загрузить изображение в Cloudinary
 * @param {File} file - Файл изображения
 * @param {Object} options - Дополнительные опции
 * @param {string} options.folder - Папка в Cloudinary
 * @param {Function} options.onProgress - Callback для прогресса загрузки
 * @returns {Promise<Object>} - Объект с URL и метаданными
 */
export async function uploadImageToCloudinary(file, options = {}) {
    const {
        folder = 'intra-v2',
        onProgress = null
    } = options

    // Валидация файла
    if (!file) {
        throw new Error('Файл не предоставлен')
    }

    // Проверка типа файла
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Неподдерживаемый формат изображения. Используйте: JPG, PNG, WebP или GIF')
    }

    // Проверка размера файла (макс 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
        throw new Error('Размер файла превышает 10MB')
    }

    try {
        // Создаем FormData
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        formData.append('folder', folder)

        // Дополнительные параметры для SEO-оптимизации
        formData.append('quality', 'auto:best') // Автоматическая оптимизация качества
        formData.append('fetch_format', 'auto') // Автоматический выбор формата (WebP/AVIF)

        // Создаем XMLHttpRequest для отслеживания прогресса
        const response = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            // Отслеживание прогресса
            if (onProgress) {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round((e.loaded / e.total) * 100)
                        onProgress(percentComplete)
                    }
                })
            }

            // Обработка завершения
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(new Error(`Ошибка загрузки: ${xhr.statusText}`))
                }
            })

            // Обработка ошибок
            xhr.addEventListener('error', () => {
                reject(new Error('Ошибка сети при загрузке изображения'))
            })

            xhr.addEventListener('abort', () => {
                reject(new Error('Загрузка отменена'))
            })

            // Отправка запроса
            xhr.open('POST', CLOUDINARY_API_URL)
            xhr.send(formData)
        })

        // Возвращаем оптимизированные URL
        return {
            url: response.secure_url, // Основной URL
            optimizedUrl: getOptimizedUrl(response.secure_url), // SEO-оптимизированный URL
            thumbnailUrl: getThumbnailUrl(response.secure_url), // Миниатюра
            publicId: response.public_id,
            width: response.width,
            height: response.height,
            format: response.format,
            size: response.bytes
        }
    } catch (error) {
        console.error('Ошибка загрузки в Cloudinary:', error)
        throw error
    }
}

/**
 * Получить SEO-оптимизированный URL
 * Применяет трансформации для максимальной производительности
 */
function getOptimizedUrl(url) {
    // Добавляем параметры оптимизации
    const transformations = 'f_auto,q_auto:best,w_1200,c_limit'
    return url.replace('/upload/', `/upload/${transformations}/`)
}

/**
 * Получить URL миниатюры
 */
function getThumbnailUrl(url) {
    const transformations = 'f_auto,q_auto:good,w_400,h_300,c_fill'
    return url.replace('/upload/', `/upload/${transformations}/`)
}

/**
 * Удалить изображение из Cloudinary
 * Примечание: Требует настройки backend API для безопасности
 */
export async function deleteImageFromCloudinary(publicId) {
    console.warn('Удаление изображений требует backend API для безопасности')
    console.log('Public ID для удаления:', publicId)
    // Реализуйте через ваш backend
    return { success: false, message: 'Требуется backend API' }
}

/**
 * Проверить конфигурацию Cloudinary
 */
export function isCloudinaryConfigured() {
    return CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME' &&
        CLOUDINARY_UPLOAD_PRESET !== 'YOUR_UPLOAD_PRESET'
}

/**
 * Получить инструкции по настройке
 */
export function getSetupInstructions() {
    return `
📝 Инструкция по настройке Cloudinary:

1. Зарегистрируйтесь на https://cloudinary.com (бесплатно)
2. В Dashboard найдите "Cloud Name"
3. Перейдите в Settings → Upload → Upload Presets
4. Создайте новый Unsigned Upload Preset
5. Замените значения в файле src/utils/imageUpload.js:
   - CLOUDINARY_CLOUD_NAME = 'ваш_cloud_name'
   - CLOUDINARY_UPLOAD_PRESET = 'ваш_upload_preset'

✅ Готово! Теперь изображения будут автоматически оптимизироваться для SEO
  `
}
