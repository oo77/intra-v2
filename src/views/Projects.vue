<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  EyeIcon, 
  CalendarIcon, 
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const projects = ref([
  {
    id: 1,
    title: 'Autonomous Fleet Management System',
    description: 'Advanced AI-powered system for managing autonomous vehicle fleets in urban environments.',
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Autonomous Vehicles',
    status: 'Active',
    duration: '2023-2025',
    team: 'Dr. Sarah Johnson, Prof. Michael Chen',
    details: {
      overview: 'This project focuses on developing a comprehensive fleet management system for autonomous vehicles operating in complex urban environments. The system utilizes advanced machine learning algorithms to optimize routes, manage vehicle maintenance, and ensure passenger safety.',
      objectives: [
        'Develop real-time fleet optimization algorithms',
        'Implement predictive maintenance systems',
        'Create safety monitoring and emergency response protocols',
        'Design user-friendly interfaces for fleet operators'
      ],
      technologies: ['Machine Learning', 'IoT Sensors', 'Cloud Computing', 'Real-time Analytics'],
      impact: 'Expected to reduce operational costs by 30% and improve service reliability by 45%.'
    }
  },
  {
    id: 2,
    title: 'Smart Logistics Network Optimization',
    description: 'Optimizing global supply chain networks using advanced analytics and IoT technology.',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Supply Chain',
    status: 'Active',
    duration: '2022-2024',
    team: 'Prof. Michael Chen, Dr. Elena Rodriguez',
    details: {
      overview: 'A comprehensive research initiative aimed at revolutionizing global supply chain management through the integration of IoT sensors, big data analytics, and artificial intelligence to create more efficient, sustainable, and resilient logistics networks.',
      objectives: [
        'Develop predictive analytics for demand forecasting',
        'Optimize warehouse operations and inventory management',
        'Reduce carbon footprint through route optimization',
        'Enhance supply chain visibility and transparency'
      ],
      technologies: ['IoT Sensors', 'Big Data Analytics', 'Blockchain', 'Machine Learning'],
      impact: 'Potential to reduce logistics costs by 25% and decrease carbon emissions by 20%.'
    }
  },
  {
    id: 3,
    title: 'Green Transportation Initiative',
    description: 'Research into sustainable transportation solutions and renewable energy integration.',
    image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Sustainability',
    status: 'Completed',
    duration: '2021-2023',
    team: 'Dr. Elena Rodriguez, Dr. James Wilson',
    details: {
      overview: 'This completed project investigated various sustainable transportation technologies including electric vehicles, hydrogen fuel cells, and renewable energy integration to create a comprehensive framework for green transportation systems.',
      objectives: [
        'Evaluate effectiveness of different green technologies',
        'Develop renewable energy integration strategies',
        'Create policy recommendations for sustainable transport',
        'Design charging infrastructure optimization models'
      ],
      technologies: ['Electric Vehicles', 'Hydrogen Fuel Cells', 'Solar Energy', 'Smart Grids'],
      impact: 'Research findings have been adopted by 5 major cities and influenced national transportation policies.'
    }
  },
  {
    id: 4,
    title: 'Urban Mobility Data Platform',
    description: 'Big data platform for analyzing urban mobility patterns and optimizing city transportation.',
    image: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Urban Planning',
    status: 'Active',
    duration: '2023-2026',
    team: 'Dr. James Wilson, Dr. Sarah Johnson',
    details: {
      overview: 'A cutting-edge platform that collects, processes, and analyzes massive amounts of urban mobility data to provide insights for city planners and transportation authorities, enabling data-driven decisions for smarter cities.',
      objectives: [
        'Develop real-time traffic flow monitoring systems',
        'Create predictive models for urban congestion',
        'Design multimodal transportation optimization',
        'Build citizen engagement and feedback systems'
      ],
      technologies: ['Big Data', 'Machine Learning', 'Mobile Apps', 'Traffic Sensors'],
      impact: 'Pilot implementations have reduced traffic congestion by 18% in participating cities.'
    }
  },
  {
    id: 5,
    title: 'Drone Delivery Network',
    description: 'Development of autonomous drone delivery systems for last-mile logistics.',
    image: 'https://images.pexels.com/photos/2876621/pexels-photo-2876621.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Autonomous Systems',
    status: 'Planning',
    duration: '2024-2027',
    team: 'Dr. Sarah Johnson, Prof. Michael Chen',
    details: {
      overview: 'An innovative project focused on creating a comprehensive drone delivery network that can handle last-mile logistics efficiently and safely, with particular emphasis on urban and suburban environments.',
      objectives: [
        'Design autonomous navigation systems for drones',
        'Develop safety and collision avoidance protocols',
        'Create efficient package sorting and dispatch systems',
        'Establish regulatory compliance frameworks'
      ],
      technologies: ['Autonomous Drones', 'GPS Navigation', 'Computer Vision', 'Air Traffic Management'],
      impact: 'Expected to reduce last-mile delivery costs by 40% and delivery times by 60%.'
    }
  },
  {
    id: 6,
    title: 'Smart Infrastructure Monitoring',
    description: 'IoT-based monitoring system for transportation infrastructure health and maintenance.',
    image: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Infrastructure',
    status: 'Active',
    duration: '2022-2025',
    team: 'Dr. Elena Rodriguez, Dr. James Wilson',
    details: {
      overview: 'This project develops advanced IoT sensor networks and monitoring systems to continuously assess the health and performance of critical transportation infrastructure, enabling predictive maintenance and extending asset lifespans.',
      objectives: [
        'Deploy comprehensive sensor networks on infrastructure',
        'Develop predictive maintenance algorithms',
        'Create real-time monitoring dashboards',
        'Establish automated alert and response systems'
      ],
      technologies: ['IoT Sensors', 'Edge Computing', 'Predictive Analytics', 'Digital Twins'],
      impact: 'Pilot programs show 35% reduction in maintenance costs and 50% improvement in infrastructure reliability.'
    }
  }
])

