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
    year: '2016',
    title: 'Зарождение идеи',
    description: 'Инициатива создания НИЦ на базе ТашИИТ под руководством д.т.н., профессора Д.И. Илесалиева'
  },
  {
    year: '2017-2020',
    title: 'Формирование команды',
    description: 'Объединение преподавателей кафедр "Транспортная логистика и сервис" и "Управление эксплуатационной работой"'
  },
  {
    year: '2021',
    title: 'Официальное создание',
    description: 'Оформление НИЦ как структурного подразделения при Ташкентском государственном транспортном университете'
  },
  {
    year: '2022',
    title: 'Развитие партнерств',
    description: 'Установление сотрудничества с АО "Узбекистон темир йуллари" и международными партнерами'
  },
  {
    year: '2023',
    title: 'Научные достижения',
    description: 'Защита докторских и кандидатских диссертаций, публикация монографий и научных статей'
  },
  {
    year: '2024',
    title: 'Цифровая трансформация',
    description: 'Активное развитие направления цифровизации логистических систем и транспортных процессов'
  }
])

// Команда НИЦ
const teamMembers = ref([
  {
    name: 'Илесалиев Дауренбек Ихтиярович',
    role: 'Директор НИЦ',
    bio: 'Доктор технических наук, и.о. профессора. Основатель и идейный вдохновитель НИЦ "Инновационный транспорт".',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Транспортные системы', 'Управление перевозками', 'Научное руководство'],
    email: 'ilesaliev@mail.ru',
    phone: '+998 99 806-41-99',
    education: [
      'Д.т.н. в области транспортных систем',
      'И.о. профессора по специальности "Транспорт"',
      'Специалист в области управления эксплуатационной работой'
    ],
    experience: [
      'Директор НИЦ "Инновационный транспорт" (2021-настоящее время)',
      'Профессор кафедры "Управление эксплуатационной работой"',
      'Руководитель научных проектов и грантов',
      'Научный руководитель докторских и кандидатских диссертаций'
    ],
    publications: [
      'Монографии по управлению транспортными системами',
      'Научные статьи в области логистики и транспорта',
      'Нормативно-методические документы для отрасли'
    ],
    awards: [
      'Признание в научном сообществе Узбекистана',
      'Руководство успешными научными проектами',
      'Подготовка высококвалифицированных кадров'
    ]
  },
  {
    name: 'Камалетдинов Шахрух Шухратович',
    role: 'Заместитель директора по науке',
    bio: 'PhD, и.о. доцента. Специалист в области научных исследований и инновационных решений в транспорте.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Научные исследования', 'Инновации в транспорте', 'Методология исследований'],
    email: 'shaxr2107@gmail.com',
    phone: '+998 93 583-45-69',
    education: [
      'PhD в области транспортных технологий',
      'И.о. доцента по транспортным специальностям',
      'Специализация в области научных исследований'
    ],
    experience: [
      'Заместитель директора по науке НИЦ (2021-настоящее время)',
      'Участие в международных научных проектах',
      'Разработка методических материалов',
      'Координация научной деятельности центра'
    ],
    publications: [
      'Научные статьи по транспортным технологиям',
      'Участие в подготовке монографий',
      'Методические рекомендации для отрасли'
    ],
    awards: [
      'Успешная защита PhD диссертации',
      'Участие в грантовых проектах',
      'Признание в научном сообществе'
    ]
  },
  {
    name: 'Светашев Александр Александрович',
    role: 'Заместитель директора по общим вопросам',
    bio: 'Кандидат технических наук, доцент. Специалист в области организации научной и образовательной деятельности.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Управление проектами', 'Образовательные программы', 'Организация деятельности'],
    email: 'Aleksandr-svetashev@bk.ru',
    phone: '+998 90 992-77-03',
    education: [
      'К.т.н. в области транспортных систем',
      'Доцент по транспортным специальностям',
      'Специализация в области управления'
    ],
    experience: [
      'Заместитель директора по общим вопросам НИЦ (2021-настоящее время)',
      'Доцент кафедры транспортной логистики',
      'Координация образовательных программ',
      'Организация научных мероприятий'
    ],
    publications: [
      'Учебные пособия по транспортной логистике',
      'Научные статьи в области образования',
      'Методические материалы для студентов'
    ],
    awards: [
      'Успешная организация научных мероприятий',
      'Развитие образовательных программ',
      'Признание в педагогическом сообществе'
    ]
  },
  {
    name: 'Шихназаров Жамол Алишерович',
    role: 'Главный специалист',
    bio: 'Ассистент, специалист в области практического применения транспортных технологий и логистических решений.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Транспортные технологии', 'Логистические решения', 'Практическое применение'],
    email: 'jamol.alisherovich@mail.ru',
    phone: '+998 97 780-61-33',
    education: [
      'Ассистент кафедры транспортных систем',
      'Специализация в области логистики',
      'Практический опыт в транспортной отрасли'
    ],
    experience: [
      'Главный специалист НИЦ (2021-настоящее время)',
      'Участие в хоздоговорных работах',
      'Разработка практических решений',
      'Взаимодействие с предприятиями отрасли'
    ],
    publications: [
      'Практические рекомендации для транспортных предприятий',
      'Участие в подготовке методических материалов',
      'Отчеты по выполненным проектам'
    ],
    awards: [
      'Успешное выполнение практических проектов',
      'Признание со стороны предприятий-партнеров',
      'Вклад в развитие отрасли'
    ]
  },
  {
    name: 'Дехконов Мирали Мирхон угли',
    role: 'Ведущий специалист',
    bio: 'Ассистент, молодой специалист, активно участвующий в научных исследованиях и разработке инновационных решений.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertise: ['Научные исследования', 'Инновационные решения', 'Цифровые технологии'],
    email: 'mirali.dehqonov@gmail.com',
    phone: '+998 90 992-77-03',
    education: [
      'Ассистент кафедры транспортных систем',
      'Специализация в области цифровых технологий',
      'Участие в научных исследованиях'
    ],
    experience: [
      'Ведущий специалист НИЦ (2022-настоящее время)',
      'Участие в научных проектах',
      'Разработка цифровых решений',
      'Поддержка образовательных программ'
    ],
    publications: [
      'Участие в подготовке научных статей',
      'Разработка методических материалов',
      'Вклад в исследовательские проекты'
    ],
    awards: [
      'Активное участие в научной деятельности',
      'Перспективный молодой специалист',
      'Вклад в развитие центра'
    ]
  }
])

