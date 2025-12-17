<script setup>
import { ref, computed, onMounted } from 'vue'
import { uploadImageToCloudinary, isCloudinaryConfigured } from '@/utils/imageUpload.js'

const teamMembers = ref({})
const currentMember = ref(null)
const isEditing = ref(false)
const currentLanguage = ref('ru')
const showModal = ref(false)
const imagePreview = ref('')
const uploadedImage = ref(null)
const saveStatus = ref('')
const isSaving = ref(false)

// Форма для нового/редактируемого члена команды
const formData = ref({
  id: '',
  image: '',
  email: '',
  phone: '',
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

// Загрузка данных из JSON
onMounted(async () => {
  await loadTeamData()
})

// Функция загрузки данных
const loadTeamData = async () => {
  try {
    // Сначала проверяем localStorage
    const localData = localStorage.getItem('teamMembersData')
    if (localData) {
      try {
        teamMembers.value = JSON.parse(localData)
        console.log('✅ Данные загружены из localStorage (несохраненные изменения)')
        return
      } catch (e) {
        console.warn('Ошибка парсинга localStorage, загружаем из файла')
      }
    }
    
    // Если нет в localStorage, загружаем из файла
    const timestamp = new Date().getTime()
    const response = await fetch(`/team-members.json?t=${timestamp}`)
    teamMembers.value = await response.json()
    console.log('✅ Данные загружены из team-members.json')
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
    saveStatus.value = 'error'
  }
}

// Список членов команды
const membersList = computed(() => {
  return Object.values(teamMembers.value)
})

// Открыть форму для добавления нового члена
const openAddForm = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

// Открыть форму для редактирования
const openEditForm = (member) => {
  currentMember.value = member.id
  formData.value = JSON.parse(JSON.stringify(member))
  imagePreview.value = member.image
  isEditing.value = true
  showModal.value = true
}

// Сброс формы
const resetForm = () => {
  formData.value = {
    id: '',
    image: '',
    email: '',
    phone: '',
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
  uploadedImage.value = null
  currentMember.value = null
}

// Добавить поле в массив
const addField = (lang, field) => {
  formData.value[lang][field].push('')
}

// Удалить поле из массива
const removeField = (lang, field, index) => {
  formData.value[lang][field].splice(index, 1)
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
    saveStatus.value = 'uploading'

    // Загружаем в Cloudinary с SEO-оптимизацией
    const result = await uploadImageToCloudinary(file, {
      folder: 'intra-v2/team',
      onProgress: (progress) => {
        console.log(`Загрузка: ${progress}%`)
      }
    })

    // Используем оптимизированный URL
    imagePreview.value = result.optimizedUrl
    formData.value.image = result.optimizedUrl

    saveStatus.value = 'success'
    alert(`✅ Изображение загружено и оптимизировано!\n\n📊 Информация:\n- Формат: ${result.format} (автоматически WebP/AVIF)\n- Размер: ${Math.round(result.size / 1024)} KB\n- Разрешение: ${result.width}x${result.height}\n- SEO: Оптимизировано для быстрой загрузки`)
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    saveStatus.value = 'error'
    alert('❌ Ошибка загрузки изображения: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Сохранить данные
const saveMember = async () => {
  if (!formData.value.id) {
    alert('ID обязателен!')
    return
  }

  isSaving.value = true
  saveStatus.value = 'saving'

  try {
    // Очистка пустых полей в массивах
    ['ru', 'en', 'uz'].forEach(lang => {
      ['expertise', 'education', 'experience', 'publications', 'achievements'].forEach(field => {
        formData.value[lang][field] = formData.value[lang][field].filter(item => item.trim() !== '')
      })
    })

    // Обновляем данные в памяти
    teamMembers.value[formData.value.id] = JSON.parse(JSON.stringify(formData.value))
    
    // Сохраняем в localStorage
    localStorage.setItem('teamMembersData', JSON.stringify(teamMembers.value))
    
    saveStatus.value = 'success'
    
    // Показываем уведомление
    alert('✅ Данные успешно сохранены!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать файл для замены.')
    
    showModal.value = false
    resetForm()
    
    // Перезагружаем данные для синхронизации
    await loadTeamData()
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    saveStatus.value = 'error'
    alert('❌ Ошибка при сохранении данных: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Удалить члена команды
const deleteMember = async (id) => {
  if (confirm('Вы уверены, что хотите удалить этого члена команды?')) {
    isSaving.value = true
    try {
      delete teamMembers.value[id]
      
      // Сохраняем в localStorage
      localStorage.setItem('teamMembersData', JSON.stringify(teamMembers.value))
      
      alert('✅ Член команды удален!\n\n📝 Нажмите кнопку "Экспортировать JSON" чтобы скачать обновленный файл.')
      await loadTeamData()
    } catch (error) {
      console.error('Ошибка удаления:', error)
      alert('❌ Ошибка при удалении: ' + error.message)
    } finally {
      isSaving.value = false
    }
  }
}

// Экспортировать JSON файл (вызывается вручную)
const exportJSON = () => {
  const jsonData = JSON.stringify(teamMembers.value, null, 2)
  downloadFile('team-members.json', jsonData, 'application/json')
  alert('✅ Файл team-members.json скачан!\n\n📝 Замените файл /public/team-members.json этим файлом.')
}

// Сбросить изменения и загрузить из файла
const resetChanges = async () => {
  if (confirm('Вы уверены? Все несохраненные изменения будут потеряны!')) {
    localStorage.removeItem('teamMembersData')
    await loadTeamData()
    alert('✅ Данные сброшены! Загружены оригинальные данные из файла.')
  }
}

// Сохранить в файлы (только JSON) - не используется автоматически
const saveToFiles = async () => {
  const jsonData = JSON.stringify(teamMembers.value, null, 2)
  
  // Скачиваем только JSON файл
  downloadFile('team-members.json', jsonData, 'application/json')
  
  // Показываем инструкцию
  console.log('📁 Файл team-members.json скачан')
  console.log('📝 Замените файл /public/team-members.json')
  console.log('✅ Изменения автоматически отобразятся на сайте после обновления страницы!')
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

// Скачать обновленный JSON (оставляем для совместимости)
const downloadJSON = () => {
  const dataStr = JSON.stringify(teamMembers.value, null, 2)
  downloadFile('team-members.json', dataStr, 'application/json')
}

// Закрыть модальное окно
const closeModal = () => {
  showModal.value = false
  resetForm()
}
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
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Управление командой</h1>
            <p class="text-gray-600">Добавляйте и редактируйте информацию о членах команды</p>
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
              + Добавить члена команды
            </button>
          </div>
        </div>
      </div>

      <!-- Инструкция по обновлению файлов -->
      <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
        <div class="flex items-start gap-4">
          <div class="text-4xl">✅</div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Как работать с админ-панелью:</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Добавляйте/редактируйте</strong> членов команды и нажимайте <strong>"💾 Сохранить"</strong> - данные сохраняются в браузере</li>
              <li>Когда закончите все изменения, нажмите <strong class="text-green-600">"📥 Экспортировать JSON"</strong> - скачается файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">team-members.json</code></li>
              <li>Замените файл <code class="bg-green-200 px-2 py-1 rounded font-semibold">/public/team-members.json</code> скачанным файлом</li>
              <li>Обновите страницу сайта (F5) - все изменения отобразятся! 🎉</li>
            </ol>
            <div class="mt-4 p-3 bg-white rounded-lg border border-green-200">
              <p class="text-sm text-gray-600">
                <strong>💡 Преимущество:</strong> Теперь вы можете сделать несколько изменений подряд, 
                и только потом один раз экспортировать файл. Файл не скачивается при каждом сохранении!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Список членов команды -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in membersList"
          :key="member.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              v-if="member.image"
              :src="member.image"
              :alt="member.ru.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-white text-6xl">
              👤
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.ru.name }}</h3>
            <p class="text-gray-600 mb-2">{{ member.ru.role }}</p>
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
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Телефон *</label>
                  <input
                    v-model="formData.phone"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+998 XX XXX-XX-XX"
                  />
                </div>

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
