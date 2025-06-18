<script setup lang="ts">
import { ref, computed } from 'vue'

const partners = ref([
  {
    id: 1,
    name: 'The Chartered Institute of Logistics and Transport (CILT)',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Ведущая международная организация в области логистики и транспорта, базирующаяся в Великобритании.',
    category: 'Международные организации',
    partnership: 'Международное сотрудничество',
    since: '2022',
    website: 'https://ciltinternational.org'
  },
  {
    id: 2,
    name: 'Ташкентский государственный транспортный университет',
    logo: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Базовый университет, на основе которого создан НИЦ "Инновационный транспорт".',
    category: 'Образовательные учреждения',
    partnership: 'Базовое партнерство',
    since: '2016',
    website: 'https://tstu.uz'
  },
  {
    id: 3,
    name: 'АО "Узбекистон темир йуллари"',
    logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Национальная железнодорожная компания Узбекистана, ключевой партнер в области практических исследований.',
    category: 'Транспортные компании',
    partnership: 'Хоздоговорные работы',
    since: '2021',
    website: 'https://railway.uz'
  },
  {
    id: 4,
    name: 'Институт логистики и транспорта (AzTU)',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Азербайджанский технический университет, партнер в области научных исследований и обмена опытом.',
    category: 'Образовательные учреждения',
    partnership: 'Научное сотрудничество',
    since: '2022',
    website: 'https://aztu.edu.az'
  },
  {
    id: 5,
    name: 'Transportation Systems and Logistics Lab (IUST)',
    logo: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Лаборатория транспортных систем и логистики Иранского университета науки и технологий.',
    category: 'Научные лаборатории',
    partnership: 'Исследовательское партнерство',
    since: '2023',
    website: 'https://tsl.iust.ac.ir'
  },
  {
    id: 6,
    name: 'Uluslararası EMI Kongresi',
    logo: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Международный конгресс по железнодорожному машиностроению в Турции.',
    category: 'Научные мероприятия',
    partnership: 'Участие в конференциях',
    since: '2022',
    website: 'https://emissc.org'
  },
  {
    id: 7,
    name: 'Научно-технический центр "STU-ENGINEERING"',
    logo: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Казахстанский научно-технический центр в области транспортных технологий.',
    category: 'Научные центры',
    partnership: 'Техническое сотрудничество',
    since: '2023',
    website: 'https://kstu.kz'
  },
  {
    id: 8,
    name: 'Ассоциация по развитию бизнес логистики (ADBL)',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Узбекская ассоциация, объединяющая предприятия и специалистов в области логистики.',
    category: 'Отраслевые ассоциации',
    partnership: 'Отраслевое партнерство',
    since: '2021',
    website: 'https://adbl.uz'
  }
])

const categories = ref(['Все', 'Международные организации', 'Образовательные учреждения', 'Транспортные компании', 'Научные лаборатории', 'Научные мероприятия', 'Научные центры', 'Отраслевые ассоциации'])
const activeCategory = ref('Все')

const filteredPartners = computed(() => {
  if (activeCategory.value === 'Все') {
    return partners.value
  }
  return partners.value.filter(partner => partner.category === activeCategory.value)
})

const getCategoryColor = (category) => {
  const colors = {
    'Международные организации': 'bg-blue-100 text-blue-800',
    'Образовательные учреждения': 'bg-green-100 text-green-800',
    'Транспортные компании': 'bg-emerald-100 text-emerald-800',
    'Научные лаборатории': 'bg-purple-100 text-purple-800',
    'Научные мероприятия': 'bg-orange-100 text-orange-800',
    'Научные центры': 'bg-red-100 text-red-800',
    'Отраслевые ассоциации': 'bg-yellow-100 text-yellow-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const stats = ref([
  { name: 'Активные партнерства', value: '8+', description: 'Действующие соглашения о сотрудничестве' },
  { name: 'Стран', value: '6+', description: 'Международное присутствие и охват' },
  { name: 'Совместные проекты', value: '15+', description: 'Реализованные исследовательские инициативы' },
  { name: 'Лет сотрудничества', value: '8+', description: 'Совокупный опыт партнерства' }
])
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Наши партнеры</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Сотрудничество с ведущими университетами, отраслевыми компаниями и международными организациями для развития транспортных технологий
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
                  <span>Партнерство:</span>
                  <span class="font-medium">{{ partner.partnership }}</span>
                </div>
                <div class="flex justify-between">
                  <span>С:</span>
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
                Посетить сайт
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Возможности партнерства</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Присоединяйтесь к нашей сети партнеров и сотрудничайте с нами в формировании будущего транспорта и логистики
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="100">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Научное сотрудничество</h3>
            <p class="text-gray-600">Участвуйте в совместных исследовательских проектах и инновационных инициативах.</p>
          </div>

          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Отраслевое партнерство</h3>
            <p class="text-gray-600">Присоединяйтесь к нашей отраслевой сети для разработки практических решений.</p>
          </div>

          <div class="text-center p-6" data-aos="fade-up" data-aos-delay="300">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Образовательные программы</h3>
            <p class="text-gray-600">Сотрудничайте в области подготовки кадров и повышения квалификации специалистов.</p>
          </div>
        </div>

        <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <a href="/contacts" class="btn-primary inline-flex items-center">
            Стать партнером
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>