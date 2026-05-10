import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  LightBulbIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  ComputerDesktopIcon,
  PresentationChartBarIcon,
  DocumentTextIcon
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
      en: 'Initiative to create a Research Institute based on TashIIT under the leadership of Doctor of Technical Sciences, Professor D.I. Ilesaliev',
      ru: 'Инициатива создания НИИ на базе ТашИИТ под руководством д.т.н., профессора Д.И. Илесалиева',
      uz: 'D.t.n., professor D.I. Ilesaliev rahbarligida ToshIIT bazasida ilmiy-tadqiqot instituti yaratish tashabbusi'
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
      en: 'Formalization of the Research Institute as a structural subdivision at Tashkent State Transport University',
      ru: 'Оформление НИИ как структурного подразделения при Ташкентском государственном транспортном университете',
      uz: 'Toshkent davlat transport universitetida ilmiy-tadqiqot institutini tarkibiy bo\'linma sifatida rasmiylashtirish'
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
    icon: GlobeAltIcon,
    title: {
      en: 'Transport Logistics and International Corridors',
      ru: 'Транспортная логистика и международные коридоры',
      uz: 'Transport logistikasi va xalqaro koridorlar'
    },
    description: {
      en: 'Research on transit potential, multimodal routes and development of international transport corridors.',
      ru: 'Исследование транзитного потенциала, мультимодальных маршрутов и развития международных транспортных коридоров.',
      uz: 'Tranzit salohiyati, multimodal yo‘nalishlar va xalqaro transport koridorlarini rivojlantirish bo‘yicha tadqiqotlar.'
    },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: ComputerDesktopIcon,
    title: {
      en: 'Digitalization of the Transport Sector',
      ru: 'Цифровизация транспортной отрасли',
      uz: 'Transport sohasini raqamlashtirish'
    },
    description: {
      en: 'Development of digital platforms, intelligent management systems and analytical solutions for transport and logistics.',
      ru: 'Разработка цифровых платформ, интеллектуальных систем управления и аналитических решений для транспорта и логистики.',
      uz: 'Transport va logistika uchun raqamli platformalar, intellektual boshqaruv tizimlari va analitik yechimlarni ishlab chiqish.'
    },
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: PresentationChartBarIcon,
    title: {
      en: 'Transport Analytics and Modeling',
      ru: 'Транспортная аналитика и моделирование',
      uz: 'Transport analitikasi va modellashtirish'
    },
    description: {
      en: 'Cargo flow analysis, transport forecasting and modeling of transportation processes.',
      ru: 'Анализ грузопотоков, прогнозирование перевозок и моделирование транспортных процессов.',
      uz: 'Yuk oqimlarini tahlil qilish, tashuvlarni prognozlash va transport jarayonlarini modellashtirish.'
    },
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: LightBulbIcon,
    title: {
      en: 'Sustainable Transport and Green Logistics',
      ru: 'Устойчивый транспорт и зеленая логистика',
      uz: 'Barqaror transport va yashil logistika'
    },
    description: {
      en: 'Research on environmentally sustainable transport solutions and energy-efficient logistics.',
      ru: 'Исследования в области экологически устойчивых транспортных решений и энергоэффективной логистики.',
      uz: 'Ekologik barqaror transport yechimlari va energiya samarador logistika bo‘yicha tadqiqotlar.'
    },
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: DocumentTextIcon,
    title: {
      en: 'Regulatory and Sectoral Research',
      ru: 'Нормативно-правовые и отраслевые исследования',
      uz: 'Normativ-huquqiy va tarmoq tadqiqotlari'
    },
    description: {
      en: 'Development of recommendations, standards and scientific analytical materials for the transport sector.',
      ru: 'Разработка рекомендаций, стандартов и научно-аналитических материалов для транспортной отрасли.',
      uz: 'Transport sohasi uchun tavsiyalar, standartlar hamda ilmiy-tahliliy materiallarni ishlab chiqish.'
    },
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: AcademicCapIcon,
    title: {
      en: 'Scientific Capacity Building and International Cooperation',
      ru: 'Подготовка научных кадров и международное сотрудничество',
      uz: 'Ilmiy kadrlar tayyorlash va xalqaro hamkorlik'
    },
    description: {
      en: 'Development of scientific schools, specialist training and implementation of international research projects.',
      ru: 'Развитие научных школ, подготовка специалистов и реализация международных исследовательских проектов.',
      uz: 'Ilmiy maktablarni rivojlantirish, mutaxassislar tayyorlash va xalqaro ilmiy loyihalarni amalga oshirish.'
    },
    color: 'from-teal-500 to-emerald-500'
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
