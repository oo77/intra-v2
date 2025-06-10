<script setup>
import { ref, computed } from 'vue'

const partners = ref([
  {
    id: 1,
    name: 'TechCorp Industries',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Leading technology partner providing AI and machine learning solutions for autonomous vehicle research.',
    category: 'Technology',
    partnership: 'Strategic Alliance',
    since: '2020',
    website: 'https://techcorp.com'
  },
  {
    id: 2,
    name: 'Global Logistics Solutions',
    logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'International logistics company collaborating on supply chain optimization and smart warehouse solutions.',
    category: 'Logistics',
    partnership: 'Research Collaboration',
    since: '2019',
    website: 'https://globallogistics.com'
  },
  {
    id: 3,
    name: 'EcoTransport Initiative',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Environmental organization focused on sustainable transportation solutions and green technology development.',
    category: 'Environmental',
    partnership: 'Joint Research',
    since: '2021',
    website: 'https://ecotransport.org'
  },
  {
    id: 4,
    name: 'Metropolitan University',
    logo: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Academic partner providing research expertise and student collaboration opportunities.',
    category: 'Academic',
    partnership: 'Academic Partnership',
    since: '2018',
    website: 'https://metrouni.edu'
  },
  {
    id: 5,
    name: 'Smart City Solutions',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Urban planning and smart city technology company working on integrated transportation systems.',
    category: 'Urban Planning',
    partnership: 'Technology Partnership',
    since: '2022',
    website: 'https://smartcitysolutions.com'
  },
  {
    id: 6,
    name: 'InnovateAI Labs',
    logo: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'AI research laboratory specializing in machine learning applications for transportation optimization.',
    category: 'AI/ML',
    partnership: 'Research Partnership',
    since: '2023',
    website: 'https://innovateai.com'
  },
  {
    id: 7,
    name: 'GreenTech Ventures',
    logo: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Venture capital firm investing in sustainable transportation technologies and green innovation.',
    category: 'Finance',
    partnership: 'Investment Partner',
    since: '2021',
    website: 'https://greentechvc.com'
  },
  {
    id: 8,
    name: 'Future Mobility Consortium',
    logo: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Industry consortium focused on developing next-generation mobility solutions and standards.',
    category: 'Industry',
    partnership: 'Consortium Member',
    since: '2020',
    website: 'https://futuremobility.org'
  }
])

const categories = ref(['All', 'Technology', 'Logistics', 'Environmental', 'Academic', 'Urban Planning', 'AI/ML', 'Finance', 'Industry'])
const activeCategory = ref('All')

const filteredPartners = computed(() => {
  if (activeCategory.value === 'All') {
    return partners.value
  }
  return partners.value.filter(partner => partner.category === activeCategory.value)
})

const getCategoryColor = (category) => {
  const colors = {
    'Technology': 'bg-blue-100 text-blue-800',
    'Logistics': 'bg-green-100 text-green-800',
    'Environmental': 'bg-emerald-100 text-emerald-800',
    'Academic': 'bg-purple-100 text-purple-800',
    'Urban Planning': 'bg-orange-100 text-orange-800',
    'AI/ML': 'bg-red-100 text-red-800',
    'Finance': 'bg-yellow-100 text-yellow-800',
    'Industry': 'bg-indigo-100 text-indigo-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const stats = ref([
  { name: 'Active Partnerships', value: '30+', description: 'Ongoing collaborations worldwide' },
  { name: 'Countries', value: '15+', description: 'International presence and reach' },
  { name: 'Joint Projects', value: '50+', description: 'Collaborative research initiatives' },
  { name: 'Years of Collaboration', value: '25+', description: 'Combined partnership experience' }
])
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Partners</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Collaborating with industry leaders, academic institutions, and innovative organizations to advance transportation technology
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.name"
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ stat.value }}</div>
            <div class="text-lg font-semibold text-gray-900 mb-1">{{ stat.name }}</div>
            <div class="text-sm text-gray-600">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-gray-50 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-colors duration-200',
              activeCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Partners Grid -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="(partner, index) in filteredPartners"
            :key="partner.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="p-6">
              <!-- Logo -->
              <div class="flex items-center justify-center mb-4">
                <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-16 h-16 object-cover rounded-lg"
                >
              </div>

              <!-- Partner Info -->
              <div class="text-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ partner.name }}</h3>
                <span :class="[
                  'inline-block px-3 py-1 text-xs font-medium rounded-full mb-2',
                  getCategoryColor(partner.category)
                ]">
                  {{ partner.category }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 text-center">{{ partner.description }}</p>

              <!-- Partnership Details -->
              <div class="space-y-2 text-sm text-gray-500 mb-4">
                <div class="flex justify-between">
                  <span>Partnership:</span>
                  <span class="font-medium">{{ partner.partnership }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Since:</span>
                  <span class="font-medium">{{ partner.since }}</span>
                </div>
              </div>

              <!-- Visit Website Button -->
              <a
                :href="partner.website"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-primary-50 text-primary-600 py-2 rounded-md hover:bg-primary-100 transition-colors duration-200 font-medium"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Opportunities -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our network of partners and collaborate with us to shape the future of transportation
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="100">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Research Collaboration</h3>
            <p class="text-gray-600">Partner with us on cutting-edge research projects and innovation initiatives.</p>
          </div>

          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Industry Partnership</h3>
            <p class="text-gray-600">Join our industry network to develop practical solutions and market applications.</p>
          </div>

          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="300">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Investment Opportunities</h3>
            <p class="text-gray-600">Invest in groundbreaking transportation technologies and sustainable solutions.</p>
          </div>
        </div>

        <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <a href="/contacts" class="btn-primary inline-flex items-center">
            Become a Partner
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>