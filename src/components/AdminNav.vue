<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navItems = [
  {
    name: 'Главная',
    path: '/',
    icon: HomeIcon,
    description: 'Вернуться на сайт'
  },
  {
    name: 'Галерея',
    path: '/admin/gallery',
    icon: PhotoIcon,
    description: 'Управление галереей'
  },
  {
    name: 'Проекты',
    path: '/admin/projects',
    icon: RectangleStackIcon,
    description: 'Управление проектами'
  },
  {
    name: 'Партнеры',
    path: '/admin/partners',
    icon: UserGroupIcon,
    description: 'Управление партнерами'
  },
  {
    name: 'Команда',
    path: '/admin/team',
    icon: UserGroupIcon,
    description: 'Управление командой'
  },
  {
    name: 'Настройки',
    path: '/admin/settings',
    icon: Cog6ToothIcon,
    description: 'Настройки проекта (DEV)'
  }
]

const isActive = (path) => {
  return route.path === path
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-white text-xl font-bold">
              🎛️ Админ-панель
            </h1>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                isActive(item.path)
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
              ]"
              :title="item.description"
            >
              <component :is="item.icon" class="h-5 w-5" />
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-blue-700">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isMobileMenuOpen = false"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
              isActive(item.path)
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-white hover:bg-white/20'
            ]"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="h-5 w-5" />
              <div>
                <div>{{ item.name }}</div>
                <div class="text-xs opacity-75">{{ item.description }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