// Достижения НИЦ
const achievements = ref([
  {
    icon: AcademicCapIcon,
    title: 'Научные публикации',
    description: 'Монографии, учебные пособия, научные статьи и рекомендации',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: TrophyIcon,
    title: 'Диссертации',
    description: 'Защищенные докторские и кандидатские диссертации под руководством центра',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: UserGroupIcon,
    title: 'Партнерства',
    description: 'Сотрудничество с ведущими университетами и предприятиями',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: GlobeAltIcon,
    title: 'Международное сотрудничество',
    description: 'Совместные проекты с зарубежными партнерами',
    color: 'from-purple-500 to-pink-500'
  }
])

// Направления деятельности
const researchAreas = ref([
  {
    icon: CogIcon,
    title: 'Управление и моделирование транспортных процессов',
    description: 'Разработка методов оптимизации транспортных систем и процессов управления перевозками',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: LightBulbIcon,
    title: 'Цифровизация логистических систем',
    description: 'Внедрение цифровых технологий в логистические процессы и управление цепями поставок',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Разработка нормативных и методических материалов',
    description: 'Создание стандартов, методик и рекомендаций для транспортной отрасли',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: ChartBarIcon,
    title: 'Консалтинг, экспертиза и научные мероприятия',
    description: 'Предоставление экспертных услуг и организация научных конференций и семинаров',
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
            Научно-исследовательский центр "Инновационный транспорт" - ведущая организация в области транспортных систем и логистики в Узбекистане
          </p>
        </div>
      </div>
    </section>

    <!-- Миссия и цели -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
            <p class="text-lg text-gray-600 mb-6">
              Создание интеграционной научной платформы в области транспорта и логистики, 
              способствующей устойчивому развитию, инновациям и подготовке высококвалифицированных кадров.
            </p>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Наши цели:</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Развитие научных исследований в области транспортных систем и логистики</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Внедрение инновационных решений в отрасль</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Поддержка образовательных программ и повышение квалификации специалистов</span>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Международное сотрудничество в научной и практической сферах</span>
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">История развития</h2>
          <p class="text-xl text-gray-600">Путь от идеи до ведущего научного центра Узбекистана</p>
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
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Основные направления деятельности</h2>
          <p class="text-xl text-gray-600">Ключевые области наших исследований и разработок</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(area, index) in researchAreas" 
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Наши достижения</h2>
          <p class="text-xl text-gray-600">Результаты научной и образовательной деятельности</p>
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
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
          <p class="text-xl text-gray-600">Ведущие специалисты в области транспорта и логистики</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="skill in member.expertise" 
                  :key="skill"
                  class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
              <div class="text-center">
                <span class="text-primary-600 text-sm font-medium">Нажмите для подробностей</span>
              </div>
            </div>
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
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Образование и квалификация</h3>
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
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Достижения и признание</h3>
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