<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePartnersStore } from '@/stores/partners'

const { t } = useI18n()
const $t = t

const partnersStore = usePartnersStore()

const loading = computed(() => partnersStore.isLoading)
const error = computed(() => partnersStore.error)
const partners = computed(() => {
  return partnersStore.activePartners.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
})

onMounted(async () => {
  await partnersStore.fetchPartners()
  
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
  <section class="py-32 bg-slate-50 overflow-hidden relative">
    <div class="absolute inset-0 bg-mesh opacity-5"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-24 reveal-on-scroll">
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          {{ $t('home.partners.title') }}
        </h2>
        <p class="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          {{ $t('home.partners.subtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600/30 border-t-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-500 font-bold bg-red-50 p-6 rounded-3xl inline-block border border-red-100">
          {{ $t('home.partners.error') }}
        </div>
      </div>

      <!-- Partners Grid -->
      <div v-else-if="partners.length > 0" class="reveal-on-scroll">
        <div class="relative">
          <!-- Scrolling Container -->
          <div class="overflow-hidden">
            <div class="flex animate-scroll gap-12 py-10">
              <!-- First set of partners -->
              <div 
                v-for="partner in partners" 
                :key="`partner-${partner.id}-1`"
                class="flex-shrink-0 group"
              >
                <a 
                  :href="partner.website_url" 
                  target="_blank" 
                  class="block bg-white rounded-[2rem] p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 w-72 h-44 flex items-center justify-center border border-slate-100 group-hover:border-blue-200"
                >
                  <img 
                    :src="partner.logo_url" 
                    :alt="partner.name"
                    class="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    loading="lazy"
                  >
                </a>
              </div>
              
              <!-- Duplicate set for seamless scrolling -->
              <div 
                v-for="partner in partners" 
                :key="`partner-${partner.id}-2`"
                class="flex-shrink-0 group"
              >
                <a 
                  :href="partner.website_url" 
                  target="_blank" 
                  class="block bg-white rounded-[2rem] p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 w-72 h-44 flex items-center justify-center border border-slate-100 group-hover:border-blue-200"
                >
                  <img 
                    :src="partner.logo_url" 
                    :alt="partner.name"
                    class="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    loading="lazy"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <p class="text-slate-400 font-bold italic">{{ $t('home.partners.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 40s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
</style>
