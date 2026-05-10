<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Bars3Icon, XMarkIcon, LanguageIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { t, locale } = useI18n()
const $t = t
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isLanguageMenuOpen = ref(false)

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.about', href: '/about' },
  { name: 'nav.projects', href: '/projects' },
  { name: 'nav.contacts', href: '/contacts' },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
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
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-[100] transition-all duration-700',
    isScrolled ? 'py-4' : 'py-8'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="[
        'relative px-6 py-3 rounded-full transition-all duration-700 border flex justify-between items-center',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-white/20' 
          : 'bg-transparent border-transparent'
      ]">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center group">
            <div class="transform group-hover:scale-110 transition-all duration-500">
              <img 
                src="/src/assets/logo_full.png" 
                alt="Logo" 
                :class="['h-10 w-auto transition-all duration-500', isScrolled ? 'brightness-100' : 'brightness-0 invert']"
              >
            </div>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'relative px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-500 overflow-hidden group',
              route.path === item.href
                ? (isScrolled ? 'text-blue-600' : 'text-white')
                : (isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white')
            ]"
            @click="closeMenu"
          >
            <span class="relative z-10">{{ $t(item.name) }}</span>
            <div 
              :class="[
                'absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-8',
                route.path === item.href ? 'w-8' : ''
              ]"
            ></div>
          </RouterLink>

          <!-- Language Selector -->
          <div class="relative ml-4">
            <button
              @click="toggleLanguageMenu"
              :class="[
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-500 border',
                isScrolled
                  ? 'text-slate-700 bg-slate-50 border-slate-100 hover:bg-slate-100'
                  : 'text-white bg-white/10 border-white/20 hover:bg-white/20'
              ]"
            >
              <span>{{ getCurrentLanguage().flag }}</span>
              <span>{{ getCurrentLanguage().code }}</span>
              <ChevronDownIcon :class="['w-4 h-4 transition-transform duration-500', isLanguageMenuOpen ? 'rotate-180' : '']" />
            </button>

            <!-- Language Dropdown -->
            <Transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="transform scale-95 opacity-0 -translate-y-4"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 -translate-y-4"
            >
              <div v-if="isLanguageMenuOpen" class="absolute right-0 mt-4 w-56 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden p-2">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  :class="[
                    'w-full flex items-center gap-4 px-6 py-4 text-sm font-black rounded-2xl transition-all duration-300',
                    locale === lang.code 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  ]"
                >
                  <span class="text-xl">{{ lang.flag }}</span>
                  <span class="uppercase tracking-widest">{{ lang.name }}</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center gap-4">
          <button
            @click="toggleMenu"
            :class="[
              'w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 border',
              isScrolled 
                ? 'text-slate-900 border-slate-100 bg-slate-50' 
                : 'text-white border-white/20 bg-white/10'
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
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-10"
    >
      <div v-if="isMenuOpen" class="md:hidden mt-4 mx-4">
        <div class="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/20 p-8 space-y-4">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'block px-8 py-5 rounded-[2rem] text-lg font-black uppercase tracking-widest transition-all duration-300',
              route.path === item.href
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                : 'text-slate-600 hover:bg-slate-50'
            ]"
            @click="closeMenu"
          >
            {{ $t(item.name) }}
          </RouterLink>

          <div class="pt-8 border-t border-slate-100 grid grid-cols-3 gap-4">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'flex flex-col items-center gap-2 py-4 rounded-2xl transition-all duration-300',
                locale === lang.code 
                  ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-600' 
                  : 'bg-slate-50 text-slate-400'
              ]"
            >
              <span class="text-2xl">{{ lang.flag }}</span>
              <span class="text-[10px] font-black uppercase tracking-widest">{{ lang.code }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>