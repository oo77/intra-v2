<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ChevronDownIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const $t = t
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  organization: '',
  phone: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

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

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    const botToken = '8335328034:AAFwylv6zS5Gzf9ImqUiVsRwFBgE3aaYQk8'
    const chatId = -1003503179531 
    
    const message = `
🔔 *Новое сообщение с сайта*

👤 *Имя:* ${form.value.name}
📧 *Email:* ${form.value.email}
${form.value.organization ? `🏢 *Организация:* ${form.value.organization}` : ''}
${form.value.phone ? `📱 *Телефон:* ${form.value.phone}` : ''}
📝 *Тема:* ${form.value.subject}

💬 *Сообщение:*
${form.value.message}

⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}
    `.trim()
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })
    
    const data = await response.json()
    if (!data.ok) throw new Error(data.description || 'Ошибка')
    
    isSubmitting.value = false
    isSubmitted.value = true
    
    setTimeout(() => {
      isSubmitted.value = false
      form.value = { name: '', email: '', subject: '', message: '', organization: '', phone: '' }
    }, 3000)
  } catch (error) {
    console.error(error)
    isSubmitting.value = false
    alert('Ошибка отправки')
  }
}

const contactInfo = computed(() => [
  {
    icon: MapPinIcon,
    title: $t('contacts.info.address.title'),
    content: $t('contacts.info.address.content'),
    link: 'https://maps.google.com',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: PhoneIcon,
    title: $t('contacts.info.phone.title'),
    content: $t('contacts.info.phone.content'),
    link: 'tel:+998998064199',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: EnvelopeIcon,
    title: $t('contacts.info.email.title'),
    content: $t('contacts.info.email.content'),
    link: 'mailto:ilesaliev@mail.ru',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: ClockIcon,
    title: $t('contacts.info.hours.title'),
    content: $t('contacts.info.hours.content'),
    link: null,
    color: 'from-emerald-500 to-teal-500'
  }
])

const faqs = computed(() => [
  { question: $t('contacts.faq.q1.question'), answer: $t('contacts.faq.q1.answer') },
  { question: $t('contacts.faq.q2.question'), answer: $t('contacts.faq.q2.answer') },
  { question: $t('contacts.faq.q3.question'), answer: $t('contacts.faq.q3.answer') },
  { question: $t('contacts.faq.q4.question'), answer: $t('contacts.faq.q4.answer') }
])

