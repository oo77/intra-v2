<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  TruckIcon, 
  RocketLaunchIcon, 
  GlobeAltIcon, 
  ChartBarIcon,
  ArrowRightIcon,
  PlayIcon,
  StarIcon,
  CheckCircleIcon,
  LightBulbIcon,
  CogIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  BeakerIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const stats = ref([
  { name: 'home.stats.activeProjects', value: '15+', icon: ChartBarIcon, color: 'from-blue-500 to-cyan-500' },
  { name: 'home.stats.researchPapers', value: '50+', icon: DocumentTextIcon, color: 'from-green-500 to-emerald-500' },
  { name: 'home.stats.industryPartners', value: '8+', icon: BuildingOfficeIcon, color: 'from-purple-500 to-violet-500' },
  { name: 'home.stats.yearsOfInnovation', value: '8+', icon: AcademicCapIcon, color: 'from-orange-500 to-red-500' },
])

const features = ref([
  {
    name: 'home.features.smartLogistics.title',
    description: 'home.features.smartLogistics.description',
    icon: CogIcon,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'home.features.sustainableTransport.title',
    description: 'home.features.sustainableTransport.description',
    icon: LightBulbIcon,
    color: 'from-green-500 to-teal-500',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'home.features.innovationResearch.title',
    description: 'home.features.innovationResearch.description',
    icon: DocumentTextIcon,
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
])

const newFeatures = ref([
  {
    name: 'home.newFeatures.expertise.title',
    description: 'home.newFeatures.expertise.description',
    icon: AcademicCapIcon,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'home.newFeatures.technology.title',
    description: 'home.newFeatures.technology.description',
    icon: BeakerIcon,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'home.newFeatures.collaboration.title',
    description: 'home.newFeatures.collaboration.description',
    icon: GlobeAltIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'home.newFeatures.impact.title',
    description: 'home.newFeatures.impact.description',
    icon: ArrowTrendingUpIcon,
    color: 'from-purple-500 to-violet-500'
  },
])

const testimonials = ref([
  {
    text: 'home.testimonials.testimonial1.text',
    author: 'home.testimonials.testimonial1.author',
    position: 'home.testimonials.testimonial1.position',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    text: 'home.testimonials.testimonial2.text',
    author: 'home.testimonials.testimonial2.author',
    position: 'home.testimonials.testimonial2.position',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    text: 'home.testimonials.testimonial3.text',
    author: 'home.testimonials.testimonial3.author',
    position: 'home.testimonials.testimonial3.position',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  }
])

const isVideoModalOpen = ref(false)
const email = ref('')
const isSubscribed = ref(false)

const backgroundPatternStyle = computed(() => ({
  backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
}))

const openVideoModal = () => {
  isVideoModalOpen.value = true
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
}

const subscribeNewsletter = () => {
  if (email.value) {
    isSubscribed.value = true
    setTimeout(() => {
      isSubscribed.value = false
      email.value = ''
    }, 3000)
  }
}

onMounted(() => {
  // Add any additional initialization logic here
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section with Modern Design -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Dynamic Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>
      </div>
      
      <!-- Animated Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            <div class="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-6">
              <BeakerIcon class="h-4 w-4 mr-2" />
              НИЦ "Инновационный транспорт"
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span class="block">{{ $t('home.hero.title').split(' ')[0] }}</span>
              <span class="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {{ $t('home.hero.title').split(' ')[1] }}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {{ $t('home.hero.subtitle') }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RouterLink 
                to="/projects" 
                class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {{ $t('home.hero.exploreProjects') }}
                <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </RouterLink>
              
              <button 
                @click="openVideoModal"
                class="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
              >
                <PlayIcon class="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {{ $t('home.hero.watchVideo') }}
              </button>
            </div>
          </div>

          <!-- Visual Element -->
          <div class="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div class="relative">
              <img 
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Transport Innovation" 
                class="rounded-2xl shadow-2xl w-full h-96 object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              
              <!-- Floating Cards -->
              <div class="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <CogIcon class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">Управление процессами</div>
                    <div class="text-xs text-gray-600">Оптимизация транспорта</div>
                  </div>
                </div>
              </div>
              
              <div class="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <LightBulbIcon class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">Цифровизация</div>
                    <div class="text-xs text-gray-600">Логистические системы</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section with Modern Cards -->
    <section class="py-20 bg-white relative">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Наши достижения в цифрах
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Результаты многолетней работы в области транспортных инноваций
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.name"
            class="group relative"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div :class="[
                'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r group-hover:scale-110 transition-transform duration-300',
                stat.color
              ]">
                <component :is="stat.icon" class="h-8 w-8 text-white" />
              </div>
              <div class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                {{ stat.value }}
              </div>
              <div class="text-gray-600 font-medium">{{ $t(stat.name) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Enhanced Design -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {{ $t('home.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('home.features.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.name"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            data-aos="fade-up"
            :data-aos-delay="index * 200"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="feature.image" 
                :alt="$t(feature.name)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div :class="[
                'absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r',
                feature.color
              ]">
                <component :is="feature.icon" class="h-6 w-6 text-white" />
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t(feature.name) }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ $t(feature.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {{ $t('home.newFeatures.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('home.newFeatures.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in newFeatures" 
            :key="feature.name"
            class="group text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:from-white hover:to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r group-hover:scale-110 transition-transform duration-300',
              feature.color
            ]">
              <component :is="feature.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ $t(feature.name) }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ $t(feature.description) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section with Enhanced Design -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {{ $t('home.testimonials.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('home.testimonials.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            data-aos="fade-up"
            :data-aos-delay="index * 200"
          >
            <!-- Rating Stars -->
            <div class="flex items-center mb-6">
              <div class="flex text-yellow-400">
                <StarIcon v-for="i in testimonial.rating" :key="i" class="h-5 w-5 fill-current" />
              </div>
            </div>
            
            <!-- Quote -->
            <blockquote class="text-gray-600 mb-6 italic leading-relaxed relative">
              <span class="text-4xl text-blue-200 absolute -top-2 -left-2">"</span>
              {{ $t(testimonial.text) }}
              <span class="text-4xl text-blue-200">"</span>
            </blockquote>
            
            <!-- Author -->
            <div class="flex items-center">
              <img 
                :src="testimonial.image" 
                :alt="$t(testimonial.author)"
                class="w-14 h-14 rounded-full object-cover mr-4 ring-4 ring-blue-100"
              >
              <div>
                <h4 class="font-semibold text-gray-900">{{ $t(testimonial.author) }}</h4>
                <p class="text-sm text-gray-500">{{ $t(testimonial.position) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section with Modern Design -->
    <section class="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" :style="backgroundPatternStyle"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ $t('home.newsletter.title') }}
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {{ $t('home.newsletter.subtitle') }}
          </p>
          
          <div class="max-w-md mx-auto">
            <div class="flex flex-col sm:flex-row gap-4">
              <input
                v-model="email"
                type="email"
                :placeholder="$t('home.newsletter.placeholder')"
                class="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-white/20 focus:outline-none text-gray-900 placeholder-gray-500 shadow-lg"
              >
              <button
                @click="subscribeNewsletter"
                :disabled="isSubscribed"
                class="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span v-if="!isSubscribed">{{ $t('home.newsletter.subscribe') }}</span>
                <span v-else class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 mr-2" />
                  Подписка оформлена!
                </span>
              </button>
            </div>
            <p class="text-blue-100 text-sm mt-4 opacity-80">
              {{ $t('home.newsletter.privacy') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section with Enhanced Design -->
    <section class="py-20 bg-gradient-to-r from-slate-900 to-gray-900 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            {{ $t('home.cta.title') }}
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {{ $t('home.cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink 
              to="/contacts" 
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {{ $t('home.cta.getInTouch') }}
              <ArrowRightIcon class="ml-2 h-5 w-5" />
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              {{ $t('home.cta.learnMore') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isVideoModalOpen" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          @click="closeVideoModal"
        >
          <div 
            class="bg-white rounded-2xl p-6 max-w-4xl w-full shadow-2xl"
            @click.stop
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900">О НИЦ "Инновационный транспорт"</h3>
              <button 
                @click="closeVideoModal"
                class="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center">
              <div class="text-white text-center">
                <PlayIcon class="h-16 w-16 mx-auto mb-4 opacity-80" />
                <p class="text-lg">Презентационное видео о центре</p>
                <p class="text-sm opacity-60 mt-2">Видео будет добавлено позже</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>