<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import { useProjectsStore } from '@/stores/projects'

import {
  DocumentTextIcon,
  AcademicCapIcon,
  PresentationChartBarIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()
const projectsStore = useProjectsStore()

const selectedProject = ref(null)

const achievements = [
  {
    key: 'research',
    icon: DocumentTextIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    key: 'capacity',
    icon: AcademicCapIcon,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    key: 'analytics',
    icon: PresentationChartBarIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    key: 'international',
    icon: GlobeAltIcon,
    color: 'from-emerald-500 to-teal-500'
  }
]

// Загрузка проектов из базы данных
onMounted(async () => {
  try {
    await projectsStore.fetchProjects()
  } catch (error) {
    console.error('Ошибка загрузки проектов:', error)
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
})

// Получаем проекты из store
const projects = computed(() => projectsStore.allProjects)

const filteredProjects = computed(() => {
  return projects.value
})

const openProjectModal = (project) => {
  selectedProject.value = project
}

const closeProjectModal = () => {
  selectedProject.value = null
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden page-hero" style="background-image: url('https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1920'); background-size: cover; background-position: center 40%; background-attachment: fixed;">
      <!-- Deep overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-indigo-950/75 to-blue-950/80"></div>
      <!-- Animated orbs -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-[10%] right-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-[15%] left-[8%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style="padding-top: calc(5rem + 80px); padding-bottom: 6rem;">
        <div class="text-center reveal-on-scroll">
          <div class="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-sm font-bold uppercase tracking-widest mb-8 shadow-xl">
            <span class="relative flex h-2 w-2 mr-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
            {{ $t('projects.badge') }}
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1] max-w-5xl mx-auto">
            {{ $t('projects.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto font-medium leading-relaxed">
            {{ $t('projects.subtitle') }}
          </p>
          <!-- Scroll indicator -->
          <div class="mt-16 flex flex-col items-center gap-2 text-white/40">
            <span class="text-xs font-bold uppercase tracking-widest">Scroll</span>
            <div class="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white relative z-20 -mt-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center -m-4">
          <div 
            v-for="(item, index) in achievements" 
            :key="item.key"
            class="p-4 w-full sm:w-1/2 lg:w-1/4 group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="h-full p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2">
              <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-lg transform group-hover:rotate-6 transition-transform duration-500', item.color]">
                <component :is="item.icon" class="h-7 w-7 text-white" />
              </div>
              <h3 class="text-lg font-black text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                {{ $t(`projects.achievements.${item.key}.title`) }}
              </h3>
              <p class="text-sm text-slate-500 font-bold leading-relaxed">
                {{ $t(`projects.achievements.${item.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-24 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            class="reveal-on-scroll"
            :style="{ transitionDelay: `${(index % 3) * 100}ms` }"
          >
            <ProjectCard
              :project="project"
              :index="index"
              @openModal="openProjectModal"
            />
          </div>
        </div>
        <div v-else class="text-center py-40 reveal-on-scroll">
          <div class="text-8xl mb-8">🔍</div>
          <h3 class="text-2xl font-black text-slate-800 mb-4">Ничего не найдено</h3>
          <p class="text-slate-500 font-medium">Проекты скоро появятся</p>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <ProjectModal
      :project="selectedProject"
      :isVisible="!!selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>
