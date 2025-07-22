<script setup>
import { ref, computed } from 'vue'
import TeamMemberCard from '@/components/TeamMemberCard.vue'
import { getTeamMembersByLanguage } from '@/data/teamData.js'
import { historyMilestones, achievements, researchAreas, getLocalizedData } from '@/data/aboutData.js'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const selectedMember = ref(null)

// Локализованные данные с использованием импортированных данных
const localizedHistoryMilestones = computed(() => getLocalizedData(historyMilestones, locale.value))
const localizedAchievements = computed(() => getLocalizedData(achievements, locale.value))
const localizedResearchAreas = computed(() => getLocalizedData(researchAreas, locale.value))

// Команда НИЦ - используем данные из отдельного файла
const teamMembers = computed(() => getTeamMembersByLanguage(locale.value))

const openMemberModal = (member) => {
  selectedMember.value = member
}

const closeMemberModal = () => {
  selectedMember.value = null
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
  </div>
</template>
