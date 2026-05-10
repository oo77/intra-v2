<script setup>
import { useI18n } from 'vue-i18n'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()
const $t = t
</script>

<template>
  <footer class="relative bg-slate-950 text-white pt-20 overflow-hidden">
    <!-- Parallax Background Effect -->
    <div class="absolute inset-0 z-0 opacity-20 parallax-bg" style="background-image: url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920');"></div>
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-blue-950/80"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
        <!-- Brand Section -->
        <div class="lg:col-span-5 space-y-8">
          <div class="flex items-center space-x-3 group">
            <img 
              src="/src/assets/logo_full.png" 
              alt="Logo" 
              class="h-12 w-auto filter brightness-0 invert transition-transform duration-500 group-hover:scale-110"
            >
          </div>
          <p class="text-slate-400 text-lg leading-relaxed max-w-md">
            {{ $t('footer.description') }}
          </p>
          <div class="flex space-x-5">
            <a v-for="i in 3" :key="i" href="#" class="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 group">
              <span v-if="i === 1" class="text-xl">𝕏</span>
              <span v-if="i === 2" class="text-xl">in</span>
              <span v-if="i === 3" class="text-xl">fb</span>
            </a>
          </div>
        </div>

        <!-- Links Sections -->
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <!-- Quick Links -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-white relative inline-block">
              {{ $t('footer.quickLinks') }}
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <ul class="space-y-4">
              <li>
                <router-link to="/about" class="text-slate-400 hover:text-white flex items-center group transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></span>
                  {{ $t('nav.about') }}
                </router-link>
              </li>
              <li>
                <router-link to="/projects" class="text-slate-400 hover:text-white flex items-center group transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></span>
                  {{ $t('nav.projects') }}
                </router-link>
              </li>
              <li>
                <router-link to="/contacts" class="text-slate-400 hover:text-white flex items-center group transition-colors">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></span>
                  {{ $t('nav.contacts') }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact Section -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-white relative inline-block">
              {{ $t('footer.contactInfo') }}
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-cyan-500 rounded-full"></span>
            </h3>
            <div class="glass-dark p-6 rounded-2xl space-y-4 border border-white/5 shadow-2xl">
              <div class="flex items-start space-x-4 group">
                <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                  <MapPinIcon class="h-5 w-5 text-blue-400 group-hover:text-white" />
                </div>
                <span class="text-slate-300 text-sm leading-relaxed">{{ $t('footer.address') }}</span>
              </div>
              <div class="flex items-center space-x-4 group">
                <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors">
                  <PhoneIcon class="h-5 w-5 text-cyan-400 group-hover:text-white" />
                </div>
                <span class="text-slate-300 text-sm group-hover:text-white transition-colors">{{ $t('footer.phone') }}</span>
              </div>
              <div class="flex items-center space-x-4 group">
                <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 transition-colors">
                  <EnvelopeIcon class="h-5 w-5 text-indigo-400 group-hover:text-white" />
                </div>
                <span class="text-slate-300 text-sm group-hover:text-white transition-colors">ilesaliev@mail.ru</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/5 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-slate-500 text-sm font-medium">
          {{ $t('footer.copyright') }}
        </p>
        <div class="flex items-center gap-8">
          <router-link to="/admin/projects" class="text-slate-500 hover:text-white text-xs flex items-center gap-2 group">
            <span class="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></span>
            Админ-панель
          </router-link>
          <div class="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest">
            <GlobeAltIcon class="h-4 w-4" />
            <span>Transport Innovation</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 1024px) {
  .parallax-bg {
    background-attachment: scroll;
  }
}
</style>