const openFaq = ref(null)
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden page-hero" style="background-image: url('https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920'); background-size: cover; background-position: center 30%; background-attachment: fixed;">
      <!-- Deep overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-emerald-950/70 to-indigo-950/85"></div>
      <!-- Animated orbs -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-[20%] left-[10%] w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-[10%] right-[8%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2.5s;"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style="padding-top: calc(5rem + 80px); padding-bottom: 6rem;">
        <div class="text-center reveal-on-scroll">
          <div class="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-sm font-bold uppercase tracking-widest mb-8 shadow-xl">
            <span class="relative flex h-2 w-2 mr-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            {{ $t('contacts.badge') || 'Get In Touch' }}
          </div>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">{{ $t('contacts.title') }}</h1>
          <p class="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto font-medium leading-relaxed">
            {{ $t('contacts.subtitle') }}
          </p>
          <!-- Scroll indicator -->
          <div class="mt-16 flex flex-col items-center gap-2 text-white/40">
            <span class="text-xs font-bold uppercase tracking-widest">Scroll</span>
            <div class="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(info, index) in contactInfo"
            :key="info.title"
            class="group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="h-full bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-3 text-center">
              <div :class="[
                'w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br shadow-lg transform group-hover:rotate-12 transition-transform duration-500 mx-auto',
                info.color
              ]">
                <component :is="info.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-4 tracking-tight">{{ info.title }}</h3>
              <p class="text-slate-500 font-medium mb-6 leading-relaxed">{{ info.content }}</p>
              <a
                v-if="info.link"
                :href="info.link"
                target="_blank"
                class="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                {{ info.title === $t('contacts.info.address.title') ? $t('contacts.info.address.viewOnMap') : $t('contacts.info.phone.contact') }}
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Map -->
    <section class="py-32 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <!-- Contact Form -->
          <div class="reveal-on-scroll">
            <h2 class="text-4xl font-black text-slate-900 mb-10 tracking-tight">{{ $t('contacts.form.title') }}</h2>
            <form @submit.prevent="submitForm" class="space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.name') }}</label>
                  <input v-model="form.name" type="text" required class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300" :placeholder="$t('contacts.form.namePlaceholder')">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.email') }}</label>
                  <input v-model="form.email" type="email" required class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300" :placeholder="$t('contacts.form.emailPlaceholder')">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.organization') }}</label>
                  <input v-model="form.organization" type="text" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300" :placeholder="$t('contacts.form.organizationPlaceholder')">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.phone') }}</label>
                  <input v-model="form.phone" type="tel" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300" :placeholder="$t('contacts.form.phonePlaceholder')">
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.subject') }}</label>
                <input v-model="form.subject" type="text" required class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300" :placeholder="$t('contacts.form.subjectPlaceholder')">
              </div>

              <div class="space-y-2">
                <label class="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">{{ $t('contacts.form.message') }}</label>
                <textarea v-model="form.message" rows="5" required class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold placeholder:text-slate-300 resize-none" :placeholder="$t('contacts.form.messagePlaceholder')"></textarea>
              </div>

              <button type="submit" :disabled="isSubmitting" class="w-full py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-4 group">
                <span v-if="!isSubmitting && !isSubmitted">{{ $t('contacts.form.submit') }}</span>
                <span v-else-if="isSubmitting" class="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white"></span>
                <span v-else class="flex items-center gap-2">
                  {{ $t('contacts.form.sent') }}
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </span>
                <PaperAirplaneIcon v-if="!isSubmitting && !isSubmitted" class="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          <!-- University Location -->
          <div class="reveal-on-scroll" style="transition-delay: 200ms;">
            <h2 class="text-4xl font-black text-slate-900 mb-10 tracking-tight">{{ $t('contacts.location.title') }}</h2>
            <div class="bg-white p-4 rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3023.9093309719788!2d69.27794848097004!3d41.276172274774744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2s!4v1766335072409!5m2!1sru!2s"
                width="100%"
                height="500"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                class="w-full rounded-[2.5rem]"
              ></iframe>
              <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)]">
                <div class="glass p-8 rounded-3xl shadow-2xl border border-white/20">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <MapPinIcon class="w-6 h-6 text-white" />
                    </div>
                    <span class="font-black text-slate-800">{{ $t('contacts.map.universityName') }}</span>
                  </div>
                  <a href="https://maps.google.com" target="_blank" class="text-blue-600 font-bold hover:underline ml-14">
                    {{ $t('contacts.map.openInGoogleMaps') }} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-32 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ $t('contacts.faq.title') }}</h2>
          <p class="text-xl text-slate-500 font-medium">{{ $t('contacts.faq.subtitle') }}</p>
        </div>

        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div :class="['rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden', openFaq === index ? 'bg-slate-50 border-blue-500 shadow-2xl shadow-blue-500/5' : 'bg-white border-slate-100 hover:border-slate-200']">
              <button @click="toggleFaq(index)" class="w-full px-10 py-8 text-left flex items-center justify-between">
                <span :class="['text-xl font-black transition-colors', openFaq === index ? 'text-blue-600' : 'text-slate-800']">{{ faq.question }}</span>
                <ChevronDownIcon :class="['w-8 h-8 transition-transform duration-500', openFaq === index ? 'rotate-180 text-blue-600' : 'text-slate-300']" />
              </button>
              <div v-show="openFaq === index" class="px-10 pb-8">
                <p class="text-slate-500 font-medium text-lg leading-relaxed">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
