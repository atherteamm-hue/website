// src/data/curriculumData.ts

export interface CourseContent {
  titleEn: string;
  titleAr: string;
  books: { label: string; url: string; coverUrl?: string; isArabic?: boolean; isSolution?: boolean }[];
  summaries: (
    | { label: string; url: string }
    | { label: string; type: 'folder'; items: { label: string; url: string }[] }
  )[];
  videos?: { label: string; url: string }[]; // حطينا ? عشان نقدر نمسحها من أي مادة
  quizzes?: ( // ضفنا قسم الكويزات الجديد لحاله ويدعم القوائم المنسدلة
    | { label: string; url: string }
    | { label: string; type: 'folder'; items: { label: string; url: string }[] }
  )[];
  mid: { label: string; url: string }[];
  final: { label: string; url: string }[];
}

export interface Course {
  coords: { x: number; y: number; w: number; h: number };
  content: CourseContent;
}

export const curriculumData: Record<string, Course> = {
  
  english_1: { 
    coords: { x: 2.21, y: 4, w: 5.32, h: 5.21 }, 
    content: {
      titleEn: "English 1", titleAr: "لغة إنجليزية 1",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  english_2: { 
    coords: { x: 2.31, y: 15.42, w: 5.22, h: 5.2 }, 
    content: {
      titleEn: "English 2", titleAr: "لغة إنجليزية 2",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  tech_writing: { 
    coords: { x: 2.21, y: 26.43, w: 5.52, h: 5.2 }, 
    content: {
      titleEn: "Technical Writing", titleAr: "الكتابة التقنية والاخلاقيات المهنية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  nat_edu: { 
    coords: { x: 10.14, y: 5.01, w: 5.62, h: 5.4 }, 
    content: {
      titleEn: "National Education", titleAr: "تربية وطنية",
      books: [
        { label: "كتاب التربية الوطنية", url: "/Books/مدخل الى الثقافة الوطنية والمدنية_compressed.pdf", 
         coverUrl: "/BooksCover/national-cover.png", 
         isArabic: true }
      ], 
      summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  app_arabic: { 
    coords: { x: 10.64, y: 14.82, w: 5.22, h: 5.4 }, 
    content: {
      titleEn: "Applied Arabic", titleAr: "لغة عربية تطبيقية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  innovation: { 
    coords: { x: 11.55, y: 25.03, w: 3.41, h: 8.4 }, 
    content: {
      titleEn: "Innovation", titleAr: "الريادة والابتكار",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  comp_skills: { 
    coords: { x: 17.77, y: 17.82, w: 6.73, h: 6 }, 
    content: {
      titleEn: "Computer Skills", titleAr: "مهارات حاسوب",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  eng_drawing: { 
    coords: { x: 19.88, y: 3, w: 2.71, h: 8.61 }, 
    content: {
      titleEn: "Engineering Drawing", titleAr: "رسم هندسي",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  workshop: { 
    coords: { x: 26.61, y: 3, w: 6.62, h: 6.41 }, 
    content: {
      titleEn: "Engineering Workshop", titleAr: "مشاغل هندسية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  calculus_1: { 
    coords: { x: 35.14, y: 3.6, w: 5.22, h: 5.61 }, 
    content: {
      titleEn: "Calculus 1", titleAr: "تفاضل وتكامل 1",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  calculus_2: { 
    coords: { x: 44.48, y: 3.8, w: 5.32, h: 5.61 }, 
    content: {
      titleEn: "Calculus 2", titleAr: "تفاضل وتكامل 2",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  diff_eq: { 
    coords: { x: 26.91, y: 15.82, w: 5.22, h: 5.6 }, 
    content: {
      titleEn: "Differential Equations", titleAr: "معادلات تفاضلية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  numerical: { 
    coords: { x: 34.24, y: 16.02, w: 5.42, h: 5 }, 
    content: {
      titleEn: "Numerical Methods", titleAr: "طرق عددية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  probability: { 
    coords: { x: 41.57, y: 15.22, w: 5.62, h: 5.4 }, 
    content: {
      titleEn: "Probability", titleAr: "احتمالات وإحصاء",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  statics: { 
    coords: { x: 55.32, y: 3.6, w: 5.12, h: 5.81 }, 
    content: {
      titleEn: "Statics", titleAr: "ستاتيكا",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  physics_1: { 
    coords: { x: 73.09, y: 3.8, w: 5.83, h: 5.21 }, 
    content: {
      titleEn: "Physics 1", titleAr: "فيزياء 1",
      books: [
        { label: "Physics for Scientists and Engineers 9ed", 
         url: "https://ia601005.us.archive.org/34/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed.pdf",
         coverUrl: "/BooksCover/physics-cover.png" 
        }, // <--- هون كانت الفاصلة ناقصة عندك
        { label: "Physics Solutions Manual",
         url: "https://dn790006.ca.archive.org/0/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed%20[solutions].pdf",
         coverUrl: "/BooksCover/PhysicsSolution-cover.png" ,
         isSolution: true
        }
      ],
      summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  physics_2: { 
    coords: { x: 73.39, y: 14.62, w: 5.53, h: 5.4 }, 
    content: {
      titleEn: "Physics 2", titleAr: "فيزياء 2",
      books: [
        { label: "Physics for Scientists and Engineers 9ed",
         url: "https://ia601005.us.archive.org/34/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed.pdf",
         coverUrl: "/BooksCover/physics-cover.png" },
        { label: "Physics Solutions Manual", 
         url: "https://dn790006.ca.archive.org/0/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed%20[solutions].pdf", 
         coverUrl: "/BooksCover/PhysicsSolution-cover.png",
         isSolution: true
        }
      ],
      summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  physics_lab: { 
    coords: { x: 62.55, y: 14.01, w: 6.73, h: 6.21 }, 
    content: {
      titleEn: "Physics Lab", titleAr: "مختبر فيزياء",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  gen_chemistry: { 
    coords: { x: 91.77, y: 3.6, w: 5.42, h: 5.01 }, 
    content: {
      titleEn: "General Chemistry", titleAr: "الكيمياء العامة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  chem_lab: { 
    coords: { x: 91.27, y: 15.02, w: 6.72, h: 4.8 }, 
    content: {
      titleEn: "Chemistry Lab", titleAr: "مختبر الكيمياء العامة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cpp: { 
    coords: { x: 28.64, y: 25.28, w: 5.25, h: 5.23 }, 
    content: {
      titleEn: "C++", titleAr: "البرمجة للمهندسين (C++)",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  digital_logic: { 
    coords: { x: 37.88, y: 25.28, w: 5.25, h: 5.46 }, 
    content: {
      titleEn: "Digital Logic", titleAr: "منطق رقمي",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  linear_algebra: { 
    coords: { x: 47.58, y: 24.14, w: 5.59, h: 5.24 }, 
    content: {
      titleEn: "Linear Algebra", titleAr: "جبر خطي",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  machine_components: { 
    coords: { x: 54.99, y: 14.59, w: 5.48, h: 5.23 }, 
    content: {
      titleEn: "Machine Components", titleAr: "أجزاء آلات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  dynamic_vibration: { 
    coords: { x: 55.11, y: 25.74, w: 5.36, h: 5.68 }, 
    content: {
      titleEn: "Dynamics and Vibration", titleAr: "ديناميكا واهتزازات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  circuits_1: { 
    coords: { x: 63.21, y: 26.65, w: 5.48, h: 5.68 }, 
    content: {
      titleEn: "Circuits 1", titleAr: "دوائر كهربائية 1",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  circuits_2: { 
    coords: { x: 78.61, y: 21.87, w: 5.25, h: 5.91 }, 
    content: {
      titleEn: "Circuits 2", titleAr: "دوائر كهربائية 2",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  circuits_lab: { 
    coords: { x: 77.81, y: 31.65, w: 6.85, h: 5.92 }, 
    content: {
      titleEn: "Circuits Lab", titleAr: "مختبر دوائر كهربائية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  signals: { 
    coords: { x: 63.21, y: 38.93, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "Signals", titleAr: "أنظمة و إشارات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
communication: { 
    coords: { x: 47.81, y: 36.2, w: 5.36, h: 5.46 }, 
    content: {
      titleEn: "Communication", 
      titleAr: "اتصالات وتراسل بيانات", 
      
      books: [
        { 
          label: "Data Communication and Networking", 
          url: "/communication/Books/Book_Data_Communication_and_Networking.pdf",
          coverUrl: "/BooksCover/Data-Communications-And-Networking.png" 
        },
        { 
          label: "Data and Computer Communications", 
          url: "/communication/Books/Book_Data_and_Computer_Communications.pdf",
          coverUrl: "/BooksCover/Data-and-Computer-Communications-tenth-edition.png" 
        },
        { 
          label: "Solutions Manual", 
          url: "/communication/Books/Book_Solutions_Data_Communication_and_Networking.pdf",
          coverUrl: "/BooksCover/Data-Communications-And-Networking.png",
          isSolution: true 
        }
      ], 
      
      summaries: [
        { 
          label: "Notes & Summaries", 
          type: 'folder', 
          items: [
            { label: "Dr. Amjad Al-Hindi Notebook", url: "/communication/Notes/Notebook_Dr_Amjad_AlHindi.pdf" },
            { label: "Roaa Bassam Summary (2021)", url: "/communication/Notes/Summary_Network_Roaa_Bassam_2021.pdf" }
          ] 
        },
        { 
          label: "Dr. Majid Slides", 
          type: 'folder', 
          items: [
            { label: "Chapter 1: Introduction", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch01_Introduction.pdf" },
            { label: "Chapter 2: Network Models", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch02_Network_Models.pdf" },
            { label: "Chapter 3: Physical Layer", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch03_Physical_Layer.pdf" },
            { label: "Chapter 4: Digital Transmission", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch04_Digital_Transmission.pdf" },
            { label: "Chapter 5: Analog Transmission", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch05_Analog_Transmission.pdf" },
            { label: "Chapter 6: Bandwidth Utilization", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch06_Bandwidth_Utilization.pdf" },
            { label: "Chapter 7: Transmission Media", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch07_Transmission_Media.pdf" },
            { label: "Chapter 8: Error Detection", url: "/communication/Slides/Dr_Majid/Dr_Majid_Ch08_Error_Detection.pdf" }
          ] 
        },
        { 
          label: "Highlighted Slides", 
          type: 'folder', 
          items: [
            { label: "Chapter 1 Highlighted", url: "/communication/Slides/Highlighted/Chapter_01_Highlighted.pdf" },
            { label: "Chapter 2 Highlighted", url: "/communication/Slides/Highlighted/Chapter_02_Highlighted.pdf" },
            { label: "Chapter 3 Highlighted", url: "/communication/Slides/Highlighted/Chapter_03_Highlighted.pdf" },
            { label: "Chapter 4 Highlighted", url: "/communication/Slides/Highlighted/Chapter_04_Highlighted.pdf" },
            { label: "Chapter 5 Highlighted", url: "/communication/Slides/Highlighted/Chapter_05_Highlighted.pdf" },
            { label: "Chapter 6 Highlighted", url: "/communication/Slides/Highlighted/Chapter_06_Highlighted.pdf" },
            { label: "Chapter 7 Highlighted", url: "/communication/Slides/Highlighted/Chapter_07_Highlighted.pdf" },
            { label: "Chapter 8", url: "/communication/Slides/Highlighted/Chapter_08.pdf" },
            { label: "Chapter 10", url: "/communication/Slides/Highlighted/Chapter_10.pdf" }
          ] 
        }
      ], 
      
      // الكويزات هسا صارت بخانة مستقلة وجواها الدروب داون تبعها
      quizzes: [
        {
          label: "Quizzes (Dropdown)",
          type: 'folder',
          items: [
            { label: "Quiz 1 (2022)", url: "/communication/pastpapers/Quizzes/Quiz_1_2022.pdf" },
            { label: "Quiz 1 (2026)", url: "/communication/pastpapers/Quizzes/Quiz_1_2026.pdf" },
            { label: "Quiz 1 (T3 2023)", url: "/communication/pastpapers/Quizzes/Quiz_1_T3_2023.pdf" },
            { label: "Quiz 2 (2022)", url: "/communication/pastpapers/Quizzes/Quiz_2_2022.pdf" },
            { label: "Quiz 2 (T3 2023)", url: "/communication/pastpapers/Quizzes/Quiz_2_T3_2023.pdf" },
            { label: "Quiz 3 (2022)", url: "/communication/pastpapers/Quizzes/Quiz_3_2022.pdf" },
            { label: "Quiz 3 (T3 2023)", url: "/communication/pastpapers/Quizzes/Quiz_3_T3_2023.pdf" },
            { label: "Quiz Ch4 (T2 2023-24)", url: "/communication/pastpapers/Quizzes/Quiz_Ch4_T2_2023-24.pdf" }
          ]
        }
      ],

      mid: [
        { label: "Mid 2022 Additional", url: "/communication/pastpapers/Mids/Mid_2022_Additional.pdf" },
        { label: "Mid 2023", url: "/communication/pastpapers/Mids/Mid_2023.pdf" },
        { label: "Mid 2024", url: "/communication/pastpapers/Mids/Mid_2024.pdf" },
        { label: "Mid Exam 2024", url: "/communication/pastpapers/Mids/Mid_Exam_2024.pdf" },
        { label: "Mid 2025", url: "/communication/pastpapers/Mids/Mid_2025.pdf" },
        { label: "Mid 2026", url: "/communication/pastpapers/Mids/Mid_2026.pdf" },
        { label: "Mid Fall 2022-23", url: "/communication/pastpapers/Mids/Mid_Fall_2022-23.pdf" },
        { label: "Mid T2 2023", url: "/communication/pastpapers/Mids/Mid_T2_2023.pdf" },
        { label: "Mid T3 2023", url: "/communication/pastpapers/Mids/Mid_T3_2023.pdf" },
        { label: "Mid 25-26 (1st Semester MAE)", url: "/communication/pastpapers/Mids/Mid_25-26_1st_Semester_MAE.pdf" }
      ], 
      
      final: [
        { label: "Final Exam 2022", url: "/communication/pastpapers/Finals/Final_Exam_2022.pdf" },
        { label: "Final Exam 2026", url: "/communication/pastpapers/Finals/Final_Exam_2026.pdf" },
        { label: "Final Summer 2024-25", url: "/communication/pastpapers/Finals/Final_Summer_2024-25.pdf" },
        { label: "Final Summer 2026", url: "/communication/pastpapers/Finals/Final_Summer_2026.pdf" },
        { label: "Final T3 2023 (Version 1)", url: "/communication/pastpapers/Finals/Final_T3_2023_Version1.pdf" },
        { label: "Final T3 2023 (Version 2)", url: "/communication/pastpapers/Finals/Final_T3_2023_Version2.pdf" },
        { label: "Final T3 2023 (Version 3)", url: "/communication/pastpapers/Finals/Final_T3_2023_Version3.pdf" }
      ]
    } 
  },
  
  control: { 
    coords: { x: 63.32, y: 48.49, w: 5.25, h: 5.23 }, 
    content: {
      titleEn: "Control", titleAr: "أنظمة تحكم",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  control_lab: { 
    coords: { x: 71.77, y: 48.03, w: 6.61, h: 6.37 }, 
    content: {
      titleEn: "Control Lab", titleAr: "مختبر تحكم",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  advance_control: { 
    coords: { x: 55.91, y: 57.13, w: 5.59, h: 5.24 }, 
    content: {
      titleEn: "Advanced Control", titleAr: "تحكم متقدم",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electronics_1: { 
    coords: { x: 80.44, y: 45.53, w: 5.7, h: 5.46 }, 
    content: {
      titleEn: "Electronics 1", titleAr: "إلكترونيات 1",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electronics_1_lab: { 
    coords: { x: 90.82, y: 44.62, w: 6.73, h: 6.6 }, 
    content: {
      titleEn: "Electronics 1 Lab", titleAr: "مختبر إلكترونيات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  power_electronics: { 
    coords: { x: 80.44, y: 57.36, w: 5.7, h: 5.23 }, 
    content: {
      titleEn: "Power Electronics", titleAr: "إلكترونيات القدرة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  power_electronics_lab: { 
    coords: { x: 91.16, y: 56.91, w: 6.85, h: 6.37 }, 
    content: {
      titleEn: "Power Electronics Lab", titleAr: "مختبر إلكترونيات القدرة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electrical_machines: { 
    coords: { x: 91.51, y: 25.96, w: 5.24, h: 5.24 }, 
    content: {
      titleEn: "Electrical Machines 1", titleAr: "آلات كهربائية 1",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  machines_lab: { 
    coords: { x: 90.71, y: 35.75, w: 6.73, h: 6.37 }, 
    content: {
      titleEn: "Electrical Machines Lab", titleAr: "مختبر آلات كهربائية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  plc: { 
    coords: { x: 73.71, y: 65.78, w: 6.84, h: 5.46 }, 
    content: {
      titleEn: "PLC", titleAr: "متحكمات منطقية مبرمجة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  plc_lab: { 
    coords: { x: 74.51, y: 81.7, w: 5.24, h: 6.6 }, 
    content: {
      titleEn: "PLC Lab", titleAr: "مختبر PLC",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  assembly: { 
    coords: { x: 26.01, y: 37.34, w: 5.71, h: 5.01 }, 
    content: {
      titleEn: "Assembly", titleAr: "أنظمة المعالجات الدقيقة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  assembly_lab: { 
    coords: { x: 16.2, y: 36.43, w: 6.85, h: 6.37 }, 
    content: {
      titleEn: "Assembly Lab", titleAr: "مختبر أنظمة المعالجات الدقيقة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  sensors: { 
    coords: { x: 26.36, y: 50.76, w: 5.24, h: 5.46 }, 
    content: {
      titleEn: "Sensors and Actuators", titleAr: "المجسات والمشغلات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  sensors_lab: { 
    coords: { x: 16.66, y: 48.94, w: 6.84, h: 9.1 }, 
    content: {
      titleEn: "Sensors Lab", titleAr: "مختبر المجسات والمشغلات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  industrial_processes: { 
    coords: { x: 44.95, y: 43.94, w: 6.62, h: 5.46 }, 
    content: {
      titleEn: "Industrial Processes", titleAr: " التجهيزات الصناعية والتحكم",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  industrial_processes_Lab: { 
    coords: { x: 33.41, y: 37.33, w: 8.05, h: 6.55 }, 
    content: {
      titleEn: "Industrial Processes Lab", titleAr: "مختبر التجهيزات الصناعية والتحكم",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  eng_materials: { 
    coords: { x: 45.07, y: 54.76, w: 6.27, h: 6.82 }, 
    content: {
      titleEn: "Applied Engineering Materials", titleAr: "المواد الهندسية التطبيقية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  hydraulic_drive: { 
    coords: { x: 41.53, y: 66.92, w: 6.5, h: 5.46 }, 
    content: {
      titleEn: "Hydraulic Drive", titleAr: "قيادة هيدروليكية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  hydraulic_lab: { 
    coords: { x: 52.14, y: 66.23, w: 8.45, h: 6.37 }, 
    content: {
      titleEn: "Hydraulic Lab", titleAr: "مختبر هيدروليك",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_dynamics: { 
    coords: { x: 31.03, y: 73.06, w: 6.28, h: 7.05 }, 
    content: {
      titleEn: "Robotics Dynamics", titleAr: "ديناميكا الروبوتات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_lab: { 
    coords: { x: 18.6, y: 61.68, w: 7.98, h: 8.65 }, 
    content: {
      titleEn: "Robotics Lab", titleAr: "مختبر روبوتات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  mechatronics_design: { 
    coords: { x: 53.28, y: 80.57, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "Mechatronics Design", titleAr: "تصميم أنظمة ميكاترونكس",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electric_drive: { 
    coords: { x: 63.32, y: 89.34, w: 5.25, h: 5 }, 
    content: {
      titleEn: "Electric Drive", titleAr: "قيادة كهربائية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electric_drive_lab: { 
    coords: { x: 52.6, y: 88.66, w: 6.73, h: 6.14 }, 
    content: {
      titleEn: "Electric Drive Lab", titleAr: "مختبر قيادة كهربائية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  renewable_energy: { 
    coords: { x: 24.42, y: 83.88, w: 6.96, h: 7.05 }, 
    content: {
      titleEn: "Renewable Energy", titleAr: "طاقة متجددة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  mems: { 
    coords: { x: 35.6, y: 88.07, w: 5.25, h: 5.46 }, 
    content: {
      titleEn: "MEMS", titleAr: "أنظمة كهروميكانيكية صغرية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cnc: { 
    coords: { x: 43.81, y: 88.3, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "CNC", titleAr: "تحكم رقمي باستخدام الحاسوب",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_eng: { 
    coords: { x: 19.51, y: 72.83, w: 6.5, h: 5.46 }, 
    content: {
      titleEn: "Robotics Engineering", titleAr: "هندسة روبوتات",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  scada: { 
    coords: { x: 90.71, y: 66.69, w: 6.5, h: 5.69 }, 
    content: {
      titleEn: "SCADA", titleAr: "أنظمة سكادا",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cam_cad: { 
    coords: { x: 34, y: 52.36, w: 6.28, h: 6.59 }, 
    content: {
      titleEn: "CAM/CAD", titleAr: "تصميم وتصنيع بالحاسوب",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  special_topics: { 
    coords: { x: 30.92, y: 62.82, w: 6.16, h: 6.83 }, 
    content: {
      titleEn: "Special Topics", titleAr: "مواضيع خاصة",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  protection_devices: { 
    coords: { x: 67.2, y: 73.97, w: 6.62, h: 5.46 }, 
    content: {
      titleEn: "Protection Devices", titleAr: "أجهزة حماية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  eng_economy: { 
    coords: { x: 82.95, y: 3.44, w: 4.9, h: 7.05 }, 
    content: {
      titleEn: "Engineering Economy", titleAr: "اقتصاد هندسي",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  military: { 
    coords: { x: 82.83, y: 13, w: 5.02, h: 7.28 }, 
    content: {
      titleEn: "Military Sciences", titleAr: "علوم عسكرية",
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  }
};
