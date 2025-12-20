# 🔧 Обновление админ-панелей для работы с MySQL API

## Проблемы текущей реализации

1. ❌ Админ-панели работают с JSON файлами через localStorage
2. ❌ Используются alert() вместо красивых модальных окон
3. ❌ Данные не синхронизируются с MySQL базой данных
4. ❌ Есть лишние кнопки (Экспортировать JSON, Сбросить)

## Решение

### 1. Создан компонент ConfirmModal.vue

Универсальный компонент для красивых модальных окон:
- ✅ Типы: success, error, warning, info, confirm
- ✅ Анимации и transitions
- ✅ Backdrop blur эффект
- ✅ Адаптивный дизайн

**Использование:**
```vue
<ConfirmModal
  :isVisible="showConfirm"
  type="confirm"
  title="Удалить члена команды?"
  message="Это действие нельзя отменить"
  confirmText="Удалить"
  cancelText="Отмена"
  :showCancel="true"
  @confirm="handleDelete"
  @cancel="showConfirm = false"
  @close="showConfirm = false"
/>
```

### 2. Обновление TeamAdmin.vue

**Что нужно изменить:**

#### A. Импорты
```javascript
import { useTeamStore } from '@/stores/team'
import ConfirmModal from '@/components/ConfirmModal.vue'
```

#### B. Замена localStorage на Pinia store
```javascript
const teamStore = useTeamStore()

// Загрузка данных
onMounted(async () => {
  await teamStore.fetchMembers()
})

// Список членов
const membersList = computed(() => teamStore.membersList)
```

#### C. Сохранение через API
```javascript
const saveMember = async () => {
  if (!formData.value.id) {
    showNotification('error', 'Ошибка', 'ID обязателен!')
    return
  }

  isSaving.value = true
  
  try {
    await teamStore.saveMember(formData.value)
    
    showNotification('success', 'Успешно!', 'Член команды сохранен в базе данных')
    showModal.value = false
    resetForm()
  } catch (error) {
    showNotification('error', 'Ошибка', error.message)
  } finally {
    isSaving.value = false
  }
}
```

#### D. Удаление через API
```javascript
const deleteMember = async (id) => {
  currentDeleteId.value = id
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await teamStore.deleteMember(currentDeleteId.value)
    showNotification('success', 'Удалено!', 'Член команды удален из базы данных')
  } catch (error) {
    showNotification('error', 'Ошибка', error.message)
  }
  showDeleteConfirm.value = false
}
```

#### E. Убрать лишние кнопки
Удалить:
- ❌ "Экспортировать JSON"
- ❌ "Сбросить изменения"
- ❌ Инструкцию по работе с файлами

Оставить:
- ✅ "Добавить члена команды"

### 3. Структура обновленного компонента

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { uploadImageToCloudinary } from '@/utils/imageUpload.js'

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
const formData = ref({...}) // форма

// Загрузка
onMounted(async () => {
  await teamStore.fetchMembers()
})

// Computed
const membersList = computed(() => teamStore.membersList)

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

const saveMember = async () => {
  if (!formData.value.id) {
    showNotification('error', 'Ошибка', 'ID обязателен!')
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

    await teamStore.saveMember(formData.value)
    
    showNotification('success', 'Успешно!', 'Данные сохранены в базе данных')
    showModal.value = false
    resetForm()
  } catch (error) {
    showNotification('error', 'Ошибка', error.message)
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
    showNotification('success', 'Удалено!', 'Член команды удален')
  } catch (error) {
    showNotification('error', 'Ошибка', error.message)
  }
  showDeleteConfirm.value = false
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    isSaving.value = true
    const result = await uploadImageToCloudinary(file, {
      folder: 'intra-v2/team'
    })
    
    imagePreview.value = result.optimizedUrl
    formData.value.image = result.optimizedUrl
    
    showNotification('success', 'Загружено!', 'Изображение успешно загружено')
  } catch (error) {
    showNotification('error', 'Ошибка', error.message)
  } finally {
    isSaving.value = false
  }
}

// ... остальные методы
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
    <!-- Заголовок -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              Управление командой
            </h1>
            <p class="text-gray-600">
              Добавляйте и редактируйте информацию о членах команды
            </p>
          </div>
          <button
            @click="openAddForm"
            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            + Добавить члена команды
          </button>
        </div>
      </div>
    </div>

    <!-- Список членов -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="member in membersList"
        :key="member.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
      >
        <!-- Карточка члена -->
        <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
          <img
            v-if="member.image"
            :src="member.image"
            :alt="member.ru?.name"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ member.ru?.name }}
          </h3>
          <p class="text-gray-600 mb-2">{{ member.ru?.role }}</p>
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

    <!-- Модальное окно редактирования -->
    <!-- ... (оставить как есть) ... -->

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
</template>
```

### 4. Применить ко всем админ-панелям

Те же изменения применить к:
- ✅ `GalleryAdmin.vue`
- ✅ `AboutGalleryAdmin.vue`
- ✅ `ProjectsAdmin.vue` (если есть)

## Преимущества новой реализации

1. ✅ Данные сохраняются в MySQL через API
2. ✅ Красивые модальные окна вместо alert()
3. ✅ Убраны лишние кнопки и инструкции
4. ✅ Синхронизация с основным сайтом в реальном времени
5. ✅ Единый источник данных (база данных)
6. ✅ Профессиональный UX/UI

## Следующие шаги

1. Обновить `TeamAdmin.vue` согласно инструкции
2. Обновить `GalleryAdmin.vue`
3. Обновить `AboutGalleryAdmin.vue`
4. Протестировать все админ-панели
5. Удалить старые файлы и код для работы с JSON

**Файл с компонентом модального окна уже создан:**
`/src/components/ConfirmModal.vue`
