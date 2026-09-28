export interface CourseContent {
  title: string;
  icon: string;
  books: any[];
  summaries: any[];
  videos: any[];
  mid: any[];
  final: any[];
}


export interface CourseEntry {
  en: string;
  ar: string;
  content?: CourseContent;
}

export const curriculumMap: Record<string, CourseEntry> = {
  // --- UNIVERSITY COMPULSORY ---
  "الابتكار والريادة والابداع": { en: "Innovation & Entrepreneurship", ar: "الابتكار والريادة والابداع" },
  "التربية الوطنية والسلوك الجامعي": { en: "National Education", ar: "التربية الوطنية والسلوك الجامعي" },
  "علوم عسكرية": { en: "Military Sciences", ar: "علوم عسكرية" },
  "لغة انجليزية تطبيقية 1": { en: "Applied English 1", ar: "لغة انجليزية تطبيقية 1" },
  "لغة انجليزية تطبيقية 2": { en: "Applied English 2", ar: "لغة انجليزية تطبيقية 2" },
  "لغة عربية تطبيقية": { en: "Applied Arabic", ar: "لغة عربية تطبيقية" },
  "مهارات الحاسوب والتعليم الالكتروني": { en: "Computer Skills", ar: "مهارات الحاسوب والتعليم الالكتروني" },

  // --- COLLEGE COMPULSORY ---
  "اقتصاد هندسي": { en: "Engineering Economy", ar: "اقتصاد هندسي" },
  "البرمجة للمهندسين": { en: "Programming for Engineers", ar: "البرمجة للمهندسين" },
  "التفاضل والتكامل (1)": { en: "Calculus 1", ar: "التفاضل والتكامل (1)" },
  "التفاضل والتكامل (2)": { en: "Calculus 2", ar: "التفاضل والتكامل (2)" },
  "الفيزياء العامة (1)": { en: "General Physics 1", ar: "الفيزياء العامة (1)" },
  "الفيزياء العامة (2)": { en: "General Physics 2", ar: "الفيزياء العامة (2)" },
  "الفيزياء العامة عملي (1)": { en: "General Physics Lab 1", ar: "الفيزياء العامة عملي (1)" },
  "الكتابة التقنية والاخلاقيات المهنية": { en: "Technical Writing", ar: "الكتابة التقنية والاخلاقيات المهنية" },
  "الكيمياء العامة (1)": { en: "General Chemistry 1", ar: "الكيمياء العامة (1)" },
  "الكيمياء العامه العمليه (1)": { en: "General Chemistry Lab 1", ar: "الكيمياء العامه العمليه (1)" },
  "المعادلات التفاضلية العادية (1)": { en: "Differential Equations 1", ar: "المعادلات التفاضلية العادية (1)" },
  "رسم هندسي": { en: "Engineering Drawing", ar: "رسم هندسي" },
  "مشغل هندسي": { en: "Engineering Workshop", ar: "مشغل هندسي" },

  // --- MAJOR COMPULSORY ---
  "اتصالات وتراسل البيانات": { 
    en: "Communications and Data Transmission", 
    ar: "اتصالات وتراسل البيانات",
    content: {
      title: 'Communications and data transmission', icon: '📶',
      books: [
        { label: 'Data communications and networking', url: 'academic papers/communication/data comunication and networking.pdf', cover: 'books mockups/data communictaions and networking.png' },
        { label: 'Solutions of data communications and networking', url: 'academic papers/communication/solutions of data comunication and networking.pdf', cover: 'books mockups/solutions of data communictaions and networking.png' },
        { label: 'Data and computer communications', url: 'academic papers/communication/Data and computer comunications.pdf', cover: 'books mockups/data and computer communtications.png' }
      ],
      summaries: [
        {
          label: 'Dr. Majid Slides', type: 'folder',
          items: [
            { label: 'Chapter 1 introduction', url: 'academic papers/communication/summarize/Dr.Majid Slides/Chapter 1-Introduction.pdf' },
            { label: 'Chapter 2 network models', url: 'academic papers/communication/summarize/Dr.Majid Slides/Chapter 2 Network Models.pdf' },
            { label: 'Chapter 8 error detection', url: 'academic papers/communication/summarize/Dr.Majid Slides/Chapter 8   Error Detection.pdf' },
          ]
        },
        { label: 'Network Roaa Bassam', url: 'academic papers/communication/summarize/Network-Roaa Bassam2021-1.pdf' }
      ],
      videos: [],
      mid: [{ label: '2026', url: 'academic papers/communication/pastpapers/mid 2026.pdf' }, { label: '2025', url: 'academic papers/communication/pastpapers/mid 2025.pdf' }],
      final: [{ label: '2026', url: 'academic papers/communication/pastpapers/2026 final.pdf' }]
    }
  },
  "انظمة واشارات": { en: "Signals and Systems", ar: "انظمة واشارات" },
  "انظمة التحكم": { en: "Control Systems", ar: "انظمة التحكم" },
  "دوائر كهربائية (1)": { en: "Electric Circuits 1", ar: "دوائر كهربائية (1)" },
  "دوائر كهربائية (2)": { en: "Electric Circuits 2", ar: "دوائر كهربائية (2)" },
  "تصميم المنطق الرقمي": { en: "Digital Logic Design", ar: "تصميم المنطق الرقمي" },
  "جبر خطي": { en: "Linear Algebra", ar: "جبر خطي" },
  "القيادة الكهربائية": { en: "Electric Drives", ar: "القيادة الكهربائية" },
  "تصميم انظمة الميكاترونكس": { en: "Mechatronics Systems Design", ar: "تصميم انظمة الميكاترونكس" },
  "القيادة الرئوية والهيــدروليــكية": { en: "Pneumatic & Hydraulic Drives", ar: "القيادة الرئوية والهيــدروليــكية" },
  "مكونات الالة": { en: "Machine Components", ar: "مكونات الالة" },
  "استاتيكا": { en: "Statics", ar: "استاتيكا" },
  "انظمة المعالجات الدقيقة": { en: "Microprocessor Systems", ar: "انظمة المعالجات الدقيقة" },
  "المجسات والمشغلات": { en: "Sensors and Actuators", ar: "المجسات والمشغلات" },
  "الكترونيات (1)": { en: "Electronics 1", ar: "الكترونيات (1)" },
  "الكترونيات القدرة": { en: "Power Electronics", ar: "الكترونيات القدرة" }
};

