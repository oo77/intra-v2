<script setup>
import { ref, onMounted } from 'vue'
import { uploadImageToCloudinary, isCloudinaryConfigured, getSetupInstructions } from '@/utils/imageUpload.js'

const gallery = ref({ row1: [], row2: [] })
const isSaving = ref(false)
const uploadProgress = ref({})
const showModal = ref(false)
const currentRow = ref('row1')
const editingImage = ref(null)
const showSetupInstructions = ref(false)

// Форма для изображения
const formData = ref({
  id: null,
  url: '',
  alt: { ru: '', en: '', uz: '' }
})

// Загрузка данных
onMounted(async () => {
  await loadGalleryData()
  
  // Проверяем конфигурацию Cloudinary
  if (!isCloudinaryConfigured()) {
    showSetupInstructions.value = true
  }
})

const loadGalleryData = async () => {
  try {
    const localData = localStorage.getItem('galleryData')
    if (localData) {
      gallery.value = JSON.parse(localData)
      console.log('✅ Галерея загружена из localStorage')
      return
    }
    
    const timestamp = new Date().getTime()
    const response = await fetch(`/gallery.json?t=${timestamp}`)
    gallery.value = await response.json()
    console.log('✅ Галерея загружена из gallery.json')
  } catch (error) {
    console.error('Ошибка загрузки галереи:', error)
    gallery.value = { row1: [], row2: [] }
  }
}

// Открыть форму добавления
const openAddForm = (row) => {
  currentRow.value = row
  editingImage.value = null
  resetForm()
  
  // Генерируем новый ID
  const allImages = [...gallery.value.row1, ...gallery.value.row2]
  const maxId = allImages.length > 0 ? Math.max(...allImages.map(img => img.id)) : 0
  formData.value.id = maxId + 1
  
  showModal.value = true
}

// Открыть форму редактирования
const openEditForm = (image, row) => {
  currentRow.value = row
  editingImage.value = image
  formData.value = JSON.parse(JSON.stringify(image))
  showModal.value = true
}

// Сброс формы
const resetForm = () => {
  formData.value = {
    id: null,
    url: '',
    alt: { ru: '', en: '', uz: '' }
  }
}

