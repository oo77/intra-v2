<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import AdminNav from '@/components/AdminNav.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/utils/imageUpload.js'

const projectsStore = useProjectsStore()

// State
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const showNotificationModal = ref(false)
const notificationData = ref({ type: 'info', title: '', message: '' })
const currentDeleteId = ref(null)
const isEditing = ref(false)
const isSaving = ref(false)
const currentLanguage = ref('ru')
const imagePreview = ref('')

// Форма
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

// Загрузка данных
onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
  } catch (error) {
    showNotification('error', 'Ошибка загрузки', error.message)
  }
})

// Computed
const projectsList = computed(() => projectsStore.allProjects)
const isLoading = computed(() => projectsStore.isLoading)

// Статусы
const statuses = ['Planning', 'Active', 'Completed']

// Methods
const showNotification = (type, title, message) => {
  notificationData.value = { type, title, message }
  showNotificationModal.value = true
}

const openAddForm = () => {
  resetForm()
  // Не генерируем ID - база данных сделает это автоматически
  isEditing.value = false
  showModal.value = true
}

const openEditForm = (project) => {
  formData.value = JSON.parse(JSON.stringify(project))
  imagePreview.value = project.image
  isEditing.value = true
  showModal.value = true
}

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
}

const addField = (lang, field) => {
  formData.value.details[field][lang].push('')
}

const removeField = (lang, field, index) => {
  formData.value.details[field][lang].splice(index, 1)
}

// State для файла
const selectedFile = ref(null)

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Просто создаем превью локально
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  showNotification('info', 'Файл выбран', 'Изображение будет загружено на сервер при сохранении проекта')
}

const saveProject = async () => {
  if (isEditing.value && !formData.value.id) {
    showNotification('error', 'Ошибка', 'ID обязателен при редактировании!')
    return
  }

  if (!formData.value.title.ru || !formData.value.title.en || !formData.value.title.uz) {
    showNotification('error', 'Ошибка', 'Названия на всех языках обязательны!')
    return
  }

  isSaving.value = true
  
  try {
    // Очистка пустых полей
    ['en', 'ru', 'uz'].forEach(lang => {
      ['objectives', 'technologies'].forEach(field => {
        formData.value.details[field][lang] = formData.value.details[field][lang].filter(item => item.trim() !== '')
      })
    })

    const dataToSend = { ...formData.value }
    
    // Вызываем обновленный метод стора, передавая файл если он есть
    await projectsStore.saveProject(dataToSend, selectedFile.value)
    
    showNotification('success', 'Успешно!', 'Проект сохранен (JSON и фото обновлены)')
    showModal.value = false
    resetForm()
    selectedFile.value = null
  } catch (error) {
    showNotification('error', 'Ошибка сохранения', error.message)
  } finally {
    isSaving.value = false
  }
}

const deleteProject = (id) => {
  currentDeleteId.value = id
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await projectsStore.deleteProject(currentDeleteId.value)
    showNotification('success', 'Удалено!', 'Проект удален из базы данных')
  } catch (error) {
    showNotification('error', 'Ошибка удаления', error.message)
  }
  showDeleteConfirm.value = false
}

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
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление проектами</h1>
            <p class="text-gray-600">Добавляйте и редактируйте информацию о проектах</p>
          </div>
          <button
            @click="openAddForm"
            :disabled="isSaving"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Добавить проект
          </button>
        </div>
      </div>

      <!-- Индикатор загрузки списка -->
      <div v-if="isLoading && projectsList.length === 0" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Загрузка данных...</p>
      </div>

      <!-- Список проектов -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in projectsList"
          :key="project.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title?.ru"
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
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title?.ru }}</h3>
            <p class="text-gray-600 mb-2 line-clamp-2">{{ project.description?.ru }}</p>
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
                <div v-if="isEditing">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">ID *</label>
                  <input
                    v-model="formData.id"
                    type="number"
                    disabled
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                  />
                </div>
                
                <div :class="isEditing ? '' : 'md:col-span-2'">
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
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Длительность *</label>
                  <input
                    v-model="formData.duration"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2023-2025"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Команда *</label>
                  <input
                    v-model="formData.team"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. Sarah Johnson, Prof. Michael Chen"
                  />
                </div>
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

              <!-- Технологии -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Технологии/Теги</label>
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

    <!-- Модальные окна подтверждения -->
    <ConfirmModal
      :isVisible="showDeleteConfirm"
      type="warning"
      title="Удалить проект?"
      message="Это действие нельзя отменить. Данные будут удалены из базы данных."
      confirmText="Удалить"
      cancelText="Отмена"
      :showCancel="true"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
      @close="showDeleteConfirm = false"
    />

    <ConfirmModal
      :isVisible="showNotificationModal"
      :type="notificationData.type"
      :title="notificationData.title"
      :message="notificationData.message"
      confirmText="OK"
      @confirm="showNotificationModal = false"
      @close="showNotificationModal = false"
    />
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
