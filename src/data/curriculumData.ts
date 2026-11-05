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
  testBanks?: (
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
      titleEn: "English 1", 
      titleAr: "لغة إنجليزية 1", 
      credits: 3,
      books: [
        { label: "English 101 Textbook", url: "/english101/books/textbook-english-101.pdf", coverUrl: "/BooksCover/textbook-english-101.webp" },
        { label: "Textbook Solutions", url: "/english101/books/textbook-solutions.pdf", coverUrl: "/BooksCover/textbook-english-101.webp", isSolution: true }
      ], 
      summaries: [
        { label: "Grammar Summary", url: "/english101/summarize/grammar-summary.pdf" },
        { label: "Study Guide Videos", url: "/english101/summarize/study-guide-videos.docx" },
        { label: "English 101 Summary", url: "/english101/summarize/summary-english-101.pdf" }
      ], 
      videos: [
        { label: "Dr. Raghda AlSharabati", url: "https://youtube.com/playlist?list=PL2ZbvaoJe0oSXhkaBMp6EuTygRGgAxU5g&si=P7lQBt9BCTraFk97" },
      ], 
      mid: [
        { label: "Unit 1", url: "/english101/past-papers/mid/mid-unit-1-solved.pdf" },
        { label: "Unit 2", url: "/english101/past-papers/mid/mid-unit-2-solved.pdf" },
        { label: "Unit 3", url: "/english101/past-papers/mid/mid-unit-3-solved.pdf" }
      ], 
      final: [
        { label: "Unit 4", url: "/english101/past-papers/final/final-unit-4-solved.pdf" },
        { label: "Unit 5", url: "/english101/past-papers/final/final-unit-5-solved.pdf" },
        { label: "Unit 6", url: "/english101/past-papers/final/final-unit-6-solved.pdf" }
      ]
    } 
  },
  
  english_2: { 
    coords: { x: 2.31, y: 15.42, w: 5.22, h: 5.2 }, 
    content: {
      titleEn: "English 2", 
      titleAr: "لغة إنجليزية 2", 
      credits: 3,
      books: [
        { label: "English 102 Textbook", url: "/english102/books/textbook-english-102.pdf", coverUrl: "/BooksCover/textbook-english-102.webp" },
        { label: "Textbook Solutions", url: "/english102/books/textbook-solutions.pdf", coverUrl: "/BooksCover/textbook-english-102.webp", isSolution: true }
      ], 
      summaries: [
        { label: "Grammar Summary", url: "/english102/summarize/grammar-summary.pdf" },
        { label: "Study Guide Videos", url: "/english102/summarize/study-guide-videos.docx" },
        { label: "Vocabulary Meanings", url: "/english102/summarize/vocabulary-meanings.pdf" }
      ], 
      videos: [
        { label: "Dr. Raghda AlSharabati", url: "https://youtube.com/playlist?list=PL2ZbvaoJe0oTIivT7eXW0xH6OlhdWFIYp&si=HoR3fwzvHv56c2vj" },
      ], 
      mid: [
        { label: "Unit 1", url: "/english102/past-papers/mid/mid-unit-1-solved.pdf" },
        { label: "Unit 2", url: "/english102/past-papers/mid/mid-unit-2-solved.pdf" }
      ], 
      final: [
        { label: "Unit 3", url: "/english102/past-papers/final/final-unit-3-solved.pdf" },
        { label: "Unit 4", url: "/english102/past-papers/final/final-unit-4-solved.pdf" },
        { label: "Unit 5", url: "/english102/past-papers/final/final-unit-5-solved.pdf" }
      ]
    } 
  },
  
 tech_writing: { 
    coords: { x: 2.21, y: 26.43, w: 5.52, h: 5.2 }, 
    content: {
      titleEn: "Technical Writing", 
      titleAr: "الكتابة التقنية والاخلاقيات المهنية", 
      credits: 3,
      
     books: [
        { 
          label: "Technical Writing Part 1", 
          url: "/Technical Writing/books/technical-writing-part-1.pdf",
          coverUrl: "/BooksCover/technical-writing-part-1.webp"
        },
        { 
          label: "Professional Ethics Part 2", 
          url: "/Technical Writing/books/professional-ethics-part-2.pdf",
          coverUrl: "/BooksCover/professional-ethics-part-2.webp"
        }
      ],
      
      summaries: [
        { label: "Midterm Important Notes", url: "/Technical Writing/summaries/midterm-important-notes.pdf" },
        { label: "Technical Writing Full Summary", url: "/Technical Writing/summaries/technical-writing-full-summary.pdf" },
        { label: "Technical Writing Sections 1-7 Summary", url: "/Technical Writing/summaries/technical-writing-sections-1-7-summary.pdf" }
      ], 
      
      videos: [], 
      
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "2024", url: "/Technical Writing/past-papers/quizzes/writing-quizzes.pdf" },
            { label: "Final 2020", url: "/Technical Writing/past-papers/quizzes/final-quizzes.pdf" },
            { label: "2020", url: "/Technical Writing/past-papers/quizzes/technical-writing-quiz.pdf" },
            { label: "General", url: "/Technical Writing/past-papers/quizzes/general-quiz.pdf" },
            { label: "2023", url: "/Technical Writing/past-papers/quizzes/quizzes-summer-2023.pdf" },
            { label: "Section 02", url: "/Technical Writing/past-papers/quizzes/section-02-quiz.pdf" },
            { label: "Section 03", url: "/Technical Writing/past-papers/quizzes/section-03-quiz.pdf" },
            { label: "Section 04", url: "/Technical Writing/past-papers/quizzes/section-04-quiz.pdf" },
            { label: "Section 08", url: "/Technical Writing/past-papers/quizzes/section-08-quiz.pdf" },
            { label: "Section 09", url: "/Technical Writing/past-papers/quizzes/section-09-quiz.pdf" },
            { label: "Section 10", url: "/Technical Writing/past-papers/quizzes/section-10-quiz.pdf" },
            { label: "Section 11", url: "/Technical Writing/past-papers/quizzes/section-11-quiz.pdf" },
            { label: "Section 12", url: "/Technical Writing/past-papers/quizzes/section-12-quiz.pdf" },
            { label: "Section 14", url: "/Technical Writing/past-papers/quizzes/section-14-quiz.pdf" }
          ]
        }
      ],
      
      testBanks: [],
      
      mid: [
        { label: "2021", url: "/Technical Writing/past-papers/mid/midterm-03.pdf" },
        { label: "2021", url: "/Technical Writing/past-papers/mid/midterm-04.pdf" },
        { label: "2020", url: "/Technical Writing/past-papers/mid/midterm-01.pdf" },
        { label: "2020", url: "/Technical Writing/past-papers/mid/midterm-02.pdf" },
        { label: "screens", url: "/Technical Writing/past-papers/mid/midterm-05.pdf" },
      ], 
      
      final: [
        { label: "2020", url: "/Technical Writing/past-papers/final/final-02.pdf" },
        { label: "screens", url: "/Technical Writing/past-papers/final/final-01.pdf" },
        { label: "screens", url: "/Technical Writing/past-papers/final/final-03.pdf" },
        { label: "screens", url: "/Technical Writing/past-papers/final/final-04.pdf" }
      ]
    } 
  },
  
nat_edu: { 
    coords: { x: 10.14, y: 5.01, w: 5.62, h: 5.4 }, 
    content: {
      titleEn: "National Education", titleAr: "تربية وطنية", credits: 3,
      books: [
        { 
          label: "كتاب التربية الوطنية", 
          url: "/Books/مدخل الى الثقافة الوطنية والمدنية_compressed.pdf", 
          coverUrl: "/BooksCover/national-cover.webp", 
          isArabic: true 
        }
      ], 
      summaries: [], 
      videos: [], 
      mid: [
        { label: "Question Bank", url: "/National Education/past-papers/mid/mid-question-bank.pdf" }
      ], 
      final: [
        { label: "2025 Bank", url: "/National Education/past-papers/final/final-2025-bank.pdf" },
        { label: "Question Bank Screens", url: "/National Education/past-papers/final/final-question-bank-screens.pdf" }
      ]
    } 
  },
  
  app_arabic: { 
    coords: { x: 10.64, y: 14.82, w: 5.22, h: 5.4 }, 
    content: {
      titleEn: "Applied Arabic", 
      titleAr: "لغة عربية تطبيقية", 
      credits: 3,
      
      books: [
        { 
          label: "Applied Arabic Textbook", 
          url: "/arabic101/books/textbook-applied-arabic.pdf", 
          coverUrl: "/BooksCover/textbook-applied-arabic.webp",
          isArabic: true
        },
        { 
          label: "Textbook Solutions (Units 1-3)", 
          url: "/arabic101/books/textbook-solutions-units-1-2-3.pdf", 
          coverUrl: "/BooksCover/textbook-applied-arabic.webp",
          isArabic: true,
          isSolution: true
        }
      ], 
      
      summaries: [
        { label: "Book Plan By Years 2025", url: "/arabic101/summarize/book-plan-by-years-2025.pdf" },
        { label: "Study Guide - Rama Aldaifi", url: "/arabic101/summarize/study-guide-rama-aldaifi.pdf" }
      ], 
      
      videos: [], 
      
      quizzes: [],
      
      testBanks: [],
      
      mid: [
        { label: "Unit 1", url: "/arabic101/past-papers/mid/mid-unit-1-past-years-solved.pdf" },
        { label: "Unit 2", url: "/arabic101/past-papers/mid/mid-unit-2-past-years-solved.pdf" }
      ], 
      
      final: [
        { label: "Unit 3", url: "/arabic101/past-papers/final/final-unit-3-solved.pdf" },
        { label: "Unit 4", url: "/arabic101/past-papers/final/final-unit-4-solved.pdf" },
        { label: "Unit 5", url: "/arabic101/past-papers/final/final-unit-5-solved.pdf" },
        { label: "Unit 6", url: "/arabic101/past-papers/final/final-unit-6-solved.pdf" }
      ]
    } 
  },
  
