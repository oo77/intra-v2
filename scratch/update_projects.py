import json
import re

def js_to_json(js_content):
    # Remove the export statement
    js_content = re.sub(r'export const projectsData = ', '', js_content)
    # Remove trailing semicolon if any
    js_content = js_content.strip().rstrip(';')
    
    # This is a very rough conversion, might need more work if it's complex JS
    # But let's try a simpler approach: use a regex to quote keys
    # or better, just manually define the new projects and merge with the backup manually
    return js_content

# The backup is actually almost JSON but with unquoted keys and maybe single quotes
# I will just manually construct the final JSON to be safe and precise.

existing_projects = [
  {
    "id": 1,
    "title": {
      "en": "Autonomous Fleet Management System",
      "ru": "Система управления автономным автопарком",
      "uz": "Avtonom avtoparkni boshqarish tizimi"
    },
    "description": {
      "en": "Advanced AI-powered system for managing autonomous vehicle fleets in urban environments.",
      "ru": "Передовая система на основе ИИ для управления автономными автопарками в городской среде.",
      "uz": "Shahar muhitida avtonom transport vositalarini boshqarish uchun sun'iy intellektga asoslangan ilg'or tizim."
    },
    "image": "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Autonomous Vehicles",
      "ru": "Автономные транспортные средства",
      "uz": "Avtonom transport vositalari"
    },
    "status": "Active",
    "duration": "2023-2025",
    "team": "Dr. Sarah Johnson, Prof. Michael Chen",
    "details": {
      "overview": {
        "en": "This project focuses on developing a comprehensive fleet management system for autonomous vehicles operating in complex urban environments.",
        "ru": "Этот проект направлен на разработку комплексной системы управления автопарком автономных транспортных средств, работающих в сложных городских условиях.",
        "uz": "Ushbu loyiha murakkab shahar muhitida ishlaydigan avtonom transport vositalarini boshqarish uchun keng qamrovli tizimni ishlab chiqishga qaratilgan."
      },
      "objectives": {
        "en": ["Develop real-time fleet optimization algorithms", "Implement predictive maintenance systems"],
        "ru": ["Разработать алгоритмы оптимизации автопарка в реальном времени", "Внедрить системы прогнозного технического обслуживания"],
        "uz": ["Real vaqtda avtoparkni optimallashtirish algoritmlarini ishlab chiqish", "Bashoratli texnik xizmat ko'rsatish tizimlarini joriy etish"]
      },
      "technologies": {
        "en": ["Machine Learning", "IoT Sensors", "Cloud Computing"],
        "ru": ["Машинное обучение", "IoT датчики", "Облачные вычисления"],
        "uz": ["Mashinani o'rganish", "IoT sensorlar", "Bulutli hisoblash"]
      },
      "impact": {
        "en": "Expected to reduce operational costs by 30% and improve service reliability by 45%.",
        "ru": "Ожидается снижение операционных расходов на 30% и повышение надежности обслуживания на 45%.",
        "uz": "Operatsion xarajatlarni 30% ga kamaytirish va xizmat ishonchliligini 45% ga oshirish kutilmoqda."
      }
    }
  },
  {
    "id": 2,
    "title": {
      "en": "Smart Logistics Network Optimization",
      "ru": "Оптимизация умной логистической сети",
      "uz": "Aqlli logistika tarmog'ini optimallashtirish"
    },
    "description": {
      "en": "Optimizing global supply chain networks using advanced analytics and IoT technology.",
      "ru": "Оптимизация глобальных сетей цепочки поставок с использованием передовой аналитики и IoT технологий.",
      "uz": "Ilg'or tahlil va IoT texnologiyalaridan foydalangan holda global ta'minot zanjiri tarmoqlarini optimallashtirish."
    },
    "image": "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Supply Chain",
      "ru": "Цепи поставок",
      "uz": "Ta'minot zanjiri"
    },
    "status": "Active",
    "duration": "2022-2024",
    "team": "Prof. Michael Chen, Dr. Elena Rodriguez",
    "details": {
      "overview": {
        "en": "A comprehensive research initiative aimed at revolutionizing global supply chain management.",
        "ru": "Комплексная исследовательская инициатива, направленная на революционизацию управления глобальными цепочками поставок.",
        "uz": "Global ta'minot zanjiri boshqaruvini inqilob qilishga qaratilgan keng qamrovli tadqiqot tashabbusi."
      },
      "objectives": {
        "en": ["Develop predictive analytics for demand forecasting", "Optimize warehouse operations"],
        "ru": ["Разработать прогнозную аналитику для прогнозирования спроса", "Оптимизировать складские операции"],
        "uz": ["Talab prognozlash uchun bashoratli tahlilni ishlab chiqish", "Ombor operatsiyalari va inventar boshqaruvini optimallashtirish"]
      },
      "technologies": {
        "en": ["IoT Sensors", "Big Data Analytics", "Machine Learning"],
        "ru": ["IoT датчики", "Аналитика больших данных", "Машинное обучение"],
        "uz": ["IoT sensorlar", "Katta ma'lumotlar tahlili", "Mashinani o'rganish"]
      },
      "impact": {
        "en": "Potential to reduce logistics costs by 25% and decrease carbon emissions by 20%.",
        "ru": "Потенциал снижения логистических затрат на 25% и уменьшения выбросов углерода на 20%.",
        "uz": "Logistika xarajatlarini 25% ga kamaytirish va uglerod chiqindilarini 20% ga kamaytirish potentsiali."
      }
    }
  },
  {
    "id": 3,
    "title": {
      "en": "Green Transportation Initiative",
      "ru": "Инициатива зеленого транспорта",
      "uz": "Yashil transport tashabbusi"
    },
    "description": {
      "en": "Research into sustainable transportation solutions and renewable energy integration.",
      "ru": "Исследование устойчивых транспортных решений и интеграции возобновляемой энергии.",
      "uz": "Barqaror transport yechimlari va qayta tiklanadigan energiya integratsiyasini tadqiq qilish."
    },
    "image": "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Sustainability",
      "ru": "Устойчивое развитие",
      "uz": "Barqaror rivojlanish"
    },
    "status": "Completed",
    "duration": "2021-2023",
    "team": "Dr. Elena Rodriguez, Dr. James Wilson",
    "details": {
      "overview": {
        "en": "This completed project investigated various sustainable transportation technologies.",
        "ru": "Этот завершенный проект исследовал различные технологии устойчивого транспорта.",
        "uz": "Ushbu tugallangan loyiha turli barqaror transport texnologiyalarini tadqiq qildi."
      },
      "objectives": {
        "en": ["Evaluate effectiveness of different green technologies"],
        "ru": ["Оценить эффективность различных зеленых технологий"],
        "uz": ["Turli yashil texnologiyalarning samaradorligini baholash"]
      },
      "technologies": {
        "en": ["Electric Vehicles", "Solar Energy"],
        "ru": ["Электромобили", "Солнечная энергия"],
        "uz": ["Elektr transport vositalari", "Quyosh energiyasi"]
      },
      "impact": {
        "en": "Research findings have been adopted by 5 major cities.",
        "ru": "Результаты исследований были приняты 5 крупными городами.",
        "uz": "Tadqiqot natijalari 5 ta yirik shahar tomonidan qabul qilindi."
      }
    }
  },
  {
    "id": 4,
    "title": {
      "en": "Urban Mobility Data Platform",
      "ru": "Платформа данных городской мобильности",
      "uz": "Shahar harakatchanligi ma'lumotlar platformasi"
    },
    "description": {
      "en": "Big data platform for analyzing urban mobility patterns and optimizing city transportation.",
      "ru": "Платформа больших данных для анализа паттернов городской мобильности и оптимизации городского транспорта.",
      "uz": "Shahar harakatchanligi naqshlarini tahlil qilish va shahar transportini optimallashtirish uchun katta ma'lumotlar platformasi."
    },
    "image": "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Urban Planning",
      "ru": "Городское планирование",
      "uz": "Shahar rejalashtirish"
    },
    "status": "Active",
    "duration": "2023-2026",
    "team": "Dr. James Wilson, Dr. Sarah Johnson",
    "details": {
      "overview": {
        "en": "A cutting-edge platform that collects and analyzes massive amounts of urban mobility data.",
        "ru": "Передовая платформа, которая собирает и анализирует огромные объемы данных о городской мобильности.",
        "uz": "Shahar harakatchanligi haqidagi katta hajmdagi ma'lumotlarni tahlil qiladigan ilg'or platforma."
      },
      "objectives": {
        "en": ["Develop real-time traffic flow monitoring systems"],
        "ru": ["Разработать системы мониторинга транспортного потока в реальном времени"],
        "uz": ["Real vaqtda transport oqimini monitoring qilish tizimlarini ishlab chiqish"]
      },
      "technologies": {
        "en": ["Big Data", "Machine Learning"],
        "ru": ["Большие данные", "Машинное обучение"],
        "uz": ["Katta ma'lumotlar", "Mashinani o'rganish"]
      },
      "impact": {
        "en": "Pilot implementations have reduced traffic congestion by 18%.",
        "ru": "Пилотные внедрения снизили транспортные заторы на 18%.",
        "uz": "Pilot loyihalar transport tiqilinchini 18% ga kamaytirdi."
      }
    }
  },
  {
    "id": 5,
    "title": {
      "en": "Drone Delivery Network",
      "ru": "Сеть доставки дронами",
      "uz": "Dron yetkazib berish tarmog'i"
    },
    "description": {
      "en": "Development of autonomous drone delivery systems for last-mile logistics.",
      "ru": "Разработка автономных систем доставки дронами для логистики последней мили.",
      "uz": "Oxirgi mil logistikasi uchun avtonom dron yetkazib berish tizimlarini ishlab chiqish."
    },
    "image": "https://images.pexels.com/photos/2876621/pexels-photo-2876621.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Autonomous Systems",
      "ru": "Автономные системы",
      "uz": "Avtonom tizimlar"
    },
    "status": "Planning",
    "duration": "2024-2027",
    "team": "Dr. Sarah Johnson, Prof. Michael Chen",
    "details": {
      "overview": {
        "en": "An innovative project focused on creating a comprehensive drone delivery network.",
        "ru": "Инновационный проект, направленный на создание комплексной сети доставки дронами.",
        "uz": "Keng qamrovli dron yetkazib berish tarmog'ini yaratishga qaratilgan innovatsion loyiha."
      },
      "objectives": {
        "en": ["Design autonomous navigation systems for drones"],
        "ru": ["Разработать автономные навигационные системы для дронов"],
        "uz": ["Dronlar uchun avtonom navigatsiya tizimlarini loyihalash"]
      },
      "technologies": {
        "en": ["Autonomous Drones", "Computer Vision"],
        "ru": ["Автономные дроны", "Компьютерное зрение"],
        "uz": ["Avtonom dronlar", "Kompyuter ko'rishi"]
      },
      "impact": {
        "en": "Expected to reduce last-mile delivery costs by 40%.",
        "ru": "Ожидается снижение затрат на доставку последней мили на 40%.",
        "uz": "Oxirgi mil yetkazib berish xarajatlarini 40% ga kamaytirish kutilmoqda."
      }
    }
  },
  {
    "id": 6,
    "title": {
      "en": "Smart Infrastructure Monitoring",
      "ru": "Мониторинг умной инфраструктуры",
      "uz": "Aqlli infratuzilma monitoringi"
    },
    "description": {
      "en": "IoT-based monitoring system for transportation infrastructure health and maintenance.",
      "ru": "Система мониторинга на основе IoT для здоровья и обслуживания транспортной инфраструктуры.",
      "uz": "Transport infratuzilmasining sog'liqligi va texnik xizmat ko'rsatish uchun IoT asosidagi monitoring tizimi."
    },
    "image": "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    "category": {
      "en": "Infrastructure",
      "ru": "Инфраструктура",
      "uz": "Infratuzilma"
    },
    "status": "Active",
    "duration": "2022-2025",
    "team": "Dr. Elena Rodriguez, Dr. James Wilson",
    "details": {
      "overview": {
        "en": "This project develops advanced IoT sensor networks for infrastructure monitoring.",
        "ru": "Этот проект разрабатывает передовые сети IoT датчиков для мониторинга инфраструктуры.",
        "uz": "Ushbu loyiha infratuzilmani monitoring qilish uchun ilg'or IoT sensor tarmoqlarini ishlab chiqadi."
      },
      "objectives": {
        "en": ["Deploy comprehensive sensor networks"],
        "ru": ["Развернуть комплексные сенсорные сети"],
        "uz": ["Keng qamrovli sensor tarmoqlarini joylashtirish"]
      },
      "technologies": {
        "en": ["IoT Sensors", "Digital Twins"],
        "ru": ["IoT датчики", "Цифровые двойники"],
        "uz": ["IoT sensorlar", "Raqamli egizaklar"]
      },
      "impact": {
        "en": "Pilot programs show 35% reduction in maintenance costs.",
        "ru": "Пилотные программы показывают снижение затрат на обслуживание на 35%.",
        "uz": "Pilot dasturlar texnik xizmat ko'rsatish xarajatlarini 35% ga kamaytirishni ko'rsatmoqda."
      }
    }
  }
]

