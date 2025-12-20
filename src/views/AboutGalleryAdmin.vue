<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminNav from '@/components/AdminNav.vue'

const galleryData = ref({ row1: [], row2: [] })
const currentRow = ref('row1')
const showModal = ref(false)
const isEditing = ref(false)
const currentImage = ref(null)
const saveStatus = ref('')
const isSaving = ref(false)

// Форма для нового/редактируемого изображения
const formData = ref({
  id: null,
  url: '',
  alt: {
    ru: '',
    en: '',
    uz: ''
  }
})

// Загрузка данных из JSON
onMounted(async () => {
  await loadGalleryData()
})

// Функция загрузки данных
const loadGalleryData = async () => {
  try {
    // Сначала проверяем localStorage
    const localData = localStorage.getItem('galleryData')
    if (localData) {
      try {
        galleryData.value = JSON.parse(localData)
        console.log('✅ Данные загружены из localStorage (несохраненные изменения)')
        return
      } catch (e) {
        console.warn('Ошибка парсинга localStorage, загружаем из файла')
      }
    }
    
    // Если нет в localStorage, загружаем из файла
    const timestamp = new Date().getTime()
    const response = await fetch(`/gallery.json?t=${timestamp}`)
    galleryData.value = await response.json()
    console.log('✅ Данные загружены из gallery.json')
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
    saveStatus.value = 'error'
  }
}

// Список изображений для текущего ряда
const currentRowImages = computed(() => {
  return galleryData.value[currentRow.value] || []
})

// Открыть форму для добавления нового изображения
const openAddForm = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

// Открыть форму для редактирования
const openEditForm = (image, row) => {
  currentRow.value = row
  currentImage.value = image
  formData.value = JSON.parse(JSON.stringify(image))
  isEditing.value = true
  showModal.value = true
}

// Сброс формы
const resetForm = () => {
  formData.value = {
    id: null,
    url: '',
    alt: {
      ru: '',
      en: '',
      uz: ''
    }
  }
  currentImage.value = null
}