innovation: { 
    coords: { x: 11.55, y: 25.03, w: 3.41, h: 8.4 }, 
    content: {
      titleEn: "Innovation", titleAr: "الريادة والابتكار", credits: 2,
      books: [
        { 
          label: "Innovation Textbook", 
          url: "/Innovation-Organized/Books/Innovation-Textbook.pdf", 
          coverUrl: "/BooksCover/Innovation-Textbook.webp",
          isArabic: true // بفرض إنه الكتاب بالعربي بما إنها مادة متطلبات
        }
      ], 
      summaries: [
        { label: "Course Summary", url: "/Innovation-Organized/Summaries/Innovation-Course-Summary.pdf" },
        { label: "SWOT Analysis Summary", url: "/Innovation-Organized/Summaries/SWOT-Analysis-Summary.pdf" }
      ], 
      videos: [], 
      mid: [
        { label: "2025 Screens", url: "/Innovation-Organized/Past-Papers/Mid/Mid-2025-Screens.pdf" },
        { label: "Question Bank", url: "/Innovation-Organized/Past-Papers/Mid/Mid-Question-Bank.pdf" },
        { label: "Review Questions", url: "/Innovation-Organized/Past-Papers/Mid/Mid-Review-Questions.pdf" }
      ], 
      final: [
        { label: "2025 Screens", url: "/Innovation-Organized/Past-Papers/Final/Final-2025-Screens.pdf" },
        { label: "Compiled Solved", url: "/Innovation-Organized/Past-Papers/Final/Final-Compiled-Solved.pdf" },
        { label: "Question Bank", url: "/Innovation-Organized/Past-Papers/Final/Final-Question-Bank.pdf" },
        { label: "Review Questions", url: "/Innovation-Organized/Past-Papers/Final/Final-Review-Questions.pdf" }
      ]
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
      books: [
        { 
          label: "Workshop Carpentry and Decor", 
          url: "/workshop_lab/books/Book_Workshop-Carpentry-and-Decor.pdf",
          coverUrl: "/BooksCover/Book_Workshop-Carpentry-and-Decor.webp"
        },
        { 
          label: "Workshop Electrical", 
          url: "/workshop_lab/books/Book_Workshop-Electrical.pdf",
          coverUrl: "/BooksCover/Book_Workshop-Electrical.webp"
        },
        { 
          label: "Workshop Lathe and Fitting", 
          url: "/workshop_lab/books/Book_Workshop-Lathe-and-Fitting.pdf",
          coverUrl: "/BooksCover/Book_Workshop-Lathe-and-Fitting.webp"
        },
        { 
          label: "Workshop Welding", 
          url: "/workshop_lab/books/Book_Workshop-Welding.pdf",
          coverUrl: "/BooksCover/Book_Workshop-Welding.webp"
        }
      ], 
      summaries: [
        { label: "Carpentry Summary", url: "/workshop_lab/summarize/Summary_Carpentry.pdf" },
        { label: "Electrical Theory Summary", url: "/workshop_lab/summarize/Summary_Electrical-Theory.pdf" },
        { label: "Lathe Theory Summary", url: "/workshop_lab/summarize/Summary_Lathe-Theory.pdf" },
        { label: "Welding Theory Summary", url: "/workshop_lab/summarize/Summary_Welding-Theory.pdf" }
      ], 
      videos: [], 
      mid: [], 
      final: [
        { label: "Past Papers 1", url: "/workshop_lab/past papers/Past-Papers_Workshop-1.pdf" },
        { label: "Past Papers 2", url: "/workshop_lab/past papers/Past-Papers_Workshop-2.pdf" },
        { label: "Past Papers 3", url: "/workshop_lab/past papers/Past-Papers_Workshop-3.pdf" },
        { label: "Past Papers 4", url: "/workshop_lab/past papers/Past-Papers_Workshop-4.pdf" },
        { label: "Past Papers 5", url: "/workshop_lab/past papers/Past-Papers_Workshop-5.pdf" },
        { label: "Past Papers 6", url: "/workshop_lab/past papers/Past-Papers_Workshop-6.pdf" },
        { label: "Past Papers 7", url: "/workshop_lab/past papers/Past-Papers_Workshop-7.pdf" }
      ]
    } 
  },
  
  calculus_1: { 
    coords: { x: 35.14, y: 3.6, w: 5.22, h: 5.61 }, 
    content: {
      titleEn: "Calculus 1", 
      titleAr: "تفاضل وتكامل 1", 
      credits: 3,
      books: [
        { 
          label: "Calculus 10th Edition", 
          url: "/calc1/books/textbook-calculus-101-10th-edition.pdf", 
          coverUrl: "/BooksCover/textbook-calculus-101-10th-edition.webp" 
        },
        { 
          label: "Solutions Manual", 
          url: "/calc1/books/solutions-manual-calculus-101-10th-edition.pdf", 
          coverUrl: "/BooksCover/textbook-calculus-101-10th-edition.webp", 
          isSolution: true 
        }
      ], 
      summaries: [
        { label: "Ahmed Arafa Summary", url: "/calc1/summarize/summary-ahmed-arafa-calculus-101.pdf" }
      ], 
      videos: [
        { label: "Dr. Kamel Fleifel", url: "https://youtube.com/playlist?list=PLSr-OUj6vInvJL5SXMDPjhrg0YEg3ysng&si=0jjX_iMRiflQwHHC" },
        { label: "Dr. Abdellatif Yousef", url: "https://youtube.com/playlist?list=PLVlLjjK9xCyd_8kMA8F2fNmr3LefBxuOy&si=8QQGW2_kXsrAvyS4" }
      ], 
      quizzes: [],
      testBanks: [],
      mid: [
        { label: "2026", url: "/calc1/past-papers/mid/mid-2026-chapter-2-dr-maamoun.pdf" },
        { label: "2024", url: "/calc1/past-papers/mid/mid-2024-chapter-1.pdf" },
        { label: "2022", url: "/calc1/past-papers/mid/mid-2022.pdf" }
      ], 
      final: [
        { label: "2025", url: "/calc1/past-papers/final/final-2025.pdf" },
        { label: "2017-2018", url: "/calc1/past-papers/final/final-2017-2018.pdf" },
        { label: "Final Exam ", url: "/calc1/past-papers/final/final-solved-exam-handwritten.pdf" },
        { label: "Solutions Scanned (32 Pages)", url: "/calc1/past-papers/final/final-solutions-scanned-32-pages.pdf" }
      ]
    } 
  },
  
  calculus_2: { 
    coords: { x: 44.48, y: 3.8, w: 5.32, h: 5.61 }, 
    content: {
      titleEn: "Calculus 2", 
      titleAr: "تفاضل وتكامل 2", 
      credits: 3,
      
      books: [
        { 
          label: "Calculus Textbook", 
          url: "/calc2/Books/Calculus2-Textbook.pdf", 
          coverUrl: "/BooksCover/Calculus2-Textbook.webp" 
        },
        { 
          label: "Solutions Manual", 
          url: "/calc2/Books/Calculus2-Textbook-Solutions.pdf", 
          coverUrl: "/BooksCover/Calculus2-Textbook.webp", 
          isSolution: true 
        }
      ], 
      
      summaries: [
        { label: "Dr. Ghaleb Notes", url: "/calc2/Summaries/Calculus2-Notes-Dr-Ghaleb.pdf" },
        { label: "Iman Notes", url: "/calc2/Summaries/Calculus2-Notes-Iman.pdf" },
        { label: "Dr. Kamel Slides", url: "/calc2/Summaries/Calculus2-Slides-Dr-Kamel.pdf" }
      ], 
      
      videos: [
        { label: "Dr. Abdellatif Yousef", url: "https://youtube.com/playlist?list=PLFi1eGgZ7jfW-rAw6mDCNCB-7jCBFPZWu&si=XzlFvUEigBc1Xh5v" },
        { label: "Dr. Kamel Fleifel", url: "https://youtube.com/playlist?list=PLSr-OUj6vInu6gHD6q3LBd5jP-3LWuWtc&si=RczgkOV_bNptBzuF" }
      ], 
      
      quizzes: [],
      
      testBanks: [],
      
      mid: [
        { label: "2026", url: "/calc2/Past-Papers/Mid/Mid-2026-Summer.pdf" },
        { label: "2026", url: "/calc2/Past-Papers/Mid/Mid-2026-Semester2.pdf" },
        { label: "2025", url: "/calc2/Past-Papers/Mid/Mid-2025-Dr-Mamoun.pdf" },
        { label: "2025", url: "/calc2/Past-Papers/Mid/Mid-2025.pdf" },
        { label: "2024", url: "/calc2/Past-Papers/Mid/Mid-2024-Semester2-Answer-Key.pdf" },
        { label: "2023", url: "/calc2/Past-Papers/Mid/Mid-2023-Semester2-Solutions.pdf" },
        { label: "2023", url: "/calc2/Past-Papers/Mid/Mid-2023-Semester2.pdf" }
      ], 
      
      final: [
        { label: "2026", url: "/calc2/Past-Papers/Final/Final-2026.pdf" },
        { label: "2025", url: "/calc2/Past-Papers/Final/Final-2025-Solutions-Two-Models-Essay.pdf" },
        { label: "2024", url: "/calc2/Past-Papers/Final/Final-2024-Semester2.pdf" },
        { label: "2024", url: "/calc2/Past-Papers/Final/Final-2024-Semester1.pdf" },
        { label: "2023", url: "/calc2/Past-Papers/Final/Final-2023.pdf" },
        { label: "2020", url: "/calc2/Past-Papers/Final/Final-2020.pdf" }
      ]
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
      titleEn: "Numerical Methods", 
      titleAr: "تقنيات عددية", 
      credits: 3,
      
      books: [
        { 
          label: "Numerical Methods Textbook", 
          url: "/Numerical Methods/books/textbook-numerical-methods.pdf", 
          coverUrl: "/BooksCover/textbook-numerical-methods.webp" 
        },
        { 
          label: "Solutions Manual", 
          url: "/Numerical Methods/books/solutions-manual-numerical-methods.pdf", 
          coverUrl: "/BooksCover/textbook-numerical-methods.webp", 
          isSolution: true 
        }
      ], 
      
      summaries: [
        { label: "Course Notes Handwritten (Full)", url: "/Numerical Methods/summarize/course-notes-handwritten-full.pdf" },
        { label: "Notebook Dr. Amjad", url: "/Numerical Methods/summarize/notebook-dr-amjad.pdf" },
        { label: "Summary and Mid Past Years", url: "/Numerical Methods/summarize/summary-and-mid-past-years.pdf" },
        { label: "Summary Videos", url: "/Numerical Methods/summarize/summary-videos.pdf" }
      ], 
      
      videos: [
        { label: "Civil By Turk - Midterm", url: "https://youtube.com/playlist?list=PL-_Vu9osHhTRehWrWvTYCeKWJxTbXZfKc&si=f02c1cvlnUQOr5ew" },
        { label: "Civil By Turk - Final", url: "https://youtube.com/playlist?list=PL-_Vu9osHhTRgn-daobThwirk71lulg7Q&si=DqcMrSLKT9XXoDCy" }
      ], 
      
      quizzes: [],
      
      testBanks: [],
      
      mid: [
        { label: "2026", url: "/Numerical Methods/past-papers/mid/mid-2026-summer.pdf" },
        { label: "2026", url: "/Numerical Methods/past-papers/mid/mid-2026-sem2.pdf" },
        { label: "2025", url: "/Numerical Methods/past-papers/mid/mid-2025-summer-solved.pdf" },
        { label: "2025", url: "/Numerical Methods/past-papers/mid/mid-2025-sem2.pdf" },
        { label: "2025", url: "/Numerical Methods/past-papers/mid/mid-2025-sem1.pdf" },
        { label: "2025 ", url: "/Numerical Methods/past-papers/mid/mid-2025-sem1-key.pdf" },
        { label: "2024", url: "/Numerical Methods/past-papers/mid/mid-2024-summer-solved.pdf" },
        { label: "2024", url: "/Numerical Methods/past-papers/mid/mid-2024-solved.pdf" },
        { label: "2024", url: "/Numerical Methods/past-papers/mid/mid-2024-sem1-solved.pdf" },
        { label: "2023", url: "/Numerical Methods/past-papers/mid/mid-2023-t2.pdf" },
        { label: "2023", url: "/Numerical Methods/past-papers/mid/mid-2023-t1.pdf" },
        { label: "2023", url: "/Numerical Methods/past-papers/mid/mid-2023-summer.pdf" },
        { label: "2023", url: "/Numerical Methods/past-papers/mid/mid-2023-sem2.pdf" }
      ], 
      
      final: [
        { label: "2025 ", url: "/Numerical Methods/past-papers/final/final-2025-set2.pdf" },
        { label: "2025 ", url: "/Numerical Methods/past-papers/final/final-2025-set1.pdf" },
        { label: "2024", url: "/Numerical Methods/past-papers/final/final-2024-summer.pdf" },
        { label: "2024", url: "/Numerical Methods/past-papers/final/final-2024-sem2.pdf" },
        { label: "2023", url: "/Numerical Methods/past-papers/final/final-2023.pdf" },
        { label: "MCQ Paper", url: "/Numerical Methods/past-papers/final/final-mcq-paper.pdf" }
      ]
    } 
  },
  