new_projects = [
    {
        "id": 7,
        "title": {
            "ru": "ЁБВ-Атех-2018-221: Инновационные технологии перевозки зерновых культур в универсальных контейнерах",
            "en": "ЁБВ-Атех-2018-221: Innovative technologies for transportation of grain crops in universal containers",
            "uz": "ЁБВ-Атех-2018-221: Don mahsulotlarini universal konteynerlarda tashishning innovatsion texnologiyalari"
        },
        "description": {
            "ru": "Разработка и внедрение эффективных методов транспортировки зерна с использованием стандартных контейнеров.",
            "en": "Development and implementation of efficient grain transportation methods using standard containers.",
            "uz": "Standart konteynerlardan foydalangan holda don mahsulotlarini tashishning samarali usullarini ishlab chiqish va joriy etish."
        },
        "image": "https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": {
            "en": "Supply Chain",
            "ru": "Цепи поставок",
            "uz": "Ta'minot zanjiri"
        },
        "status": "Completed",
        "duration": "2018-2020",
        "team": "Project Team Atech",
        "details": {
            "overview": {
                "ru": "Проект направлен на оптимизацию логистики зерновых культур через использование универсальных контейнеров, что позволяет снизить потери и ускорить доставку.",
                "en": "The project aims to optimize grain logistics through the use of universal containers, which reduces losses and speeds up delivery.",
                "uz": "Loyiha don mahsulotlari logistikasini universal konteynerlardan foydalanish orqali optimallashtirishga qaratilgan bo'lib, bu yo'qotishlarni kamaytirish va yetkazib berishni tezlashtirish imkonini beradi."
            },
            "objectives": {
                "ru": ["Оптимизация погрузочно-разгрузочных работ", "Снижение логистических издержек"],
                "en": ["Optimization of loading and unloading operations", "Reduction of logistics costs"],
                "uz": ["Yuklash va tushirish ishlarini optimallashtirish", "Logistika xarajatlarini kamaytirish"]
            },
            "technologies": {
                "ru": ["Универсальные контейнеры", "Специализированные захваты"],
                "en": ["Universal containers", "Specialized grips"],
                "uz": ["Universal konteynerlar", "Maxsus ushlagichlar"]
            },
            "impact": {
                "ru": "Повышение эффективности экспорта зерна на 15%.",
                "en": "Increasing the efficiency of grain exports by 15%.",
                "uz": "Don eksporti samaradorligini 15% ga oshirish."
            }
        }
    },
    {
        "id": 8,
        "title": {
            "ru": "ЁБВ-Атех-2018-223: Разработка методологии организации пакетных перевозок тарно-штучных грузов",
            "en": "ЁБВ-Атех-2018-223: Development of a methodology for organizing package transportation of packaged goods",
            "uz": "ЁБВ-Атех-2018-223: Qadoqlangan yuklarni paketli tashishni tashkil etish metodologiyasini ishlab chiqish"
        },
        "description": {
            "ru": "Научное обоснование и создание стандартов для пакетной перевозки различных типов тарно-штучных грузов.",
            "en": "Scientific justification and creation of standards for package transportation of various types of packaged goods.",
            "uz": "Har xil turdagi qadoqlangan yuklarni paketli tashish uchun ilmiy asoslash va standartlarni yaratish."
        },
        "image": "https://images.pexels.com/photos/6169033/pexels-photo-6169033.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": {
            "en": "Supply Chain",
            "ru": "Цепи поставок",
            "uz": "Ta'minot zanjiri"
        },
        "status": "Completed",
        "duration": "2018-2020",
        "team": "Project Team Atech",
        "details": {
            "overview": {
                "ru": "Методология включает в себя расчет оптимальных размеров пакетов и выбор оборудования для их обработки.",
                "en": "The methodology includes calculating optimal package sizes and choosing equipment for their handling.",
                "uz": "Metodologiya paketlarning optimal o'lchamlarini hisoblash va ularga ishlov berish uchun uskunalar tanlashni o'z ichiga oladi."
            },
            "objectives": {
                "ru": ["Стандартизация транспортных пакетов", "Повышение сохранности грузов"],
                "en": ["Standardization of transport packages", "Increasing cargo safety"],
                "uz": ["Transport paketlarini standartlashtirish", "Yuk xavfsizligini oshirish"]
            },
            "technologies": {
                "ru": ["Пакетные технологии", "Логистическое моделирование"],
                "en": ["Package technologies", "Logistics modeling"],
                "uz": ["Paketli texnologiyalar", "Logistika modellashtirish"]
            },
            "impact": {
                "ru": "Сокращение времени обработки грузов на 20%.",
                "en": "Reduction of cargo handling time by 20%.",
                "uz": "Yuklarga ishlov berish vaqtini 20% ga qisqartirish."
            }
        }
    },
    {
        "id": 9,
        "title": {
            "ru": "586292-EPP-1-2017-PL-EPPKA2-CBHE-JP — Erasmus+ “Intelligent Transport Systems”: Международный образовательный проект",
            "en": "586292-EPP-1-2017-PL-EPPKA2-CBHE-JP — Erasmus+ “Intelligent Transport Systems”: International educational project",
            "uz": "586292-EPP-1-2017-PL-EPPKA2-CBHE-JP — Erasmus+ “Intelligent Transport Systems”: Xalqaro ta’lim loyihasi"
        },
        "description": {
            "ru": "Развитие образовательных программ и компетенций в области ИТС в сотрудничестве с европейскими университетами.",
            "en": "Development of educational programs and competencies in the field of ITS in collaboration with European universities.",
            "uz": "Yevropa universitetlari bilan hamkorlikda intellektual transport tizimlari sohasida ta'lim dasturlari va kompetentsiyalarni rivojlantirish."
        },
        "image": "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": {
            "en": "Infrastructure",
            "ru": "Инфраструктура",
            "uz": "Infratuzilma"
        },
        "status": "Completed",
        "duration": "2019-2021",
        "team": "Erasmus+ Consortium",
        "details": {
            "overview": {
                "ru": "Проект направлен на модернизацию высшего образования в сфере транспорта и внедрение современных интеллектуальных систем.",
                "en": "The project aims to modernize higher education in the transport sector and introduce modern intelligent systems.",
                "uz": "Loyiha transport sohasidagi oliy ta'limni modernizatsiya qilish va zamonaviy intellektual tizimlarni joriy etishga qaratilgan."
            },
            "objectives": {
                "ru": ["Разработка новых учебных курсов", "Повышение квалификации преподавателей"],
                "en": ["Development of new training courses", "Teacher professional development"],
                "uz": ["Yangi o'quv kurslarini ishlab chiqish", "O'qituvchilarning malakasini oshirish"]
            },
            "technologies": {
                "ru": ["ИТС платформы", "Дистанционное обучение"],
                "en": ["ITS platforms", "Distance learning"],
                "uz": ["ITS platformalari", "Masofaviy ta'lim"]
            },
            "impact": {
                "ru": "Подготовлено более 50 специалистов международного уровня.",
                "en": "More than 50 international-level specialists have been trained.",
                "uz": "50 dan ortiq xalqaro darajadagi mutaxassislar tayyorlandi."
            }
        }
    },
    {
        "id": 10,
        "title": {
            "ru": "IL-1145/45: Технические и технологические решения проблемы интермодальных перевозок",
            "en": "IL-1145/45: Technical and technological solutions for intermodal transportation",
            "uz": "IL-1145/45: Intermodal tashuvlar muammosiga texnik va texnologik yechimlar"
        },
        "description": {
            "ru": "Создание инновационной контейнерной платформы для оптимизации интермодальных перевозок широкого спектра грузов.",
            "en": "Creation of an innovative container platform for optimizing intermodal transportation of a wide range of goods.",
            "uz": "Keng turdagi yuklarning intermodal tashuvlarini optimallashtirish uchun innovatsion konteyner platformasini yaratish."
        },
        "image": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": {
            "en": "Infrastructure",
            "ru": "Инфраструктура",
            "uz": "Infratuzilma"
        },
        "status": "Active",
        "duration": "2022-2024",
        "team": "Institute Researchers",
        "details": {
            "overview": {
                "ru": "Проект решает технические барьеры при смене видов транспорта, предлагая универсальную платформу.",
                "en": "The project solves technical barriers when changing modes of transport by offering a universal platform.",
                "uz": "Loyiha universal platformani taklif qilish orqali transport turlarini almashtirishdagi texnik to'siqlarni hal qiladi."
            },
            "objectives": {
                "ru": ["Разработка конструкции платформы", "Тестирование в реальных условиях"],
                "en": ["Platform design development", "Testing in real conditions"],
                "uz": ["Platforma dizaynini ishlab chiqish", "Real sharoitlarda sinovdan o'tkazish"]
            },
            "technologies": {
                "ru": ["САПР", "Материаловедение"],
                "en": ["CAD", "Materials Science"],
                "uz": ["CAD", "Materialshunoslik"]
            },
            "impact": {
                "ru": "Снижение времени перевалки грузов на 30%.",
                "en": "Reduction of transshipment time by 30%.",
                "uz": "Yuklarni qayta yuklash vaqtini 30% ga kamaytirish."
            }
        }
    },
    {
        "id": 11,
        "title": {
            "ru": "S-PM 100: Инновационные тренажёры и лабораторные комплексы (Цифровые двойники)",
            "en": "S-PM 100: Innovative simulators and laboratory complexes (Digital Twins)",
            "uz": "S-PM 100: Innovatsion trenajyorlar va laboratoriya majmualari (Raqamli nusxalar)"
        },
        "description": {
            "ru": "Создание цифровых двойников для проектирования, управления и обучения работе с динамическими объектами.",
            "en": "Creation of digital twins for design, management, and training for working with dynamic objects.",
            "uz": "Dinamik obyektlar bilan ishlash uchun loyihalash, boshqarish va o'qitish uchun raqamli nusxalarni yaratish."
        },
        "image": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": {
            "en": "Autonomous Systems",
            "ru": "Автономные системы",
            "uz": "Avtonom tizimlar"
        },
        "status": "Active",
        "duration": "2023-Ongoing",
        "team": "Digital Twin Lab",
        "details": {
            "overview": {
                "ru": "Использование технологий VR/AR и математического моделирования для создания точных виртуальных копий транспортных систем.",
                "en": "Using VR/AR technologies and mathematical modeling to create accurate virtual copies of transport systems.",
                "uz": "Transport tizimlarining aniq virtual nusxalarini yaratish uchun VR/AR texnologiyalari va matematik modellashtirishdan foydalanish."
            },
            "objectives": {
                "ru": ["Разработка симуляторов", "Математическое моделирование"],
                "en": ["Simulator development", "Mathematical modeling"],
                "uz": ["Simulyatorlarni ishlab chiqish", "Matematik modellashtirish"]
            },
            "technologies": {
                "ru": ["VR/AR", "Digital Twins", "Real-time Simulation"],
                "en": ["VR/AR", "Digital Twins", "Real-time Simulation"],
                "uz": ["VR/AR", "Digital Twins", "Real-time Simulation"]
            },
            "impact": {
                "ru": "Повышение точности проектирования и качества обучения персонала.",
                "en": "Improving design accuracy and personnel training quality.",
                "uz": "Loyihalash aniqligini va xodimlarni o'qitish sifatini oshirish."
            }
        }
    }
]

all_projects = existing_projects + new_projects
with open('public/projects.json', 'w', encoding='utf-8') as f:
    json.dump(all_projects, f, ensure_ascii=False, indent=2)
