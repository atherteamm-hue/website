// src/data/curriculumData.ts

export interface CourseContent {
  titleEn: string;
  titleAr: string;
  books: { label: string; url: string; coverUrl?: string; isArabic?: boolean; isSolution?: boolean }[];
  summaries: (
    | { label: string; url: string }
    | { label: string; type: 'folder'; items: { label: string; url: string }[] }
  )[];
  videos?: { label: string; url: string }[];
  quizzes?: (
    | { label: string; url: string }
    | { label: string; type: 'folder'; items: { label: string; url: string }[] }
  )[];
  mid: { label: string; url: string }[];
  final: { label: string; url: string }[];
  credits: number;
}

export interface Course {
  coords: { x: number; y: number; w: number; h: number };
  content: CourseContent;
}

export const curriculumData: Record<string, Course> = {
  
  english_1: { 
    coords: { x: 2.21, y: 4, w: 5.32, h: 5.21 }, 
    content: {
      titleEn: "English 1", titleAr: "لغة إنجليزية 1", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  english_2: { 
    coords: { x: 2.31, y: 15.42, w: 5.22, h: 5.2 }, 
    content: {
      titleEn: "English 2", titleAr: "لغة إنجليزية 2", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  tech_writing: { 
    coords: { x: 2.21, y: 26.43, w: 5.52, h: 5.2 }, 
    content: {
      titleEn: "Technical Writing", titleAr: "الكتابة التقنية والاخلاقيات المهنية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  nat_edu: { 
    coords: { x: 10.14, y: 5.01, w: 5.62, h: 5.4 }, 
    content: {
      titleEn: "National Education", titleAr: "تربية وطنية", credits: 3,
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
      titleEn: "Applied Arabic", titleAr: "لغة عربية تطبيقية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  innovation: { 
    coords: { x: 11.55, y: 25.03, w: 3.41, h: 8.4 }, 
    content: {
      titleEn: "Innovation", titleAr: "الريادة والابتكار", credits: 2,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  comp_skills: { 
    coords: { x: 17.77, y: 17.82, w: 6.73, h: 6 }, 
    content: {
      titleEn: "Computer Skills", titleAr: "مهارات حاسوب", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  eng_drawing: { 
    coords: { x: 19.88, y: 3, w: 2.71, h: 8.61 }, 
    content: {
      titleEn: "Engineering Drawing", titleAr: "رسم هندسي", credits: 2,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  workshop: { 
    coords: { x: 26.61, y: 3, w: 6.62, h: 6.41 }, 
    content: {
      titleEn: "Engineering Workshop", titleAr: "مشاغل هندسية", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  calculus_1: { 
    coords: { x: 35.14, y: 3.6, w: 5.22, h: 5.61 }, 
    content: {
      titleEn: "Calculus 1", titleAr: "تفاضل وتكامل 1", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  calculus_2: { 
    coords: { x: 44.48, y: 3.8, w: 5.32, h: 5.61 }, 
    content: {
      titleEn: "Calculus 2", titleAr: "تفاضل وتكامل 2", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  diff_eq: { 
    coords: { x: 26.91, y: 15.82, w: 5.22, h: 5.6 }, 
    content: {
      titleEn: "Differential Equations", titleAr: "معادلات تفاضلية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  numerical: { 
    coords: { x: 34.24, y: 16.02, w: 5.42, h: 5 }, 
    content: {
      titleEn: "Numerical Methods", titleAr: "تقنيات عددية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  probability: { 
    coords: { x: 41.57, y: 15.22, w: 5.62, h: 5.4 }, 
    content: {
      titleEn: "Probability", titleAr: "	احصاء واحتمالات للهندسة ", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  statics: { 
    coords: { x: 55.32, y: 3.6, w: 5.12, h: 5.81 }, 
    content: {
      titleEn: "Statics", titleAr: "ستاتيكا", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  physics_1: { 
    coords: { x: 73.09, y: 3.8, w: 5.83, h: 5.21 }, 
    content: {
      titleEn: "Physics 1", titleAr: "فيزياء 1", credits: 3,
      books: [
        { label: "Physics for Scientists and Engineers 9ed", 
         url: "https://ia601005.us.archive.org/34/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed.pdf",
         coverUrl: "/BooksCover/physics-cover.png" 
        },
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
      titleEn: "Physics 2", titleAr: "فيزياء 2", credits: 3,
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
      titleEn: "Physics Lab", titleAr: "مختبر فيزياء", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  gen_chemistry: { 
    coords: { x: 91.77, y: 3.6, w: 5.42, h: 5.01 }, 
    content: {
      titleEn: "General Chemistry", titleAr: "الكيمياء العامة", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  chem_lab: { 
    coords: { x: 91.27, y: 15.02, w: 6.72, h: 4.8 }, 
    content: {
      titleEn: "Chemistry Lab", titleAr: "مختبر الكيمياء العامة", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cpp: { 
    coords: { x: 28.64, y: 25.28, w: 5.25, h: 5.23 }, 
    content: {
      titleEn: "C++", titleAr: "البرمجة للمهندسين (C++)", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  digital_logic: { 
    coords: { x: 37.88, y: 25.28, w: 5.25, h: 5.46 }, 
    content: {
      titleEn: "Digital Logic", titleAr: "تصميم المنطق رقمي", credits: 3,
      books: [
        { 
          label: "Digital Design 5th Edition", 
          url: "/digital logic design/books/dl_book_01.pdf", 
          coverUrl: "/BooksCover/dl_book_01.png" 
        },
        { 
          label: "Solutions Manual (5th Ed)", 
          url: "/digital logic design/books/dl_book_02.pdf", 
          coverUrl: "/BooksCover/dl_book_01.png", 
          isSolution: true 
        }
      ], 
      videos: [
        { label: "Dr. Mohammed Al-Hammouri", url: "https://youtube.com/playlist?list=PLy42_pl2XRL5zomcjQRuiweCbq_TLg73n&si=Z6JZSRH5lMVvxJS6" },
        { label: "Eng. Natalie Al-Kayed", url: "https://youtube.com/playlist?list=PLjiyR6nPcbxy_nbEQHBj5MwGicZRTRM_w&si=ZcOVSBMcilzFiAvA" },
        { label: "Eng. Samer", url: "https://drive.google.com/drive/folders/1bN5m11Z-zCsAMwpOBeZ4bJ6BQ9GOkhht" }
      ],
      summaries: [
        { label: "Dr. Mazen Summary", url: "/digital logic design/summaries/summary_01.pdf" },
        { label: "Course Notebook", url: "/digital logic design/summaries/summary_02.pdf" },
        { label: "Eng. Samah Notebook", url: "/digital logic design/summaries/summary_03.pdf" },
        { label: "Dr. Shurahbeel Slides", url: "/digital logic design/summaries/summary_04.pdf" }
      ], 
      mid: [
        { label: "Past Paper 1", url: "/digital logic design/pastpapers/pastpaper_01.pdf" },
        { label: "Past Paper 2", url: "/digital logic design/pastpapers/pastpaper_02.pdf" },
        { label: "Past Paper 3", url: "/digital logic design/pastpapers/pastpaper_03.pdf" },
        { label: "Past Paper 4", url: "/digital logic design/pastpapers/pastpaper_04.pdf" },
        { label: "Past Paper 5", url: "/digital logic design/pastpapers/pastpaper_05.pdf" },
        { label: "Past Paper 6", url: "/digital logic design/pastpapers/pastpaper_06.pdf" },
        { label: "Past Paper 7", url: "/digital logic design/pastpapers/pastpaper_07.pdf" },
        { label: "Past Paper 8", url: "/digital logic design/pastpapers/pastpaper_08.pdf" },
        { label: "Past Paper 9", url: "/digital logic design/pastpapers/pastpaper_09.pdf" },
        { label: "Past Paper 10", url: "/digital logic design/pastpapers/pastpaper_10.pdf" },
        { label: "Past Paper 11", url: "/digital logic design/pastpapers/pastpaper_11.pdf" }
      ], 
      final: [
        { label: "Past Paper 12", url: "/digital logic design/pastpapers/pastpaper_12.pdf" },
        { label: "Past Paper 13", url: "/digital logic design/pastpapers/pastpaper_13.pdf" },
        { label: "Past Paper 14", url: "/digital logic design/pastpapers/pastpaper_14.pdf" },
        { label: "Past Paper 15", url: "/digital logic design/pastpapers/pastpaper_15.pdf" }
      ]
    } 
  },
  
  linear_algebra: { 
    coords: { x: 47.58, y: 24.14, w: 5.59, h: 5.24 }, 
    content: {
      titleEn: "Linear Algebra", titleAr: "جبر خطي", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  machine_components: { 
    coords: { x: 54.99, y: 14.59, w: 5.48, h: 5.23 }, 
    content: {
      titleEn: "Machine Components", titleAr: "مكونات الالة ", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  dynamic_vibration: { 
    coords: { x: 55.11, y: 25.74, w: 5.36, h: 5.68 }, 
    content: {
      titleEn: "Dynamics and Vibration", titleAr: "ديناميكا واهتزازات", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
circuits_1: { 
    coords: { x: 63.21, y: 26.65, w: 5.48, h: 5.68 }, 
    content: {
      titleEn: "Circuits 1", 
      titleAr: " دوائر كهربائية 1", credits: 3, 
      
      // 1. Books & Solutions
      books: [
        { 
          label: "Analysis of Electrical Electronic Circuits", 
          url: "/Circuit_1/books/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.png",
          isArabic: true
        },
        { 
          label: "Solutions Manual (Arabic)", 
          url: "/Circuit_1/books/Book_Solutions_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.png",
          isArabic: true,
          isSolution: true 
        },
        { 
          label: "Fundamentals of Circuits 7th Ed", 
          url: "/Circuit_1/books/Book_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.png"
        },
        { 
          label: "Solutions Manual (7th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.png",
          isSolution: true 
        },
        { 
          label: "Engineering Circuit Analysis 9th Ed", 
          url: "/Circuit_1/books/Book_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.png"
        },
        { 
          label: "Solutions Manual (9th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.png",
          isSolution: true 
        },
        { 
          label: "Electric Circuits 11th Edition", 
          url: "/Circuit_1/books/Book_Electric_Circuits_11th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electric_Circuits_11th_Edition.png"
        },
        { 
          label: "Electronics Fundamentals 8th Ed", 
          url: "/Circuit_1/books/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.png"
        },
        { 
          label: "Introductory Circuit Analysis 13th Ed", 
          url: "/Circuit_1/books/Book_Introductory_Circuit_Analysis_13th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Introductory_Circuit_Analysis_13th_Edition.png"
        }
      ], 
      
      // 2. Videos / Lectures
      videos: [
        { label: "Spark Team Explanation", url: "https://www.youtube.com/playlist?list=PL4Itv3LsZJuyWPRdr8mR849IKdb05XNX1" },
        { label: "Samer Issa Explanation", url: "https://www.youtube.com/playlist?list=PLawhbyHTpbgG2VR16b5y8v05-yW4kB-jP" },
        { label: "Tesla Team Explanation", url: "https://www.youtube.com/playlist?list=PL2C_OpeEqP-LgiDcixQR4QyN2n9EQTwuR" },
        { label: "SREE Explanation", url: "https://www.youtube.com/playlist?list=PLNBj23z192s-4nPfxC8jTxyayuuJRyTGz" }
      ],

      // 3. Summaries & Notes
      summaries: [
        { label: "Dr. Amjad Al-Hindi Notebook", url: "/Circuit_1/Summaries/Notebook_Dr_Amjad_AlHindi.pdf" },
        { label: "Eng. Yaseen Slides", url: "/Circuit_1/Summaries/Slides_Eng_Yaseen_Circuit1.pdf" },
        { label: "Spark Team Summary", url: "/Circuit_1/Summaries/Summary_Spark_Circuit1.pdf" },
        { label: "Spark Team Summary (New)", url: "/Circuit_1/Summaries/Summary_Spark_New_Circuit1.pdf" },
        { label: "Zero One Team Summary", url: "/Circuit_1/Summaries/Zero_One_Circuit1.pdf" }
      ], 

      // 4. Quizzes
      quizzes: [
        {
          label: "Quizzes Archive",
          type: 'folder',
          items: [
            { label: "Quiz 1", url: "/Circuit_1/Quizzes/Quiz_1.pdf" },
            { label: "Quiz 2", url: "/Circuit_1/Quizzes/Quiz_2.pdf" },
            { label: "Quiz 3", url: "/Circuit_1/Quizzes/Quiz_3.pdf" }
          ]
        }
      ],
      
      // 5. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2026", url: "/Circuit_1/PastPapers/Mid_2026_Circuit1.pdf" },
        { label: "2026", url: "/Circuit_1/PastPapers/Mid_2025_Sem2_Circuit1.pdf" },
        { label: "2025", url: "/Circuit_1/PastPapers/Mid_2025_Circuit1.pdf" },
        { label: "2025", url: "/Circuit_1/PastPapers/Mid_2025_Alt_Circuit1.pdf" },
        { label: "2025", url: "/Circuit_1/PastPapers/Mid_2025_Sem1_Circuit1.pdf" },
        { label: "Makeup 2025", url: "/Circuit_1/PastPapers/Mid_Makeup_2025_Circuit1.pdf" },
        { label: "2024", url: "/Circuit_1/PastPapers/Mid_2024_Circuit1.pdf" },
        { label: "2024", url: "/Circuit_1/PastPapers/Mid_2024_Summer_Circuit1.pdf" },
        { label: "2023", url: "/Circuit_1/PastPapers/Mid_2023_Circuit1.pdf" },
        { label: "Screens (2020-2021)", url: "/Circuit_1/PastPapers/Mid_Screens_2020-2021_Circuit1.pdf" },
        { label: "2015", url: "/Circuit_1/PastPapers/Mid_2015_Circuit1.pdf" },
        { label: "2014", url: "/Circuit_1/PastPapers/Mid_2014_Circuit1.pdf" },
        { label: "Mid Exam", url: "/Circuit_1/PastPapers/Mid_Exam_Circuit1.pdf" },
        { label: "Mid Exam", url: "/Circuit_1/PastPapers/Mid_Exam_Circuit1_2.pdf" }
      ], 
      
      // 6. Final Exams (مرتبة تنازلياً)
      final: [
        { label: " 2024", url: "/Circuit_1/PastPapers/Final_2024_Circuit1.pdf" },
        { label: "2015-2018", url: "/Circuit_1/PastPapers/Final_2015-2018_Circuit1.pdf" }
      ]
    } 
  },
  
circuits_2: { 
    coords: { x: 78.61, y: 21.87, w: 5.25, h: 5.91 }, 
    content: {
      titleEn: "Circuits 2", 
      titleAr: "دوائر كهربائية 2", credits: 3, 
      
      // 1. Books & Solutions (نفس كتب سيركت 1 بالضبط)
      books: [
        { 
          label: "Analysis of Electrical Electronic Circuits", 
          url: "/Circuit_1/books/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.png",
          isArabic: true
        },
        { 
          label: "Solutions Manual (Arabic)", 
          url: "/Circuit_1/books/Book_Solutions_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.png",
          isArabic: true,
          isSolution: true 
        },
        { 
          label: "Fundamentals of Circuits 7th Ed", 
          url: "/Circuit_1/books/Book_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.png"
        },
        { 
          label: "Solutions Manual (7th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.png",
          isSolution: true 
        },
        { 
          label: "Engineering Circuit Analysis 9th Ed", 
          url: "/Circuit_1/books/Book_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.png"
        },
        { 
          label: "Solutions Manual (9th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.png",
          isSolution: true 
        },
        { 
          label: "Electric Circuits 11th Edition", 
          url: "/Circuit_1/books/Book_Electric_Circuits_11th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electric_Circuits_11th_Edition.png"
        },
        { 
          label: "Electronics Fundamentals 8th Ed", 
          url: "/Circuit_1/books/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.png"
        },
        { 
          label: "Introductory Circuit Analysis 13th Ed", 
          url: "/Circuit_1/books/Book_Introductory_Circuit_Analysis_13th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Introductory_Circuit_Analysis_13th_Edition.png"
        }
      ], 
      
      // 2. Videos / Lectures
      videos: [
        { label: "Ahmad Khawaja Explanation", url: "https://www.youtube.com/playlist?list=PLfHIBOSWCljUsYwx7Q9HxH-ZK9B8uiv94" },
        { label: "Eng. Kareem Explanation", url: "https://www.youtube.com/playlist?list=PLFM6wDAJoh-88gjdMrSJ28aPkw2-9uR6f" },
        { label: "CNE Explanation", url: "https://www.youtube.com/playlist?list=PLJwCQtAhsso9OHZiNjPkdHXrsp3dCkpxA" }
      ],

      // 3. Summaries & Notes
      summaries: [
        { label: "Ahmad Khawaja Summary", url: "/Circuit_2/Summaries/Ahmad_Khawaja_Circuit2.pdf" },
        { label: "Eng. Yaseen Slides", url: "/Circuit_2/Summaries/Slides_Eng_Yaseen_Circuit2.pdf" }
      ], 
      
      // 4. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2025", url: "/Circuit_2/PastPapers/Mid_2025_Circuit2.pdf" },
        { label: "2024", url: "/Circuit_2/PastPapers/Mid_2024_Circuit2.pdf" },
        { label: "2024", url: "/Circuit_2/PastPapers/Mid_2024_Alt_Circuit2.pdf" },
        { label: "2024", url: "/Circuit_2/PastPapers/Mid_Exam_2024_Circuit2.pdf" },
        { label: "2023", url: "/Circuit_2/PastPapers/Mid_Exam_2023_Circuit2.pdf" },
        { label: "2023", url: "/Circuit_2/PastPapers/Mid_2023_Circuit2.pdf" },
        { label: "2023 ", url: "/Circuit_2/PastPapers/Mid_2023_Alt_Circuit2.pdf" },
        { label: "2022", url: "/Circuit_2/PastPapers/Mid_2022_Circuit2.pdf" },
        { label: "2019", url: "/Circuit_2/PastPapers/Mid_2019_Circuit2.pdf" },
        { label: "2016", url: "/Circuit_2/PastPapers/Mid_2016_Circuit2.pdf" },

        { label: "Mid Exam", url: "/Circuit_2/PastPapers/Mid_Exam_Circuit2.pdf" }
      ], 
      
      // 5. Final Exams (مرتبة تنازلياً)
      final: [
        { label: "2023", url: "/Circuit_2/PastPapers/Final_2023_Circuit2.pdf" },
        { label: "2022", url: "/Circuit_2/PastPapers/Final_2022_Circuit2.pdf" },
        { label: "Final Exam", url: "/Circuit_2/PastPapers/Final_Circuit2.pdf" }
      ]
    } 
  },
  
circuits_lab: { 
    coords: { x: 77.81, y: 31.65, w: 6.85, h: 5.92 }, 
    content: {
      titleEn: "Circuits Lab", 
      titleAr: " مختبر دوائر كهربائية", credits: 1, 
      
      books: [], // فارغ، سيختفي القسم
      
      summaries: [
        { label: "Lab Manual", url: "/Lab_Circuit/Lab_Manual.pdf" }
      ], 
      
      videos: [], // فارغ، سيختفي القسم
      
      mid: [], // فارغ
      
      final: [
        { label: "Final Screens", url: "/Lab_Circuit/Lab_Screens_Final.pdf" }
      ]
    } 
  },
  
signals: { 
    coords: { x: 63.21, y: 38.93, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "Signals & Systems", 
      titleAr: "انظمة واشارات", credits: 3, 
      
      // 1. Books
     // 1. Books
      books: [
        { 
          label: "Signals and Systems 2nd Ed (Schaum Outline)", 
          url: "/Signal/books/Signals and Systems 2nd Edition - Schaum Outline_compressed.pdf",
          coverUrl: "/BooksCover/Signals and Systems 2nd Edition - Schaum Outline_compressed.png" 
        },
        { 
          label: "Signals and Systems 2nd Ed (Alan V. Oppenheim)", 
          url: "/Signal/books/Signals and Systems 2nd Edition - alan v_compressed.pdf", 
          coverUrl: "/BooksCover/Signals and Systems 2nd Edition - alan v_compressed.png" 
        }
      ],
      
      // 2. Videos / Lectures
      videos: [
        { label: "Spectrum Team ", url: "https://www.youtube.com/watch?v=ARB7PBRlPGc" },
        { label: "Bashar Zayoud (EES) ", url: "https://www.youtube.com/playlist?list=PLdL3o9rqPLb6pX0jukRtna5XE-1ZKPGCI" },
        { label: "Arabic Explanation Playlist", url: "https://www.youtube.com/watch?v=2mz2alVD8f4&list=PLmtVLconakTY6y0Thd050QsvkHTJF8TWa&index=1" },
        { label: "Hazem Masoud ", url: "https://www.youtube.com/watch?v=HB1kOC7yWRw&list=PL2Ii6Wj70DwEfieCcOUh-EIrZkjab2YYl" }
      ],

      // 3. Summaries & Notes
      summaries: [
        { label: "Fourier & Laplace Transform", url: "/Signal/summaries/Fourier Transform and Laplace Transform.pdf" },
        { label: "Signals & Systems By MAE & AF", url: "/Signal/summaries/Signals & Systems By MAE & AF.pdf" },
        { label: "Eng. Nibal Notes", url: "/Signal/summaries/دوسية م.نبال_.pdf" },
        { label: "Dr. Jawdat Slides", url: "/Signal/summaries/سلايدات د.جودت_.pdf" }
      ], 
      
      // 4. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2025", url: "/Signal/pastpapers/midterms/ميد 2025_.pdf" },
        { label: "2024", url: "/Signal/pastpapers/midterms/ميد 2024_.pdf" },
        { label: "2023 ", url: "/Signal/pastpapers/midterms/Signal Midterm 2023.pdf" },
        { label: "2023 ", url: "/Signal/pastpapers/midterms/امتحان ميد 2023_.pdf" },
        { label: "2023 ", url: "/Signal/pastpapers/midterms/ميد 2023_.pdf" },
        { label: "2008", url: "/Signal/pastpapers/midterms/ميد 2008_.pdf" },
        { label: "2008", url: "/Signal/pastpapers/midterms/Midterm 2008.pdf" },
        { label: "2006", url: "/Signal/pastpapers/midterms/Midterm 2006.pdf" },
        { label: "2005 ", url: "/Signal/pastpapers/midterms/Exam Midterm 2005.pdf" },
        { label: "2005 ", url: "/Signal/pastpapers/midterms/Midterm 2005.pdf" },
        { label: "2005", url: "/Signal/pastpapers/midterms/Midterm Exam 2005.pdf" },
        { label: "2004", url: "/Signal/pastpapers/midterms/Midterm 2004.pdf" },
        { label: "2004", url: "/Signal/pastpapers/midterms/Midterm Exam 2004.pdf" }
      ], 
      
      // 5. Final Exams (مرتبة تنازلياً)
      final: [
        { label: "2025", url: "/Signal/pastpapers/finals/فاينل 2025.pdf" },
        { label: "2023", url: "/Signal/pastpapers/finals/فاينل 2023.pdf" }
      ]
    } 
  },
  
communication: { 
    coords: { x: 47.81, y: 36.2, w: 5.36, h: 5.46 }, 
    content: {
      titleEn: "Communication", 
      titleAr: "اتصالات وتراسل بيانات", credits: 3, 
      
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
      
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "2026", url: "/communication/pastpapers/Quizzes/Quiz_1_2026.pdf" },
            { label: "Ch4 (2023-24)", url: "/communication/pastpapers/Quizzes/Quiz_Ch4_T2_2023-24.pdf" }, // ← الفاصلة اللي كانت ناقصة
            { label: "2023", url: "/communication/pastpapers/Quizzes/Quiz_1_T3_2023.pdf" },
            { label: "2023", url: "/communication/pastpapers/Quizzes/Quiz_2_T3_2023.pdf" },
            { label: "2023", url: "/communication/pastpapers/Quizzes/Quiz_3_T3_2023.pdf" },
            { label: "2022", url: "/communication/pastpapers/Quizzes/Quiz_1_2022.pdf" },
            { label: "2022", url: "/communication/pastpapers/Quizzes/Quiz_2_2022.pdf" },
            { label: "2022", url: "/communication/pastpapers/Quizzes/Quiz_3_2022.pdf" } // آخر عنصر ما بيحتاج فاصلة
          ]
        }
      ],

      mid: [
        { label: "2026", url: "/communication/pastpapers/Mids/Mid_2026.pdf" },
        { label: "25-26", url: "/communication/pastpapers/Mids/Mid_25-26_1st_Semester_MAE.pdf" }, // ← الفاصلة اللي كانت ناقصة
        { label: "2025", url: "/communication/pastpapers/Mids/Mid_2025.pdf" },
        { label: "2024", url: "/communication/pastpapers/Mids/Mid_2024.pdf" },
        { label: "2024", url: "/communication/pastpapers/Mids/Mid_Exam_2024.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_T2_2023.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_T3_2023.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_2023.pdf" },
        { label: "22-23", url: "/communication/pastpapers/Mids/Mid_Fall_2022-23.pdf" },
        { label: "2022 ", url: "/communication/pastpapers/Mids/Mid_2022_Additional.pdf" } // آخر عنصر ما بيحتاج فاصلة
      ], 
      
      final: [
        { label: "2026", url: "/communication/pastpapers/Finals/Final_Exam_2026.pdf" },
        { label: "2026", url: "/communication/pastpapers/Finals/Final_Summer_2026.pdf" },
        { label: "2024-25", url: "/communication/pastpapers/Finals/Final_Summer_2024-25.pdf" },
        { label: "2023", url: "/communication/pastpapers/Finals/Final_T3_2023_Version1.pdf" },
        { label: "2023", url: "/communication/pastpapers/Finals/Final_T3_2023_Version2.pdf" },
        { label: "2023", url: "/communication/pastpapers/Finals/Final_T3_2023_Version3.pdf" },
        { label: "2022", url: "/communication/pastpapers/Finals/Final_Exam_2022.pdf" }
      ]
    } 
  },
  
  control: { 
    coords: { x: 63.32, y: 48.49, w: 5.25, h: 5.23 }, 
    content: {
      titleEn: "Control", titleAr: "أنظمة تحكم", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  control_lab: { 
    coords: { x: 71.77, y: 48.03, w: 6.61, h: 6.37 }, 
    content: {
      titleEn: "Control Lab", titleAr: "مختبر تحكم", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  advance_control: { 
    coords: { x: 55.91, y: 57.13, w: 5.59, h: 5.24 }, 
    content: {
      titleEn: "Advanced Control", titleAr: "تحكم متقدم", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electronics_1: { 
    coords: { x: 80.44, y: 45.53, w: 5.7, h: 5.46 }, 
    content: {
      titleEn: "Electronics 1", titleAr: "إلكترونيات 1", credits: 3,
      books: [
        { 
          label: "Electronic Devices and Circuit Theory 11th Ed", 
          url: "/electronics1/books/electronics_devices_circuit_theory_11th_edition.pdf", 
          coverUrl: "/BooksCover/electronics_devices_circuit_theory_11th_edition.png" 
        },
        { 
          label: "Solutions Manual (11th Ed)", 
          url: "/electronics1/books/electronics_devices_circuit_theory_11th_edition_solutions.pdf", 
          coverUrl: "/BooksCover/electronics_devices_circuit_theory_11th_edition.png", 
          isSolution: true 
        }
      ], 
      summaries: [
        { label: "Spectrum Team Summary", url: "/electronics1/summarize/electronics_summary_spectrum.pdf" },
        { label: "Eng. Khoula Notebook", url: "/electronics1/summarize/notebook_m_khoula.pdf" },
        { label: "Dr. Majed Slides", url: "/electronics1/summarize/slides_dr_majed.pdf" },
        { label: "Mohammed Aid Slides", url: "/electronics1/summarize/slides_mohammed_aid.pdf" }
      ], 
      videos: [
        { label: "Spark Team Explanation", url: "https://www.youtube.com/playlist?list=PL4Itv3LsZJuyt-6bhNl99zDhkwf2zyaHo" },
        { label: "Mohammed Aid Explanation", url: "https://www.youtube.com/playlist?list=PLkXK5Ys6YkPJeYfEHo8Rei1dToH6hB5e1" }
      ], 
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "2025", url: "/electronics1/past papers/كويزات/quiz_1_2025.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2026", url: "/electronics1/past_papers/midterm_2026.pdf" },
        { label: "2025", url: "/electronics1/past_papers/midterm_2025.pdf" },
        { label: "2024", url: "/electronics1/past_papers/midterm_2024.pdf" },
        { label: "2023", url: "/electronics1/past_papers/midterm_2023.pdf" },
        { label: "2023", url: "/electronics1/past_papers/electronics_midterm_2023.pdf" },
        { label: "2023", url: "/electronics1/past_papers/electronics_paper_2023.pdf" },
        { label: "2022", url: "/electronics1/past_papers/midterm_2022.pdf" },
        { label: "2016", url: "/electronics1/past_papers/midterm_2016.pdf" },
        { label: "2012", url: "/electronics1/past_papers/midterm_2012.pdf" }
      ], 
      final: [
        { label: "2025", url: "/electronics1/past_papers/final_2025.pdf" },
        { label: "2024", url: "/electronics1/past_papers/final_2024.pdf" },
        { label: "Screens", url: "/electronics1/past_papers/screens_final.pdf" }
      ]
    } 
  },
  
  electronics_1_lab: { 
    coords: { x: 90.82, y: 44.62, w: 6.73, h: 6.6 }, 
    content: {
      titleEn: "Electronics 1 Lab", titleAr: "مختبر إلكترونيات", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  power_electronics: { 
    coords: { x: 80.44, y: 57.36, w: 5.7, h: 5.23 }, 
    content: {
      titleEn: "Power Electronics", titleAr: "إلكترونيات القدرة", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  power_electronics_lab: { 
    coords: { x: 91.16, y: 56.91, w: 6.85, h: 6.37 }, 
    content: {
      titleEn: "Power Electronics Lab", titleAr: "مختبر إلكترونيات القدرة", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electrical_machines: { 
    coords: { x: 91.51, y: 25.96, w: 5.24, h: 5.24 }, 
    content: {
      titleEn: "Electrical Machines 1", titleAr: "آلات كهربائية 1", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  machines_lab: { 
    coords: { x: 90.71, y: 35.75, w: 6.73, h: 6.37 }, 
    content: {
      titleEn: "Electrical Machines Lab", titleAr: "مختبر آلات كهربائية", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  plc: { 
    coords: { x: 73.71, y: 65.78, w: 6.84, h: 5.46 }, 
    content: {
      titleEn: "PLC", titleAr: "متحكمات منطقية مبرمجة", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  plc_lab: { 
    coords: { x: 74.51, y: 81.7, w: 5.24, h: 6.6 }, 
    content: {
      titleEn: "PLC Lab", titleAr: "مختبر PLC", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  assembly: { 
    coords: { x: 26.01, y: 37.34, w: 5.71, h: 5.01 }, 
    content: {
      titleEn: "Assembly", titleAr: "أنظمة المعالجات الدقيقة", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  assembly_lab: { 
    coords: { x: 16.2, y: 36.43, w: 6.85, h: 6.37 }, 
    content: {
      titleEn: "Assembly Lab", titleAr: "مختبر أنظمة المعالجات الدقيقة", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  sensors: { 
    coords: { x: 26.36, y: 50.76, w: 5.24, h: 5.46 }, 
    content: {
      titleEn: "Sensors and Actuators", titleAr: "المجسات والمشغلات", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  sensors_lab: { 
    coords: { x: 16.66, y: 48.94, w: 6.84, h: 9.1 }, 
    content: {
      titleEn: "Sensors Lab", titleAr: "مختبر المجسات والمشغلات", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  industrial_processes: { 
    coords: { x: 44.95, y: 43.94, w: 6.62, h: 5.46 }, 
    content: {
      titleEn: "Industrial Processes", titleAr: " التجهيزات الصناعية والتحكم", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  industrial_processes_Lab: { 
    coords: { x: 33.41, y: 37.33, w: 8.05, h: 6.55 }, 
    content: {
      titleEn: "Industrial Processes Lab", titleAr: "مختبر التجهيزات الصناعية والتحكم", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  eng_materials: { 
    coords: { x: 45.07, y: 54.76, w: 6.27, h: 6.82 }, 
    content: {
      titleEn: "Applied Engineering Materials", titleAr: "المواد الهندسية التطبيقية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  hydraulic_drive: { 
    coords: { x: 41.53, y: 66.92, w: 6.5, h: 5.46 }, 
    content: {
      titleEn: "Hydraulic Drive", titleAr: "قيادة هيدروليكية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  hydraulic_lab: { 
    coords: { x: 52.14, y: 66.23, w: 8.45, h: 6.37 }, 
    content: {
      titleEn: "Hydraulic Lab", titleAr: "مختبر هيدروليك", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_dynamics: { 
    coords: { x: 31.03, y: 73.06, w: 6.28, h: 7.05 }, 
    content: {
      titleEn: "Robotics Dynamics", titleAr: "ديناميكا الروبوتات", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_lab: { 
    coords: { x: 18.6, y: 61.68, w: 7.98, h: 8.65 }, 
    content: {
      titleEn: "Robotics Lab", titleAr: "مختبر روبوتات", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  mechatronics_design: { 
    coords: { x: 53.28, y: 80.57, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "Mechatronics Design", titleAr: "تصميم أنظمة ميكاترونكس", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electric_drive: { 
    coords: { x: 63.32, y: 89.34, w: 5.25, h: 5 }, 
    content: {
      titleEn: "Electric Drive", titleAr: "قيادة كهربائية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  electric_drive_lab: { 
    coords: { x: 52.6, y: 88.66, w: 6.73, h: 6.14 }, 
    content: {
      titleEn: "Electric Drive Lab", titleAr: "مختبر قيادة كهربائية", credits: 1,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  renewable_energy: { 
    coords: { x: 24.42, y: 83.88, w: 6.96, h: 7.05 }, 
    content: {
      titleEn: "Renewable Energy", titleAr: "طاقة متجددة", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  mems: { 
    coords: { x: 35.6, y: 88.07, w: 5.25, h: 5.46 }, 
    content: {
      titleEn: "MEMS", titleAr: "أنظمة كهروميكانيكية صغرية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cnc: { 
    coords: { x: 43.81, y: 88.3, w: 5.48, h: 5.46 }, 
    content: {
      titleEn: "CNC", titleAr: "تحكم رقمي باستخدام الحاسوب", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  robotics_eng: { 
    coords: { x: 19.51, y: 72.83, w: 6.5, h: 5.46 }, 
    content: {
      titleEn: "Robotics Engineering", titleAr: "هندسة روبوتات", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  scada: { 
    coords: { x: 90.71, y: 66.69, w: 6.5, h: 5.69 }, 
    content: {
      titleEn: "SCADA", titleAr: "التحكم الاشرافي والتقاط البيانات ", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  cam_cad: { 
    coords: { x: 34, y: 52.36, w: 6.28, h: 6.59 }, 
    content: {
      titleEn: "CAM/CAD", titleAr: "تصميم عناصر الالة والتصميم بالحاسوب", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  special_topics: { 
    coords: { x: 30.92, y: 62.82, w: 6.16, h: 6.83 }, 
    content: {
      titleEn: "Special Topics", titleAr: "	موضوعات خاصة في هندسة الميكاترونكس ", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
protection_devices: { 
    coords: { x: 67.2, y: 73.97, w: 6.62, h: 5.46 }, 
    content: {
      titleEn: "Protection Devices", 
      titleAr: "اجهزة الحماية", credits: 3, 
      
      // 1. Books
      books: [
        { 
          label: "Protection Relaying Principles and Applications", 
          url: "/protection/books/protection_relaying_principles_and_applications.pdf",
          coverUrl: "/BooksCover/protection_relaying_principles_and_applications.png" 
        },
        { 
          label: "Electrical Installation Handbook (Protection & Control)", 
          url: "/protection/books/electrical_installation_handbook_protection_control_electrical_devices.pdf",
          coverUrl: "/BooksCover/electrical_installation_handbook_protection_control_electrical_devices.png" 
        },
        { 
          label: "Handbook for Protection Engineers", 
          url: "/protection/books/handbook_for_protection_engineers.pdf",
          coverUrl: "/BooksCover/handbook_for_protection_engineers.png" 
        }
      ], 
      
      // لا توجد فيديوهات لهذه المادة، سيختفي القسم تلقائياً

      // 2. Summaries & Slides
      summaries: [
        {
          label: "Numbered Slides",
          type: 'folder',
          items: [
            { label: "01 Fuses", url: "/protection/summaries/slides/01_fuses.pdf" },
            { label: "02 Fuses", url: "/protection/summaries/slides/02_fuses.pdf" },
            { label: "03 Fuses", url: "/protection/summaries/slides/03_fuses.pdf" },
            { label: "04 Circuit Breakers", url: "/protection/summaries/slides/04_circuit_breakers.pdf" },
            { label: "05 Circuit Breakers", url: "/protection/summaries/slides/05_circuit_breakers.pdf" },
            { label: "06 Circuit Breakers", url: "/protection/summaries/slides/06_circuit_breakers.pdf" },
            { label: "07 Circuit Breakers", url: "/protection/summaries/slides/07_circuit_breakers.pdf" },
            { label: "08 Circuit Breakers", url: "/protection/summaries/slides/08_circuit_breakers.pdf" },
            { label: "09 Circuit Breakers", url: "/protection/summaries/slides/09_circuit_breakers.pdf" },
            { label: "10 Circuit Breakers", url: "/protection/summaries/slides/10_circuit_breakers.pdf" },
            { label: "12 Control Relays", url: "/protection/summaries/slides/12_control_relays.pdf" },
            { label: "13 Contactors", url: "/protection/summaries/slides/13_contactors.pdf" },
            { label: "14 Solenoid Valves", url: "/protection/summaries/slides/14_solenoid_valves.pdf" },
            { label: "16 Voltage & Current Transformers", url: "/protection/summaries/slides/16_voltage_and_current_transformers.pdf" },
            { label: "17 Solid State Relay", url: "/protection/summaries/slides/17_solid_state_relay.pdf" }
          ]
        },
        {
          label: "Subject Slides (Categorized)",
          type: 'folder',
          items: [
            // Circuit Breakers
            { label: "CB: Lighting", url: "/protection/summaries/subject_slides/circuit_breakers/11_circuit_breakers_lighting.pdf" },
            { label: "CB: Distribution Boards", url: "/protection/summaries/subject_slides/circuit_breakers/distribution_boards.pdf" },
            { label: "CB: EIG H LV Switchgear", url: "/protection/summaries/subject_slides/circuit_breakers/eig_h_lv_switchgear.pdf" },
            { label: "CB: Electrical Installations", url: "/protection/summaries/subject_slides/circuit_breakers/electrical_installations_dr_mohammad_aly.pdf" },
            { label: "CB: Fuses & Switchgear", url: "/protection/summaries/subject_slides/circuit_breakers/fuses_switchgear_circuit_breakers.pdf" },
            { label: "CB: Industrial Control", url: "/protection/summaries/subject_slides/circuit_breakers/industrial_and_automatic_electrical_control.pdf" },
            // Contactors
            { label: "Contactors & Relays 1", url: "/protection/summaries/subject_slides/contactors/contactors_and_relays.pdf" },
            { label: "Contactors & Relays 2", url: "/protection/summaries/subject_slides/contactors/contactors_relays.pdf" },
            { label: "Contactors: Motor Starter", url: "/protection/summaries/subject_slides/contactors/motor_starter.pdf" },
            // Electrical Switches
            { label: "Switches: 03", url: "/protection/summaries/subject_slides/electrical_switches/03.pdf" },
            { label: "Switches: Symbols & Diagrams", url: "/protection/summaries/subject_slides/electrical_switches/electrical_symbols_and_line_diagrams.pdf" },
            { label: "Switches: Induction Type", url: "/protection/summaries/subject_slides/electrical_switches/induction_type_of_switches.pdf" },
            { label: "Switches: Industrial Control", url: "/protection/summaries/subject_slides/electrical_switches/industrial_control.pdf" },
            { label: "Switches: Residential Devices", url: "/protection/summaries/subject_slides/electrical_switches/residential_electrical_devices.pdf" },
            { label: "Switches: Basics Web08", url: "/protection/summaries/subject_slides/electrical_switches/switch_basics_web08.pdf" },
            { label: "Switches: General", url: "/protection/summaries/subject_slides/electrical_switches/switches.pdf" },
            // Fuses
            { label: "Fuses: 02 Characteristics", url: "/protection/summaries/subject_slides/fuses/02_fuse_characteristics.pdf" },
            { label: "Fuses: 03 Fuses", url: "/protection/summaries/subject_slides/fuses/03_fuses.pdf" },
            { label: "Fuses: ESD Components", url: "/protection/summaries/subject_slides/fuses/esd_1_electrical_components.pdf" },
            { label: "Fuses: Classes", url: "/protection/summaries/subject_slides/fuses/fuse_classes.pdf" },
            { label: "Fuses: Switchgear & CB", url: "/protection/summaries/subject_slides/fuses/fuses_switchgear_circuit_breakers.pdf" },
            { label: "Fuses: gG Fuses", url: "/protection/summaries/subject_slides/fuses/gpeu_ferrule_gG_fuses.pdf" },
            { label: "Fuses: Selection Guide", url: "/protection/summaries/subject_slides/fuses/guide_to_fuse_selection.pdf" },
            { label: "Fuses: IP Protection Classes", url: "/protection/summaries/subject_slides/fuses/ip_protection_classes_01.pdf" },
            { label: "Fuses: Safety Switches", url: "/protection/summaries/subject_slides/fuses/safety_switches_fuses.pdf" },
            // Others
            { label: "Others: Electromechanical Devices", url: "/protection/summaries/subject_slides/others/electromechanical_components_devices.pdf" },
            // Relays
            { label: "Relays: Lecture 1", url: "/protection/summaries/subject_slides/relays/01_lecture_1.pdf" },
            { label: "Relays: Timer Relays", url: "/protection/summaries/subject_slides/relays/07_timer_relays.pdf" },
            { label: "Relays: Automobile Types", url: "/protection/summaries/subject_slides/relays/automobile_relay_types.pdf" },
            { label: "Relays: General", url: "/protection/summaries/subject_slides/relays/relays.pdf" },
            { label: "Relays: Schematics & Contactors", url: "/protection/summaries/subject_slides/relays/schematics_contactors_and_relays.pdf" },
            { label: "Relays: Sheldon Munns", url: "/protection/summaries/subject_slides/relays/sheldon_munns_a.pdf" },
            { label: "Relays: Time Delay Applications", url: "/protection/summaries/subject_slides/relays/time_delay_relay_applications.pdf" },
            // Resistors
            { label: "Resistors: Potentiometers", url: "/protection/summaries/subject_slides/resistors/linear_potentiometers_structural_engineering.pdf" },
            { label: "Resistors: Resistance", url: "/protection/summaries/subject_slides/resistors/resistance.pdf" },
            { label: "Resistors: General", url: "/protection/summaries/subject_slides/resistors/resistors.pdf" },
            { label: "Resistors: & Resistance", url: "/protection/summaries/subject_slides/resistors/resistors_and_resistance.pdf" },
            { label: "Resistors: Colour Coding", url: "/protection/summaries/subject_slides/resistors/resistors_colour_coding.pdf" },
            { label: "Resistors: Semiconductor Electronics", url: "/protection/summaries/subject_slides/resistors/semiconductor_electronics.pdf" },
            // Sensors
            { label: "Sensors: Basics", url: "/protection/summaries/subject_slides/sensors/basic_of_sensors.pdf" },
            { label: "Sensors: Fundamentals", url: "/protection/summaries/subject_slides/sensors/fundamentals_of_sensing.pdf" }
          ]
        }
      ], 
      
      // 3. Quizzes & MCQs (Test Banks)
      quizzes: [
        {
          label: "MCQs & Test Banks",
          type: 'folder',
          items: [
            { label: "Circuit Breaker MCQs 1", url: "/protection/past_papers/circuit_breaker_multiple_choice_questions.pdf" },
            { label: "Circuit Breaker MCQs 2", url: "/protection/past_papers/circuit_breakers_mcqs.pdf" },
            { label: "Electrical Fuse MCQ eBook", url: "/protection/past_papers/electrical_fuse_mcq_ebook.pdf" },
            { label: "Electrical Switches Objective Qs", url: "/protection/past_papers/electrical_switches_objective_questions.pdf" },
            { label: "Protection & Switchgear Test Bank", url: "/protection/past_papers/protection_and_switch_gear_test_bank.pdf" },
            { label: "SAP MCQ Question Bank", url: "/protection/past_papers/sap_mcq_question_bank_e2_d.pdf" },
            { label: "Sensors & Transducers Objective Qs", url: "/protection/past_papers/sensors_and_transducers_objective_questions.pdf" }
          ]
        }
      ],

      // 4. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2025", url: "/protection/past_papers/mid_2025.pdf" },
        { label: "2025", url: "/protection/past_papers/mid_2025_exam.pdf" },
        { label: "2024", url: "/protection/past_papers/mid_2024.pdf" },
        { label: "2024", url: "/protection/past_papers/mid_exam_2024.pdf" },
        { label: "2016", url: "/protection/past_papers/mid_2016.pdf" },
        { label: "2015", url: "/protection/past_papers/mid_2015.pdf" },
        { label: "MidExam", url: "/protection/past_papers/mid.pdf" }
      ], 
      
      // 5. Final Exams
      final: [
        { label: "Final Screens", url: "/protection/past_papers/final_screens.pdf" }
      ]
    } 
  },
  
  eng_economy: { 
    coords: { x: 82.95, y: 3.44, w: 4.9, h: 7.05 }, 
    content: {
      titleEn: "Engineering Economy", titleAr: "اقتصاد هندسي", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  },
  
  military: { 
    coords: { x: 82.83, y: 13, w: 5.02, h: 7.28 }, 
    content: {
      titleEn: "Military Sciences", titleAr: "علوم عسكرية", credits: 3,
      books: [], summaries: [], videos: [], mid: [], final: []
    } 
  }
};