export const prerequisites = [
  ["لغة انجليزية تطبيقية 1", "لغة انجليزية تطبيقية 2"],
  ["مهارات الحاسوب والتعليم الالكتروني", "البرمجة للمهندسين"],
  ["مهارات الحاسوب والتعليم الالكتروني", "رسم هندسي"],
  ["التفاضل والتكامل (1)", "التفاضل والتكامل (2)"],
  ["التفاضل والتكامل (2)", "المعادلات التفاضلية العادية (1)"],
  ["التفاضل والتكامل (2)", "استاتيكا"],
  ["الفيزياء العامة (1)", "الفيزياء العامة (2)"],
  ["الفيزياء العامة (2)", "دوائر كهربائية (1)"],
  ["دوائر كهربائية (1)", "دوائر كهربائية (2)"],
  ["دوائر كهربائية (1)", "انظمة واشارات"],
  ["دوائر كهربائية (1)", "الكترونيات (1)"],
  ["البرمجة للمهندسين", "تصميم المنطق الرقمي"],
  ["تصميم المنطق الرقمي", "انظمة المعالجات الدقيقة"],
  ["انظمة المعالجات الدقيقة", "المجسات والمشغلات"],
  ["انظمة واشارات", "انظمة التحكم"],
  ["انظمة التحكم", "القيادة الكهربائية"],
  ["الكترونيات (1)", "الكترونيات القدرة"],
  ["الكترونيات القدرة", "القيادة الكهربائية"],
  ["تصميم المنطق الرقمي", "اتصالات وتراسل البيانات"],
  ["انظمة واشارات", "اتصالات وتراسل البيانات"],
  ["جبر خطي", "اتصالات وتراسل البيانات"],
  ["القيادة الكهربائية", "تصميم انظمة الميكاترونكس"],
  ["القيادة الرئوية والهيــدروليــكية", "تصميم انظمة الميكاترونكس"],
  ["استاتيكا", "مكونات الالة"]
];