const selectedProject = ref(null)
const activeFilter = ref('All')

const filters = ['All', 'Autonomous Vehicles', 'Supply Chain', 'Sustainability', 'Urban Planning', 'Autonomous Systems', 'Infrastructure']

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeFilter.value)
})

const openProjectModal = (project) => {
  selectedProject.value = project
}

const closeProjectModal = () => {
  selectedProject.value = null
}

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
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Explore our cutting-edge research projects that are shaping the future of transportation and logistics
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
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-colors duration-200',
              activeFilter === filter
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden card-hover cursor-pointer"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
            @click="openProjectModal(project)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover"
            >
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-primary-600">{{ project.category }}</span>
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(project.status)
                ]">
                  {{ project.status }}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              
              <div class="space-y-2 text-sm text-gray-500">
                <div class="flex items-center">
                  <CalendarIcon class="h-4 w-4 mr-2" />
                  <span>{{ project.duration }}</span>
                </div>
                <div class="flex items-center">
                  <UserGroupIcon class="h-4 w-4 mr-2" />
                  <span>{{ project.team }}</span>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <button class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  <EyeIcon class="h-4 w-4 mr-1" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          @click="closeProjectModal"
        >
          <div
            class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="relative">
              <img
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="w-full h-64 object-cover"
              >
              <button
                @click="closeProjectModal"
                class="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>

            <div class="p-8">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-primary-600">{{ selectedProject.category }}</span>
                <span :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  getStatusColor(selectedProject.status)
                ]">
                  {{ selectedProject.status }}
                </span>
              </div>

              <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedProject.title }}</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="flex items-center text-gray-600">
                  <CalendarIcon class="h-5 w-5 mr-2" />
                  <span>Duration: {{ selectedProject.duration }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <UserGroupIcon class="h-5 w-5 mr-2" />
                  <span>Team: {{ selectedProject.team }}</span>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Project Overview</h3>
                  <p class="text-gray-600 leading-relaxed">{{ selectedProject.details.overview }}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Key Objectives</h3>
                  <ul class="space-y-2">
                    <li
                      v-for="objective in selectedProject.details.objectives"
                      :key="objective"
                      class="flex items-start"
                    >
                      <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span class="text-gray-600">{{ objective }}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in selectedProject.details.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Expected Impact</h3>
                  <p class="text-gray-600 leading-relaxed">{{ selectedProject.details.impact }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>