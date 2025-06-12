<script setup>
import { ref } from 'vue'
import {
  AcademicCapIcon,
  UserGroupIcon,
  TrophyIcon,
  GlobeAltIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChartBarIcon,
  LightBulbIcon,
  CogIcon,
  ArrowTrendingUpIcon
} from '@heroicons/vue/24/outline'

const selectedMember = ref(null)

// История НИЦ - основные вехи
const historyMilestones = ref([
  {
    year: '2009',
    title: 'Основание НИЦ',
    description: 'Создание научно-исследовательского центра "INNOVATIVE TRANSPORT" для развития инновационных транспортных технологий'
  },
  {
    year: '2012',
    title: 'Первые крупные проекты',
    description: 'Запуск исследований в области автономных транспортных систем и умной логистики'
  },
  {
    year: '2015',
    title: 'Международное признание',
    description: 'Получение статуса ведущего исследовательского центра в области транспортных инноваций'
  },
  {
    year: '2018',
    title: 'Расширение деятельности',
    description: 'Открытие новых направлений исследований: устойчивый транспорт и зеленые технологии'
  },
  {
    year: '2021',
    title: 'Цифровая трансформация',
    description: 'Внедрение AI и машинного обучения в транспортные решения'
  },
  {
    year: '2024',
    title: 'Глобальное партнерство',
    description: 'Создание международной сети партнеров и исследовательских центров'
  }
])

// Команда НИЦ
const teamMembers = ref([
  {
    name: 'Др. Александр Петров',
    role: 'Директор НИЦ',
    bio: 'Ведущий эксперт в области транспортных систем с более чем 20-летним опытом в инновационных технологиях.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Стратегическое планирование', 'Инновационный менеджмент', 'Транспортные системы'],
    email: 'a.petrov@innovativetransport.com',
    phone: '+7 (495) 123-4571',
    education: [
      'Д.т.н. в области транспортных систем, МГУ (2005)',
      'К.т.н. в области автоматизации, МГТУ им. Баумана (2001)',
      'Инженер-механик, МАДИ (1999)'
    ],
    experience: [
      'Директор НИЦ INNOVATIVE TRANSPORT (2015-настоящее время)',
      'Заместитель директора по науке, НИИ Транспорта (2010-2015)',
      'Ведущий инженер, РЖД (2005-2010)',
      'Инженер-исследователь, ЦНИИ МПС (2001-2005)'
    ],
    publications: [
      'Интеллектуальные транспортные системы будущего (Транспорт России, 2023)',
      'Автономные транспортные средства: вызовы и перспективы (Наука и техника, 2022)',
      'Цифровизация транспортной отрасли (Инновации в транспорте, 2021)'
    ],
    awards: [
      'Премия Правительства РФ в области науки и техники (2023)',
      'Лауреат премии "Транспортник года" (2021)',
      'Почетная грамота Минтранса РФ (2019)'
    ]
  },
  {
    name: 'Др. Елена Смирнова',
    role: 'Заместитель директора по науке',
    bio: 'Специалист в области устойчивых транспортных решений и экологических технологий.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Экологические технологии', 'Устойчивое развитие', 'Зеленый транспорт'],
    email: 'e.smirnova@innovativetransport.com',
    phone: '+7 (495) 123-4572',
    education: [
      'Д.т.н. в области экологии транспорта, МАДИ (2008)',
      'К.т.н. в области охраны окружающей среды, МГУ (2004)',
      'Инженер-эколог, РУДН (2002)'
    ],
    experience: [
      'Зам. директора по науке, НИЦ INNOVATIVE TRANSPORT (2018-настоящее время)',
      'Руководитель отдела экологии, НИИ Транспорта (2012-2018)',
      'Старший научный сотрудник, Институт экологии РАН (2008-2012)',
      'Инженер-эколог, Мосэкомониторинг (2004-2008)'
    ],
    publications: [
      'Экологические аспекты электрификации транспорта (Экология и промышленность, 2023)',
      'Снижение углеродного следа в транспортной отрасли (Природа, 2022)',
      'Зеленые технологии в городском транспорте (Экология города, 2021)'
    ],
    awards: [
      'Премия РАН за лучшую научную работу (2022)',
      'Диплом "Эколог года" (2020)',
      'Благодарность Минприроды РФ (2018)'
    ]
  },
  {
    name: 'Др. Михаил Козлов',
    role: 'Руководитель отдела автономных систем',
    bio: 'Эксперт в области искусственного интеллекта и автономных транспортных средств.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Искусственный интеллект', 'Автономные системы', 'Машинное обучение'],
    email: 'm.kozlov@innovativetransport.com',
    phone: '+7 (495) 123-4573',
    education: [
      'Д.т.н. в области искусственного интеллекта, МФТИ (2010)',
      'К.т.н. в области кибернетики, МГТУ им. Баумана (2006)',
      'Инженер-программист, МАИ (2004)'
    ],
    experience: [
      'Руководитель отдела автономных систем, НИЦ INNOVATIVE TRANSPORT (2020-настоящее время)',
      'Ведущий разработчик, Яндекс.Беспилотники (2016-2020)',
      'Старший инженер, Cognitive Technologies (2012-2016)',
      'Программист-исследователь, ИПМ РАН (2010-2012)'
    ],
    publications: [
      'Алгоритмы машинного обучения для автономного вождения (Программирование, 2023)',
      'Системы компьютерного зрения в транспорте (Искусственный интеллект, 2022)',
      'Нейронные сети в задачах навигации (Информатика, 2021)'
    ],
    awards: [
      'Премия в области IT-инноваций (2023)',
      'Лауреат конкурса "Лучший AI-проект" (2021)',
      'Диплом за инновационную разработку (2019)'
    ]
  },
  {
    name: 'Др. Анна Волкова',
    role: 'Руководитель отдела логистики',
    bio: 'Специалист по оптимизации логистических процессов и цепей поставок.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Логистика', 'Оптимизация', 'Цепи поставок'],
    email: 'a.volkova@innovativetransport.com',
    phone: '+7 (495) 123-4574',
    education: [
      'Д.э.н. в области логистики, ГУУ (2012)',
      'К.э.н. в области управления, РЭУ им. Плеханова (2008)',
      'Экономист-логист, МГИМО (2006)'
    ],
    experience: [
      'Руководитель отдела логистики, НИЦ INNOVATIVE TRANSPORT (2019-настоящее время)',
      'Директор по логистике, X5 Retail Group (2015-2019)',
      'Руководитель проектов, PwC Consulting (2012-2015)',
      'Аналитик, McKinsey & Company (2008-2012)'
    ],
    publications: [
      'Цифровая трансформация логистики (Логистика сегодня, 2023)',
      'Оптимизация последней мили доставки (Российская торговля, 2022)',
      'Устойчивые цепи поставок (Логистика и управление, 2021)'
    ],
    awards: [
      'Премия "Логист года" (2022)',
      'Диплом за инновации в логистике (2020)',
      'Благодарность Торгово-промышленной палаты (2018)'
    ]
  }
])

