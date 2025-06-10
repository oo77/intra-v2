<script setup>
import { ref, onMounted } from 'vue'
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
  ArrowTrendingUpIcon
} from '@heroicons/vue/24/outline'


const $t = useI18n().t
const stats = ref([
  { name: 'home.stats.activeProjects', value: '50+', icon: ChartBarIcon },
  { name: 'home.stats.researchPapers', value: '200+', icon: GlobeAltIcon },
  { name: 'home.stats.industryPartners', value: '30+', icon: TruckIcon },
  { name: 'home.stats.yearsOfInnovation', value: '15+', icon: RocketLaunchIcon },
])

const features = ref([
  {
    name: 'home.features.smartLogistics.title',
    description: 'home.features.smartLogistics.description',
    icon: TruckIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'home.features.sustainableTransport.title',
    description: 'home.features.sustainableTransport.description',
    icon: GlobeAltIcon,
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'home.features.innovationResearch.title',
    description: 'home.features.innovationResearch.description',
    icon: RocketLaunchIcon,
    color: 'from-purple-500 to-pink-500'
  },
])

const newFeatures = ref([
  {
    name: 'home.newFeatures.expertise.title',
    description: 'home.newFeatures.expertise.description',
    icon: LightBulbIcon,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'home.newFeatures.technology.title',
    description: 'home.newFeatures.technology.description',
    icon: CogIcon,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'home.newFeatures.collaboration.title',
    description: 'home.newFeatures.collaboration.description',
    icon: UsersIcon,
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
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    text: 'home.testimonials.testimonial2.text',
    author: 'home.testimonials.testimonial2.author',
    position: 'home.testimonials.testimonial2.position',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    text: 'home.testimonials.testimonial3.text',
    author: 'home.testimonials.testimonial3.author',
    position: 'home.testimonials.testimonial3.position',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
])

const isVideoModalOpen = ref(false)
const email = ref('')
const isSubscribed = ref(false)

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
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background with gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
      
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float"></div>
        <div class="absolute top-3/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white/15 rounded-full animate-float" style="animation-delay: 4s;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up" data-aos-duration="800">
          <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span class="block">{{ $t('home.hero.title').split(' ')[0] }}</span>
            <span class="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              {{ $t('home.hero.title').split(' ')[1] }}
            </span>
          </h1>
          <p class="hero-subtitle text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {{ $t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/projects" class="btn-primary inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300">
              {{ $t('home.hero.exploreProjects') }}
              <ArrowRightIcon class="ml-2 h-5 w-5" />
            </RouterLink>
            <button 
              @click="openVideoModal"
              class="btn-secondary inline-flex items-center bg-white/10 text-white border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              <PlayIcon class="mr-2 h-5 w-5" />
              {{ $t('home.hero.watchVideo') }}
            </button>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
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
            class="text-center group"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <component :is="stat.icon" class="h-8 w-8 text-white" />
            </div>
            <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{{ stat.value }}</div>
            <div class="text-gray-600">{{ $t(stat.name) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {{ $t('home.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('home.features.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.name"
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover group"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-r group-hover:scale-110 transition-transform duration-300',
              feature.color
            ]">
              <component :is="feature.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t(feature.name) }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ $t(feature.description) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- New Features Section -->
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
            class="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 card-hover group"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-r group-hover:scale-110 transition-transform duration-300',
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

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
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
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current" />
              </div>
            </div>
            <p class="text-gray-600 mb-6 italic leading-relaxed">
              "{{ $t(testimonial.text) }}"
            </p>
            <div class="flex items-center">
              <img 
                :src="testimonial.image" 
                :alt="$t(testimonial.author)"
                class="w-12 h-12 rounded-full object-cover mr-4"
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


    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isVideoModalOpen" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          @click="closeVideoModal"
        >
          <div 
            class="bg-white rounded-lg p-4 max-w-4xl w-full"
            @click.stop
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Company Overview</h3>
              <button 
                @click="closeVideoModal"
                class="text-gray-500 hover:text-gray-700"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div class="text-white">
                <PlayIcon class="h-16 w-16 mx-auto mb-4" />
                <p>Video content would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>