<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  CalendarIcon, 
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const { locale } = useI18n()

const props = defineProps({
  project: {
    type: Object,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const localizedTitle = computed(() => {
  if (!props.project) return ''
  return props.project.title[locale.value] || props.project.title.en
})

const localizedCategory = computed(() => {
  if (!props.project) return ''
  return props.project.category[locale.value] || props.project.category.en
})

const localizedOverview = computed(() => {
  if (!props.project?.details?.overview) return ''
  return props.project.details.overview[locale.value] || props.project.details.overview.en
})

const localizedObjectives = computed(() => {
  if (!props.project?.details?.objectives) return []
  return props.project.details.objectives[locale.value] || props.project.details.objectives.en
})

const localizedTechnologies = computed(() => {
  if (!props.project?.details?.technologies) return []
  return props.project.details.technologies[locale.value] || props.project.details.technologies.en
})

const localizedImpact = computed(() => {
  if (!props.project?.details?.impact) return ''
  return props.project.details.impact[locale.value] || props.project.details.impact.en
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

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = () => {
  handleClose()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isVisible && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="handleBackdropClick"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="relative">
            <img
              :src="project.image"
              :alt="localizedTitle"
              class="w-full h-64 object-cover"
            >
            <button
              @click="handleClose"
              class="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-primary-600">{{ localizedCategory }}</span>
              <span :class="[
                'px-3 py-1 text-sm font-medium rounded-full',
                getStatusColor(project.status)
              ]">
                {{ getLocalizedStatus(project.status) }}
              </span>
            </div>

            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ localizedTitle }}</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-center text-gray-600">
                <CalendarIcon class="h-5 w-5 mr-2" />
                <span>{{ $t('projects.duration') }}: {{ project.duration }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <UserGroupIcon class="h-5 w-5 mr-2" />
                <span>{{ $t('projects.team') }}: {{ project.team }}</span>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('projects.modal.overview') }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ localizedOverview }}</p>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('projects.modal.objectives') }}</h3>
                <ul class="space-y-2">
                  <li
                    v-for="objective in localizedObjectives"
                    :key="objective"
                    class="flex items-start"
                  >
                    <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span class="text-gray-600">{{ objective }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('projects.modal.technologies') }}</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in localizedTechnologies"
                    :key="tech"
                    class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('projects.modal.impact') }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ localizedImpact }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>
