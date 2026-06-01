export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionary: Record<Locale, Record<string, string>> = {
  uz: {
    home: "Bosh sahifa",
    about: "Institut haqida",
    courses: "Yo'nalishlar",
    admission: "Qabul",
    news: "Yangiliklar",
    contact: "Aloqa",
    heroTitle: "Zamonaviy ta'lim portali",
    heroDesc: "Kurslar, qabul, yangiliklar va onlayn arizalarni bitta joyda boshqaring.",
  },
  ru: {
    home: "Главная",
    about: "Об институте",
    courses: "Программы",
    admission: "Поступление",
    news: "Новости",
    contact: "Контакты",
    heroTitle: "Современный образовательный портал",
    heroDesc: "Курсы, прием, новости и онлайн-заявки в одном месте.",
  },
  en: {
    home: "Home",
    about: "About",
    courses: "Programs",
    admission: "Admission",
    news: "News",
    contact: "Contact",
    heroTitle: "Modern Educational Portal",
    heroDesc: "Manage courses, admissions, news, and online applications in one place.",
  },
};

export const getText = (locale: Locale, key: string): string => dictionary[locale][key] ?? key;
