<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'
import ConfirmModal from '@/components/ConfirmModal.vue'
import AdminNav from '@/components/AdminNav.vue'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/utils/imageUpload.js'

const teamStore = useTeamStore()

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
  id: '',
  image: '',
  email: '',
  phone: '',
  type: 'researchers',
  ru: {
    name: '',
    role: '',
    bio: '',
    biography: '',
    expertise: [''],
    education: [''],
    experience: [''],
    publications: [''],
    achievements: ['']
  },
  en: {
    name: '',
    role: '',
    bio: '',
    biography: '',
    expertise: [''],
    education: [''],
    experience: [''],
    publications: [''],
    achievements: ['']
  },
  uz: {
    name: '',
    role: '',
    bio: '',
    biography: '',
    expertise: [''],
    education: [''],
    experience: [''],
    publications: [''],
    achievements: ['']
  }
})

// Загрузка данных
onMounted(async () => {
  try {
    await teamStore.fetchMembers()
  } catch (error) {
    showNotification('error', 'Ошибка загрузки', error.message)
  }
})

// Computed
const membersList = computed(() => teamStore.membersList)
const isLoading = computed(() => teamStore.isLoading)

// Methods
const showNotification = (type, title, message) => {
  notificationData.value = { type, title, message }
  showNotificationModal.value = true
}

const openAddForm = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const openEditForm = (member) => {
  formData.value = JSON.parse(JSON.stringify(member))
  imagePreview.value = member.image
  isEditing.value = true
  showModal.value = true
}

const resetForm = () => {
  formData.value = {
    id: '',
    image: '',
    email: '',
    phone: '',
    type: 'researchers',
    ru: {
      name: '',
      role: '',
      bio: '',
      biography: '',
      expertise: [''],
      education: [''],
      experience: [''],
      publications: [''],
      achievements: ['']
    },
    en: {
      name: '',
      role: '',
      bio: '',
      biography: '',
      expertise: [''],
      education: [''],
      experience: [''],
      publications: [''],
      achievements: ['']
    },
    uz: {
      name: '',
      role: '',
      bio: '',
      biography: '',
      expertise: [''],
      education: [''],
      experience: [''],
      publications: [''],
      achievements: ['']
    }
  }
  imagePreview.value = ''
}

const addField = (lang, field) => {
  formData.value[lang][field].push('')
}

const removeField = (lang, field, index) => {
  formData.value[lang][field].splice(index, 1)
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  showNotification('info', 'Файл выбран', 'Изображение будет загружено при сохранении')
}

const saveMember = async () => {
  if (!formData.value.id) {
    showNotification('error', 'Ошибка', 'ID обязателен!')
    return
  }

  if (!formData.value.ru.name || !formData.value.en.name || !formData.value.uz.name) {
    showNotification('error', 'Ошибка', 'Имена на всех языках обязательны!')
    return
  }

  isSaving.value = true
  
  try {
    // Очистка пустых полей
    ['ru', 'en', 'uz'].forEach(lang => {
      ['expertise', 'education', 'experience', 'publications', 'achievements'].forEach(field => {
        formData.value[lang][field] = formData.value[lang][field].filter(item => item.trim() !== '')
      })
    })

    await teamStore.saveMember(formData.value, selectedFile.value)
    
    showNotification('success', 'Успешно!', 'Данные команды обновлены (JSON)')
    showModal.value = false
    resetForm()
    selectedFile.value = null
  } catch (error) {
    showNotification('error', 'Ошибка сохранения', error.message)
  } finally {
    isSaving.value = false
  }
}

const deleteMember = (id) => {
  currentDeleteId.value = id
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await teamStore.deleteMember(currentDeleteId.value)
    showNotification('success', 'Удалено!', 'Член команды удален из базы данных')
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
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление командой</h1>
            <p class="text-gray-600">Добавляйте и редактируйте информацию о членах команды</p>
          </div>
          <button
            @click="openAddForm"
            :disabled="isSaving"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Добавить члена команды
          </button>
        </div>
      </div>

      <!-- Индикатор загрузки списка -->
      <div v-if="isLoading && membersList.length === 0" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Загрузка данных...</p>
      </div>

      <!-- Список членов команды -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in membersList"
          :key="member.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              v-if="member.image"
              :src="member.image"
              :alt="member.ru?.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-white text-6xl">
              👤
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.ru?.name }}</h3>
            <p class="text-gray-600 mb-2">{{ member.ru?.role }}</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              {{ member.type === 'leadership' ? 'Руководство' : member.type === 'groupMembers' ? 'Члены группы' : 'Научный сотрудник' }}
            </p>
            <p class="text-sm text-gray-500 mb-4">{{ member.email }}</p>
            
            <div class="flex gap-2">
              <button
                @click="openEditForm(member)"
                class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ✏️ Редактировать
              </button>
              <button
                @click="deleteMember(member.id)"
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
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? 'Редактировать члена команды' : 'Добавить члена команды' }}
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
                  <label class="block text-sm font-semibold text-gray-700 mb-2">ID *</label>
                  <input
                    v-model="formData.id"
                    type="text"
                    :disabled="isEditing"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ivanivanov"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Тип участника *</label>
                  <select
                    v-model="formData.type"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="leadership">Руководство</option>
                    <option value="researchers">Научный сотрудник</option>
                    <option value="groupMembers">Член группы</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Телефон *</label>
                  <input
                    v-model="formData.phone"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+998 XX XXX-XX-XX"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Изображение</label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div v-if="imagePreview" class="mb-4">
                <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg shadow-md" />
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
                <label class="block text-sm font-semibold text-gray-700 mb-2">ФИО *</label>
                <input
                  v-model="formData[currentLanguage].name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Должность *</label>
                <input
                  v-model="formData[currentLanguage].role"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Краткая биография *</label>
                <textarea
                  v-model="formData[currentLanguage].bio"
                  rows="2"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Полная биография *</label>
                <textarea
                  v-model="formData[currentLanguage].biography"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <!-- Динамические поля -->
              <div v-for="field in ['expertise', 'education', 'experience', 'publications', 'achievements']" :key="field">
                <label class="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                  {{ field === 'expertise' ? 'Области экспертизы' : 
                     field === 'education' ? 'Образование' :
                     field === 'experience' ? 'Опыт работы' :
                     field === 'publications' ? 'Публикации' : 'Достижения' }}
                </label>
                <div
                  v-for="(item, index) in formData[currentLanguage][field]"
                  :key="index"
                  class="flex gap-2 mb-2"
                >
                  <input
                    v-model="formData[currentLanguage][field][index]"
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    @click="removeField(currentLanguage, field, index)"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <button
                  @click="addField(currentLanguage, field)"
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  + Добавить
                </button>
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="saveMember"
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
      title="Удалить члена команды?"
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
