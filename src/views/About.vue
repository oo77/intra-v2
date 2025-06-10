<script setup>
import { ref } from 'vue'
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon, 
  GlobeAltIcon 
} from '@heroicons/vue/24/outline'

const teamMembers = ref([
  {
    name: 'Dr. Sarah Johnson',
    role: 'Director of Research',
    bio: 'Leading expert in autonomous vehicle systems with over 15 years of experience in transportation innovation.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Autonomous Systems', 'AI/ML', 'Smart Infrastructure']
  },
  {
    name: 'Prof. Michael Chen',
    role: 'Head of Logistics Research',
    bio: 'Pioneering researcher in supply chain optimization and smart logistics systems.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Supply Chain', 'Optimization', 'IoT Systems']
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Sustainability Director',
    bio: 'Expert in sustainable transportation solutions and environmental impact assessment.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Green Technology', 'Environmental Science', 'Policy Development']
  },
  {
    name: 'Dr. James Wilson',
    role: 'Technology Innovation Lead',
    bio: 'Specialist in emerging technologies and their applications in modern transportation.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Emerging Tech', 'R&D', 'Innovation Strategy']
  },
])

const achievements = ref([
  {
    icon: AcademicCapIcon,
    title: 'Research Excellence',
    description: 'Over 200 peer-reviewed publications in top-tier journals',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: TrophyIcon,
    title: 'Industry Awards',
    description: 'Recognized with 15+ international awards for innovation',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: UserGroupIcon,
    title: 'Global Partnerships',
    description: 'Collaborating with 30+ institutions worldwide',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Impact Scale',
    description: 'Solutions implemented across 25+ countries',
    color: 'from-purple-500 to-pink-500'
  },
])

const values = ref([
  {
    title: 'Innovation',
    description: 'We push the boundaries of what\'s possible in transportation technology.',
  },
  {
    title: 'Sustainability',
    description: 'Environmental responsibility guides every research decision we make.',
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of partnerships to solve complex challenges.',
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in research and implementation.',
  },
])
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">About Our Center</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Pioneering research and innovation in transportation and logistics technology for over 15 years
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 mb-6">
              The INNOVATIVE TRANSPORT Research Center is dedicated to advancing the science and technology 
              of transportation and logistics systems. We focus on developing sustainable, efficient, 
              and intelligent solutions that address the complex challenges of modern mobility.
            </p>
            <p class="text-lg text-gray-600 mb-6">
              Through cutting-edge research, strategic partnerships, and innovative technologies, 
              we're shaping the future of how people and goods move around the world.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Advanced research in autonomous transportation</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Sustainable logistics and supply chain solutions</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Smart infrastructure and urban mobility</span>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <img 
              src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Research Lab" 
              class="rounded-lg shadow-lg w-full h-96 object-cover"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p class="text-xl text-gray-600">Recognition of our commitment to excellence and innovation</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(achievement, index) in achievements" 
            :key="achievement.title"
            class="bg-white rounded-lg p-6 shadow-lg text-center card-hover"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r mb-4',
              achievement.color
            ]">
              <component :is="achievement.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ achievement.title }}</h3>
            <p class="text-gray-600">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p class="text-xl text-gray-600">The principles that guide our work and drive our success</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(value, index) in values" 
            :key="value.title"
            class="bg-gray-50 rounded-lg p-8"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p class="text-xl text-gray-600">Leading experts driving innovation in transportation research</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="member.name"
            class="bg-white rounded-lg overflow-hidden shadow-lg card-hover"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <img 
              :src="member.image" 
              :alt="member.name"
              class="w-full h-64 object-cover"
            >
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
              <p class="text-gray-600 text-sm mb-4">{{ member.bio }}</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in member.expertise" 
                  :key="skill"
                  class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>