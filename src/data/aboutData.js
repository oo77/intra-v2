import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  LightBulbIcon,
  CogIcon,
  ArrowTrendingUpIcon
} from '@heroicons/vue/24/outline'

// История НИЦ - основные вехи
export const historyMilestones = [
  {
    year: '2016',
    title: {
      en: 'Birth of the Idea',
      ru: 'Зарождение идеи',
      uz: 'G\'oyaning paydo bo\'lishi'
    },
    description: {
      en: 'Initiative to create a Research Center based on TashIIT under the leadership of Doctor of Technical Sciences, Professor D.I. Ilesaliev',
      ru: 'Инициатива создания НИЦ на базе ТашИИТ под руководством д.т.н., профессора Д.И. Илесалиева',
      uz: 'D.t.n., professor D.I. Ilesaliev rahbarligida ToshIIT bazasida NITs yaratish tashabbusi'
    }
  },
  {
    year: '2017-2020',
    title: {
      en: 'Team Formation',
      ru: 'Формирование команды',
      uz: 'Jamoa shakllanishi'
    },
    description: {
      en: 'Unification of teachers from the departments "Transport Logistics and Service" and "Operational Work Management"',
      ru: 'Объединение преподавателей кафедр "Транспортная логистика и сервис" и "Управление эксплуатационной работой"',
      uz: '"Transport logistikasi va servis" va "Ekspluatatsiya ishlarini boshqarish" kafedralari o\'qituvchilarini birlashtirish'
    }
  },
  {
    year: '2021',
    title: {
      en: 'Official Establishment',
      ru: 'Официальное создание',
      uz: 'Rasmiy tashkil etish'
    },
    description: {
      en: 'Formalization of the Research Center as a structural subdivision at Tashkent State Transport University',
      ru: 'Оформление НИЦ как структурного подразделения при Ташкентском государственном транспортном университете',
      uz: 'Toshkent davlat transport universitetida NITsni tarkibiy bo\'linma sifatida rasmiylashtirish'
    }
  },
  {
    year: '2022',
    title: {
      en: 'Partnership Development',
      ru: 'Развитие партнерств',
      uz: 'Hamkorlik rivojlanishi'
    },
    description: {
      en: 'Establishing cooperation with JSC "Uzbekiston temir yullari" and international partners',
      ru: 'Установление сотрудничества с АО "Узбекистон темир йуллари" и международными партнерами',
      uz: '"O\'zbekiston temir yo\'llari" AJ va xalqaro hamkorlar bilan hamkorlik o\'rnatish'
    }
  },
  {
    year: '2023',
    title: {
      en: 'Scientific Achievements',
      ru: 'Научные достижения',
      uz: 'Ilmiy yutuqlar'
    },
    description: {
      en: 'Defense of doctoral and candidate dissertations, publication of monographs and scientific articles',
      ru: 'Защита докторских и кандидатских диссертаций, публикация монографий и научных статей',
      uz: 'Doktorlik va nomzodlik dissertatsiyalarini himoya qilish, monografiya va ilmiy maqolalar nashr etish'
    }
  },
  {
    year: '2024',
    title: {
      en: 'Digital Transformation',
      ru: 'Цифровая трансформация',
      uz: 'Raqamli transformatsiya'
    },
    description: {
      en: 'Active development of digitalization of logistics systems and transport processes',
      ru: 'Активное развитие направления цифровизации логистических систем и транспортных процессов',
      uz: 'Logistika tizimlari va transport jarayonlarini raqamlashtirish yo\'nalishini faol rivojlantirish'
    }
  }
]

