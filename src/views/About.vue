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
      galleryStore.fetchItems(),
      teamStore.fetchMembers()
    ])
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }

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

// Получаем данные из геттеров
const row1Images = computed(() => galleryStore.row1Images)
const row2Images = computed(() => galleryStore.row2Images)

// Локализованные данные
const localizedHistoryMilestones = computed(() => getLocalizedData(historyMilestones, locale.value))
const localizedAchievements = computed(() => getLocalizedData(achievements, locale.value))
const localizedResearchAreas = computed(() => getLocalizedData(researchAreas, locale.value))

// Все члены команды
const allMembers = computed(() => {
  const members = teamStore.membersList
  return members.map(member => ({
    id: member.id,
    image: member.image,
    email: member.email,
    phone: member.phone,
    type: member.type || 'researchers',
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

// Группировка по категориям
const leadershipMembers = computed(() => allMembers.value.filter(m => m.type === 'leadership'))
const researchersMembers = computed(() => allMembers.value.filter(m => m.type === 'researchers'))
const groupMembers = computed(() => allMembers.value.filter(m => m.type === 'groupMembers'))

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
const allGalleryImages = computed(() => galleryStore.allImages)

const openLightbox = (image, row) => {
  let index = 0
  
  if (row === 1) {
    index = row1Images.value.findIndex(img => img.id === image.id)
  } else {
    index = row1Images.value.length + row2Images.value.findIndex(img => img.id === image.id)
  }
  
  lightboxIndex.value = index >= 0 ? index : 0
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden page-hero" style="background-image: url('https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- Deep overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/70 to-indigo-950/80"></div>
      <!-- Animated orbs -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-[15%] left-[5%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-[10%] right-[5%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 3s;"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style="padding-top: calc(5rem + 80px); padding-bottom: 6rem;">
        <div class="text-center reveal-on-scroll">
          <div class="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-sm font-bold uppercase tracking-widest mb-8 shadow-xl">
            <span class="relative flex h-2 w-2 mr-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
            {{ $t('about.badge') || 'Research Institute' }}
          </div>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">{{ $t('about.title') }}</h1>
          <p class="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto font-medium leading-relaxed">
            {{ $t('about.subtitle') }}
          </p>
          <!-- Scroll indicator -->
          <div class="mt-16 flex flex-col items-center gap-2 text-white/40">
            <span class="text-xs font-bold uppercase tracking-widest">Scroll</span>
            <div class="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Миссия и цели -->
    <section class="py-32 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="reveal-on-scroll">
            <h2 class="text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{{ $t('about.mission.title') }}</h2>
            <p class="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              {{ $t('about.mission.description') }}
            </p>
            <h3 class="text-2xl font-bold text-slate-800 mb-6">{{ $t('about.mission.goalsTitle') }}</h3>
            <div class="space-y-6">
              <div v-for="i in 4" :key="i" class="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-colors">
                  <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-white"></div>
                </div>
                <span class="text-slate-700 font-bold">{{ $t(`about.mission.goal${i}`) }}</span>
              </div>
            </div>
          </div>
          <div class="relative reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="p-4 glass rounded-[3rem] shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Lab" 
                class="rounded-[2.5rem] w-full h-[32rem] object-cover shadow-inner"
                loading="lazy"
              >
            </div>
            <!-- Decorative elements -->
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- История НИИ -->
    <section class="py-32 bg-slate-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-24 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ $t('about.history.title') }}</h2>
          <p class="text-xl text-slate-500 font-medium">{{ $t('about.history.subtitle') }}</p>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/20 via-blue-500 to-purple-500/20"></div>
          
          <div class="space-y-24">
            <div 
              v-for="(milestone, index) in localizedHistoryMilestones" 
              :key="milestone.year"
              :class="[
                'flex items-center relative z-10',
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              ]"
              class="reveal-on-scroll"
            >
              <div :class="[
                'w-5/12',
                index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'
              ]">
                <div class="glass p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <div class="text-3xl font-black text-blue-600 mb-3 tracking-tighter">{{ milestone.year }}</div>
                  <h3 class="text-xl font-black text-slate-800 mb-4">{{ milestone.title }}</h3>
                  <p class="text-slate-500 font-medium leading-relaxed">{{ milestone.description }}</p>
                </div>
              </div>
              
              <!-- Timeline dot -->
              <div class="w-2/12 flex justify-center">
                <div class="w-8 h-8 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20"></div>
              </div>
              
              <div class="w-5/12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Направления деятельности -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ $t('about.researchAreas.title') }}</h2>
          <p class="text-xl text-slate-500 font-medium">{{ $t('about.researchAreas.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div 
            v-for="(area, index) in localizedResearchAreas" 
            :key="area.title"
            class="group reveal-on-scroll h-full"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
              <div :class="[
                'w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br shadow-lg transform group-hover:rotate-12 transition-transform duration-500',
                area.color
              ]">
                <component :is="area.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-5 tracking-tight">{{ area.title }}</h3>
              <p class="text-slate-500 font-medium leading-relaxed text-lg">{{ area.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Достижения -->
    <section class="py-32 bg-slate-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-mesh opacity-20"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-24 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{{ $t('about.achievements.title') }}</h2>
          <p class="text-xl text-slate-400 font-medium">{{ $t('about.achievements.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(achievement, index) in localizedAchievements" 
            :key="achievement.title"
            class="reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="glass-dark p-8 rounded-[2rem] text-center border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full group">
              <div :class="[
                'w-16 h-16 rounded-2xl bg-gradient-to-br mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500',
                achievement.color
              ]">
                <component :is="achievement.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-black text-white mb-3 tracking-tight">{{ achievement.title }}</h3>
              <p class="text-slate-400 font-medium leading-relaxed">{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Галерея -->
    <section class="py-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div class="text-center reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ $t('about.gallery.title') }}</h2>
          <p class="text-xl text-slate-500 font-medium">{{ $t('about.gallery.subtitle') }}</p>
        </div>
      </div>

      <!-- Ленты галереи -->
      <div class="space-y-12">
        <div class="relative">
          <div class="flex animate-scroll-right space-x-8">
            <div class="flex space-x-8 min-w-max">
              <div 
                v-for="image in row1Images" 
                :key="image.id"
                class="w-[30rem] h-72 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group relative"
                @click="openLightbox(image, 1)"
              >
                <img :src="image.url" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
                <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-500 flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-sm">
                  <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- Duplicate for loop -->
            <div class="flex space-x-8 min-w-max">
              <div v-for="image in row1Images" :key="`dup-${image.id}`" class="w-[30rem] h-72 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group relative" @click="openLightbox(image, 1)">
                <img :src="image.url" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
              </div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="flex animate-scroll-left space-x-8">
            <div class="flex space-x-8 min-w-max">
              <div 
                v-for="image in row2Images" 
                :key="image.id"
                class="w-[30rem] h-72 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group relative"
                @click="openLightbox(image, 2)"
              >
                <img :src="image.url" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
                <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-500 flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-sm">
                  <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex space-x-8 min-w-max">
              <div v-for="image in row2Images" :key="`dup-${image.id}`" class="w-[30rem] h-72 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group relative" @click="openLightbox(image, 2)">
                <img :src="image.url" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Команда -->
    <section class="py-32 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-24 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ $t('about.team.title') }}</h2>
          <p class="text-xl text-slate-500 font-medium">{{ $t('about.team.subtitle') }}</p>
        </div>

        <!-- Секции команды -->
        <div v-for="type in ['leadership', 'researchers', 'groupMembers']" :key="type">
          <div v-if="allMembers.filter(m => m.type === type).length > 0" class="mb-32 last:mb-0">
            <h3 class="text-3xl font-black text-slate-800 mb-12 flex items-center gap-6 reveal-on-scroll">
              {{ $t(`about.team.${type}`) }}
              <div class="h-px bg-slate-200 flex-grow"></div>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div 
                v-for="(member, index) in allMembers.filter(m => m.type === type)" 
                :key="member.id"
                class="reveal-on-scroll flex"
                :style="{ transitionDelay: `${index * 100}ms` }"
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
        </div>
      </div>
    </section>

    <!-- Lightbox -->
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

