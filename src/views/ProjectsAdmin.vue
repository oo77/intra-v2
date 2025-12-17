<script setup>
import { ref, computed, onMounted } from 'vue'

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
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
      formData.value.image = e.target.result
    }
    reader.readAsDataURL(file)
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

      <!-- Модальное окно (будет добавлено в следующем сообщении из-за ограничения размера) -->
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
</style>
