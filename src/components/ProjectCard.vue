<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  EyeIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ArrowRightIcon
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
      return 'bg-emerald-500 text-white'
    case 'Completed':
      return 'bg-blue-600 text-white'
    case 'Planning':
      return 'bg-amber-500 text-white'
    default:
      return 'bg-slate-500 text-white'
  }
}

const getLocalizedStatus = (status) => {
  const statusMap = {
    'Active': { en: 'Active', ru: 'Активный', uz: 'Faol' },
    'Completed': { en: 'Completed', ru: 'Завершен', uz: 'Tugallangan' },
    'Planning': { en: 'Planning', ru: 'Планирование', uz: 'Rejalashtirilmoqda' }
  }
  return statusMap[status]?.[locale.value] || status
}

const handleCardClick = () => {
  emit('openModal', props.project)
}
</script>

<template>
  <div
    class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
    @click="handleCardClick"
  >
    <div class="relative h-64 overflow-hidden">
      <img
        :src="project.image"
        :alt="localizedTitle"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
        <div class="glass px-6 py-2 rounded-full flex items-center gap-2 text-white">
          <EyeIcon class="w-4 h-4" />
          <span class="text-sm font-black tracking-widest uppercase">{{ $t('projects.viewDetails') }}</span>
        </div>
      </div>
      <div class="absolute top-6 left-6">
        <span :class="[
          'px-4 py-1.5 text-xs font-black rounded-xl uppercase tracking-widest shadow-lg',
          getStatusColor(project.status)
        ]">
          {{ getLocalizedStatus(project.status) }}
        </span>
      </div>
    </div>

    <div class="p-10 flex flex-col flex-grow">
      <div class="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{{ localizedCategory }}</div>
      <h3 class="text-2xl font-black text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{{ localizedTitle }}</h3>
      <p class="text-slate-500 font-medium mb-8 line-clamp-3 leading-relaxed">{{ localizedDescription }}</p>
      
      <div class="mt-auto space-y-4">
        <div class="flex items-center gap-6 pt-6 border-t border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <CalendarIcon class="h-4 w-4" />
            </div>
            <span class="text-sm font-bold text-slate-500">{{ project.duration }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UserGroupIcon class="h-4 w-4" />
            </div>
            <span class="text-sm font-bold text-slate-500">{{ project.team }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Glassmorphism utility */
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

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
