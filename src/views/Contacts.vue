<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
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

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Telegram Bot API credentials
    const botToken = '8335328034:AAFwylv6zS5Gzf9ImqUiVsRwFBgE3aaYQk8'
    const chatId = -1003503179531 // ID группы/канала Telegram
    
    // Формируем сообщение
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
    
    // Отправляем сообщение в Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })
    
    const data = await response.json()
    
    if (!data.ok) {
      throw new Error(data.description || 'Ошибка отправки сообщения')
    }
    
    isSubmitting.value = false
    isSubmitted.value = true
    
    // Reset form after 3 seconds
    setTimeout(() => {
      isSubmitted.value = false
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
        organization: '',
        phone: ''
      }
    }, 3000)
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error)
    isSubmitting.value = false
    alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.')
  }
}

const contactInfo = computed(() => [
  {
    icon: MapPinIcon,
    title: $t('contacts.info.address.title'),
    content: $t('contacts.info.address.content'),
    link: 'https://maps.google.com'
  },
  {
    icon: PhoneIcon,
    title: $t('contacts.info.phone.title'),
    content: $t('contacts.info.phone.content'),
    link: 'tel:+998998064199'
  },
  {
    icon: EnvelopeIcon,
    title: $t('contacts.info.email.title'),
    content: $t('contacts.info.email.content'),
    link: 'mailto:ilesaliev@mail.ru'
  },
  {
    icon: ClockIcon,
    title: $t('contacts.info.hours.title'),
    content: $t('contacts.info.hours.content'),
    link: null
  }
])



const faqs = computed(() => [
  {
    question: $t('contacts.faq.q1.question'),
    answer: $t('contacts.faq.q1.answer')
  },
  {
    question: $t('contacts.faq.q2.question'),
    answer: $t('contacts.faq.q2.answer')
  },
  {
    question: $t('contacts.faq.q3.question'),
    answer: $t('contacts.faq.q3.answer')
  },
  {
    question: $t('contacts.faq.q4.question'),
    answer: $t('contacts.faq.q4.answer')
  }
])

const openFaq = ref(null)

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ $t('contacts.title') }}</h1>
          <p class="text-xl max-w-3xl mx-auto">
            {{ $t('contacts.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(info, index) in contactInfo"
            :key="info.title"
            class="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg card-hover group"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <component :is="info.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ info.title }}</h3>
            <p class="text-gray-600 mb-4">{{ info.content }}</p>
            <a
              v-if="info.link"
              :href="info.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ info.title === $t('contacts.info.address.title') ? $t('contacts.info.address.viewOnMap') : $t('contacts.info.phone.contact') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Map -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">{{ $t('contacts.form.title') }}</h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('contacts.form.name') }} {{ $t('contacts.form.required') }}
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    :placeholder="$t('contacts.form.namePlaceholder')"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('contacts.form.email') }} {{ $t('contacts.form.required') }}
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    :placeholder="$t('contacts.form.emailPlaceholder')"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="organization" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('contacts.form.organization') }}
                  </label>
                  <input
                    id="organization"
                    v-model="form.organization"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    :placeholder="$t('contacts.form.organizationPlaceholder')"
                  >
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('contacts.form.phone') }}
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    :placeholder="$t('contacts.form.phonePlaceholder')"
                  >
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('contacts.form.subject') }} {{ $t('contacts.form.required') }}
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  :placeholder="$t('contacts.form.subjectPlaceholder')"
                >
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('contacts.form.message') }} {{ $t('contacts.form.required') }}
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  :placeholder="$t('contacts.form.messagePlaceholder')"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                >
                  <span v-if="!isSubmitting && !isSubmitted">{{ $t('contacts.form.submit') }}</span>
                  <span v-else-if="isSubmitting" class="flex items-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {{ $t('contacts.form.sending') }}
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {{ $t('contacts.form.sent') }}
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- University Location -->
          <div data-aos="fade-left">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">{{ $t('contacts.location.title') }}</h2>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3023.9093309719788!2d69.27794848097004!3d41.276172274774744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2s!4v1766335072409!5m2!1sru!2s"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-96"
              ></iframe>
              <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div class="flex items-center text-gray-700">
                  <MapPinIcon class="h-5 w-5 mr-2 text-primary-600" />
                  <span class="font-medium">{{ $t('contacts.map.universityName') }}</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  {{ $t('contacts.map.openInGoogleMaps') }} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">{{ $t('contacts.faq.title') }}</h2>
          <p class="text-xl text-gray-600">
            {{ $t('contacts.faq.subtitle') }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 transition-transform duration-200 text-primary-600',
                  openFaq === index ? 'transform rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="openFaq === index" class="px-6 pb-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
