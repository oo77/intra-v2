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
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ $t('projects.title') }}</h1>
          <p class="text-xl max-w-3xl mx-auto">
            {{ $t('projects.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="activeFilter = filter.key"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-colors duration-200',
              activeFilter === filter.key
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :project="project"
            :index="index"
            @openModal="openProjectModal"
          />
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
