export interface CourseContent {
  titleEn: string;
  titleAr: string;
  books: { label: string; url: string }[];
  summaries: (
    | { label: string; url: string }
    | { label: string; type: 'folder'; items: { label: string; url: string }[] }
  )[];
  videos: { label: string; url: string }[];
  mid: { label: string; url: string }[];
  final: { label: string; url: string }[];
}

export interface Course {
  coords: { x: number; y: number; w: number; h: number };
  content: CourseContent;
}

// تعديل الدالة لتستقبل الاسم بالإنجليزي والعربي
const empty = (titleEn: string, titleAr: string): CourseContent => ({
  titleEn, titleAr, books: [], summaries: [], videos: [], mid: [], final: []
});

export const curriculumData: Record<string, Course> = {
  english_1: { coords: { x: 2.21, y: 4, w: 5.32, h: 5.21 }, content: empty("English 1", "لغة إنجليزية 1") },
  english_2: { coords: { x: 2.31, y: 15.42, w: 5.22, h: 5.2 }, content: empty("English 2", "لغة إنجليزية 2") },
  tech_writing: { coords: { x: 2.21, y: 26.43, w: 5.52, h: 5.2 }, content: empty("Technical Writing", "كتابة فنية") },
  nat_edu: { coords: { x: 10.14, y: 5.01, w: 5.62, h: 5.4 }, content: empty("National Education", "تربية وطنية") },
  app_arabic: { coords: { x: 10.64, y: 14.82, w: 5.22, h: 5.4 }, content: empty("Applied Arabic", "لغة عربية تطبيقية") },
  innovation: { coords: { x: 11.55, y: 25.03, w: 3.41, h: 8.4 }, content: empty("Innovation", "الريادة والابتكار") },
  comp_skills: { coords: { x: 17.77, y: 17.82, w: 6.73, h: 6 }, content: empty("Computer Skills", "مهارات حاسوب") },
  eng_drawing: { coords: { x: 19.88, y: 3, w: 2.71, h: 8.61 }, content: empty("Engineering Drawing", "رسم هندسي") },
  workshop: { coords: { x: 26.61, y: 3, w: 6.62, h: 6.41 }, content: empty("Engineering Workshop", "مشاغل هندسية") },
  calculus_1: { coords: { x: 35.14, y: 3.6, w: 5.22, h: 5.61 }, content: empty("Calculus 1", "تفاضل وتكامل 1") },
  calculus_2: { coords: { x: 44.48, y: 3.8, w: 5.32, h: 5.61 }, content: empty("Calculus 2", "تفاضل وتكامل 2") },
  diff_eq: { coords: { x: 26.91, y: 15.82, w: 5.22, h: 5.6 }, content: empty("Differential Equations", "معادلات تفاضلية") },
  numerical: { coords: { x: 34.24, y: 16.02, w: 5.42, h: 5 }, content: empty("Numerical Methods", "طرق عددية") },
  probability: { coords: { x: 41.57, y: 15.22, w: 5.62, h: 5.4 }, content: empty("Probability", "احتمالات وإحصاء") },
  statics: { coords: { x: 55.32, y: 3.6, w: 5.12, h: 5.81 }, content: empty("Statics", "ستاتيكا") },
  physics_1: { coords: { x: 73.09, y: 3.8, w: 5.83, h: 5.21 }, content: empty("Physics 1", "فيزياء 1") },
  physics_2: { coords: { x: 73.39, y: 14.62, w: 5.53, h: 5.4 }, content: empty("Physics 2", "فيزياء 2") },
  physics_lab: { coords: { x: 62.55, y: 14.01, w: 6.73, h: 6.21 }, content: empty("Physics Lab", "مختبر فيزياء") },
  gen_chemistry: { coords: { x: 91.77, y: 3.6, w: 5.42, h: 5.01 }, content: empty("General Chemistry", "كيمياء عامة") },
  chem_lab: { coords: { x: 91.27, y: 15.02, w: 6.72, h: 4.8 }, content: empty("Chemistry Lab", "مختبر كيمياء") },
  cpp: { coords: { x: 28.64, y: 25.28, w: 5.25, h: 5.23 }, content: empty("C++", "برمجة كينونية (C++)") },
  digital_logic: { coords: { x: 37.88, y: 25.28, w: 5.25, h: 5.46 }, content: empty("Digital Logic", "منطق رقمي") },
  linear_algebra: { coords: { x: 47.58, y: 24.14, w: 5.59, h: 5.24 }, content: empty("Linear Algebra", "جبر خطي") },
  machine_components: { coords: { x: 54.99, y: 14.59, w: 5.48, h: 5.23 }, content: empty("Machine Components", "أجزاء آلات") },
  dynamic_vibration: { coords: { x: 55.11, y: 25.74, w: 5.36, h: 5.68 }, content: empty("Dynamics and Vibration", "ديناميكا واهتزازات") },
  circuits_1: { coords: { x: 63.21, y: 26.65, w: 5.48, h: 5.68 }, content: empty("Circuits 1", "دوائر كهربائية 1") },
  circuits_2: { coords: { x: 78.61, y: 21.87, w: 5.25, h: 5.91 }, content: empty("Circuits 2", "دوائر كهربائية 2") },
  circuits_lab: { coords: { x: 77.81, y: 31.65, w: 6.85, h: 5.92 }, content: empty("Circuits Lab", "مختبر دوائر كهربائية") },
  signals: { coords: { x: 63.21, y: 38.93, w: 5.48, h: 5.46 }, content: empty("Signals", "إشارات ونظم") },
  communication: { coords: { x: 47.81, y: 36.2, w: 5.36, h: 5.46 }, content: empty("Communication", "اتصالات") },
  control: { coords: { x: 63.32, y: 48.49, w: 5.25, h: 5.23 }, content: empty("Control", "أنظمة تحكم") },
  control_lab: { coords: { x: 71.77, y: 48.03, w: 6.61, h: 6.37 }, content: empty("Control Lab", "مختبر تحكم") },
  advance_control: { coords: { x: 55.91, y: 57.13, w: 5.59, h: 5.24 }, content: empty("Advanced Control", "تحكم متقدم") },
  electronics_1: { coords: { x: 80.44, y: 45.53, w: 5.7, h: 5.46 }, content: empty("Electronics 1", "إلكترونيات 1") },
  electronics_1_lab: { coords: { x: 90.82, y: 44.62, w: 6.73, h: 6.6 }, content: empty("Electronics 1 Lab", "مختبر إلكترونيات") },
  power_electronics: { coords: { x: 80.44, y: 57.36, w: 5.7, h: 5.23 }, content: empty("Power Electronics", "إلكترونيات القدرة") },
  power_electronics_lab: { coords: { x: 91.16, y: 56.91, w: 6.85, h: 6.37 }, content: empty("Power Electronics Lab", "مختبر إلكترونيات القدرة") },
  electrical_machines: { coords: { x: 91.51, y: 25.96, w: 5.24, h: 5.24 }, content: empty("Electrical Machines 1", "آلات كهربائية 1") },
  machines_lab: { coords: { x: 90.71, y: 35.75, w: 6.73, h: 6.37 }, content: empty("Electrical Machines Lab", "مختبر آلات كهربائية") },
  plc: { coords: { x: 73.71, y: 65.78, w: 6.84, h: 5.46 }, content: empty("PLC", "متحكمات منطقية مبرمجة") },
  plc_lab: { coords: { x: 74.51, y: 81.7, w: 5.24, h: 6.6 }, content: empty("PLC Lab", "مختبر PLC") },
  assembly: { coords: { x: 26.01, y: 37.34, w: 5.71, h: 5.01 }, content: empty("Assembly", "لغة التجميع") },
  assembly_lab: { coords: { x: 16.2, y: 36.43, w: 6.85, h: 6.37 }, content: empty("Assembly Lab", "مختبر لغة تجميع") },
  // microprocessors: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessors", "معالجات دقيقة") },
  // micro_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessor Lab", "مختبر معالجات دقيقة") },
  sensors: { coords: { x: 26.36, y: 50.76, w: 5.24, h: 5.46 }, content: empty("Sensors and Actuators", "مجسات ومحولات طاقة") },
  sensors_lab: { coords: { x: 16.66, y: 48.94, w: 6.84, h: 9.1 }, content: empty("Sensors Lab", "مختبر مجسات") },
  industrial_processes: { coords: { x: 44.95, y: 43.94, w: 6.62, h: 5.46 }, content: empty("Industrial Processes", "عمليات صناعية") },
  industrial_processes_Lab: { coords: { x: 33.41, y: 37.33, w: 8.05, h: 6.55 }, content: empty("Industrial Processes Lab", "مختبر العمليات صناعية") },
  eng_materials: { coords: { x: 45.07, y: 54.76, w: 6.27, h: 6.82 }, content: empty("Applied Engineering Materials", "مواد هندسية تطبيقية") },
  hydraulic_drive: { coords: { x: 41.53, y: 66.92, w: 6.5, h: 5.46 }, content: empty("Hydraulic Drive", "قيادة هيدروليكية") },
  hydraulic_lab: { coords: { x: 52.14, y: 66.23, w: 8.45, h: 6.37 }, content: empty("Hydraulic Lab", "مختبر هيدروليك") },
  robotics_dynamics: { coords: { x: 31.03, y: 73.06, w: 6.28, h: 7.05 }, content: empty("Robotics Dynamics", "ديناميكا الروبوتات") },
  robotics_lab: { coords: { x: 18.6, y: 61.68, w: 7.98, h: 8.65 }, content: empty("Robotics Lab", "مختبر روبوتات") },
  mechatronics_design: { coords: { x: 53.28, y: 80.57, w: 5.48, h: 5.46 }, content: empty("Mechatronics Design", "تصميم أنظمة ميكاترونكس") },
  electric_drive: { coords: { x: 63.32, y: 89.34, w: 5.25, h: 5 }, content: empty("Electric Drive", "قيادة كهربائية") },
  electric_drive_lab: { coords: { x: 52.6, y: 88.66, w: 6.73, h: 6.14 }, content: empty("Electric Drive Lab", "مختبر قيادة كهربائية") },
  renewable_energy: { coords: { x: 24.42, y: 83.88, w: 6.96, h: 7.05 }, content: empty("Renewable Energy", "طاقة متجددة") },
  mems: { coords: { x: 35.6, y: 88.07, w: 5.25, h: 5.46 }, content: empty("MEMS", "أنظمة كهروميكانيكية صغرية") },
  cnc: { coords: { x: 43.81, y: 88.3, w: 5.48, h: 5.46 }, content: empty("CNC", "تحكم رقمي باستخدام الحاسوب") },
  robotics_eng: { coords: { x: 19.51, y: 72.83, w: 6.5, h: 5.46 }, content: empty("Robotics Engineering", "هندسة روبوتات") },
  field_training: { coords: { x: 83.98, y: 76.93, w: 5.36, h: 5.23 }, content: empty("Field Training", "تدريب ميداني") },
  grad_project_1: { coords: { x: 91.62, y: 76.24, w: 5.13, h: 6.83 }, content: empty("Graduation Project 1", "مشروع تخرج 1") },
  grad_project_2: { coords: { x: 90.82, y: 87.39, w: 6.73, h: 6.37 }, content: empty("Graduation Project 2", "مشروع تخرج 2") },
  scada: { coords: { x: 90.71, y: 66.69, w: 6.5, h: 5.69 }, content: empty("SCADA", "أنظمة سكادا") },
  cam_cad: { coords: { x: 34, y: 52.36, w: 6.28, h: 6.59 }, content: empty("CAM/CAD", "تصميم وتصنيع بالحاسوب") },
  special_topics: { coords: { x: 30.92, y: 62.82, w: 6.16, h: 6.83 }, content: empty("Special Topics", "مواضيع خاصة") },
  protection_devices: { coords: { x: 67.2, y: 73.97, w: 6.62, h: 5.46 }, content: empty("Protection Devices", "أجهزة حماية") },
  eng_economy: { coords: { x: 82.95, y: 3.44, w: 4.9, h: 7.05 }, content: empty("Engineering Economy", "اقتصاد هندسي") },
  military: { coords: { x: 82.83, y: 13, w: 5.02, h: 7.28 }, content: empty("Military Sciences", "علوم عسكرية") },
};