probability: {
    coords: { x: 41.57, y: 15.22, w: 5.62, h: 5.4 },
    content: {
      titleEn: "Probability", titleAr: "احصاء واحتمالات للهندسة", credits: 3,
      books: [
        {
          label: "Probability and Statistics Book",
          url: "/Probability/books/كتاب احصاء و احتمالات.pdf",
          coverUrl: "/BooksCover/Screenshot 2026-10-30 224436.webp",
        },
        {
          label: "Book Solutions",
          url: "/Probability/books/حلول كتاب احصاء و احتمالات.pdf",
          coverUrl: "/BooksCover/Screenshot 2026-10-30 224436.webp",
          isSolution: true
        }
      ],
      summaries: [
        { label: "Zero One Summary", url: "/Probability/Summaries/zero one.pdf" },
        { label: "Mohammed Fouad Summary", url: "/Probability/Summaries/احصاء ملخص محمد فؤاد .pdf" },
        { label: "Dr. Mohammed Fouad Notebook", url: "/Probability/Summaries/احصاء واحتمالات - دفتر د.محمد فؤاد.pdf" },
        { label: "Spark Rules Summary", url: "/Probability/Summaries/سبارك ملخص القوانين.pdf" }
      ],
      videos: [
        { label: "Dr.Mohammed Fouad", url: "https://youtube.com/playlist?list=PLFUszXtJ26-7Lox-o7iM7J-5SfSrsESsz&si=kHrfjOEnP8YAVCSJ" }
      ],
      quizzes: [],
      testBanks: [],
      mid: [
        { label: "2026", url: "/Probability/pastpapers/سنوات ميد/احصاء ميد 2026 - صيفي.pdf" },
        { label: "2026", url: "/Probability/pastpapers/سنوات ميد/احصاء ميد 2026 - فصل2.pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات ميد/ميد 2025 - الفصل2 (النموذجين).pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات ميد/ميد 2025 (صيفي).pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات ميد/احصاء 2025 - فصل 1.pdf" },
        { label: "2023", url: "/Probability/pastpapers/سنوات ميد/ميد 2023 (فصل2) - احصاء.pdf" },
        { label: "2023", url: "/Probability/pastpapers/سنوات ميد/ميد 2023 (فصل1) - احصاء.pdf" }
      ],
      final: [
        { label: "2026", url: "/Probability/pastpapers/سنوات فاينل/Probability-2026 final (1).pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات فاينل/فاينال احصاء الصيفي 2025 - محلول.pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات فاينل/احصاء فاينال ف2 - 2025 محلول.pdf" },
        { label: "2025", url: "/Probability/pastpapers/سنوات فاينل/احصاء فاينال ف1 - 2025 محلول.pdf" },
        { label: "2024", url: "/Probability/pastpapers/سنوات فاينل/فاينال احصاء الصيفي - 2024 محلول.pdf" },
        { label: "2024", url: "/Probability/pastpapers/سنوات فاينل/احصاء فاينال - 2024 محلول.pdf" }
      ]
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
         coverUrl: "/BooksCover/physics-cover.webp" 
        },
        { label: "Physics Solutions Manual",
         url: "https://dn790006.ca.archive.org/0/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed%20[solutions].pdf",
         coverUrl: "/BooksCover/PhysicsSolution-cover.webp" ,
         isSolution: true
        }
      ],
      videos: [
        { label: "Dr. Ahmed Awad", url: "https://youtube.com/playlist?list=PLxRkgs4bYI6_CQSgywl7YKsjI6HT_8blD&si=qpyRcGcIU9_nnjDv" },
        { label: "Eng. Hussam Alzamel", url: "https://youtube.com/playlist?list=PL1GsKyC4pE5XJ-xd3Uue5F23R07zOEY_h&si=nErmWaaDlG1ECrJf" }
      ],
      summaries: [
        { label: "Summary of Laws", url: "/physics1/ملخصات/Summary of the Laws of General Physics 101.pdf" },
        { label: "General Summary", url: "/physics1/ملخصات/ملخص فيزياء 1.pdf" },
        {
          label: "Dr. Ziad Slides",
          type: 'folder',
          items: [
            { label: "Chapter 1", url: "/physics1/سلايدات د.زياد/chapter1.pdf" },
            { label: "Problems Ch1", url: "/physics1/سلايدات د.زياد/proplems chapter 1 (1).pdf" },
            { label: "Chapter 2", url: "/physics1/سلايدات د.زياد/chapter2.pdf" },
            { label: "Problems Ch2", url: "/physics1/سلايدات د.زياد/problems chapter 2 (1).pdf" },
            { label: "Chapter 3", url: "/physics1/سلايدات د.زياد/chapter3.pdf" },
            { label: "Problems Ch3", url: "/physics1/سلايدات د.زياد/proplems chapter 3.pdf" },
            { label: "Chapter 4", url: "/physics1/سلايدات د.زياد/chapter4.pdf" },
            { label: "Problems Ch4", url: "/physics1/سلايدات د.زياد/proplems chapter 4.pdf" },
            { label: "Chapter 5", url: "/physics1/سلايدات د.زياد/Chapter5.pdf" },
            { label: "Problems Ch5", url: "/physics1/سلايدات د.زياد/proplems chapter 5.pdf" },
            { label: "Chapter 6", url: "/physics1/سلايدات د.زياد/Chapter6.pdf" },
            { label: "Chapter 7", url: "/physics1/سلايدات د.زياد/Chapter7.pdf" },
            { label: "Problems Ch7", url: "/physics1/سلايدات د.زياد/proplems chapter 7.pdf" },
            { label: "Chapter 8", url: "/physics1/سلايدات د.زياد/Chapter8.pdf" },
            { label: "Problems Ch8", url: "/physics1/سلايدات د.زياد/proplems chapter 8.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2023-2024", url: "/physics1/سنوات/Mid Exam 2023-2024 A.pdf" },
        { label: "2023-2024", url: "/physics1/سنوات/Mid Exam 2023-2024 B.pdf" },
      ], 
      final: [
        { label: "Final Exam", url: "/physics1/سنوات/Final physics.pdf" },
        { label: "Final Exam", url: "/physics1/سنوات/Physics final exam.pdf" },
        { label: "Ch5 100 problems", url: "/physics1/سنوات/100_laws_of_motion_practice_questions.pdf" }
      ]
    } 
  },
  
