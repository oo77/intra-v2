<script setup lang="ts">
import { ref } from 'vue'
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
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  
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
}

const contactInfo = ref([
  {
    icon: MapPinIcon,
    title: 'Наш адрес',
    content: 'Ташкентский государственный транспортный университет, Узбекистан',
    link: 'https://maps.google.com'
  },
  {
    icon: PhoneIcon,
    title: 'Телефон директора',
    content: '+998 99 806-41-99',
    link: 'tel:+998998064199'
  },
  {
    icon: EnvelopeIcon,
    title: 'Электронная почта',
    content: 'ilesaliev@mail.ru',
    link: 'mailto:ilesaliev@mail.ru'
  },
  {
    icon: ClockIcon,
    title: 'Часы работы',
    content: 'Пн-Пт: 9:00 - 18:00',
    link: null
  }
])

const departments = ref([
  {
    icon: BuildingOfficeIcon,
    name: 'Дирекция',
    email: 'ilesaliev@mail.ru',
    phone: '+998 99 806-41-99',
    description: 'Общие вопросы деятельности центра и стратегическое планирование'
  },
  {
    icon: GlobeAltIcon,
    name: 'Научный отдел',
    email: 'shaxr2107@gmail.com',
    phone: '+998 93 583-45-69',
    description: 'Научные исследования и международное сотрудничество'
  },
  {
    icon: EnvelopeIcon,
    name: 'Общие вопросы',
    email: 'Aleksandr-svetashev@bk.ru',
    phone: '+998 90 992-77-03',
    description: 'Организационные вопросы и образовательные программы'
  }
])

const faqs = ref([
  {
    question: 'Как можно сотрудничать с НИЦ "Инновационный транспорт"?',
    answer: 'Мы приветствуем сотрудничество с академическими учреждениями, отраслевыми партнерами и государственными организациями. Свяжитесь с нашим отделом партнерств для обсуждения возможностей.'
  },
  {
    question: 'Предлагаете ли вы программы стажировки?',
    answer: 'Да, мы предлагаем программы стажировки для студентов и молодых специалистов. Заявки рассматриваются ежеквартально. Проверьте наш раздел карьеры для актуальных вакансий.'
  },
  {
    question: 'Можно ли посетить ваши объекты?',
    answer: 'Мы организуем экскурсии для образовательных и профессиональных групп. Пожалуйста, свяжитесь с нами минимум за две недели для планирования визита.'
  },
  {
    question: 'Как получить доступ к вашим исследовательским публикациям?',
    answer: 'Большинство наших исследовательских публикаций доступны через академические базы данных и наш веб-сайт. Для конкретных запросов обращайтесь в наш научный отдел.'
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
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Свяжитесь с нашей командой для обсуждения сотрудничества, партнерства или получения дополнительной информации о наших исследованиях
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
              {{ info.title === 'Наш адрес' ? 'Посмотреть на карте' : 'Связаться' }}
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
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Отправить сообщение</h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя *
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ваше полное имя"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email адрес *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="organization" class="block text-sm font-medium text-gray-700 mb-2">
                    Организация
                  </label>
                  <input
                    id="organization"
                    v-model="form.organization"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ваша организация"
                  >
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефона
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="+998 90 123-45-67"
                  >
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Тема *
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Краткая тема вашего сообщения"
                >
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Расскажите нам о вашем запросе, проекте или идее сотрудничества..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                >
                  <span v-if="!isSubmitting && !isSubmitted">Отправить сообщение</span>
                  <span v-else-if="isSubmitting" class="flex items-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Отправка...
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Сообщение отправлено!
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- University Location -->
          <div data-aos="fade-left">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Наше местоположение</h2>
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0x348f651b9b5d2c5a!2sTashkent%20State%20Transport%20University!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
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
                  <span class="font-medium">Ташкентский государственный транспортный университет</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Открыть в Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Department Contacts -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Контакты отделов</h2>
          <p class="text-xl text-gray-600">
            Обращайтесь в конкретные отделы для специализированных запросов
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(dept, index) in departments"
            :key="dept.name"
            class="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 card-hover shadow-lg group"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <component :is="dept.icon" class="h-6 w-6 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ dept.name }}</h3>
            </div>
            <p class="text-gray-600 mb-4">{{ dept.description }}</p>
            <div class="space-y-2">
              <a
                :href="`mailto:${dept.email}`"
                class="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <EnvelopeIcon class="h-4 w-4 mr-2" />
                {{ dept.email }}
              </a>
              <a
                :href="`tel:${dept.phone.replace(/\s/g, '')}`"
                class="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <PhoneIcon class="h-4 w-4 mr-2" />
                {{ dept.phone }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">Часто задаваемые вопросы</h2>
          <p class="text-xl text-gray-600">
            Найдите ответы на распространенные вопросы о нашем исследовательском центре
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