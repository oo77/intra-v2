<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  EyeIcon, 
  CalendarIcon, 
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const { locale } = useI18n()

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['openModal'])

const localizedTitle = computed(() => {
  return props.project.title[locale.value] || props.project.title.en
})

const localizedDescription = computed(() => {
  return props.project.description[locale.value] || props.project.description.en
})

const localizedCategory = computed(() => {
  return props.project.category[locale.value] || props.project.category.en
})

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Completed':
      return 'bg-blue-100 text-blue-800'
    case 'Planning':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getLocalizedStatus = (status) => {
  const statusMap = {
    'Active': {
      en: 'Active',
      ru: 'Активный',
      uz: 'Faol'
    },
    'Completed': {
      en: 'Completed',
      ru: 'Завершен',
      uz: 'Tugallangan'
    },
    'Planning': {
      en: 'Planning',
      ru: 'Планирование',
      uz: 'Rejalashtirilmoqda'
    }
  }
  return statusMap[status]?.[locale.value] || status
}

const handleCardClick = () => {
  emit('openModal', props.project)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden card-hover cursor-pointer flex flex-col h-full"
    data-aos="fade-up"
    :data-aos-delay="index * 100"
    @click="handleCardClick"
  >
    <img
      :src="project.image"
      :alt="localizedTitle"
      class="w-full h-48 object-cover flex-shrink-0"
    >
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-primary-600">{{ localizedCategory }}</span>
        <span :class="[
          'px-2 py-1 text-xs font-medium rounded-full',
          getStatusColor(project.status)
        ]">
          {{ getLocalizedStatus(project.status) }}
        </span>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{{ localizedTitle }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">{{ localizedDescription }}</p>
      
      <div class="space-y-2 text-sm text-gray-500 mb-4">
        <div class="flex items-center">
          <CalendarIcon class="h-4 w-4 mr-2" />
          <span>{{ project.duration }}</span>
        </div>
        <div class="flex items-center">
          <UserGroupIcon class="h-4 w-4 mr-2" />
          <span>{{ project.team }}</span>
        </div>
      </div>

      <div class="mt-auto pt-2 flex items-center justify-between">
        <button class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
          <EyeIcon class="h-4 w-4 mr-1" />
          {{ $t('projects.viewDetails') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Ограничение текста */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
