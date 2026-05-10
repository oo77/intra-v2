<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import { useProjectsStore } from '@/stores/projects'

const { t, locale } = useI18n()
const projectsStore = useProjectsStore()

const selectedProject = ref(null)
const activeFilter = ref('All')

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

const filters = computed(() => [
  { key: 'All', label: t('projects.filters.all') },
  { key: 'Autonomous Vehicles', label: t('projects.filters.autonomousVehicles') },
  { key: 'Supply Chain', label: t('projects.filters.supplyChain') },
  { key: 'Sustainability', label: t('projects.filters.sustainability') },
  { key: 'Urban Planning', label: t('projects.filters.urbanPlanning') },
  { key: 'Autonomous Systems', label: t('projects.filters.autonomousSystems') },
  { key: 'Infrastructure', label: t('projects.filters.infrastructure') }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => {
    const categoryEn = project.category.en
    return categoryEn === activeFilter.value
  })
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
            {{ $t('projects.badge') || 'Our Research' }}
          </div>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">{{ $t('projects.title') }}</h1>
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

    <!-- Filter Section -->
    <section class="sticky top-0 z-30 py-6 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="activeFilter = filter.key"
            :class="[
              'px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105',
              activeFilter === filter.key
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-24 bg-white min-h-screen">
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
          <p class="text-slate-500 font-medium">Попробуйте изменить фильтры</p>
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
