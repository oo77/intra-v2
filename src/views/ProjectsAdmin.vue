<script setup>
import { ref, computed, onMounted } from 'vue'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/utils/imageUpload.js'

const projects = ref([])
const currentProject = ref(null)
const isEditing = ref(false)
const currentLanguage = ref('ru')
const showModal = ref(false)
const imagePreview = ref('')
const isSaving = ref(false)

// Форма для нового/редактируемого проекта
const formData = ref({
  id: null,
  image: '',
  category: { en: '', ru: '', uz: '' },
  status: 'Planning',
  duration: '',
  team: '',
  title: { en: '', ru: '', uz: '' },
  description: { en: '', ru: '', uz: '' },
  details: {
    overview: { en: '', ru: '', uz: '' },
    objectives: { en: [''], ru: [''], uz: [''] },
    technologies: { en: [''], ru: [''], uz: [''] },
    impact: { en: '', ru: '', uz: '' }
  }
})

// Загрузка данных из JSON
onMounted(async () => {
  await loadProjectsData()
})

// Функция загрузки данных
const loadProjectsData = async () => {
  try {
    // Сначала проверяем localStorage
    const localData = localStorage.getItem('projectsData')
    if (localData) {
      try {
        projects.value = JSON.parse(localData)
        console.log('✅ Данные проектов загружены из localStorage')
        return
      } catch (e) {
        console.warn('Ошибка парсинга localStorage, загружаем из файла')
      }
    }
    
    // Если нет в localStorage, загружаем из файла
    const timestamp = new Date().getTime()
    const response = await fetch(`/projects.json?t=${timestamp}`)
    projects.value = await response.json()
    console.log('✅ Данные проектов загружены из projects.json')
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
    projects.value = []
  }
}

// Открыть форму для добавления нового проекта
const openAddForm = () => {
  resetForm()
  // Генерируем новый ID
  const maxId = projects.value.length > 0 ? Math.max(...projects.value.map(p => p.id)) : 0
  formData.value.id = maxId + 1
  isEditing.value = false
  showModal.value = true
}

// Открыть форму для редактирования
const openEditForm = (project) => {
  currentProject.value = project.id
  formData.value = JSON.parse(JSON.stringify(project))
  imagePreview.value = project.image
  isEditing.value = true
  showModal.value = true
}

// Сброс формы
const resetForm = () => {
  formData.value = {
    id: null,
    image: '',
    category: { en: '', ru: '', uz: '' },
    status: 'Planning',
    duration: '',
    team: '',
    title: { en: '', ru: '', uz: '' },
    description: { en: '', ru: '', uz: '' },
    details: {
      overview: { en: '', ru: '', uz: '' },
      objectives: { en: [''], ru: [''], uz: [''] },
      technologies: { en: [''], ru: [''], uz: [''] },
      impact: { en: '', ru: '', uz: '' }
    }
  }
  imagePreview.value = ''
  currentProject.value = null
}

// Добавить поле в массив
const addField = (lang, field) => {
  formData.value.details[field][lang].push('')
}

// Удалить поле из массива
const removeField = (lang, field, index) => {
  formData.value.details[field][lang].splice(index, 1)
}