// Достижения НИЦ
export const achievements = [
  {
    icon: AcademicCapIcon,
    title: {
      en: 'Scientific Publications',
      ru: 'Научные публикации',
      uz: 'Ilmiy nashrlar'
    },
    description: {
      en: 'Monographs, textbooks, scientific articles and recommendations',
      ru: 'Монографии, учебные пособия, научные статьи и рекомендации',
      uz: 'Monografiyalar, o\'quv qo\'llanmalari, ilmiy maqolalar va tavsiyalar'
    },
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: TrophyIcon,
    title: {
      en: 'Dissertations',
      ru: 'Диссертации',
      uz: 'Dissertatsiyalar'
    },
    description: {
      en: 'Defended doctoral and candidate dissertations under the guidance of the center',
      ru: 'Защищенные докторские и кандидатские диссертации под руководством центра',
      uz: 'Markaz rahbarligida himoya qilingan doktorlik va nomzodlik dissertatsiyalari'
    },
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: UserGroupIcon,
    title: {
      en: 'Partnerships',
      ru: 'Партнерства',
      uz: 'Hamkorliklar'
    },
    description: {
      en: 'Cooperation with leading universities and enterprises',
      ru: 'Сотрудничество с ведущими университетами и предприятиями',
      uz: 'Yetakchi universitetlar va korxonalar bilan hamkorlik'
    },
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: GlobeAltIcon,
    title: {
      en: 'International Cooperation',
      ru: 'Международное сотрудничество',
      uz: 'Xalqaro hamkorlik'
    },
    description: {
      en: 'Joint projects with foreign partners',
      ru: 'Совместные проекты с зарубежными партнерами',
      uz: 'Chet el hamkorlari bilan qo\'shma loyihalar'
    },
    color: 'from-purple-500 to-pink-500'
  }
]

// Направления деятельности
export const researchAreas = [
  {
    icon: CogIcon,
    title: {
      en: 'Management and Modeling of Transport Processes',
      ru: 'Управление и моделирование транспортных процессов',
      uz: 'Transport jarayonlarini boshqarish va modellashtirish'
    },
    description: {
      en: 'Development of methods for optimizing transport systems and transportation management processes',
      ru: 'Разработка методов оптимизации транспортных систем и процессов управления перевозками',
      uz: 'Transport tizimlarini va tashish boshqaruvi jarayonlarini optimallashtirish usullarini ishlab chiqish'
    },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: LightBulbIcon,
    title: {
      en: 'Digitalization of Logistics Systems',
      ru: 'Цифровизация логистических систем',
      uz: 'Logistika tizimlarini raqamlashtirish'
    },
    description: {
      en: 'Implementation of digital technologies in logistics processes and supply chain management',
      ru: 'Внедрение цифровых технологий в логистические процессы и управление цепями поставок',
      uz: 'Logistika jarayonlari va ta\'minot zanjiri boshqaruviga raqamli texnologiyalarni joriy etish'
    },
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: {
      en: 'Development of Regulatory and Methodological Materials',
      ru: 'Разработка нормативных и методических материалов',
      uz: 'Me\'yoriy va uslubiy materiallarni ishlab chiqish'
    },
    description: {
      en: 'Creation of standards, methodologies and recommendations for the transport industry',
      ru: 'Создание стандартов, методик и рекомендаций для транспортной отрасли',
      uz: 'Transport sohasi uchun standartlar, metodikalar va tavsiyalar yaratish'
    },
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: ChartBarIcon,
    title: {
      en: 'Consulting, Expertise and Scientific Events',
      ru: 'Консалтинг, экспертиза и научные мероприятия',
      uz: 'Konsalting, ekspertiza va ilmiy tadbirlar'
    },
    description: {
      en: 'Providing expert services and organizing scientific conferences and seminars',
      ru: 'Предоставление экспертных услуг и организация научных конференций и семинаров',
      uz: 'Ekspert xizmatlarini ko\'rsatish va ilmiy konferensiya va seminarlarni tashkil etish'
    },
    color: 'from-orange-500 to-red-500'
  }
]

// Helper function to get localized data
export function getLocalizedData(data, locale) {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      title: item.title[locale] || item.title.en,
      description: item.description[locale] || item.description.en
    }))
  }
  return {
    ...data,
    title: data.title[locale] || data.title.en,
    description: data.description[locale] || data.description.en
  }
}