// Обработка загрузки изображения
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!isCloudinaryConfigured()) {
    alert('⚠️ Cloudinary не настроен!\n\nПожалуйста, настройте Cloudinary согласно инструкции.')
    showSetupInstructions.value = true
    return
  }

  try {
    isSaving.value = true
    uploadProgress.value[formData.value.id] = 0

    // Загружаем в Cloudinary
    const result = await uploadImageToCloudinary(file, {
      folder: 'intra-v2/gallery',
      onProgress: (progress) => {
        uploadProgress.value[formData.value.id] = progress
      }
    })

    // Используем оптимизированный URL для SEO
    formData.value.url = result.optimizedUrl

    alert(`✅ Изображение успешно загружено!\n\n📊 Информация:\n- Формат: ${result.format}\n- Размер: ${Math.round(result.size / 1024)} KB\n- Разрешение: ${result.width}x${result.height}`)
    
    delete uploadProgress.value[formData.value.id]
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    alert('❌ Ошибка загрузки изображения: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Сохранить изображение
const saveImage = async () => {
  if (!formData.value.url) {
    alert('URL изображения обязателен!')
    return
  }

  if (!formData.value.alt.ru) {
    alert('Описание на русском обязательно!')
    return
  }

  isSaving.value = true

  try {
    if (editingImage.value) {
      // Редактирование существующего
      const index = gallery.value[currentRow.value].findIndex(img => img.id === formData.value.id)
      if (index !== -1) {
        gallery.value[currentRow.value][index] = JSON.parse(JSON.stringify(formData.value))
      }
    } else {
      // Добавление нового
      gallery.value[currentRow.value].push(JSON.parse(JSON.stringify(formData.value)))
    }

    // Сохраняем в localStorage
    localStorage.setItem('galleryData', JSON.stringify(gallery.value))

    alert('✅ Изображение сохранено!\n\n📝 Нажмите "Экспортировать JSON" для скачивания файла.')
    
    showModal.value = false
    resetForm()
    await loadGalleryData()
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    alert('❌ Ошибка: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Удалить изображение
const deleteImage = async (id, row) => {
  if (confirm('Вы уверены, что хотите удалить это изображение?')) {
    isSaving.value = true
    try {
      gallery.value[row] = gallery.value[row].filter(img => img.id !== id)
      localStorage.setItem('galleryData', JSON.stringify(gallery.value))
      alert('✅ Изображение удалено!')
      await loadGalleryData()
    } catch (error) {
      console.error('Ошибка удаления:', error)
      alert('❌ Ошибка: ' + error.message)
    } finally {
      isSaving.value = false
    }
  }
}

// Экспорт JSON
const exportJSON = () => {
  const jsonData = JSON.stringify(gallery.value, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'gallery.json'
  link.click()
  URL.revokeObjectURL(url)
  alert('✅ Файл gallery.json скачан!\n\n📝 Замените /public/gallery.json этим файлом.')
}

// Сброс изменений
const resetChanges = async () => {
  if (confirm('Все несохраненные изменения будут потеряны!')) {
    localStorage.removeItem('galleryData')
    await loadGalleryData()
    alert('✅ Данные сброшены!')
  }
}

// Закрыть модальное окно
const closeModal = () => {
  showModal.value = false
  resetForm()
}

// Переместить изображение
const moveImage = (row, index, direction) => {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= gallery.value[row].length) return

  const temp = gallery.value[row][index]
  gallery.value[row][index] = gallery.value[row][newIndex]
  gallery.value[row][newIndex] = temp

  localStorage.setItem('galleryData', JSON.stringify(gallery.value))
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Индикатор загрузки -->
    <div v-if="isSaving" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-xl font-semibold text-gray-900">Сохранение...</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Заголовок -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление галереей</h1>
            <p class="text-gray-600">Добавляйте и редактируйте изображения галереи</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="resetChanges"
              :disabled="isSaving"
              class="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              🔄 Сбросить
            </button>
            <button
              @click="exportJSON"
              :disabled="isSaving"
              class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              📥 Экспортировать JSON
            </button>
          </div>
        </div>
      </div>

      <!-- Инструкция по Cloudinary -->
      <div v-if="showSetupInstructions" class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
        <div class="flex items-start gap-4">
          <div class="text-4xl">⚙️</div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Настройка Cloudinary (обязательно!)</h3>
            <pre class="bg-white p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">{{ getSetupInstructions() }}</pre>
            <button
              @click="showSetupInstructions = false"
              class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>

      <!-- Инструкция -->
      <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
        <div class="flex items-start gap-4">
          <div class="text-4xl">✅</div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Как работать с галереей:</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Настройте Cloudinary</strong> (см. инструкцию выше)</li>
              <li><strong>Добавляйте изображения</strong> - они автоматически оптимизируются для SEO</li>
              <li>Нажмите <strong class="text-green-600">"📥 Экспортировать JSON"</strong></li>
              <li>Замените файл <code class="bg-green-200 px-2 py-1 rounded">/public/gallery.json</code></li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Ряд 1 -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Ряд 1 (движется вправо)</h2>
          <button
            @click="openAddForm('row1')"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + Добавить изображение
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(image, index) in gallery.row1"
            :key="image.id"
            class="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div class="relative h-48">
              <img :src="image.url" :alt="image.alt.ru" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-2">{{ image.alt.ru }}</p>
              <div class="flex gap-2">
                <button
                  @click="moveImage('row1', index, 'up')"
                  :disabled="index === 0"
                  class="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  @click="moveImage('row1', index, 'down')"
                  :disabled="index === gallery.row1.length - 1"
                  class="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  @click="openEditForm(image, 'row1')"
                  class="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                >
                  ✏️
                </button>
                <button
                  @click="deleteImage(image.id, 'row1')"
                  class="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ряд 2 -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Ряд 2 (движется влево)</h2>
          <button
            @click="openAddForm('row2')"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + Добавить изображение
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(image, index) in gallery.row2"
            :key="image.id"
            class="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div class="relative h-48">
              <img :src="image.url" :alt="image.alt.ru" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-2">{{ image.alt.ru }}</p>
              <div class="flex gap-2">
                <button
                  @click="moveImage('row2', index, 'up')"
                  :disabled="index === 0"
                  class="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  @click="moveImage('row2', index, 'down')"
                  :disabled="index === gallery.row2.length - 1"
                  class="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  @click="openEditForm(image, 'row2')"
                  class="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                >
                  ✏️
                </button>
                <button
                  @click="deleteImage(image.id, 'row2')"
                  class="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Модальное окно -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ editingImage ? 'Редактировать изображение' : 'Добавить изображение' }}
            </h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-3xl">×</button>
          </div>

          <div class="space-y-4">
            <!-- Загрузка файла -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Загрузить изображение (автоматическая SEO-оптимизация)
              </label>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div v-if="uploadProgress[formData.id]" class="mt-2">
                <div class="bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all"
                    :style="{ width: uploadProgress[formData.id] + '%' }"
                  ></div>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ uploadProgress[formData.id] }}%</p>
              </div>
            </div>

            <!-- URL (альтернатива) -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                URL изображения (альтернатива)
              </label>
              <input
                v-model="formData.url"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <!-- Превью -->
            <div v-if="formData.url" class="mb-4">
              <img :src="formData.url" alt="Preview" class="w-full h-48 object-cover rounded-lg shadow-md" />
            </div>

            <!-- Описания -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Описание (RU) *</label>
              <input
                v-model="formData.alt.ru"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Лаборатория"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Описание (EN)</label>
              <input
                v-model="formData.alt.en"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Laboratory"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Описание (UZ)</label>
              <input
                v-model="formData.alt.uz"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Laboratoriya"
              />
            </div>

            <!-- Кнопки -->
            <div class="flex gap-4 pt-4">
              <button
                @click="saveImage"
                :disabled="isSaving"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
              >
                💾 Сохранить
              </button>
              <button
                @click="closeModal"
                :disabled="isSaving"
                class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 disabled:opacity-50"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #9333ea);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