// Обработка загрузки изображения
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Проверяем конфигурацию Cloudinary
  if (!isCloudinaryConfigured()) {
    alert('⚠️ Cloudinary не настроен!\n\nПожалуйста, настройте Cloudinary в файле:\nsrc/utils/imageUpload.js\n\nИнструкция находится в комментариях файла.')
    return
  }

  try {
    isSaving.value = true

    // Загружаем в Cloudinary с SEO-оптимизацией
    const result = await uploadImageToCloudinary(file, {
      folder: 'intra-v2/projects',
      onProgress: (progress) => {
        console.log(`Загрузка: ${progress}%`)
      }
    })

    // Используем оптимизированный URL
    imagePreview.value = result.optimizedUrl
    formData.value.image = result.optimizedUrl

    alert(`✅ Изображение загружено и оптимизировано!\n\n📊 Информация:\n- Формат: ${result.format} (автоматически WebP/AVIF)\n- Размер: ${Math.round(result.size / 1024)} KB\n- Разрешение: ${result.width}x${result.height}\n- SEO: Оптимизировано для быстрой загрузки`)
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    alert('❌ Ошибка загрузки изображения: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Сохранить данные
const saveProject = async () => {
  if (!formData.value.title.ru) {
    alert('Название проекта обязательно!')
    return
  }

  isSaving.value = true

  try {
    // Очистка пустых полей в массивах
    ['en', 'ru', 'uz'].forEach(lang => {
      ['objectives', 'technologies'].forEach(field => {
        formData.value.details[field][lang] = formData.value.details[field][lang].filter(item => item.trim() !== '')
      })
    })

    // Обновляем или добавляем проект
    const index = projects.value.findIndex(p => p.id === formData.value.id)
    if (index !== -1) {
      projects.value[index] = JSON.parse(JSON.stringify(formData.value))
    } else {
      projects.value.push(JSON.parse(JSON.stringify(formData.value)))
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('projectsData', JSON.stringify(projects.value))
    
    alert('✅ Проект успешно сохранен!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать файл для замены.')
    
    showModal.value = false
    resetForm()
    
    await loadProjectsData()
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    alert('❌ Ошибка при сохранении данных: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Удалить проект
const deleteProject = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этот проект?')) {
    isSaving.value = true
    try {
      projects.value = projects.value.filter(p => p.id !== id)
      
      // Сохраняем в localStorage
      localStorage.setItem('projectsData', JSON.stringify(projects.value))
      
      alert('✅ Проект удален!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать обновленный файл.')
      await loadProjectsData()
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
  const jsonData = JSON.stringify(projects.value, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'projects.json'
  link.click()
  URL.revokeObjectURL(url)
  alert('✅ Файл projects.json скачан!\n\n📝 Замените файл /public/projects.json этим файлом.')
}

// Сбросить изменения
const resetChanges = async () => {
  if (confirm('Вы уверены? Все несохраненные изменения будут потеряны!')) {
    localStorage.removeItem('projectsData')
    await loadProjectsData()
    alert('✅ Данные сброшены! Загружены оригинальные данные из файла.')
  }
}

// Закрыть модальное окно
const closeModal = () => {
  showModal.value = false
  resetForm()
}

// Статусы проектов
const statuses = ['Planning', 'Active', 'Completed']
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление проектами</h1>
            <p class="text-gray-600">Добавляйте и редактируйте информацию о проектах</p>
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
            <button
              @click="openAddForm"
              :disabled="isSaving"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Добавить проект
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
              <li><strong>Добавляйте/редактируйте</strong> проекты и нажимайте <strong>"💾 Сохранить"</strong> - данные сохраняются в браузере</li>
              <li>Когда закончите все изменения, нажмите <strong class="text-green-600">"📥 Экспортировать JSON"</strong> - скачается файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">projects.json</code></li>
              <li>Замените файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">/public/projects.json</code> скачанным файлом</li>
              <li>Обновите страницу сайта (F5) - все изменения отобразятся! 🎉</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Список проектов -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title.ru"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-white text-6xl">
              📁
            </div>
            <div class="absolute top-2 right-2">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                project.status === 'Active' ? 'bg-green-500 text-white' :
                project.status === 'Completed' ? 'bg-blue-500 text-white' :
                'bg-yellow-500 text-white'
              ]">
                {{ project.status }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title.ru }}</h3>
            <p class="text-gray-600 mb-2 line-clamp-2">{{ project.description.ru }}</p>
            <p class="text-sm text-gray-500 mb-2">📅 {{ project.duration }}</p>
            <p class="text-sm text-gray-500 mb-4">👥 {{ project.team }}</p>
            
            <div class="flex gap-2">
              <button
                @click="openEditForm(project)"
                class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ✏️ Редактировать
              </button>
              <button
                @click="deleteProject(project.id)"
                class="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                🗑️ Удалить
              </button>
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
        <div class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? 'Редактировать проект' : 'Добавить проект' }}
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
            <!-- Основная информация -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
                Основная информация
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Статус *</label>
                  <select
                    v-model="formData.status"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option v-for="status in statuses" :key="status" :value="status">
                      {{ status }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Длительность *</label>
                  <input
                    v-model="formData.duration"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2023-2025"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Команда *</label>
                <input
                  v-model="formData.team"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. Sarah Johnson, Prof. Michael Chen"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Изображение</label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div v-if="imagePreview" class="mb-4">
                <img :src="imagePreview" alt="Preview" class="w-full h-48 object-cover rounded-lg shadow-md" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL изображения (альтернатива)</label>
                <input
                  v-model="formData.image"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <!-- Табы для языков -->
            <div class="mb-4">
              <div class="flex gap-2 border-b border-gray-200">
                <button
                  @click="currentLanguage = 'ru'"
                  :class="[
                    'px-6 py-3 font-semibold transition-all',
                    currentLanguage === 'ru'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  🇷🇺 Русский
                </button>
                <button
                  @click="currentLanguage = 'en'"
                  :class="[
                    'px-6 py-3 font-semibold transition-all',
                    currentLanguage === 'en'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  🇬🇧 English
                </button>
                <button
                  @click="currentLanguage = 'uz'"
                  :class="[
                    'px-6 py-3 font-semibold transition-all',
                    currentLanguage === 'uz'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  🇺🇿 O'zbekcha
                </button>
              </div>
            </div>

            <!-- Форма для выбранного языка -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Название проекта *</label>
                <input
                  v-model="formData.title[currentLanguage]"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Категория *</label>
                <input
                  v-model="formData.category[currentLanguage]"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Autonomous Vehicles"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Краткое описание *</label>
                <textarea
                  v-model="formData.description[currentLanguage]"
                  rows="2"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Обзор проекта *</label>
                <textarea
                  v-model="formData.details.overview[currentLanguage]"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Влияние/Результаты *</label>
                <textarea
                  v-model="formData.details.impact[currentLanguage]"
                  rows="2"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <!-- Цели проекта -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Цели проекта</label>
                <div
                  v-for="(item, index) in formData.details.objectives[currentLanguage]"
                  :key="index"
                  class="flex gap-2 mb-2"
                >
                  <input
                    v-model="formData.details.objectives[currentLanguage][index]"
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    @click="removeField(currentLanguage, 'objectives', index)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <button
                  @click="addField(currentLanguage, 'objectives')"
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  + Добавить цель
                </button>
              </div>

              <!-- Технологии/Теги -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">🏷️ Технологии/Теги</label>
                <div
                  v-for="(item, index) in formData.details.technologies[currentLanguage]"
                  :key="index"
                  class="flex gap-2 mb-2"
                >
                  <input
                    v-model="formData.details.technologies[currentLanguage][index]"
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Machine Learning"
                  />
                  <button
                    @click="removeField(currentLanguage, 'technologies', index)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <button
                  @click="addField(currentLanguage, 'technologies')"
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  + Добавить технологию
                </button>
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="saveProject"
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
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
