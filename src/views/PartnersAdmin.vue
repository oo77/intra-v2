<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePartnersStore } from '@/stores/partners'
import AdminNav from '@/components/AdminNav.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/utils/imageUpload.js'

const partnersStore = usePartnersStore()

// State
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const showNotificationModal = ref(false)
const notificationData = ref({ type: 'info', title: '', message: '' })
const currentDeleteId = ref(null)
const isEditing = ref(false)
const isSaving = ref(false)
const imagePreview = ref('')

// Форма
const formData = ref({
  id: null,
  name: '',
  logo_url: '',
  website_url: '',
  display_order: 0,
  is_active: true
})

// Загрузка данных
onMounted(async () => {
  try {
    await partnersStore.fetchPartners()
  } catch (error) {
    showNotification('error', 'Ошибка загрузки', error.message)
  }
})

// Computed
const partnersList = computed(() => partnersStore.partnersList)
const isLoading = computed(() => partnersStore.isLoading)

// Methods
const showNotification = (type, title, message) => {
  notificationData.value = { type, title, message }
  showNotificationModal.value = true
}

const openAddForm = () => {
  resetForm()
  // Генерируем новый порядок
  const maxOrder = partnersList.value.length > 0 
    ? Math.max(...partnersList.value.map(p => p.display_order || 0)) 
    : 0
  formData.value.display_order = maxOrder + 1
  isEditing.value = false
  showModal.value = true
}

const openEditForm = (partner) => {
  formData.value = JSON.parse(JSON.stringify(partner))
  imagePreview.value = partner.logo_url
  isEditing.value = true
  showModal.value = true
}

const resetForm = () => {
  formData.value = {
    id: null,
    name: '',
    logo_url: '',
    website_url: '',
    display_order: 0,
    is_active: true
  }
  imagePreview.value = ''
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!isCloudinaryConfigured()) {
    showNotification('warning', 'Cloudinary не настроен', 'Пожалуйста, настройте Cloudinary в файле src/utils/imageUpload.js')
    return
  }

  try {
    isSaving.value = true
    const result = await uploadImageToCloudinary(file, {
      folder: 'intra-v2/partners'
    })
    
    imagePreview.value = result.optimizedUrl
    formData.value.logo_url = result.optimizedUrl
    
    showNotification('success', 'Загружено!', `Логотип успешно загружен (${Math.round(result.size / 1024)} KB)`)
  } catch (error) {
    showNotification('error', 'Ошибка загрузки', error.message)
  } finally {
    isSaving.value = false
  }
}

const savePartner = async () => {
  if (!formData.value.name) {
    showNotification('error', 'Ошибка', 'Название партнера обязательно!')
    return
  }

  if (!formData.value.logo_url) {
    showNotification('error', 'Ошибка', 'Логотип обязателен!')
    return
  }

  if (!formData.value.website_url) {
    showNotification('error', 'Ошибка', 'Ссылка на сайт обязательна!')
    return
  }

  isSaving.value = true
  
  try {
    await partnersStore.savePartner(formData.value)
    
    showNotification('success', 'Успешно!', 'Партнер сохранен в базе данных')
    showModal.value = false
    resetForm()
  } catch (error) {
    showNotification('error', 'Ошибка сохранения', error.message)
  } finally {
    isSaving.value = false
  }
}

const deletePartner = (id) => {
  currentDeleteId.value = id
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await partnersStore.deletePartner(currentDeleteId.value)
    showNotification('success', 'Удалено!', 'Партнер удален из базы данных')
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
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление партнерами</h1>
            <p class="text-gray-600">Добавляйте и редактируйте логотипы партнеров</p>
          </div>
          <button
            @click="openAddForm"
            :disabled="isSaving"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Добавить партнера
          </button>
        </div>
      </div>

      <!-- Индикатор загрузки списка -->
      <div v-if="isLoading && partnersList.length === 0" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Загрузка данных...</p>
      </div>

      <!-- Список партнеров -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="partner in partnersList"
          :key="partner.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
            <img
              :src="partner.logo_url"
              :alt="partner.name"
              class="max-w-full max-h-full object-contain"
            />
            <div class="absolute top-2 right-2">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                partner.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
              ]">
                {{ partner.is_active ? 'Активен' : 'Неактивен' }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ partner.name }}</h3>
            <p class="text-sm text-gray-500 mb-2 truncate">🔗 {{ partner.website_url }}</p>
            <p class="text-sm text-gray-500 mb-4">📊 Порядок: {{ partner.display_order }}</p>
            
            <div class="flex gap-2">
              <button
                @click="openEditForm(partner)"
                class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ✏️ Редактировать
              </button>
              <button
                @click="deletePartner(partner.id)"
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
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? 'Редактировать партнера' : 'Добавить партнера' }}
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
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Название партнера *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Название компании"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Ссылка на сайт *</label>
                <input
                  v-model="formData.website_url"
                  type="url"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Порядок отображения</label>
                <input
                  v-model.number="formData.display_order"
                  type="number"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                <p class="text-xs text-gray-500 mt-1">Меньшее число = выше в списке</p>
              </div>

              <div>
                <label class="flex items-center gap-2">
                  <input
                    v-model="formData.is_active"
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm font-semibold text-gray-700">Активен (показывать на сайте)</span>
                </label>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Логотип *</label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div v-if="imagePreview" class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Предпросмотр</label>
                <div class="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-32">
                  <img :src="imagePreview" alt="Preview" class="max-h-full max-w-full object-contain" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">URL логотипа (альтернатива)</label>
                <input
                  v-model="formData.logo_url"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                @click="savePartner"
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
      title="Удалить партнера?"
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
