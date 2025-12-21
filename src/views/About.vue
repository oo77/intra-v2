<script setup>
import { ref, computed, onMounted } from 'vue'
import TeamMemberCard from '@/components/TeamMemberCard.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import { historyMilestones, achievements, researchAreas, getLocalizedData } from '@/data/aboutData.js'
import { useI18n } from 'vue-i18n'
import { useGalleryStore } from '@/stores/gallery'
import { useTeamStore } from '@/stores/team'

const { t, locale } = useI18n()
const selectedMember = ref(null)
const galleryStore = useGalleryStore()
const teamStore = useTeamStore()

// Загрузка данных из базы данных через API
onMounted(async () => {
  try {
    await Promise.all([
      galleryStore.fetchGallery(),
      teamStore.fetchMembers()
    ])
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
})

// Получаем данные из stores
const galleryData = computed(() => galleryStore.gallery)

// Локализованные данные
const localizedHistoryMilestones = computed(() => getLocalizedData(historyMilestones, locale.value))
const localizedAchievements = computed(() => getLocalizedData(achievements, locale.value))
const localizedResearchAreas = computed(() => getLocalizedData(researchAreas, locale.value))

// Команда НИЦ - получаем из базы данных
const teamMembers = computed(() => {
  const members = teamStore.membersList
  // Преобразуем данные для отображения с учетом языка
  return members.map(member => ({
    id: member.id,
    image: member.image,
    email: member.email,
    phone: member.phone,
    name: member[locale.value]?.name || member.ru?.name,
    role: member[locale.value]?.role || member.ru?.role,
    bio: member[locale.value]?.bio || member.ru?.bio,
    biography: member[locale.value]?.biography || member.ru?.biography,
    expertise: member[locale.value]?.expertise || member.ru?.expertise || [],
    education: member[locale.value]?.education || member.ru?.education || [],
    experience: member[locale.value]?.experience || member.ru?.experience || [],
    publications: member[locale.value]?.publications || member.ru?.publications || [],
    achievements: member[locale.value]?.achievements || member.ru?.achievements || []
  }))
})

// Функции для модального окна
const openMemberModal = (member) => {
  selectedMember.value = member
}

const closeMemberModal = () => {
  selectedMember.value = null
}

// Lightbox для галереи
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

// Все изображения галереи для навигации
const allGalleryImages = computed(() => {
  const row1 = galleryData.value.row1 || []
  const row2 = galleryData.value.row2 || []
  return [...row1, ...row2]
})

const openLightbox = (image, row) => {
  const row1 = galleryData.value.row1 || []
  const row2 = galleryData.value.row2 || []
  let index = 0
  
  if (row === 1) {
    index = row1.findIndex(img => img.id === image.id)
  } else {
    index = row1.length + row2.findIndex(img => img.id === image.id)
  }
  
  lightboxIndex.value = index >= 0 ? index : 0
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ $t('about.title') }}</h1>
          <p class="text-xl max-w-3xl mx-auto">
            {{ $t('about.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Миссия и цели -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('about.mission.title') }}</h2>
            <p class="text-lg text-gray-600 mb-6">
              {{ $t('about.mission.description') }}
            </p>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('about.mission.goalsTitle') }}</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">{{ $t('about.mission.goal1') }}</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">{{ $t('about.mission.goal2') }}</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">{{ $t('about.mission.goal3') }}</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">{{ $t('about.mission.goal4') }}</span>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <img 
              src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Исследовательская лаборатория" 
              class="rounded-lg shadow-lg w-full h-96 object-cover"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- История НИЦ -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('about.history.title') }}</h2>
          <p class="text-xl text-gray-600">{{ $t('about.history.subtitle') }}</p>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div class="space-y-12">
            <div 
              v-for="(milestone, index) in localizedHistoryMilestones" 
              :key="milestone.year"
              :class="[
                'flex items-center',
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              ]"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div :class="[
                'w-5/12',
                index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
              ]">
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
                  <div class="text-2xl font-bold text-primary-600 mb-2">{{ milestone.year }}</div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ milestone.title }}</h3>
                  <p class="text-gray-600">{{ milestone.description }}</p>
                </div>
              </div>
              
              <!-- Timeline dot -->
              <div class="w-2/12 flex justify-center">
                <div class="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
              
              <div class="w-5/12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Направления деятельности -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('about.researchAreas.title') }}</h2>
          <p class="text-xl text-gray-600">{{ $t('about.researchAreas.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(area, index) in localizedResearchAreas" 
            :key="area.title"
            class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover border border-gray-100"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div :class="[
              'inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-r',
              area.color
            ]">
              <component :is="area.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ area.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ area.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Достижения -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('about.achievements.title') }}</h2>
          <p class="text-xl text-gray-600">{{ $t('about.achievements.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(achievement, index) in localizedAchievements" 
            :key="achievement.title"
            class="bg-white rounded-lg p-6 shadow-lg text-center card-hover border border-gray-100"
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

    <!-- Галерея -->
    <section class="py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="text-center" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-white mb-4">{{ $t('about.gallery.title') }}</h2>
          <p class="text-xl text-gray-300">{{ $t('about.gallery.subtitle') }}</p>
        </div>
      </div>

      <!-- Первая лента (движется вправо) -->
      <div class="relative mb-8">
        <div class="flex animate-scroll-right space-x-6">
          <div class="flex space-x-6 min-w-max">
            <div 
              v-for="image in galleryData.row1" 
              :key="image.id"
              class="w-80 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group relative"
              @click="openLightbox(image, 1)"
            >
              <img 
                :src="image.url" 
                :alt="image.alt[locale] || image.alt.ru" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Дублируем для бесшовной анимации -->
          <div class="flex space-x-6 min-w-max">
            <div 
              v-for="image in galleryData.row1" 
              :key="`dup-${image.id}`"
              class="w-80 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group relative"
              @click="openLightbox(image, 1)"
            >
              <img 
                :src="image.url" 
                :alt="image.alt[locale] || image.alt.ru" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Вторая лента (движется влево) -->
      <div class="relative">
        <div class="flex animate-scroll-left space-x-6">
          <div class="flex space-x-6 min-w-max">
            <div 
              v-for="image in galleryData.row2" 
              :key="image.id"
              class="w-80 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group relative"
              @click="openLightbox(image, 2)"
            >
              <img 
                :src="image.url" 
                :alt="image.alt[locale] || image.alt.ru" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Дублируем для бесшовной анимации -->
          <div class="flex space-x-6 min-w-max">
            <div 
              v-for="image in galleryData.row2" 
              :key="`dup-${image.id}`"
              class="w-80 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group relative"
              @click="openLightbox(image, 2)"
            >
              <img 
                :src="image.url" 
                :alt="image.alt[locale] || image.alt.ru" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Команда -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('about.team.title') }}</h2>
          <p class="text-xl text-gray-600">{{ $t('about.team.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="member.id"
            class="flex"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <TeamMemberCard 
              :member="member" 
              :is-modal-open="selectedMember?.id === member.id"
              @open-modal="openMemberModal"
              @close-modal="closeMemberModal"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- Lightbox для галереи -->
    <ImageLightbox 
      :images="allGalleryImages"
      :current-index="lightboxIndex"
      :is-open="lightboxOpen"
      :locale="locale"
      @close="closeLightbox"
      @change="(idx) => lightboxIndex = idx"
    />
  </div>
</template>

