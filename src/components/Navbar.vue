<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { t, locale } = useI18n()
const isMenuOpen = ref(false)
const isScrolled = ref(true)
const isLanguageMenuOpen = ref(false)

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.about', href: '/about' },
  { name: 'nav.projects', href: '/projects' },
  { name: 'nav.partners', href: '/partners' },
  { name: 'nav.contacts', href: '/contacts' },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' }
]

const handleScroll = () => {
  isScrolled.value = ture
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const changeLanguage = (langCode) => {
  locale.value = langCode
  isLanguageMenuOpen.value = false
}

const getCurrentLanguage = () => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
}

onMounted(() => {
  isScrolled.value=true
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="transform group-hover:scale-110 transition-all duration-300">
              <img 
                src="/src/assets/logo_full.png" 
                alt="INNOVATIVE TRANSPORT Logo" 
                class="h-10 w-auto"
              >
            </div>
   
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
              route.path === item.href
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : isScrolled
                ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:shadow-lg'
                : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg'
            ]"
            @click="closeMenu"
          >
            <span class="relative z-10">{{ $t(item.name) }}</span>
            <div v-if="route.path === item.href" class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-20"></div>
          </RouterLink>

          <!-- Language Selector -->
          <div class="relative ml-4">
            <button
              @click="toggleLanguageMenu"
              :class="[
                'flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
                isScrolled
                  ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 hover:shadow-lg'
                  : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-500 hover:shadow-lg'
              ]"
            >
              <LanguageIcon class="h-4 w-4" />
              <span>{{ getCurrentLanguage().flag }}</span>
              <span class="hidden sm:inline">{{ getCurrentLanguage().name }}</span>
            </button>

            <!-- Language Dropdown -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="isLanguageMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  :class="[
                    'w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-700 transition-all duration-200',
                    locale === lang.code ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 font-medium' : ''
                  ]"
                >
                  <span class="text-lg">{{ lang.flag }}</span>
                  <span>{{ lang.name }}</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Language Selector -->
          <button
            @click="toggleLanguageMenu"
            :class="[
              'p-2 rounded-full transition-all duration-300',
              isScrolled ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' : 'text-white hover:text-purple-200 hover:bg-white/10'
            ]"
          >
            <span class="text-lg">{{ getCurrentLanguage().flag }}</span>
          </button>

          <button
            @click="toggleMenu"
            :class="[
              'inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 transform hover:scale-110',
              isScrolled ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500' : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500'
            ]"
          >
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white/95 backdrop-blur-sm shadow-xl border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105',
              route.path === item.href
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:shadow-lg'
            ]"
            @click="closeMenu"
          >
            {{ $t(item.name) }}
          </RouterLink>
        </div>

        <!-- Mobile Language Menu -->
        <div class="border-t border-gray-200 px-2 py-3">
          <div class="space-y-1">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-200',
                locale === lang.code 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 hover:text-teal-700'
              ]"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile Language Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isLanguageMenuOpen && !isMenuOpen" class="md:hidden absolute right-4 top-16 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="[
            'w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-700 transition-all duration-200',
            locale === lang.code ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 font-medium' : ''
          ]"
        >
          <span class="text-lg">{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </Transition>
  </nav>
</template>