// Сохранить изображение
const saveImage = async () => {
  if (!formData.value.url) {
    alert('URL изображения обязателен!')
    return
  }

  if (!formData.value.alt.ru || !formData.value.alt.en || !formData.value.alt.uz) {
    alert('Заполните описание на всех языках!')
    return
  }

  isSaving.value = true
  saveStatus.value = 'saving'

  try {
    if (isEditing.value) {
      // Редактирование существующего изображения
      const index = galleryData.value[currentRow.value].findIndex(img => img.id === formData.value.id)
      if (index !== -1) {
        galleryData.value[currentRow.value][index] = JSON.parse(JSON.stringify(formData.value))
      }
    } else {
      // Добавление нового изображения
      // Генерируем новый ID
      const allIds = [...galleryData.value.row1, ...galleryData.value.row2].map(img => img.id)
      const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1
      formData.value.id = newId
      
      galleryData.value[currentRow.value].push(JSON.parse(JSON.stringify(formData.value)))
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('galleryData', JSON.stringify(galleryData.value))
    
    saveStatus.value = 'success'
    
    // Показываем уведомление
    alert('✅ Изображение успешно сохранено!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать файл для замены.')
    
    showModal.value = false
    resetForm()
    
    // Перезагружаем данные для синхронизации
    await loadGalleryData()
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    saveStatus.value = 'error'
    alert('❌ Ошибка при сохранении данных: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Удалить изображение
const deleteImage = async (image, row) => {
  if (confirm('Вы уверены, что хотите удалить это изображение?')) {
    isSaving.value = true
    try {
      const index = galleryData.value[row].findIndex(img => img.id === image.id)
      if (index !== -1) {
        galleryData.value[row].splice(index, 1)
      }
      
      // Сохраняем в localStorage
      localStorage.setItem('galleryData', JSON.stringify(galleryData.value))
      
      alert('✅ Изображение удалено!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать обновленный файл.')
      await loadGalleryData()
    } catch (error) {
      console.error('Ошибка удаления:', error)
      alert('❌ Ошибка при удалении: ' + error.message)
    } finally {
      isSaving.value = false
    }
  }
}

// Экспортировать JSON файл
const exportJSON = () => {
  const jsonData = JSON.stringify(galleryData.value, null, 2)
  downloadFile('gallery.json', jsonData, 'application/json')
  alert('✅ Файл gallery.json скачан!\n\n📝 Замените файл /public/gallery.json этим файлом.')
}

// Сбросить изменения и загрузить из файла
const resetChanges = async () => {
  if (confirm('Вы уверены? Все несохраненные изменения будут потеряны!')) {
    localStorage.removeItem('galleryData')
    await loadGalleryData()
    alert('✅ Данные сброшены! Загружены оригинальные данные из файла.')
  }
}

// Универсальная функция скачивания файла
const downloadFile = (filename, content, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Закрыть модальное окно
const closeModal = () => {
  showModal.value = false
  resetForm()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Навигационная панель -->
    <AdminNav />
    
    <div class="py-12 px-4 sm:px-6 lg:px-8">
    <!-- Индикатор загрузки -->
    <div v-if="isSaving" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-xl font-semibold text-gray-900">Сохранение данных...</p>
        <p class="text-gray-600 mt-2">Пожалуйста, подождите</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Заголовок -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление галереей</h1>
            <p class="text-gray-600">Добавляйте и редактируйте изображения галереи на странице "О нас"</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="resetChanges"
              :disabled="isSaving"
              class="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Сбросить все несохраненные изменения"
            >
              🔄 Сбросить
            </button>
            <button
              @click="exportJSON"
              :disabled="isSaving"
              class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📥 Экспортировать JSON
            </button>
          </div>
        </div>
      </div>

      <!-- Инструкция -->
      <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
        <div class="flex items-start gap-4">
          <div class="text-4xl">✅</div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Как работать с админ-панелью:</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Добавляйте/редактируйте</strong> изображения и нажимайте <strong>"💾 Сохранить"</strong> - данные сохраняются в браузере</li>
              <li>Когда закончите все изменения, нажмите <strong class="text-green-600">"📥 Экспортировать JSON"</strong> - скачается файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">gallery.json</code></li>
              <li>Замените файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">/public/gallery.json</code> скачанным файлом</li>
              <li>Обновите страницу сайта (F5) - все изменения отобразятся! 🎉</li>
            </ol>
            <div class="mt-4 p-3 bg-white rounded-lg border border-green-200">
              <p class="text-sm text-gray-600">
                <strong>💡 Совет:</strong> Используйте URL изображений из Cloudinary, Imgur, или других CDN сервисов для лучшей производительности.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Табы для рядов -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div class="flex gap-2 border-b border-gray-200 mb-6">
          <button
            @click="currentRow = 'row1'"
            :class="[
              'px-6 py-3 font-semibold transition-all',
              currentRow === 'row1'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            📸 Первый ряд (→)
          </button>
          <button
            @click="currentRow = 'row2'"
            :class="[
              'px-6 py-3 font-semibold transition-all',
              currentRow === 'row2'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            📸 Второй ряд (←)
          </button>
        </div>

        <button
          @click="openAddForm"
          :disabled="isSaving"
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          + Добавить изображение в {{ currentRow === 'row1' ? 'первый' : 'второй' }} ряд
        </button>

        <!-- Список изображений -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="image in currentRowImages"
            :key="image.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <img
                :src="image.url"
                :alt="image.alt.ru"
                class="w-full h-full object-cover"
                @error="(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'"
              />
            </div>
            
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-2"><strong>ID:</strong> {{ image.id }}</p>
              <p class="text-sm text-gray-600 mb-2 truncate" :title="image.url"><strong>URL:</strong> {{ image.url }}</p>
              <div class="text-xs text-gray-500 mb-4">
                <p><strong>RU:</strong> {{ image.alt.ru }}</p>
                <p><strong>EN:</strong> {{ image.alt.en }}</p>
                <p><strong>UZ:</strong> {{ image.alt.uz }}</p>
              </div>
              
              <div class="flex gap-2">
                <button
                  @click="openEditForm(image, currentRow)"
                  class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  ✏️ Редактировать
                </button>
                <button
                  @click="deleteImage(image, currentRow)"
                  class="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Модальное окно для добавления/редактирования -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? 'Редактировать изображение' : 'Добавить изображение' }}
              </h2>
              <button
                @click="closeModal"
                class="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>
          </div>

          <div class="p-6">
            <!-- URL изображения -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">URL изображения *</label>
              <input
                v-model="formData.url"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p class="text-xs text-gray-500 mt-1">Вставьте прямую ссылку на изображение</p>
            </div>

            <!-- Предпросмотр -->
            <div v-if="formData.url" class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Предпросмотр</label>
              <img 
                :src="formData.url" 
                alt="Preview" 
                class="w-full h-48 object-cover rounded-lg shadow-md"
                @error="(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'"
              />
            </div>

            <!-- Описания на языках -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">🇷🇺 Описание (Русский) *</label>
                <input
                  v-model="formData.alt.ru"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Лаборатория"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">🇬🇧 Описание (English) *</label>
                <input
                  v-model="formData.alt.en"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Laboratory"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">🇺🇿 Описание (O'zbekcha) *</label>
                <input
                  v-model="formData.alt.uz"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Laboratoriya"
                />
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="saveImage"
                :disabled="isSaving"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="isSaving" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                <span>{{ isSaving ? 'Сохранение...' : '💾 Сохранить' }}</span>
              </button>
              <button
                @click="closeModal"
                :disabled="isSaving"
                class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отмена
              </button>
            </div>
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
