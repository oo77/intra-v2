<script setup>
import { ref, onMounted } from 'vue'
import AdminNav from '@/components/AdminNav.vue'
import { 
  WrenchScrewdriverIcon, 
  CommandLineIcon, 
  ServerIcon,
  CircleStackIcon
} from '@heroicons/vue/24/outline'

const isSaving = ref(false)
const envInfo = ref({
  mode: import.meta.env.MODE,
  apiUrl: import.meta.env.VITE_API_URL || 'Not Set',
  cmsUrl: import.meta.env.VITE_CMS_API_URL || 'Not Set',
  staticEnabled: import.meta.env.VITE_LOCAL_CMS_ENABLED || 'false'
})

const siteConfig = ref({
  title: 'INTRA Research Center',
  email: 'info@intra.uz',
  phone: '+998 71 123 45 67',
  version: '2.1.0-dev'
})

const saveConfig = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    alert('Настройки успешно сохранены (DEV mode)')
  }, 1000)
}

const clearCache = () => {
  localStorage.clear()
  alert('Локальное хранилище очищено')
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <AdminNav />
    
    <div class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-blue-100 rounded-xl text-blue-600">
              <WrenchScrewdriverIcon class="h-8 w-8" />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Настройки проекта</h1>
              <p class="text-gray-600 italic">Инструменты разработки и конфигурация (будут скрыты в Production)</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- System Info -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CommandLineIcon class="h-5 w-5 text-purple-600" />
              Окружение (Environment)
            </h2>
            <div class="space-y-4">
              <div v-for="(value, key) in envInfo" :key="key" class="flex justify-between border-b pb-2">
                <span class="text-gray-500 font-medium uppercase text-xs">{{ key }}</span>
                <span class="text-gray-900 font-mono text-sm">{{ value }}</span>
              </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-100">
              <button 
                @click="clearCache"
                class="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <CircleStackIcon class="h-4 w-4" />
                Очистить LocalStorage
              </button>
            </div>
          </div>

          <!-- App Config -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ServerIcon class="h-5 w-5 text-blue-600" />
              Общая конфигурация
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1 uppercase">Название центра</label>
                <input v-model="siteConfig.title" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1 uppercase">Email для контактов</label>
                <input v-model="siteConfig.email" type="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1 uppercase">Телефон</label>
                <input v-model="siteConfig.phone" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1 uppercase">Версия проекта</label>
                <input v-model="siteConfig.version" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            
            <button 
              @click="saveConfig"
              :disabled="isSaving"
              class="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {{ isSaving ? 'Сохранение...' : '💾 Сохранить изменения' }}
            </button>
          </div>
        </div>

        <!-- Dev Warning -->
        <div class="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⚠️</span>
            <p class="text-sm text-yellow-800 font-medium">
              Эта страница предназначена только для разработки. Убедитесь, что доступ к ней будет ограничен или страница будет удалена перед деплоем в продакшн.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