// Достижения НИЦ
const achievements = ref([
  {
    icon: AcademicCapIcon,
    title: 'Научные публикации',
    description: 'Более 150 публикаций в ведущих научных журналах',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: TrophyIcon,
    title: 'Награды и премии',
    description: '12 престижных наград за инновации в транспорте',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: UserGroupIcon,
    title: 'Партнерства',
    description: 'Сотрудничество с 25+ организациями по всему миру',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Международные проекты',
    description: 'Реализация проектов в 15+ странах',
    color: 'from-purple-500 to-pink-500'
  }
])

// Направления деятельности
const researchAreas = ref([
  {
    icon: CogIcon,
    title: 'Автономные транспортные системы',
    description: 'Разработка беспилотных транспортных средств и систем управления движением',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: LightBulbIcon,
    title: 'Умная логистика',
    description: 'Оптимизация логистических процессов с использованием AI и IoT технологий',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Устойчивый транспорт',
    description: 'Экологически чистые транспортные решения и зеленые технологии',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: ChartBarIcon,
    title: 'Цифровизация транспорта',
    description: 'Внедрение цифровых технологий в транспортную инфраструктуру',
    color: 'from-orange-500 to-red-500'
  }
])

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
          <h1 class="text-4xl md:text-5xl font-bold mb-6">О нашем центре</h1>
          <p class="text-xl max-w-3xl mx-auto">
            Научно-исследовательский центр "INNOVATIVE TRANSPORT" - ведущая организация в области инновационных транспортных технологий
          </p>
        </div>
      </div>
    </section>

    <!-- История НИЦ -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">История развития</h2>
          <p class="text-xl text-gray-600">Путь от создания до лидерства в транспортных инновациях</p>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div class="space-y-12">
            <div
                v-for="(milestone, index) in historyMilestones"
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
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Направления деятельности</h2>
          <p class="text-xl text-gray-600">Основные области наших исследований и разработок</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
              v-for="(area, index) in researchAreas"
              :key="area.title"
              class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
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
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Наши достижения</h2>
          <p class="text-xl text-gray-600">Результаты многолетней работы и признание экспертного сообщества</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
              v-for="(achievement, index) in achievements"
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
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
          <p class="text-xl text-gray-600">Ведущие эксперты в области транспортных инноваций</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
              v-for="(member, index) in teamMembers"
              :key="member.name"
              class="bg-white rounded-lg overflow-hidden shadow-lg card-hover cursor-pointer transform transition-all duration-300 hover:scale-105"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
              @click="openMemberModal(member)"
          >
            <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-64 object-cover"
            >
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
              <p class="text-gray-600 text-sm mb-4">{{ member.bio }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                    v-for="skill in member.expertise"
                    :key="skill"
                    class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
              <div class="mt-4 text-center">
                <span class="text-primary-600 text-sm font-medium">Нажмите для подробностей</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Миссия и ценности -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
            <p class="text-lg text-gray-600 mb-6">
              Научно-исследовательский центр "INNOVATIVE TRANSPORT" создан для развития и внедрения
              инновационных технологий в транспортной отрасли. Мы стремимся к созданию более
              эффективных, безопасных и экологически чистых транспортных решений.
            </p>
            <p class="text-lg text-gray-600 mb-6">
              Наша работа направлена на решение актуальных проблем современного транспорта:
              снижение выбросов, повышение безопасности, оптимизация логистических процессов
              и создание интеллектуальных транспортных систем.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Инновационные исследования в области транспорта</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Разработка экологически чистых решений</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Создание интеллектуальных транспортных систем</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-700">Международное сотрудничество и обмен опытом</span>
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

    <!-- Модальное окно участника команды -->
    <Teleport to="body">
      <Transition name="modal">
        <div
            v-if="selectedMember"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            @click="closeMemberModal"
        >
          <div
              class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              @click.stop
          >
            <!-- Заголовок с фото и основной информацией -->
            <div class="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8">
              <button
                  @click="closeMemberModal"
                  class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <XMarkIcon class="h-6 w-6" />
              </button>

              <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <img
                    :src="selectedMember.image"
                    :alt="selectedMember.name"
                    class="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                >
                <div class="text-center md:text-left">
                  <h2 class="text-3xl font-bold mb-2">{{ selectedMember.name }}</h2>
                  <p class="text-xl text-blue-100 mb-4">{{ selectedMember.role }}</p>
                  <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span
                        v-for="skill in selectedMember.expertise"
                        :key="skill"
                        class="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Содержимое -->
            <div class="p-8">
              <!-- Контактная информация -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Контактная информация</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-center space-x-3">
                    <EnvelopeIcon class="h-5 w-5 text-primary-600" />
                    <a :href="`mailto:${selectedMember.email}`" class="text-primary-600 hover:text-primary-700">
                      {{ selectedMember.email }}
                    </a>
                  </div>
                  <div class="flex items-center space-x-3">
                    <PhoneIcon class="h-5 w-5 text-primary-600" />
                    <a :href="`tel:${selectedMember.phone}`" class="text-primary-600 hover:text-primary-700">
                      {{ selectedMember.phone }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Биография -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Биография</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedMember.bio }}</p>
              </div>

              <!-- Образование -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Образование</h3>
                <ul class="space-y-2">
                  <li
                      v-for="education in selectedMember.education"
                      :key="education"
                      class="flex items-start"
                  >
                    <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span class="text-gray-600">{{ education }}</span>
                  </li>
                </ul>
              </div>

              <!-- Опыт работы -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Профессиональный опыт</h3>
                <ul class="space-y-3">
                  <li
                      v-for="experience in selectedMember.experience"
                      :key="experience"
                      class="flex items-start"
                  >
                    <div class="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span class="text-gray-600">{{ experience }}</span>
                  </li>
                </ul>
              </div>

              <!-- Публикации -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Основные публикации</h3>
                <ul class="space-y-3">
                  <li
                      v-for="publication in selectedMember.publications"
                      :key="publication"
                      class="flex items-start"
                  >
                    <div class="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span class="text-gray-600 italic">{{ publication }}</span>
                  </li>
                </ul>
              </div>

              <!-- Награды -->
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Награды и признание</h3>
                <ul class="space-y-2">
                  <li
                      v-for="award in selectedMember.awards"
                      :key="award"
                      class="flex items-start"
                  >
                    <TrophyIcon class="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span class="text-gray-600">{{ award }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>