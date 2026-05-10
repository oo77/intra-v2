<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Partners from '@/components/Partners.vue'
import {
  GlobeAltIcon, 
  ChartBarIcon,
  ArrowRightIcon,
  PlayIcon,
  LightBulbIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  PresentationChartBarIcon
} from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()
const $t = t
const stats = ref([
  { name: 'home.stats.implementedProjects', value: '15+', icon: ChartBarIcon, color: 'from-blue-500 to-cyan-500' },
  { name: 'home.stats.scientificResearch', value: '50+', icon: DocumentTextIcon, color: 'from-green-500 to-emerald-500' },
  { name: 'home.stats.internationalPartners', value: '8+', icon: GlobeAltIcon, color: 'from-purple-500 to-violet-500' },
  { name: 'home.stats.transportInnovationYears', value: '8+', icon: ArrowTrendingUpIcon, color: 'from-orange-500 to-red-500' },
  { name: 'home.stats.graduatedDScPhD', value: '10+', icon: AcademicCapIcon, color: 'from-indigo-500 to-blue-500' },
  { name: 'home.stats.analyticalStudies', value: '25+', icon: PresentationChartBarIcon, color: 'from-teal-500 to-emerald-500' },
  { name: 'home.stats.digitalSolutions', value: '10+', icon: ComputerDesktopIcon, color: 'from-cyan-500 to-blue-500' },
])

