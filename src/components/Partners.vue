<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const $t = t

const partners = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPartners = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/partners')
    if (!response.ok) {
      throw new Error('Failed to fetch partners')
    }
    const data = await response.json()
    // Фильтруем только активных партнеров и сортируем по display_order
    partners.value = data
      .filter(partner => partner.is_active)
      .sort((a, b) => a.display_order - b.display_order)
  } catch (err) {
    console.error('Error fetching partners:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPartners()
})
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {{ $t('home.partners.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ $t('home.partners.subtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">{{ $t('home.partners.error') }}</p>
      </div>

      <!-- Partners Grid -->
      <div v-else-if="partners.length > 0" class="relative">
        <!-- Scrolling Container -->
        <div class="overflow-hidden">
          <div class="flex animate-scroll gap-8 py-8">
            <!-- First set of partners -->
            <div 
              v-for="(partner, index) in partners" 
              :key="`partner-${partner.id}-1`"
              class="flex-shrink-0 group"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <a 
                :href="partner.website_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 w-64 h-40 flex items-center justify-center"
              >
                <img 
                  :src="partner.logo_url" 
                  :alt="partner.name"
                  class="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                >
              </a>
            </div>
            
            <!-- Duplicate set for seamless scrolling -->
            <div 
              v-for="(partner, index) in partners" 
              :key="`partner-${partner.id}-2`"
              class="flex-shrink-0 group"
            >
              <a 
                :href="partner.website_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 w-64 h-40 flex items-center justify-center"
              >
                <img 
                  :src="partner.logo_url" 
                  :alt="partner.name"
                  class="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                >
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-gray-600">{{ $t('home.partners.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
</style>