physics_2: { 
    coords: { x: 73.39, y: 14.62, w: 5.53, h: 5.4 }, 
    content: {
      titleEn: "Physics 2", titleAr: "فيزياء 2", credits: 3,
      books: [
        { 
          label: "Physics for Scientists and Engineers 9ed",
          url: "https://ia601005.us.archive.org/34/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed.pdf",
          coverUrl: "/BooksCover/physics-cover.webp" 
        },
        { 
          label: "Physics Solutions Manual", 
          url: "https://dn790006.ca.archive.org/0/items/SerwayJewettPhysicsForScientistsAndEngineersWithModernPhysics9ed/Serway%20&%20Jewett%20-%20Physics%20for%20Scientists%20and%20Engineers%20with%20Modern%20Physics%209ed%20[solutions].pdf", 
          coverUrl: "/BooksCover/PhysicsSolution-cover.webp",
          isSolution: true
        }
      ],
      summaries: [
        { label: "Formulas Summary", url: "/physics2/summaries/Physics2-Formulas-Summary.pdf" },
        { label: "Full Summary Dr. Sokainah", url: "/physics2/summaries/Physics2-Full-Summary-Dr-Sokainah.pdf" },
        { label: "Summary Dr. Ahmed Awad", url: "/physics2/summaries/Physics2-Summary-Dr-Ahmed-Awad.pdf" },
        { label: "Summary Student Aws", url: "/physics2/summaries/Physics2-Summary-Student-Aws.pdf" },
        {
          label: "Dr. Wasan Slides",
          type: 'folder',
          items: [
            { label: "Chapter 23", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch23.pdf" },
            { label: "Chapter 23 Problems", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch23-Problems.pdf" },
            { label: "Chapter 24", url: "/physics2/summaries/Physics2-summaries-Slides-Dr-Wasan-Ch24.pdf" },
            { label: "Chapter 24 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch24-Problems-Solved.pdf" },
            { label: "Chapter 25", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch25.pdf" },
            { label: "Chapter 25 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch25-Problems-Solved.pdf" },
            { label: "Chapter 26", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch26.pdf" },
            { label: "Chapter 26 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch26-Problems-Solved.pdf" },
            { label: "Chapter 27", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch27.pdf" },
            { label: "Chapter 27 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch27-Problems-Solved.pdf" },
            { label: "Chapter 28", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch28.pdf" },
            { label: "Chapter 28 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Wasan-Ch28-Problems-Solved.pdf" }
          ]
        },
        {
          label: "Dr. Ziad Slides",
          type: 'folder',
          items: [
            { label: "Chapter 23", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch23.pdf" },
            { label: "Chapter 23 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch23-Problems-Solved.pdf" },
            { label: "Chapter 24", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch24.pdf" },
            { label: "Chapter 24 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch24-Problems-Solved.pdf" },
            { label: "Chapter 25", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch25.pdf" },
            { label: "Chapter 25 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch25-Problems-Solved.pdf" },
            { label: "Chapter 26", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch26.pdf" },
            { label: "Chapter 26 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch26-Problems-Solved.pdf" },
            { label: "Chapter 27", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch27.pdf" },
            { label: "Chapter 27 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch27-Problems-Solved.pdf" },
            { label: "Chapter 28", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch28.pdf" },
            { label: "Chapter 28 Problems Solved", url: "/physics2/summaries/Physics2-Slides-Dr-Ziad-Ch28-Problems-Solved.pdf" }
          ]
        }
      ], 
      videos: [
        { label: "Anas Majdi", url: "https://youtu.be/YqYRMOEUtLM?si=G0X5LFkmA3sW5QCj" },
        { label: "Ahmed Awad", url: "https://youtube.com/playlist?list=PLGfzCRt_uWkeed0GtFGOvXvtkhihL2b2z&si=HRcHAXB3u8EdMUT3" }
      ], 
      mid: [
        { label: "Mid 2025 Semester 2", url: "/physics2/Past-Papers/Mid/Mid-2025-Semester2.pdf" },
        { label: "Mid 2026 Semester 2", url: "/physics2/Past-Papers/Mid/Mid-2026-Semester2.pdf" },
        { label: "Mid Compiled Paper Years", url: "/physics2/Past-Papers/Mid/Mid-Compiled-Paper-Years.pdf" }
      ], 
      final: [
        { label: "Final 2024 Semester 2", url: "/physics2/Past-Papers/Final/Final-2024-Semester2.pdf" },
        { label: "Final 2026", url: "/physics2/Past-Papers/Final/Final-2026.pdf" }
      ]
    } 
  },
  
physics_lab: { 
    coords: { x: 62.55, y: 14.01, w: 6.73, h: 6.21 }, 
    content: {
      titleEn: "Physics Lab", titleAr: "مختبر فيزياء عامة", credits: 1,
      books: [
        { 
          label: "Solved Lab Manual All Experiments", 
          url: "/Physics-Lab/Books/Solved-Lab-Manual-All-Experiments.pdf", 
          coverUrl: "/BooksCover/Physics-lab.webp",
          isSolution: true
        },
        { 
          label: "Solved Lab Reports Final", 
          url: "/Physics-Lab/Books/Solved-Lab-Reports-Final.pdf", 
          coverUrl: "/BooksCover/Physics-lab.webp",
          isSolution: true
        },
        { 
          label: "Solved Lab Reports Mid", 
          url: "/Physics-Lab/Books/Solved-Lab-Reports-Mid.pdf", 
          coverUrl: "/BooksCover/Physics-lab.webp",
          isSolution: true
        }
      ], 
      summaries: [
        { label: "Experiments Explained Dr Anwar Al Shishani", url: "/Physics-Lab/Summaries/Experiments-Explained-Dr-Anwar-Al-Shishani.pdf" },
        { label: "Experiments Explained Moh Ali", url: "/Physics-Lab/Summaries/Experiments-Explained-Moh-Ali.pdf" },
        { label: "Formulas Summary Short", url: "/Physics-Lab/Summaries/Formulas-Summary-Short.pdf" },
        { label: "Formulas Summary", url: "/Physics-Lab/Summaries/Formulas-Summary.pdf" },
        { label: "Summary Dr Anwar Al Shishani", url: "/Physics-Lab/Summaries/Summary-Dr-Anwar-Al-Shishani.pdf" },
        { label: "Summary Hussam Zamel", url: "/Physics-Lab/Summaries/Summary-Hussam-Zamel.pdf" }
      ], 
      videos: [
        { label: "ENG.Husam zamel", url: "https://youtube.com/playlist?list=PL1GsKyC4pE5V61WBjFGUbVRFSiaAHmkYL&si=IzvI6VmHnL9FEZ7u" }
      ], 
      mid: [
        { label: "2026", url: "/Physics-Lab/Past-Papers/Mid/Mid-Paper-Scan-2026.pdf" },
        { label: "2023", url: "/Physics-Lab/Past-Papers/Mid/Mid-2023-Term2.pdf" },
        { label: "2024", url: "/Physics-Lab/Past-Papers/Mid/Mid-2024-Questions.pdf" },
        { label: "2022 ", url: "/Physics-Lab/Past-Papers/Mid/Mid-2022-Term2.pdf" },
        { label: "Mid exam", url: "/Physics-Lab/Past-Papers/Mid/Mid-Lab-1B.pdf" },
        { label: "Mid exam", url: "/Physics-Lab/Past-Papers/Mid/Mid-Paper-New.pdf" },
        { label: "Screens", url: "/Physics-Lab/Past-Papers/Mid/Mid-Screens-Part-1.pdf" },
        { label: "Screens", url: "/Physics-Lab/Past-Papers/Mid/Mid-Screens-Part-2.pdf" },
        { label: "Screens", url: "/Physics-Lab/Past-Papers/Mid/Mid-Screens.pdf" }
      ], 
      final: [
        { label: "2022", url: "/Physics-Lab/Past-Papers/Final/Final-2022-Term2.pdf" },
        { label: "Final Exam", url: "/Physics-Lab/Past-Papers/Final/Final-Exam-A.pdf" },
        { label: "Final Exam", url: "/Physics-Lab/Past-Papers/Final/Final-New.pdf" },
        { label: "Online", url: "/Physics-Lab/Past-Papers/Final/Final-Online.pdf" },
        { label: "Final Questions", url: "/Physics-Lab/Past-Papers/Final/Final-Questions-Solved.pdf" },
        { label: "Screens", url: "/Physics-Lab/Past-Papers/Final/Final-Screens-1.pdf" },
        { label: "Screens", url: "/Physics-Lab/Past-Papers/Final/Final-Screens-2.pdf" }
      ]
    } 
  },
  
gen_chemistry: { 
    coords: { x: 91.77, y: 3.6, w: 5.42, h: 5.01 }, 
    content: {
      titleEn: "General Chemistry", 
      titleAr: "الكيمياء العامة", 
      credits: 3,
      
      // 1. Books
      books: [
        { 
          label: "Chemistry Textbook", 
          url: "/Chemistry/Books/Chemistry1-Textbook.pdf", 
          coverUrl: "/BooksCover/Chemistry1-Textbook.webp" 
        },
        { 
          label: "Solutions Manual", 
          url: "/Chemistry/Books/Chemistry1-Textbook-Solutions.pdf", 
          coverUrl: "/BooksCover/Chemistry1-Textbook.webp", 
          isSolution: true 
        }
      ], 
      
      // 2. Videos
      videos: [
        { label: "Dr. Reem", url: "https://youtube.com/playlist?list=PLFUszXtJ26-4YwfUoCy64U3TUeiLT7sLZ&si=-wbaVMIWTLPRiJXA" },
        { label: "Midterm Revision - Dr. Reem", url: "https://youtube.com/playlist?list=PLFUszXtJ26-7BXY4hepzQgQibP6bSc1Vs&si=sB0ZSuKs9YTFTlRC" }
      ],

      // 3. Summaries & Notes
      summaries: [
        { label: "Dr. Reem", url: "/Chemistry/Summaries/Chemistry1-Slides-Dr-Reem.pdf" },
        { label: "Dr. Heba", url: "/Chemistry/Summaries/Chemistry1-Slides-Dr-Heba.pdf" },
        { label: "Dr. Ali", url: "/Chemistry/Summaries/Chemistry1-Slides-Dr-Ali.pdf" },
        { label: "Dr. Mansour Notes", url: "/Chemistry/Summaries/Chemistry1-Notes-Dr-Mansour.pdf" },
        { label: "SPU Summary", url: "/Chemistry/Summaries/Chemistry1-SPU-Summary.pdf" },
        { label: "Formulas Summary (2021)", url: "/Chemistry/Summaries/Chemistry1-Formulas-Summary-2021.pdf" },
        { label: "Formulas Summary", url: "/Chemistry/Summaries/Chemistry1-Formulas-Summary.pdf" }
      ], 
      
      // 4. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2018", url: "/Chemistry/Past-Papers/Mid/Mid-2018-Semester1.pdf" },
        { label: "Screens", url: "/Chemistry/Past-Papers/Mid/Mid-Screens-Solved.pdf" },
        { label: "Online", url: "/Chemistry/Past-Papers/Mid/Mid-Online-Questions.pdf" },
        { label: "Online", url: "/Chemistry/Past-Papers/Mid/Mid-Question-Bank.pdf" },
        { label: "Online", url: "/Chemistry/Past-Papers/Mid/Mid-Compiled-Question-Bank.pdf" }
      ], 
      
      // 5. Final Exams (مرتبة تنازلياً)
      final: [
        { label: "2024", url: "/Chemistry/Past-Papers/Final/Final-2024-Paper-4.pdf" },
        { label: "2023", url: "/Chemistry/Past-Papers/Final/Final-2023-Paper-3.pdf" },
        { label: "2023", url: "/Chemistry/Past-Papers/Final/Final-2023-Paper-2.pdf" },
        { label: "2016", url: "/Chemistry/Past-Papers/Final/Final-2016-Semester1.pdf" },
        { label: "2011-2014", url: "/Chemistry/Past-Papers/Final/Final-2011-2014.pdf" },
        { label: "Final Exam ", url: "/Chemistry/Past-Papers/Final/Final-Paper-1.pdf" },
        { label: "Part 3 Compilation", url: "/Chemistry/Past-Papers/Final/Final-Paper-Part-3-Compilation.pdf" },
        { label: "Online", url: "/Chemistry/Past-Papers/Final/Final-Electronic-Part-1-Compilation.pdf" }
      ]
    } 
  },
  
chem_lab: { 
    coords: { x: 91.27, y: 15.02, w: 6.72, h: 4.8 }, 
    content: {
      titleEn: "Chemistry Lab", titleAr: "مختبر الكيمياء العامة", credits: 1,
      books: [
        { 
          label: "Chemistry Lab Manual", 
          url: "/Chemistry-Lab/Books/Chemistry-Lab-Manual.pdf", 
          coverUrl: "/BooksCover/Chemistry-Lab-Manual.webp" 
        },
        { 
          label: "Solutions - Dr. Reem", 
          url: "/Chemistry-Lab/Books/Solutions-Manual-Dr-Reem.pdf", 
          coverUrl: "/BooksCover/Chemistry-Lab-Manual.webp", 
          isSolution: true 
        },
        { 
          label: "Solutions - Dr. Heba", 
          url: "/Chemistry-Lab/Books/Solutions-Manual-Dr-Heba.pdf", 
          coverUrl: "/BooksCover/Chemistry-Lab-Manual.webp", 
          isSolution: true 
        }
      ], 
      videos: [
        { label: "Dr. Reem", url: "https://youtube.com/playlist?list=PLFUszXtJ26-6-HO1W70DC17Bhmg1vb4T3&si=q-FJHHan1n0UaHpI" },
        { label: "Dr. Heba", url: "https://youtube.com/playlist?list=PLFUszXtJ26-47CybMirDoAsPaspzgtKAW&si=ux30_zMtoYfoFLrs" }
      ],
      summaries: [
        { label: "Laws Summary", url: "/Chemistry-Lab/Summaries/Chemistry-Lab-Formulas-Summary.pdf" },
        { label: "Dr. Reem Notes", url: "/Chemistry-Lab/Summaries/Chemistry-Lab-Notes-Dr-Reem.pdf" }
      ], 
      mid: [
        { label: "2026", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2026-Summer.pdf" },
        { label: "2026", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2026-Semester2.pdf" },
        { label: "2026", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2026-Semester1.pdf" },
        { label: "2025", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2025-Model-2.pdf" },
        { label: "2025", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2025-Model-1.pdf" },
        { label: "2024", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2024-Summer.pdf" },
        { label: "2024", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2024.pdf" },
        { label: "2023", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2023-Semester1.pdf" },
        { label: "2022", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2022-2.pdf" },
        { label: "2022", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2022.pdf" },
        { label: "2021", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-2021.pdf" },
        { label: "Mid Exams", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-Compiled-Years.pdf" },
        { label: "Screens", url: "/Chemistry-Lab/Past-Papers/Mid/Mid-Screens.pdf" }
      ], 
      final: [
        { label: "2025", url: "/Chemistry-Lab/Past-Papers/Final/Final-2025.pdf" },
        { label: "2024", url: "/Chemistry-Lab/Past-Papers/Final/Final-2024.pdf" },
        { label: "2023", url: "/Chemistry-Lab/Past-Papers/Final/Final-2023.pdf" },
        { label: "Final Exam", url: "/Chemistry-Lab/Past-Papers/Final/Final-Paper-2.pdf" },
        { label: "Final Exams", url: "/Chemistry-Lab/Past-Papers/Final/Final-Compiled-Years.pdf" },
        { label: "Final Exams", url: "/Chemistry-Lab/Past-Papers/Final/Final-Lab-Questions-1.pdf" },
        { label: "Final Exams", url: "/Chemistry-Lab/Past-Papers/Final/Final-Lab-Questions-2.pdf" },
        { label: "Final Exams", url: "/Chemistry-Lab/Past-Papers/Final/Final-Question-Bank.pdf" },
        { label: "Screens", url: "/Chemistry-Lab/Past-Papers/Final/Final-Screens.pdf" }
      ]
    } 
  },
  
cpp: { 
    coords: { x: 28.64, y: 25.28, w: 5.25, h: 5.23 }, 
    content: {
      titleEn: "C++", titleAr: "البرمجة للمهندسين (C++)", credits: 3,
      books: [
        { 
          label: "C++ Course Book", 
          url: "/CPP/books/cpp-course-book.pdf", 
          coverUrl: "/BooksCover/cpp-course-book.webp" 
        },
        { 
          label: "C++ How to Program (7th Ed)", 
          url: "/CPP/books/cpp-how-to-program-7th-edition.pdf", 
          coverUrl: "/BooksCover/cpp-how-to-program-7th-edition.webp" 
        }
      ], 
      videos: [
        { label: "Adel Nasim", url: "https://youtube.com/playlist?list=PLCInYL3l2AajFAiw4s1U4QbGszcQ-rAb3&si=4wrDl-yF9NA8s0H9" },
        { label: "CNE", url: "https://youtube.com/playlist?list=PLJwCQtAhsso_YNp8gh6b6sMkNJ8XzK9AP&si=WWpyxGq95d-x4Syz" }
      ],
      summaries: [
        { label: "Solved Examples", url: "/CPP/summarize/cpp-solved-examples.pdf" },
        { label: "Examples", url: "/CPP/summarize/cpp-examples.pdf" },
        { label: "Functions Assignment", url: "/CPP/summarize/cpp-functions-assignment.pdf" },
        { label: "Eng. Samah Slides", url: "/CPP/summarize/slides-samah-programming.pdf" }
      ], 
      mid: [
        { label: "2025", url: "/CPP/past-papers/mid/mid-2025-solved.pdf" },
        { label: "Paper exam", url: "/CPP/past-papers/mid/mid-paper-scan.pdf" }
      ], 
      final: [
        { label: "2025", url: "/CPP/past-papers/final/final-2025-solved.pdf" },
        { label: "screens", url: "/CPP/past-papers/final/final-past-years.pdf" }
      ]
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
          coverUrl: "/BooksCover/dl_book_01.webp" 
        },
        { 
          label: "Solutions Manual (5th Ed)", 
          url: "/digital logic design/books/dl_book_02.pdf", 
          coverUrl: "/BooksCover/dl_book_01.webp", 
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
        { label: "2026", url: "/digital logic design/pastpapers/pastpaper_15.pdf" },
        { label: "2025", url: "/digital logic design/pastpapers/pastpaper_14.pdf" },
        { label: "2025", url: "/digital logic design/pastpapers/pastpaper_01.pdf" },
        { label: "2023", url: "/digital logic design/pastpapers/pastpaper_13.pdf" },
        { label: "screens", url: "/digital logic design/pastpapers/pastpaper_03.pdf" },
        { label: "screens", url: "/digital logic design/pastpapers/pastpaper_04.pdf" },
        { label: "2017", url: "/digital logic design/pastpapers/pastpaper_06.pdf" },
        { label: "2017", url: "/digital logic design/pastpapers/pastpaper_11.pdf" },
        { label: "2016", url: "/digital logic design/pastpapers/pastpaper_10.pdf" },
        { label: "2016", url: "/digital logic design/pastpapers/pastpaper_02.pdf" }
      ], 
      final: [
        { label: "2025", url: "/digital logic design/pastpapers/pastpaper_07.pdf" },
        { label: "2025", url: "/digital logic design/pastpapers/pastpaper_08.pdf" },
        { label: "2016", url: "/digital logic design/pastpapers/pastpaper_05.pdf" },
        { label: "2015", url: "/digital logic design/pastpapers/pastpaper_09.pdf" },
        { label: "Final exam", url: "/digital logic design/pastpapers/pastpaper_12.pdf" }
      ]
    } 
  },
  
linear_algebra: { 
    coords: { x: 47.58, y: 24.14, w: 5.59, h: 5.24 }, 
    content: {
      titleEn: "Linear Algebra", 
      titleAr: "جبر خطي", 
      credits: 3,
      
      books: [
        { 
          label: "Linear Algebra (Anton 12th Edition)", 
          url: "/linear/Books/Linear-Algebra-Anton-12th-Edition.pdf", 
          coverUrl: "/BooksCover/Linear-Algebra-Anton-12th-Edition.webp" 
        },
        { 
          label: "Linear Algebra (Kolman 8th Edition - Spanish)", 
          url: "/linear/Books/Linear-Algebra-Kolman-8th-Edition-Spanish.pdf", 
          coverUrl: "/BooksCover/Linear-Algebra-Kolman-8th-Edition-Spanish.webp" 
        },
        { 
          label: "Manga Guide to Linear Algebra", 
          url: "/linear/Books/Linear-Algebra-Manga-Guide.pdf", 
          coverUrl: "/BooksCover/Linear-Algebra-Manga-Guide.webp" 
        },
        { 
          label: "Linear Algebra (Strang 4th Edition)", 
          url: "/linear/Books/Linear-Algebra-Strang-4th-Edition.pdf", 
          coverUrl: "/BooksCover/Linear-Algebra-Strang-4th-Edition.webp" 
        }
      ],
      
      videos: [
        { label: "Dr. Eman", url: "https://youtube.com/playlist?list=PLFUszXtJ26-68uQf4z7S5wjekW1IPIP7I&si=aG7zdf3ct2vVvVYz" },
        { label: "Anas Abu Zahra", url: "https://youtube.com/playlist?list=PLvuToPs04FnD1lFBolGr4ROQaxQ_zyC1c&si=rGJuOrbq_9tOdu5E" },
        { label: "CNE", url: "https://youtube.com/playlist?list=PLJwCQtAhsso8zTABIMUd0-BVAmRRbYsna&si=B4XPNp3lK1aocKQq" }
      ],

      summaries: [
        { label: "Dr. Eman Notes", url: "/linear/Summaries/Linear-Algebra-Notes-Dr-Eman.pdf" },
        { label: "Dr. Kamel Notes", url: "/linear/Summaries/Linear-Algebra-Notes-Dr-Kamel.pdf" }
      ],
      
      mid: [
        { label: "2026", url: "/linear/Past-Papers/Mid/Mid-2026.pdf" },
        { label: "2025", url: "/linear/Past-Papers/Mid/Mid-2025-Summer.pdf" },
        { label: "2025", url: "/linear/Past-Papers/Mid/Mid-2025-Semester2.pdf" },
        { label: "2025", url: "/linear/Past-Papers/Mid/Mid-2025-Semester1-Two-Models.pdf" },
        { label: "2022", url: "/linear/Past-Papers/Mid/Mid-2022-Summer-Solved.pdf" },
        { label: "2022", url: "/linear/Past-Papers/Mid/Mid-2022-Solved.pdf" }
      ],
      
      final: [
        { label: "2023-2024", url: "/linear/Past-Papers/Final/Final-2023-2024-Term1.pdf" },
        { label: "2023", url: "/linear/Past-Papers/Final/Final-2023-Term1.pdf" },
        { label: "Final Exam", url: "/linear/Past-Papers/Final/Final-Undated-1.pdf" },
        { label: "Final Exam", url: "/linear/Past-Papers/Final/Final-Undated-2.pdf" }
      ]
    } 
  },
  
machine_components: { 
    coords: { x: 54.99, y: 14.59, w: 5.48, h: 5.23 }, 
    content: {
      titleEn: "Machine Components", titleAr: "مكونات الالة ", credits: 3,
      books: [
        { 
          label: "Machines and Mechanisms 4th Edition", 
          url: "/machine components/books/Book_Machines-and-Mechanisms_4th-Edition.pdf", 
          coverUrl: "/BooksCover/Book_Machines-and-Mechanisms_4th-Edition.webp" 
        },
        { 
          label: "Solutions Manual Machines and Mechanisms 4th Edition", 
          url: "/machine components/books/Book_Solutions-Manual_Machines-and-Mechanisms_4th-Edition.pdf", 
          coverUrl: "/BooksCover/Book_Machines-and-Mechanisms_4th-Edition.webp",
          isSolution: true
        }
      ], 
      summaries: [
        { label: "Summary Machine Components", url: "/machine components/summarize/Summary_Machine-Components_First.pdf" }
      ], 
      videos: [], 
      mid: [
        { label: "2022", url: "/machine components/past papers/mid/Midterm_2022_Spring_Page-1.jpg" },
        { label: "2022", url: "/machine components/past papers/mid/Midterm_2022_Spring_Page-2.jpg" },
        { label: "2022", url: "/machine components/past papers/mid/Midterm_2022_Spring_Page-3.jpg" },
        { label: "2022", url: "/machine components/past papers/mid/Midterm_2022_Spring_Page-4.jpg" }
      ], 
      final: []
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
      
      books: [
        { 
          label: "Analysis of Electrical Electronic Circuits", 
          url: "/Circuit_1/books/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.webp",
          isArabic: true
        },
        { 
          label: "Solutions Manual (Arabic)", 
          url: "/Circuit_1/books/Book_Solutions_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.webp",
          isArabic: true,
          isSolution: true 
        },
        { 
          label: "Fundamentals of Circuits 7th Ed", 
          url: "/Circuit_1/books/Book_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.webp"
        },
        { 
          label: "Solutions Manual (7th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.webp",
          isSolution: true 
        },
        { 
          label: "Engineering Circuit Analysis 9th Ed", 
          url: "/Circuit_1/books/Book_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.webp"
        },
        { 
          label: "Solutions Manual (9th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.webp",
          isSolution: true 
        },
        { 
          label: "Electric Circuits 11th Edition", 
          url: "/Circuit_1/books/Book_Electric_Circuits_11th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electric_Circuits_11th_Edition.webp"
        },
        { 
          label: "Electronics Fundamentals 8th Ed", 
          url: "/Circuit_1/books/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.webp"
        },
        { 
          label: "Introductory Circuit Analysis 13th Ed", 
          url: "/Circuit_1/books/Book_Introductory_Circuit_Analysis_13th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Introductory_Circuit_Analysis_13th_Edition.webp"
        }
      ], 
      
      videos: [
        { label: "Spark Team", url: "https://www.youtube.com/playlist?list=PL4Itv3LsZJuyWPRdr8mR849IKdb05XNX1" },
        { label: "Samer Issa", url: "https://www.youtube.com/playlist?list=PLawhbyHTpbgG2VR16b5y8v05-yW4kB-jP" },
        { label: "Tesla Team", url: "https://www.youtube.com/playlist?list=PL2C_OpeEqP-LgiDcixQR4QyN2n9EQTwuR" },
        { label: "SREE", url: "https://www.youtube.com/playlist?list=PLNBj23z192s-4nPfxC8jTxyayuuJRyTGz" },
        { label: "CNE", url: "https://youtube.com/playlist?list=PLJwCQtAhsso_vLmqT9lV1VGCHDAKsK1CS&si=GZoRfqQhvQ4-GQaZ" }
      ],

      summaries: [
        { label: "Dr. Amjad Al-Hindi Notebook", url: "/Circuit_1/Summaries/Notebook_Dr_Amjad_AlHindi.pdf" },
        { label: "Eng. Yaseen Slides", url: "/Circuit_1/Summaries/Slides_Eng_Yaseen_Circuit1.pdf" },
        { label: "Spark Team Summary", url: "/Circuit_1/Summaries/Summary_Spark_Circuit1.pdf" },
        { label: "Spark Team Summary (New)", url: "/Circuit_1/Summaries/Summary_Spark_New_Circuit1.pdf" },
        { label: "Zero One Team Summary", url: "/Circuit_1/Summaries/Zero_One_Circuit1.pdf" }
      ], 

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
      
      books: [
        { 
          label: "Analysis of Electrical Electronic Circuits", 
          url: "/Circuit_1/books/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.webp",
          isArabic: true
        },
        { 
          label: "Solutions Manual (Arabic)", 
          url: "/Circuit_1/books/Book_Solutions_Analysis_of_Electrical_Electronic_Circuits_Arabic.pdf",
          coverUrl: "/BooksCover/Book_Analysis_of_Electrical_Electronic_Circuits_Arabic.webp",
          isArabic: true,
          isSolution: true 
        },
        { 
          label: "Fundamentals of Circuits 7th Ed", 
          url: "/Circuit_1/books/Book_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.webp"
        },
        { 
          label: "Solutions Manual (7th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Fundamentals_of_Circuits_7th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Fundamentals_of_Circuits_7th_Edition.webp",
          isSolution: true 
        },
        { 
          label: "Engineering Circuit Analysis 9th Ed", 
          url: "/Circuit_1/books/Book_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.webp"
        },
        { 
          label: "Solutions Manual (9th Ed)", 
          url: "/Circuit_1/books/Book_Solutions_Engineering_Circuit_Analysis_9th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Engineering_Circuit_Analysis_9th_Edition.webp",
          isSolution: true 
        },
        { 
          label: "Electric Circuits 11th Edition", 
          url: "/Circuit_1/books/Book_Electric_Circuits_11th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electric_Circuits_11th_Edition.webp"
        },
        { 
          label: "Electronics Fundamentals 8th Ed", 
          url: "/Circuit_1/books/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Electronics_Fundamentals_Circuits_Devices_Applications_8th_Edition.webp"
        },
        { 
          label: "Introductory Circuit Analysis 13th Ed", 
          url: "/Circuit_1/books/Book_Introductory_Circuit_Analysis_13th_Edition.pdf",
          coverUrl: "/BooksCover/Book_Introductory_Circuit_Analysis_13th_Edition.webp"
        }
      ], 
      
      videos: [
        { label: "Ahmad Khawaja", url: "https://www.youtube.com/playlist?list=PLfHIBOSWCljUsYwx7Q9HxH-ZK9B8uiv94" },
        { label: "Eng. Kareem", url: "https://www.youtube.com/playlist?list=PLFM6wDAJoh-88gjdMrSJ28aPkw2-9uR6f" },
        { label: "CNE", url: "https://www.youtube.com/playlist?list=PLJwCQtAhsso9OHZiNjPkdHXrsp3dCkpxA" }
      ],

      summaries: [
        { label: "Ahmad Khawaja Summary", url: "/Circuit_2/Summaries/Ahmad_Khawaja_Circuit2.pdf" },
        { label: "Eng. Yaseen Slides", url: "/Circuit_2/Summaries/Slides_Eng_Yaseen_Circuit2.pdf" }
      ], 
      
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
      books: [
        { 
          label: "Signals and Systems 2nd Ed (Schaum Outline)", 
          url: "/Signal/books/Signals and Systems 2nd Edition - Schaum Outline_compressed.pdf",
          coverUrl: "/BooksCover/Signals and Systems 2nd Edition - Schaum Outline_compressed.webp" 
        },
        { 
          label: "Signals and Systems 2nd Ed (Alan V. Oppenheim)", 
          url: "/Signal/books/Signals and Systems 2nd Edition - alan v_compressed.pdf", 
          coverUrl: "/BooksCover/Signals and Systems 2nd Edition - alan v_compressed.webp" 
        }
      ],
      
      // 2. Videos / Lectures
      videos: [
        { label: "Spectrum Team", url: "https://www.youtube.com/watch?v=ARB7PBRlPGc" },
        { label: "Bashar Zayoud (EES)", url: "https://www.youtube.com/playlist?list=PLdL3o9rqPLb6pX0jukRtna5XE-1ZKPGCI" },
        { label: "Arabic Playlist", url: "https://www.youtube.com/watch?v=2mz2alVD8f4&list=PLmtVLconakTY6y0Thd050QsvkHTJF8TWa&index=1" },
        { label: "Hazem Masoud", url: "https://www.youtube.com/watch?v=HB1kOC7yWRw&list=PL2Ii6Wj70DwEfieCcOUh-EIrZkjab2YYl" }
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
          coverUrl: "/BooksCover/Data-Communications-And-Networking.webp" 
        },
        { 
          label: "Solutions Manual", 
          url: "/communication/Books/Book_Solutions_Data_Communication_and_Networking.pdf",
          coverUrl: "/BooksCover/Data-Communications-And-Networking.webp",
          isSolution: true 
        },
        { 
          label: "Data and Computer Communications", 
          url: "/communication/Books/Book_Data_and_Computer_Communications.pdf",
          coverUrl: "/BooksCover/Data-and-Computer-Communications-tenth-edition.webp" 
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
            { label: "Quiz 1-2026", url: "/communication/pastpapers/Quizzes/Quiz_1_2026.pdf" },
            { label: "Quiz 1-2023", url: "/communication/pastpapers/Quizzes/Quiz_Ch4_T2_2023-24.pdf" }, 
            { label: "Quiz 1-2023", url: "/communication/pastpapers/Quizzes/Quiz_1_T3_2023.pdf" },
            { label: "Quiz 1-2022", url: "/communication/pastpapers/Quizzes/Quiz_1_2022.pdf" },
            { label: "Quiz 2-2023", url: "/communication/pastpapers/Quizzes/Quiz_2_T3_2023.pdf" },
            { label: "Quiz 2-2022", url: "/communication/pastpapers/Quizzes/Quiz_2_2022.pdf" },
            { label: "Quiz 3-2023", url: "/communication/pastpapers/Quizzes/Quiz_3_T3_2023.pdf" },
            { label: "Quiz 3-2022", url: "/communication/pastpapers/Quizzes/Quiz_3_2022.pdf" } 
          ]
        }
      ],

      mid: [
        { label: "2026", url: "/communication/pastpapers/Mids/Mid_2026.pdf" },
        { label: "25-26", url: "/communication/pastpapers/Mids/Mid_25-26_1st_Semester_MAE.pdf" }, 
        { label: "2025", url: "/communication/pastpapers/Mids/Mid_2025.pdf" },
        { label: "2024", url: "/communication/pastpapers/Mids/Mid_2024.pdf" },
        { label: "2024", url: "/communication/pastpapers/Mids/Mid_Exam_2024.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_T2_2023.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_T3_2023.pdf" },
        { label: "2023", url: "/communication/pastpapers/Mids/Mid_2023.pdf" },
        { label: "22-23", url: "/communication/pastpapers/Mids/Mid_Fall_2022-23.pdf" },
        { label: "2022 ", url: "/communication/pastpapers/Mids/Mid_2022_Additional.pdf" } 
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
      books: [
        { 
          label: "Modern Control Engineering (Ogata)", 
          url: "/control/books/Book_Modern-Control-Engineering_Ogata.pdf", 
          coverUrl: "/BooksCover/Book_Modern-Control-Engineering_Ogata.webp" 
        },
        { 
          label: "Solutions Manual (Ogata)", 
          url: "/control/books/Book_Solutions-Manual_Modern-Control-Engineering_Ogata.pdf", 
          coverUrl: "/BooksCover/Book_Modern-Control-Engineering_Ogata.webp",
          isSolution: true
        }
      ], 
      summaries: [
        { label: "Slides Control Systems 2022 October", url: "/control/summarize/Slides_Control-Systems_2022-October.pdf" },
        { label: "Summary Control Systems MAE", url: "/control/summarize/Summary_Control-Systems_MAE.pdf" }
      ], 
      videos: [
        { label: "MAE", url: "https://youtube.com/playlist?list=PLRNaExsfJ1qs6LF5rdDHq9w0S3YueJQwS&si=hQ0kp3VZRL_AMyiy" }
      ], 
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "Quiz 1", url: "/control/past papers/quizzes/Quiz_1.pdf" },
            { label: "Quiz 2", url: "/control/past papers/quizzes/Quiz_2.pdf" },
            { label: "Quiz 3", url: "/control/past papers/quizzes/Quiz_3.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2025", url: "/control/past papers/mid/Midterm_2025.pdf" },
        { label: "2016", url: "/control/past papers/mid/Midterm_2016.pdf" },
        { label: "MAE", url: "/control/past papers/mid/Midterm_Control-Systems_MAE.pdf" },
        { label: "SPARK team", url: "/control/past papers/mid/Past-Years-Solved_Control-Systems_SPARK-Team.pdf" }
      ], 
      final: [
        { label: "MAE", url: "/control/past papers/final/Final_Control-Systems_MAE.pdf" },
        { label: "SPARK team", url: "/control/past papers/final/Past-Years-Solved_Control-Systems_SPARK-Team.pdf" }
      ]
    } 
  },
  
control_lab: { 
    coords: { x: 71.77, y: 48.03, w: 6.61, h: 6.37 }, 
    content: {
      titleEn: "Control Lab", titleAr: "مختبر أنظمة التحكم", credits: 1,
      books: [
        { 
          label: "Control System Lab Manual", 
          url: "/Control Lab/books/control-system-lab-manual.pdf", 
          coverUrl: "/BooksCover/control-system-lab-manual.webp" 
        }
      ], 
      summaries: [
        { label: "Hilmi Nazzal Booklet", url: "/Control Lab/summarize/hilmi-nazzal-booklet-3rd-edition.pdf" },
        { label: "Lab Summary New", url: "/Control Lab/summarize/lab-summary-new.pdf" }
      ], 
      videos: [], 
      mid: [
        { label: "2024-2025", url: "/Control Lab/past-papers/mid/mid-2024-2025-solved.pdf" },
        { label: "Mid Exam", url: "/Control Lab/past-papers/mid/mid-izd9-1.pdf" },
        { label: "Mid Exam", url: "/Control Lab/past-papers/mid/mid-izd9-2.pdf" },
        { label: "Mid Exam", url: "/Control Lab/past-papers/mid/mid-izd9-3.pdf" },
        { label: "Mid Exam", url: "/Control Lab/past-papers/mid/mid-paper-1.pdf" },
        { label: "Mid Exam", url: "/Control Lab/past-papers/mid/mid-paper-2.pdf" },
        { label: "Mid Past Years", url: "/Control Lab/past-papers/mid/mid-past-years.pdf" }
      ], 
      final: [
        { label: "2024-2025", url: "/Control Lab/past-papers/final/final-2024-2025-solved.pdf" },
        { label: "Final Exam", url: "/Control Lab/past-papers/final/final-paper-1.pdf" },
        { label: "Final Exam", url: "/Control Lab/past-papers/final/final-paper-2.pdf" },
        { label: "Final Exam", url: "/Control Lab/past-papers/final/final-paper-3.pdf" },
        { label: "Final Exam", url: "/Control Lab/past-papers/final/final-paper-4.pdf" }
      ]
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
          coverUrl: "/BooksCover/electronics_devices_circuit_theory_11th_edition.webp" 
        },
        { 
          label: "Solutions Manual (11th Ed)", 
          url: "/electronics1/books/electronics_devices_circuit_theory_11th_edition_solutions.pdf", 
          coverUrl: "/BooksCover/electronics_devices_circuit_theory_11th_edition.webp", 
          isSolution: true 
        }
      ], 
      summaries: [
        { label: "Eng. Khoula Notebook", url: "/electronics1/summarize/notebook_m_khoula.pdf" },
        { label: "Dr. Majed Slides", url: "/electronics1/summarize/slides_dr_majed.pdf" },
        { label: "Mohammed Aid Slides", url: "/electronics1/summarize/slides_mohammed_aid.pdf" }
      ], 
      videos: [
        { label: "Spark Team", url: "https://www.youtube.com/playlist?list=PL4Itv3LsZJuyt-6bhNl99zDhkwf2zyaHo" },
        { label: "Mohammed Aid", url: "https://www.youtube.com/playlist?list=PLkXK5Ys6YkPJeYfEHo8Rei1dToH6hB5e1" }
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
      books: [
        { 
          label: "Electronics Lab Manual (2021)", 
          url: "/Electronics Lab/books/electronics-lab-manual-2021.pdf",
          coverUrl: "/BooksCover/electronics-lab-manual-2021.webp"
        }
      ], 
      summaries: [
        { label: "Experiment Solutions", url: "/Electronics Lab/summarize/experiment-solutions.pdf" },
        { label: "Lab Explanation", url: "/Electronics Lab/summarize/lab-explanation.pdf" },
        { label: "Lab Slides Dr Majed Al Duwari", url: "/Electronics Lab/summarize/lab-slides-dr-majed-al-duwari.pdf" },
        { label: "Lab Summary New", url: "/Electronics Lab/summarize/lab-summary-new.pdf" },
        { label: "Summary Lin Abu Shuweimah", url: "/Electronics Lab/summarize/summary-lin-abu-shuweimah.pdf" }
      ], 
      videos: [], 
      mid: [
        { label: "2019-2020", url: "/Electronics Lab/past-papers/mid/mid-2019-2020.pdf" },
        { label: "2020-2021", url: "/Electronics Lab/past-papers/mid/mid-2020-2021.pdf" },
        { label: "Mid Exam", url: "/Electronics Lab/past-papers/mid/mid-paper.pdf" }
      ], 
      final: [
        { label: "2020–2021", url: "/Electronics Lab/past-papers/final/final-2020-2021.pdf" },
        { label: "Final Exam", url: "/Electronics Lab/past-papers/final/final-lab-electronics.pdf" }
      ]
    } 
  },
  
power_electronics: { 
    coords: { x: 80.44, y: 57.36, w: 5.7, h: 5.23 }, 
    content: {
      titleEn: "Power Electronics", titleAr: "إلكترونيات القدرة", credits: 3,
      books: [
        { 
          label: "Power Electronics Converters Applications and Design", 
          url: "/power/books/Book_Power-Electronics_Converters-Applications-and-Design.pdf", 
          coverUrl: "/BooksCover/Book_Power-Electronics_Converters-Applications-and-Design.webp" 
        },
        { 
          label: "Power Electronics Daniel W Hart", 
          url: "/power/books/Book_Power-Electronics_Daniel-W-Hart.pdf", 
          coverUrl: "/BooksCover/Book_Power-Electronics_Daniel-W-Hart.webp" 
        },
        { 
          label: "Power Electronics Handbook Muhammad H Rashid", 
          url: "/power/books/Book_Power-Electronics-Handbook_Muhammad-H-Rashid.pdf", 
          coverUrl: "/BooksCover/Book_Power-Electronics-Handbook_Muhammad-H-Rashid.webp" 
        },
        { 
          label: "Power Semiconductor Circuits Dewan Straughen", 
          url: "/power/books/Book_Power-Semiconductor-Circuits_Dewan-Straughen.pdf", 
          coverUrl: "/BooksCover/Book_Power-Semiconductor-Circuits_Dewan-Straughen.webp" 
        },
         { 
          label: "Power electronics arabic", 
          url: "/power/books/power electronics arabic.pdf", 
          coverUrl: "/BooksCover/power electronics arabic.webp",
          isArabic: true
        }
      ], 
      summaries: [
        {
          label: "Course Slides",
          type: 'folder',
          items: [
            { label: "Chapter 01", url: "/power/summarize/Slides_Chapter-01.pdf" },
            { label: "Chapter 02 Power Calculations", url: "/power/summarize/Slides_Chapter-02_Power-Calculations.pdf" },
            { label: "Chapter 03 Half Wave Rectifiers", url: "/power/summarize/Slides_Chapter-03_Half-Wave-Rectifiers.pdf" },
            { label: "Chapter 04 Full Wave Rectifiers", url: "/power/summarize/Slides_Chapter-04_Full-Wave-Rectifiers.pdf" },
            { label: "Chapter 04 3 Three Phase Controlled Rectifiers", url: "/power/summarize/Slides_Chapter-04-3_Three-Phase-Controlled-Rectifiers.pdf" },
            { label: "Chapter 04 3 Three Phase Uncontrolled Rectifiers", url: "/power/summarize/Slides_Chapter-04-3_Three-Phase-Uncontrolled-Rectifiers.pdf" },
            { label: "Chapter 04 4 Three Phase Full Wave Controlled Rectifiers", url: "/power/summarize/Slides_Chapter-04-4_Three-Phase-Full-Wave-Controlled-Rectifiers.pdf" },
            { label: "Chapter 05 AC Voltage Controllers", url: "/power/summarize/Slides_Chapter-05_AC-Voltage-Controllers.pdf" },
            { label: "Chapter 06 DC DC Converters", url: "/power/summarize/Slides_Chapter-06_DC-DC-Converters.pdf" },
            { label: "DC DC Converters 1", url: "/power/summarize/Slides_DC-DC-Converters-1.pdf" },
            { label: "Inverters 1", url: "/power/summarize/Slides_Inverters-1.pdf" }
          ]
        },
        { label: "Summary SPARK Scanned Notes", url: "/power/summarize/Summary_SPARK_Scanned-Notes.pdf" }
      ], 
      videos: [
        { label: "Spectrum", url: "https://youtu.com/B9ivSKnTYpY?si=CcFMQJLX87tqQ1zl" }
      ], 
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "Quizzes MCQ", url: "/power/past papers/quizzes/Quizzes_Power-Electronics-MCQ.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2017", url: "/power/past papers/mid/Midterm_2017.pdf" },
        { label: "Mid Exams", url: "/power/past papers/Past-Years-Questions_Power-Electronics.pdf" },
        { label: "SPARK Team", url: "/power/past papers/Past-Years-Solved_Power-Electronics_SPARK-Team.pdf" }
      ], 
      final: [
        { label: "SPARK Team", url: "/power/past papers/Past-Years-Solved_Power-Electronics_SPARK-Team.pdf" }
      ]
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
      books: [
        { 
          label: "Electric Machinery Fundamentals 4th Edition", 
          url: "/electric-machines-1/books/01_electric-machinery-fundamentals-4th-edition.pdf", 
          coverUrl: "/BooksCover/01_electric-machinery-fundamentals-4th-edition.webp" 
        },
        { 
          label: "Solutions Manual (Fundamentals 4th Ed)", 
          url: "/electric-machines-1/books/04_solutions-of-electric-machinery-fundamentals-4th-edition.pdf", 
          coverUrl: "/BooksCover/01_electric-machinery-fundamentals-4th-edition.webp", 
          isSolution: true 
        },
        { 
          label: "Principles of Electric Machines and Power Electronics", 
          url: "/electric-machines-1/books/02_principles-of-electric-machines-and-power-electronics-3rd-edition.pdf", 
          coverUrl: "/BooksCover/02_principles-of-electric-machines-and-power-electronics-3rd-edition.webp" 
        },
        { 
          label: "Electromagnetic and Electromechanical Machines", 
          url: "/electric-machines-1/books/03_electromagnetic-and-electromechanical-machines-3rd-edition.pdf", 
          coverUrl: "/BooksCover/03_electromagnetic-and-electromechanical-machines-3rd-edition.webp" 
        }
      ], 
      summaries: [
        { label: "Spark Team Summary", url: "/electric-machines-1/past_papers/04_ملخص-سبارك.pdf" }
      ], 
      videos: [
        { label: "CNE", url: "https://youtube.com/playlist?list=PLJwCQtAhsso9W8OA0W2Dx1sWA1dDqvixz&si=cu7raPTQ9r5PN8Xv" }
      ], 
      quizzes: [], // فضيناها ونقلناها تحت
      testBanks: [
        {
          label: "Test Banks & MCQs",
          type: 'folder',
          items: [
            { label: "Test Bank by MAE", url: "/electric-machines-1/past_papers/01_machines-test-bank-by-mae.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2026", url: "/electric-machines-1/past_papers/06_ميد-2026.pdf" },
        { label: "2023", url: "/electric-machines-1/past_papers/05_ميد-2023.pdf" }
      ], 
      final: [
        { label: "Screens", url: "/electric-machines-1/past_papers/02_شاشات-سبارك.pdf" },
        { label: "2010", url: "/electric-machines-1/past_papers/03_فاينل-2010.pdf" }
      ]
    } 
  },
  
  machines_lab: { 
    coords: { x: 90.71, y: 35.75, w: 6.73, h: 6.37 }, 
    content: {
      titleEn: "Electrical Machines Lab", titleAr: "مختبر آلات كهربائية", credits: 1,
      books: [],
      summaries: [],
      videos: [
  { label: "Athar Team", url: "https://drive.google.com/drive/folders/1MN6r3Hz0wZwmX9Bbycb5fn7R6JkVT9dv?usp=drive_link" }
], 
      mid: [],
      final: []
    } 
  },
  
  plc: { 
    coords: { x: 73.71, y: 65.78, w: 6.84, h: 5.46 }, 
    content: {
      titleEn: "PLC", titleAr: "متحكمات منطقية مبرمجة", credits: 3,
      books: [
        { 
          label: "Ourdev PLC Book", 
          url: "/plc/books/plc_book_01_ourdev.pdf", 
          coverUrl: "/BooksCover/plc_book_01_ourdev.webp" 
        },
        { 
          label: "Process Control Instrumentation Technology", 
          url: "/plc/books/plc_book_02_process_control_instrumentation_technology.pdf", 
          coverUrl: "/BooksCover/plc_book_02_process_control_instrumentation_technology.webp" 
        },
        { 
          label: "Programmable Logic Controllers - Petruzella", 
          url: "/plc/books/plc_book_03_programmable_logic_controllers_petruzella.pdf", 
          coverUrl: "/BooksCover/plc_book_03_programmable_logic_controllers_petruzella.webp" 
        }
      ], 
      summaries: [
        { label: "Timers & Counters Example", url: "/plc/summaries/plc_summary_01_timers_counters_example.pdf" },
        { label: "PLC Slides", url: "/plc/summaries/plc_summary_02_plc_slides.pdf" },
        { label: "Dr. Moezz Alsalahat", url: "/plc/summaries/plc_summary_03_dr_moezz_alsalahat.pdf" },
        { label: "PLC Summary", url: "/plc/summaries/plc_summary_04_summary.pdf" },
        { label: "PLC Theory Summary", url: "/plc/summaries/plc_summary_05_summary_plc_theory.pdf" }
      ], 
      videos: [], 
      quizzes: [],
      mid: [
        { label: "2016", url: "/plc/pastpapers/plc_pastpaper_05_mid_2016.pdf" },
        { label: "2016 Exam", url: "/plc/pastpapers/plc_pastpaper_04_mid_2016_exam.pdf" },
        { label: "2023", url: "/plc/pastpapers/plc_pastpaper_06_mid_2023.pdf" },
        { label: "2024", url: "/plc/pastpapers/plc_pastpaper_07_mid_2024.pdf" },
        { label: "2025", url: "/plc/pastpapers/plc_pastpaper_08_mid_2025.pdf" }
      ], 
      final: [
        { label: "2024", url: "/plc/pastpapers/plc_pastpaper_01_final_2024.pdf" },
        { label: "MCQs", url: "/plc/pastpapers/plc_pastpaper_02_final_mcqs.pdf" },
        { label: "Screens", url: "/plc/pastpapers/plc_pastpaper_03_final_screens.pdf" },
        { label: "Mahmoud Final", url: "/plc/pastpapers/plc_pastpaper_09_final_mahmoud.pdf" }
      ]
    } 
  },
  
plc_lab: { 
    coords: { x: 74.51, y: 81.7, w: 5.24, h: 6.6 }, 
    content: {
      titleEn: "PLC Lab", titleAr: "مختبر PLC", credits: 1,
      books: [
        { 
          label: "PLC Lab Manual", 
          url: "/PLC Lab/books/plc-lab-manual.pdf", 
          coverUrl: "/BooksCover/plc-lab-manual.webp" 
        }
      ], 
      summaries: [
        { label: "Lab Reports", url: "/PLC Lab/summarize/lab-reports.pdf" },
        { label: "Lab Summary", url: "/PLC Lab/summarize/lab-summary.pdf" },
        { label: "Summary Mohammad Mahmoud", url: "/PLC Lab/summarize/summary-mohammad-mahmoud.pdf" }
      ], 
      videos: [], 
      mid: [], 
      final: [
        { label: "Final Exam", url: "/PLC Lab/past-papers/final/final-electronic-exam.pdf" }
      ]
    } 
  },
  assembly: { 
    coords: { x: 26.01, y: 37.34, w: 5.71, h: 5.01 }, 
    content: {
      titleEn: "Assembly", 
      titleAr: "أنظمة المعالجات الدقيقة", 
      credits: 3,
      
      // 1. Books
      books: [
        { 
          label: "Assembly Language for x86 Processors 7th Ed", 
          url: "/assembly/books/Assembly_Language_for_x86_Processors_7th_Edition.pdf", 
          coverUrl: "/BooksCover/Assembly_Language_for_x86_Processors_7th_Edition.webp" 
        },
        { 
          label: "Assembly Language Step-by-Step (Linux) 3rd Ed", 
          url: "/assembly/books/Assembly_Language_Step_by_Step_Programming_with_Linux_3rd_Edition.pdf", 
          coverUrl: "/BooksCover/Assembly_Language_Step_by_Step_Programming_with_Linux_3rd_Edition.webp" 
        }
      ], 
      
      // 2. Videos / Lectures
      videos: [
        { label: "CNE", url: "https://youtube.com/playlist?list=PLJwCQtAhsso-kEA-V2NTfm5vXr3tq2fez&si=VF9CgTZrO533lkeE" },
        { label: "Spark Team", url: "https://youtube.com/playlist?list=PL4Itv3LsZJuzvacR1ReJxHbayiyr7VqhD&si=P3F78zGw4uG9uIbY" },
        { label: "Zero One Team", url: "https://youtube.com/playlist?list=PLL4N3hz14nvEI2-RTSjySl_BOKfKLsO5r&si=5ORTvnqTl2h1d7kB" },
        { label: "Omar Aid", url: "https://youtube.com/playlist?list=PLF1ZTFPI256E&si=sHipQlddfz34p5Og" }
      ],

      // 3. Summaries & Notes
      summaries: [
        { label: "Spark Team Notebook", url: "/assembly/notes/Notebook_Microprocessor_Systems_Spark_Summer.pdf" },
        { label: "Zero One Team Notebook (Nour El-Zein)", url: "/assembly/notes/Notebook_Assembly_ZeroOne_Summer2023_Nour_ElZein.pdf" },
        { label: "Dr. M. Roz Slides", url: "/assembly/notes/Slides_Microprocessor_Interfacing_MRoz.pdf" }
      ], 

      // 4. Quizzes (مرتبة تنازلياً)
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "2026", url: "/assembly/pastpapers/quizzes/Quiz_Online_2026.pdf" },
            { label: "2025", url: "/assembly/pastpapers/quizzes/Quiz_2025.pdf" }
          ]
        }
      ],

      // 5. Test Banks
      testBanks: [
        {
          label: "Test Banks",
          type: 'folder',
          items: [
            { label: "Test Bank by MAE", url: "/assembly/pastpapers/test banks/Assembly Test Bank By MAE.pdf" }
          ]
        }
      ],
      
      // 6. Mid Exams (مرتبة تنازلياً)
      mid: [
        { label: "2026", url: "/assembly/pastpapers/midterm/Midterm_2026.pdf" },
        { label: "2025", url: "/assembly/pastpapers/midterm/Midterm_2025.pdf" },
        { label: "2023", url: "/assembly/pastpapers/midterm/Midterm_2023.pdf" },
        { label: "2022", url: "/assembly/pastpapers/midterm/Midterm_2022.pdf" },
        { label: "2022", url: "/assembly/pastpapers/midterm/Midterm_2022_Copy.pdf" },
        { label: "2021", url: "/assembly/pastpapers/midterm/Midterm_2021.pdf" },
        { label: "Screens", url: "/assembly/pastpapers/midterm/Midterm_Moodle_Quiz_Screens.pdf" },
        { label: "2018", url: "/assembly/pastpapers/midterm/Midterm_2018.pdf" },
        { label: "2016", url: "/assembly/pastpapers/midterm/Midterm_2016.pdf" }
      ], 
      final: [
        { label: "2025", url: "/assembly/pastpapers/final/Final_2025.pdf" },
        { label: "2023", url: "/assembly/pastpapers/final/Final_2023.pdf" },
        { label: "2022 ", url: "/assembly/pastpapers/final/Final_2022_Arab_Academy.pdf" },
        { label: "2022 ", url: "/assembly/pastpapers/final/Final_2022_El_Soor.pdf" },
        { label: " Screens", url: "/assembly/pastpapers/final/Final_Moodle_Quiz_Screens.pdf" },
        { label: "Final Exam", url: "/assembly/pastpapers/final/Final_Undated.pdf" }
      ]
    } 
  },
  
assembly_lab: { 
    coords: { x: 16.2, y: 36.43, w: 6.85, h: 6.37 }, 
    content: {
      titleEn: "Assembly Lab", titleAr: "مختبر أنظمة المعالجات الدقيقة", credits: 1,
      books: [],
      summaries: [
        { label: "Summary Assembly Lab", url: "/aseembly_lab/summarize/Summary_Assembly-Lab.pdf" },
        { label: "Summary Interrupts", url: "/aseembly_lab/summarize/Summary_Interrupts.pdf" },
        { label: "Summary String Instructions", url: "/aseembly_lab/summarize/Summary_String-Instructions.pdf" },
        {
          label: "Pre-Lab Templates",
          type: 'folder',
          items: [
            { label: "PreLab Lab 02", url: "/aseembly_lab/books/PreLab_Template_Lab-02.docx" },
            { label: "PreLab Lab 03", url: "/aseembly_lab/books/PreLab_Template_Lab-03.docx" },
            { label: "PreLab Lab 04", url: "/aseembly_lab/books/PreLab_Template_Lab-04.docx" },
            { label: "PreLab Lab 05", url: "/aseembly_lab/books/PreLab_Template_Lab-05.docx" },
            { label: "PreLab Lab 06", url: "/aseembly_lab/books/PreLab_Template_Lab-06.docx" },
            { label: "PreLab Lab 07", url: "/aseembly_lab/books/PreLab_Template_Lab-07.docx" },
            { label: "PreLab Lab 08 Part 1", url: "/aseembly_lab/books/PreLab_Template_Lab-08_Part-1.docx" },
            { label: "PreLab Lab 08 Part 2", url: "/aseembly_lab/books/PreLab_Template_Lab-08_Part-2.docx" },
            { label: "PreLab Lab 09 Part 1", url: "/aseembly_lab/books/PreLab_Template_Lab-09_Part-1.docx" },
            { label: "PreLab Lab 09 Part 2", url: "/aseembly_lab/books/PreLab_Template_Lab-09_Part-2.docx" },
            { label: "PreLab Lab 10", url: "/aseembly_lab/books/PreLab_Template_Lab-10.docx" },
            { label: "PreLab Lab 10 Copy", url: "/aseembly_lab/books/PreLab_Template_Lab-10_copy2.docx" },
            { label: "Guide Emulator Setup", url: "/aseembly_lab/books/Guide_Emulator-Setup.pdf" }
          ]
        },
        {
          label: "Solved Pre-Labs",
          type: 'folder',
          items: [
            { label: "Solved PreLab Lab 02", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-02.pdf" },
            { label: "Solved PreLab Lab 03", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-03.pdf" },
            { label: "Solved PreLab Lab 04", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-04.pdf" },
            { label: "Solved PreLab Lab 05", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-05.pdf" },
            { label: "Solved PreLab Lab 06", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-06.pdf" },
            { label: "Solved PreLab Lab 07", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-07.pdf" },
            { label: "Solved PreLab Lab 08", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-08.pdf" },
            { label: "Solved PreLab Lab 08 Alt", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-08_Alt.pdf" },
            { label: "Solved PreLab Lab 09", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-09.pdf" },
            { label: "Solved PreLab Lab 09 Alt", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-09_Alt.pdf" },
            { label: "Solved PreLab Lab 10", url: "/aseembly_lab/summarize/Solved-PreLab_Lab-10.pdf" },
            { label: "Solved PreLab Extra", url: "/aseembly_lab/summarize/Solved-PreLab_Extra.pdf" }
          ]
        }
      ], 
      videos: [
        { label: "Omar Eid", url: "https://youtube.com/playlist?list=PLF1ZTFPI256E&si=At61KLwEFrMCNOmk" }
      ], 
      mid: [
        { label: "Mid 2023", url: "/aseembly_lab/past papers/mid/Midterm_2023.pdf" },
        { label: "Mid Exam", url: "/aseembly_lab/past papers/mid/Midterm_Scanned.pdf" }
      ], 
      final: [
        { label: "Final 2023", url: "/aseembly_lab/past papers/final/Final_2023.pdf" },
        { label: "Final 2024", url: "/aseembly_lab/past papers/final/Final_2024.pdf" },
        { label: "Final 2022", url: "/aseembly_lab/past papers/final/Final_2022.pdf" },
        { label: "Final 2022 ", url: "/aseembly_lab/past papers/final/Final_2022_copy2.pdf" },
        { label: "Final Exam", url: "/aseembly_lab/past papers/final/Final_Microprocessor-Systems-Lab_2023-2024.pdf" },
        { label: "Final Exam", url: "/aseembly_lab/past papers/final/Final_Scanned.pdf" }
      ]
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
      titleEn: " Processes control", titleAr: " التجهيزات الصناعية والتحكم بالعمليات", credits: 3,
      books: [
        { 
          label: "Process Control Textbook", 
          url: "/process control/books/process-control-lecture-notes.pdf", 
          coverUrl: "/BooksCover/process-control-lecture-notes.webp" 
        }
      ], 
      summaries: [], 
      videos: [], 
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "Quiz 1 Online", url: "/process control/past-papers/quizzes/quiz-1-online.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2024 ", url: "/process control/past-papers/mid/mid-2024-scan.jpg" },
        { label: "2021", url: "/process control/past-papers/mid/mid-2021.pdf" },
        { label: "2016", url: "/process control/past-papers/mid/mid-2016.pdf" }
      ], 
      final: [
        { label: "50 Questions", url: "/process control/past-papers/final/final-50-questions.pdf" }
      ]
    } 
  },
  
industrial_processes_Lab: { 
    coords: { x: 33.41, y: 37.33, w: 8.05, h: 6.55 }, 
    content: {
      titleEn: "Industrial Processes Lab", titleAr: "مختبر التجهيزات الصناعية والتحكم", credits: 1,
      books: [
        { 
          label: "Process Control Lab Manual", 
          url: "/Process Control Lab/books/process-control-lab-manual.pdf", 
          coverUrl: "/BooksCover/process-control-lab-manual.webp" 
        }
      ], 
      summaries: [
        { label: "Lab Summary", url: "/Process Control Lab/summarize/lab-summary.pdf" }
      ], 
      videos: [], 
      mid: [
        { label: "Mid Exam", url: "/Process Control Lab/past-papers/mid/mid-paper-page1.jpg" },
        { label: "Mid Exam", url: "/Process Control Lab/past-papers/mid/mid-paper-page2.jpg" }
      ], 
      final: [
        { label: "2026", url: "/Process Control Lab/past-papers/final/final-2026-page1-alt-photo.jpeg" },
        { label: "2026", url: "/Process Control Lab/past-papers/final/final-2026-page1.jpeg" },
        { label: "2026", url: "/Process Control Lab/past-papers/final/final-2026-page2.jpeg" }
      ]
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
      books: [
        { 
          label: "Hybrid Vehicles Freebook", 
          url: "/Electrical-Drives/books/Hybrid-Vehicles-Freebook.pdf",
          coverUrl: "/BooksCover/Hybrid-Vehicles-Freebook.webp"
        },
        { 
          label: "Power Electronics Thyristor Controlled Motor Drives", 
          url: "/Electrical-Drives/books/Power-Electronics-Thyristor-Controlled-Motor-Drives.pdf",
          coverUrl: "/BooksCover/Power-Electronics-Thyristor-Controlled-Motor-Drives.webp"
        },
        { 
          label: "Power Semiconductor Controlled Drives", 
          url: "/Electrical-Drives/books/Power-Semiconductor-Controlled-Drives.pdf",
          coverUrl: "/BooksCover/Power-Semiconductor-Controlled-Drives.webp"
        }
      ], 
      summaries: [
        { label: "Electric Drives Booklet SPARK Team", url: "/Electrical-Drives/Summaries/Electric-Drives-Booklet-SPARK-Team.pdf" },
        { label: "Electric Drives Booklet", url: "/Electrical-Drives/Summaries/Electric-Drives-Booklet.pdf" },
        { label: "Fundamentals of Electric Drives SPARK Team Duplicate", url: "/Electrical-Drives/Summaries/Fundamentals-of-Electric-Drives-SPARK-Team-Duplicate.pdf" },
        { label: "Fundamentals of Electric Drives SPARK Team", url: "/Electrical-Drives/Summaries/Fundamentals-of-Electric-Drives-SPARK-Team.pdf" },
        {
          label: "Course Slides",
          type: 'folder',
          items: [
            { label: "Unit 01 Concepts and Classification", url: "/Electrical-Drives/Summaries/Slides-Unit-01-Concepts-and-Classification.pdf" },
            { label: "Unit 01A Loads Classification", url: "/Electrical-Drives/Summaries/Slides-Unit-01A-Loads-Classification.pdf" },
            { label: "Unit 02 Multiquadrant Operation", url: "/Electrical-Drives/Summaries/Slides-Unit-02-Multiquadrant-Operation.pdf" },
            { label: "Unit 02 Problems Multiquadrant Operation", url: "/Electrical-Drives/Summaries/Slides-Unit-02-Problems-Multiquadrant-Operation.pdf" },
            { label: "Unit 02A Dynamics of Electric Drive", url: "/Electrical-Drives/Summaries/Slides-Unit-02A-Dynamics-of-Electric-Drive.pdf" },
            { label: "Unit 03 Stability of Drive System", url: "/Electrical-Drives/Summaries/Slides-Unit-03-Stability-of-Drive-System.pdf" },
            { label: "Unit 04 Transient Conditions", url: "/Electrical-Drives/Summaries/Slides-Unit-04-Transient-Conditions.pdf" },
            { label: "Unit 05 Automatic Starting", url: "/Electrical-Drives/Summaries/Slides-Unit-05-Automatic-Starting.pdf" },
            { label: "Unit 06 Heating and Cooling", url: "/Electrical-Drives/Summaries/Slides-Unit-06-Heating-and-Cooling.pdf" },
            { label: "Unit 07 Determination of Power Ratings", url: "/Electrical-Drives/Summaries/Slides-Unit-07-Determination-of-Power-Ratings.pdf" },
            { label: "Unit 09 Rectifier Fed DC Motor Speed Control", url: "/Electrical-Drives/Summaries/Slides-Unit-09-Rectifier-Fed-DC-Motor-Speed-Control.pdf" },
            { label: "Unit 10 Static Characteristics of AC Motors", url: "/Electrical-Drives/Summaries/Slides-Unit-10-Static-Characteristics-of-AC-Motors.pdf" },
            { label: "Unit 10A Inverters", url: "/Electrical-Drives/Summaries/Slides-Unit-10A-Inverters.pdf" },
            { label: "Unit 11 Scalar Control of AC Motors", url: "/Electrical-Drives/Summaries/Slides-Unit-11-Scalar-Control-of-AC-Motors.pdf" },
            { label: "Unit 11A Slip Ring AC Motor Speed Control", url: "/Electrical-Drives/Summaries/Slides-Unit-11A-Slip-Ring-AC-Motor-Speed-Control.pdf" },
            { label: "Unit 12 Variable Frequency Drive Control", url: "/Electrical-Drives/Summaries/Slides-Unit-12-Variable-Frequency-Drive-Control.pdf" },
            { label: "Unit 12A Vector Control of Induction Motors", url: "/Electrical-Drives/Summaries/Slides-Unit-12A-Vector-Control-of-Induction-Motors.pdf" }
          ]
        }
      ], 
      videos: [], 
      quizzes: [
        {
          label: "Quizzes",
          type: 'folder',
          items: [
            { label: "Quiz 1 Screens", url: "/Electrical-Drives/Past-Papers/Quizzes/Quiz-1-Screens.pdf" },
            { label: "Quiz 1", url: "/Electrical-Drives/Past-Papers/Quizzes/Quiz-Question-1.png" },
            { label: "Quiz 2", url: "/Electrical-Drives/Past-Papers/Quizzes/Quiz-Question-2.png" },
            { label: "Quiz Screens", url: "/Electrical-Drives/Past-Papers/Quizzes/Quiz-Compiled-Screens-and-Solutions.pdf" },
            { label: "Quiz Bank", url: "/Electrical-Drives/Past-Papers/Quizzes/Quiz-Question-Bank.pdf" }
          ]
        }
      ],
      mid: [
        { label: "2022", url: "/Electrical-Drives/Past-Papers/Mid/Mid-2022-Solved.pdf" },
        { label: "2023", url: "/Electrical-Drives/Past-Papers/Mid/Mid-2023-Semester2.pdf" },
        { label: "2024", url: "/Electrical-Drives/Past-Papers/Mid/Mid-2024-Semester1.pdf" },
        { label: "2025", url: "/Electrical-Drives/Past-Papers/Mid/Mid-2025.pdf" },
        { label: "Mid Compiled Questions", url: "/Electrical-Drives/Past-Papers/Mid/Mid-Compiled-Questions-New.pdf" },
        { label: "Mid Compiled Questions", url: "/Electrical-Drives/Past-Papers/Mid/Mid-Compiled-Questions.pdf" }
      ], 
      final: [
        { label: "Final Exam ", url: "/Electrical-Drives/Past-Papers/Final/Final-Exam-A.pdf" },
        { label: "Final Questions", url: "/Electrical-Drives/Past-Papers/Final/Final-Questions.pdf" },
        { label: "Final Questions", url: "/Electrical-Drives/Past-Papers/Final/Final-Solutions.pdf" }
      ]
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
      books: [
        { 
          label: "Advances in Renewable Energies", 
          url: "/11-Renewable energy/books/textbook-advances-renewable-energies.pdf", 
          coverUrl: "/BooksCover/textbook-advances-renewable-energies.webp" 
        },
        { 
          label: "Renewable and Efficient Electric Power Systems", 
          url: "/11-Renewable energy/books/textbook-renewable-efficient-power-systems.pdf", 
          coverUrl: "/BooksCover/textbook-renewable-efficient-power-systems.webp" 
        }
      ], 
      summaries: [], 
      videos: [], 
      mid: [], 
      final: []
    } 
  },
  
mems: { 
    coords: { x: 35.6, y: 88.07, w: 5.25, h: 5.46 }, 
    content: {
      titleEn: "MEMS", titleAr: "أنظمة كهروميكانيكية صغرية", credits: 3,
      books: [
        { 
          label: "Foundations of MEMS", 
          url: "/MEMS/Foundations of MEMS.pdf", 
          coverUrl: "/BooksCover/Foundations of MEMS.webp" 
        },
        { 
          label: "MEMS and Microsystems Design and Manufacture", 
          url: "/MEMS/MEMS and Microsystems Design and Manufacture.pdf", 
          coverUrl: "/BooksCover/MEMS and Microsystems Design and Manufacture.webp" 
        },
        { 
          label: "Microsystem Technology and Microrobotics", 
          url: "/MEMS/Microsystem Technology and Microrobotics.pdf", 
          coverUrl: "/BooksCover/Microsystem Technology and Microrobotics.webp" 
        }
      ], 
      summaries: [], 
      videos: [], 
      mid: [], 
      final: []
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
      titleEn: "Special Topics", titleAr: "موضوعات خاصة في هندسة الميكاترونكس ", credits: 3,
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
          coverUrl: "/BooksCover/protection_relaying_principles_and_applications.webp" 
        },
        { 
          label: "Electrical Installation Handbook (Protection & Control)", 
          url: "/protection/books/electrical_installation_handbook_protection_control_electrical_devices.pdf",
          coverUrl: "/BooksCover/electrical_installation_handbook_protection_control_electrical_devices.webp" 
        },
        { 
          label: "Handbook for Protection Engineers", 
          url: "/protection/books/handbook_for_protection_engineers.pdf",
          coverUrl: "/BooksCover/handbook_for_protection_engineers.webp" 
        }
      ], 
      
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
      
      quizzes: [], // فضيناها ونقلناها للـ testBanks
      testBanks: [
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
      books: [
        { 
          label: "Engineering Economy Textbook", 
          url: "/Engineering Economy/books/textbook-engineering-economy.pdf", 
          coverUrl: "/BooksCover/textbook-engineering-economy.webp" 
        }
      ], 
      summaries: [
        { label: "Compound Interest Tables", url: "/Engineering Economy/summarize/compound-interest-tables.pdf" },
        { label: "Formulas", url: "/Engineering Economy/summarize/formulas-engineering-economy.pdf" },
        { label: "Mohamed Saeed Summary", url: "/Engineering Economy/summarize/summary-mohamed-saeed.pdf" },
        { label: "Yaseen Hassan Summary", url: "/Engineering Economy/summarize/summary-yaseen-hassan.pdf" }
      ], 
      videos: [
        { label: "Civil Team", url: "https://youtube.com/playlist?list=PLFz-6NJG8G4T2rkx0XLUHbud1iId0v0pp&si=aUhCNs-4Ap8erp8k" }
      ], 
      mid: [
        { label: "2026", url: "/Engineering Economy/past-papers/mid/mid-2026.pdf" },
        { label: "2025 Summer", url: "/Engineering Economy/past-papers/mid/mid-2025-summer.pdf" },
        { label: "Screens", url: "/Engineering Economy/past-papers/mid/mid-question-bank-screens.pdf" },
        { label: "Paper Scan", url: "/Engineering Economy/past-papers/mid/mid-paper-scan.pdf" }
      ], 
      final: [
        { label: "2025", url: "/Engineering Economy/past-papers/final/final-2025-two-versions.pdf" },
        { label: "Past Questions", url: "/Engineering Economy/past-papers/final/final-past-questions.pdf" },
        { label: "Screens", url: "/Engineering Economy/past-papers/final/final-question-bank-screens.pdf" }
      ]
    } 
  },
  
  military: { 
    coords: { x: 82.83, y: 13, w: 5.02, h: 7.28 }, 
    content: {
      titleEn: "Military Sciences", 
      titleAr: "علوم عسكرية", 
      credits: 3,
      
      books: [
        { 
          label: "كتاب المادة", 
          url: "/Military Sciences/books/textbook-military-science.pdf", 
          coverUrl: "/BooksCover/textbook-military-science.webp",
          isArabic: true 
        }
      ], 
      
      summaries: [
        { label: "Military Science Summary", url: "/Military Sciences/summarize/summary-military-science.pdf" }
      ], 
      
      videos: [], 
      
      quizzes: [],
      
      testBanks: [],
      
      mid: [
        { label: "Part 1", url: "/Military Sciences/past-papers/mid/mid-part-1.pdf" },
        { label: "Part 2", url: "/Military Sciences/past-papers/mid/mid-part-2.pdf" }
      ], 
      
      final: [
        { label: "Past Years Questions", url: "/Military Sciences/past-papers/final/final-past-years-questions.pdf" },
        { label: "2014", url: "/Military Sciences/past-papers/final/final-2014-scanned.pdf" }
      ]
    } 
  }
};