const features = ref([
  {
    name: 'home.features.logisticsCorridors.title',
    description: 'home.features.logisticsCorridors.description',
    icon: GlobeAltIcon,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'home.features.digitalization.title',
    description: 'home.features.digitalization.description',
    icon: ComputerDesktopIcon,
    color: 'from-indigo-500 to-blue-500',
    image: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'home.features.analytics.title',
    description: 'home.features.analytics.description',
    icon: PresentationChartBarIcon,
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'home.features.sustainableTransport.title',
    description: 'home.features.sustainableTransport.description',
    icon: LightBulbIcon,
    color: 'from-green-500 to-teal-500',
    image: 'https://images.pexels.com/photos/9800010/pexels-photo-9800010.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'home.features.regulatory.title',
    description: 'home.features.regulatory.description',
    icon: DocumentTextIcon,
    color: 'from-orange-500 to-red-500',
    image: 'https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'home.features.capacityBuilding.title',
    description: 'home.features.capacityBuilding.description',
    icon: AcademicCapIcon,
    color: 'from-teal-500 to-emerald-500',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800'
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

const isVideoModalOpen = ref(false)

const openVideoModal = () => {
  isVideoModalOpen.value = true
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
}

onMounted(() => {
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
</script>

<template>
  <div class="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden page-hero" style="background-image: url('https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1920'); background-position: center; background-attachment: fixed;">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-950/80 to-indigo-950/90"></div>
      <!-- Animated Background Circles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-cyan-600/20 rounded-full blur-[80px] animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="text-center lg:text-left reveal-on-scroll">
            <div class="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-blue-300 text-sm font-semibold mb-8 border border-white/10 shadow-xl">
              <span class="relative flex h-2 w-2 mr-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {{ $t('home.hero.badge') }}
            </div>
            
            <h1 
              :class="[
                'font-black text-white mb-8 tracking-tight leading-[1.1]',
                locale === 'ru' ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-5xl md:text-7xl lg:text-8xl'
              ]"
            >
              <span class="block opacity-90">{{ $t('home.hero.title').split(' ')[0] }}</span>
              <span class="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {{ $t('home.hero.title').split(' ')[1] }}
              </span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {{ $t('home.hero.subtitle') }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <RouterLink 
                to="/projects" 
                class="group relative inline-flex items-center px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {{ $t('home.hero.exploreProjects') }}
                <ArrowRightIcon class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </RouterLink>
              
              <button 
                @click="openVideoModal"
                class="group inline-flex items-center px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <PlayIcon class="h-5 w-5 text-blue-400" />
                </div>
                {{ $t('home.hero.watchVideo') }}
              </button>
            </div>
          </div>

          <!-- Hero Visuals -->
          <div class="relative reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="relative z-10 p-4 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Innovation" 
                class="rounded-[2rem] w-full aspect-[4/3] object-cover"
                loading="lazy"
              >
              
              <!-- Floating UI Elements -->
              <div class="absolute -top-8 -right-8 glass p-6 rounded-3xl shadow-2xl animate-float">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <CogIcon class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ $t('home.hero.cards.management.subtitle') }}</div>
                    <div class="text-sm font-black text-slate-800">{{ $t('home.hero.cards.management.title') }}</div>
                  </div>
                </div>
              </div>

              <div class="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-2xl animate-float" style="animation-delay: -3s;">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <LightBulbIcon class="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ $t('home.hero.cards.digitalization.subtitle') }}</div>
                    <div class="text-sm font-black text-slate-800">{{ $t('home.hero.cards.digitalization.title') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div class="w-6 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div class="w-1 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-32 relative overflow-hidden bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {{ $t('home.stats.title') }}
          </h2>
          <p class="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            {{ $t('home.stats.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.name"
            class="group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="h-full bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-3">
              <div :class="[
                'w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br shadow-lg transform group-hover:rotate-12 transition-transform duration-500',
                stat.color
              ]">
                <component :is="stat.icon" class="h-8 w-8 text-white" />
              </div>
              <div class="text-5xl font-black text-slate-900 mb-3 tracking-tighter">{{ stat.value }}</div>
              <div class="text-slate-500 font-bold leading-snug">{{ $t(stat.name) }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-32 bg-slate-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-mesh opacity-40"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-24 reveal-on-scroll">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            {{ $t('home.features.title') }}
          </h2>
          <p class="text-xl text-slate-400 max-w-3xl mx-auto">
            {{ $t('home.features.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.name"
            class="group relative reveal-on-scroll"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <div class="relative h-full glass-dark rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)]">
              <div class="h-64 overflow-hidden relative">
                <img 
                  :src="feature.image" 
                  :alt="$t(feature.name)"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div :class="[
                  'absolute top-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-2xl backdrop-blur-md',
                  feature.color
                ]">
                  <component :is="feature.icon" class="h-7 w-7 text-white" />
                </div>
              </div>
              
              <div class="p-10">
                <h3 class="text-2xl font-black text-white mb-5 group-hover:text-blue-400 transition-colors">{{ $t(feature.name) }}</h3>
                <p class="text-slate-400 leading-relaxed text-lg font-medium">{{ $t(feature.description) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="reveal-on-scroll">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              {{ $t('home.newFeatures.title') }}
            </h2>
            <p class="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
              {{ $t('home.newFeatures.subtitle') }}
            </p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div v-for="feature in newFeatures" :key="feature.name" class="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br shadow-lg', feature.color]">
                  <component :is="feature.icon" class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-lg font-black text-slate-900 mb-2">{{ $t(feature.name) }}</h4>
                <p class="text-sm text-slate-500 font-bold">{{ $t(feature.description) }}</p>
              </div>
            </div>
          </div>

          <div class="relative reveal-on-scroll" style="transition-delay: 300ms;">
            <div class="relative p-4 bg-slate-100 rounded-[3rem] border border-slate-200 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Team" 
                class="rounded-[2.5rem] w-full aspect-square object-cover"
                loading="lazy"
              >
              <div class="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <div class="reveal-on-scroll">
      <Partners />
    </div>

    <!-- CTA Section -->
    <section class="py-32 bg-blue-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
      
      <div class="relative z-10 max-w-5xl mx-auto px-4 text-center reveal-on-scroll">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
          {{ $t('home.cta.title') }}
        </h2>
        <p class="text-xl md:text-2xl text-blue-100 mb-12 font-medium opacity-90">
          {{ $t('home.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-8 justify-center">
          <RouterLink 
            to="/contacts" 
            class="inline-flex items-center px-12 py-6 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            {{ $t('home.cta.getInTouch') }}
            <ArrowRightIcon class="ml-3 h-6 w-6" />
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="inline-flex items-center px-12 py-6 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 border border-blue-500/50 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            {{ $t('home.cta.learnMore') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isVideoModalOpen" 
          class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
          @click="closeVideoModal"
        >
          <div 
            class="glass-dark rounded-[3rem] p-10 max-w-5xl w-full shadow-2xl border border-white/10"
            @click.stop
          >
            <div class="flex justify-between items-center mb-10">
              <h3 class="text-3xl font-black text-white tracking-tight">{{ $t('home.video.title') }}</h3>
              <button 
                @click="closeVideoModal"
                class="w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-2xl hover:bg-red-500 transition-all duration-300"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden flex items-center justify-center relative border border-white/5 shadow-inner">
              <div class="text-center group cursor-pointer">
                <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-500">
                  <PlayIcon class="h-10 w-10 text-white fill-current" />
                </div>
                <p class="text-2xl font-black text-white mb-3">{{ $t('home.video.description') }}</p>
                <p class="text-slate-400 font-bold uppercase tracking-widest text-sm">{{ $t('home.video.comingSoon') }}</p>
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}
</style>
