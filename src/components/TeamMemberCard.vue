<script setup>
import { 
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  TrophyIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentTextIcon
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
    class="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
    @click="openModal"
  >
    <div class="relative h-80 overflow-hidden">
      <img 
        :src="member.image" 
        :alt="member.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
        <span class="px-6 py-2 glass text-white rounded-full text-sm font-black tracking-widest uppercase">{{ $t('about.team.clickForDetails') }}</span>
      </div>
    </div>
    <div class="p-8 flex flex-col flex-grow text-center">
      <h3 class="text-2xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{{ member.name }}</h3>
      <p class="text-slate-500 font-bold text-lg mb-4">{{ member.role }}</p>
      <div class="mt-auto flex justify-center gap-3">
        <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" :style="{ transitionDelay: `${i * 100}ms` }"></div>
      </div>
    </div>
  </div>

  <!-- Модальное окно участника команды -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        @click="closeModal"
      >
        <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"></div>
        
        <div
          class="relative bg-white rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl reveal-modal"
          @click.stop
        >
          <!-- Кнопка закрытия -->
          <button
            @click="closeModal"
            class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-all hover:rotate-90"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>

          <div class="flex flex-col lg:flex-row">
            <!-- Левая колонка: Фото и контакты -->
            <div class="lg:w-1/3 bg-slate-50 p-12 border-r border-slate-100">
              <div class="sticky top-0">
                <div class="p-3 glass bg-white rounded-[3rem] shadow-2xl mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    :src="member.image"
                    :alt="member.name"
                    class="w-full aspect-square rounded-[2.5rem] object-cover"
                  >
                </div>
                
                <div class="space-y-6">
                  <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ $t('about.team.contactInfo') }}</h3>
                  <div class="space-y-4">
                    <a :href="`mailto:${member.email}`" class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-lg transition-all group">
                      <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <EnvelopeIcon class="h-5 w-5 text-blue-600 group-hover:text-white" />
                      </div>
                      <span class="text-slate-600 font-bold truncate">{{ member.email }}</span>
                    </a>
                    <a :href="`tel:${member.phone}`" class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-lg transition-all group">
                      <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <PhoneIcon class="h-5 w-5 text-blue-600 group-hover:text-white" />
                      </div>
                      <span class="text-slate-600 font-bold">{{ member.phone }}</span>
                    </a>
                  </div>

                  <div v-if="member.expertise?.length" class="space-y-4">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest pt-4">Expertise</h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(skill, idx) in member.expertise"
                        :key="idx"
                        class="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-black rounded-xl uppercase tracking-tighter"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Правая колонка: Опыт и достижения -->
            <div class="lg:w-2/3 p-12 lg:p-16">
              <div class="mb-12">
                <h2 class="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-none">{{ member.name }}</h2>
                <div class="flex items-center gap-3">
                  <div class="h-1 w-12 bg-blue-600 rounded-full"></div>
                  <p class="text-2xl font-bold text-blue-600">{{ member.role }}</p>
                </div>
              </div>

              <div class="space-y-16">
                <!-- Биография -->
                <div v-if="member.biography" class="relative">
                  <h3 class="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
                    <div class="w-2 h-8 bg-blue-500/20 rounded-full"></div>
                    {{ $t('about.team.biography') }}
                  </h3>
                  <p class="text-slate-500 text-lg leading-relaxed font-medium pl-6">{{ member.biography }}</p>
                </div>

                <!-- Образование и Опыт -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div v-if="member.education?.length">
                    <h3 class="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
                      <AcademicCapIcon class="w-8 h-8 text-blue-600" />
                      {{ $t('about.team.education') }}
                    </h3>
                    <ul class="space-y-6">
                      <li v-for="(edu, idx) in member.education" :key="idx" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full before:shadow-[0_0_10px_rgba(59,130,246,0.5)] font-bold text-slate-600 leading-tight">
                        {{ edu }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="member.experience?.length">
                    <h3 class="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
                      <BriefcaseIcon class="w-8 h-8 text-indigo-600" />
                      {{ $t('about.team.experience') }}
                    </h3>
                    <ul class="space-y-6">
                      <li v-for="(exp, idx) in member.experience" :key="idx" class="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-500 before:rounded-full before:shadow-[0_0_10px_rgba(99,102,241,0.5)] font-bold text-slate-600 leading-tight">
                        {{ exp }}
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Публикации -->
                <div v-if="member.publications?.length">
                  <h3 class="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
                    <DocumentTextIcon class="w-8 h-8 text-emerald-600" />
                    {{ $t('about.team.publications') }}
                  </h3>
                  <div class="grid grid-cols-1 gap-4">
                    <div v-for="(pub, idx) in member.publications" :key="idx" class="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-medium text-slate-600 italic leading-relaxed hover:bg-emerald-50 hover:border-emerald-100 transition-all">
                      "{{ pub }}"
                    </div>
                  </div>
                </div>

                <!-- Награды -->
                <div v-if="member.achievements?.length">
                  <h3 class="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
                    <TrophyIcon class="w-8 h-8 text-amber-500" />
                    {{ $t('about.team.achievements') }}
                  </h3>
                  <div class="flex flex-wrap gap-4">
                    <div v-for="(award, idx) in member.achievements" :key="idx" class="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 font-black text-sm">
                      <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                        <TrophyIcon class="w-5 h-5 text-white" />
                      </div>
                      {{ award }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .reveal-modal {
  transform: scale(0.9) translateY(40px);
  opacity: 0;
}

.reveal-modal {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Glassmorphism utility for scoped usage */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
