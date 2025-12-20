<script setup>
import { 
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  member: {
    type: Object,
    required: true
  },
  isModalOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['openModal', 'closeModal'])

const openModal = () => {
  emit('openModal', props.member)
}

const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <!-- Карточка участника команды -->
  <div 
    class="bg-white rounded-lg overflow-hidden shadow-lg card-hover cursor-pointer transform transition-all duration-300 hover:scale-105 flex flex-col h-full"
    @click="openModal"
  >
    <img 
      :src="member.image" 
      :alt="member.name"
      class="w-full h-64 object-cover flex-shrink-0"
    >
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
      <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{{ member.bio }}</p>
      <div class="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
        <span 
          v-for="(skill, skillIndex) in member.expertise.slice(0, 3)" 
          :key="skillIndex"
          class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
        >
          {{ skill }}
        </span>
        <span 
          v-if="member.expertise.length > 3"
          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          +{{ member.expertise.length - 3 }}
        </span>
      </div>
      <div class="text-center mt-auto pt-2">
        <span class="text-primary-600 text-sm font-medium">{{ $t('about.team.clickForDetails') }}</span>
      </div>
    </div>
  </div>

  <!-- Модальное окно участника команды -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Заголовок с фото и основной информацией -->
          <div class="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
            
            <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              >
              <div class="text-center md:text-left">
                <h2 class="text-3xl font-bold mb-2">{{ member.name }}</h2>
                <p class="text-xl text-blue-100 mb-4">{{ member.role }}</p>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span
                    v-for="(skill, skillIndex) in member.expertise"
                    :key="skillIndex"
                    class="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Содержимое -->
          <div class="p-8">
            <!-- Контактная информация -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.contactInfo') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center space-x-3">
                  <EnvelopeIcon class="h-5 w-5 text-primary-600" />
                  <a :href="`mailto:${member.email}`" class="text-primary-600 hover:text-primary-700">
                    {{ member.email }}
                  </a>
                </div>
                <div class="flex items-center space-x-3">
                  <PhoneIcon class="h-5 w-5 text-primary-600" />
                  <a :href="`tel:${member.phone}`" class="text-primary-600 hover:text-primary-700">
                    {{ member.phone }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Биография -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.biography') }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ member.biography }}</p>
            </div>

            <!-- Образование -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.education') }}</h3>
              <ul class="space-y-2">
                <li
                  v-for="(education, index) in member.education"
                  :key="index"
                  class="flex items-start"
                >
                  <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span class="text-gray-600">{{ education }}</span>
                </li>
              </ul>
            </div>

            <!-- Опыт работы -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.experience') }}</h3>
              <ul class="space-y-3">
                <li
                  v-for="(experience, index) in member.experience"
                  :key="index"
                  class="flex items-start"
                >
                  <div class="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span class="text-gray-600">{{ experience }}</span>
                </li>
              </ul>
            </div>

            <!-- Публикации -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.publications') }}</h3>
              <ul class="space-y-3">
                <li
                  v-for="(publication, index) in member.publications"
                  :key="index"
                  class="flex items-start"
                >
                  <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span class="text-gray-600 italic">{{ publication }}</span>
                </li>
              </ul>
            </div>

            <!-- Награды -->
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.team.achievements') }}</h3>
              <ul class="space-y-2">
                <li
                  v-for="(award, index) in member.achievements"
                  :key="index"
                  class="flex items-start"
                >
                  <TrophyIcon class="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span class="text-gray-600">{{ award }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Ограничение текста 3 строками */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
