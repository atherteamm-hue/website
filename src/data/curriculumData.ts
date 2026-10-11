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
  english_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("English 1", "لغة إنجليزية 1") },
  english_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("English 2", "لغة إنجليزية 2") },
  tech_writing: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Technical Writing", "كتابة فنية") },
  nat_edu: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("National Education", "تربية وطنية") },
  app_arabic: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Applied Arabic", "لغة عربية تطبيقية") },
  innovation: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Innovation", "الريادة والابتكار") },
  comp_skills: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Computer Skills", "مهارات حاسوب") },
  eng_drawing: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Drawing", "رسم هندسي") },
  workshop: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Workshop", "مشاغل هندسية") },
  calculus_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Calculus 1", "تفاضل وتكامل 1") },
  calculus_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Calculus 2", "تفاضل وتكامل 2") },
  diff_eq: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Differential Equations", "معادلات تفاضلية") },
  numerical: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Numerical Methods", "طرق عددية") },
  probability: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Probability", "احتمالات وإحصاء") },
  statics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Statics", "ستاتيكا") },
  physics_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics 1", "فيزياء 1") },
  physics_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics 2", "فيزياء 2") },
  physics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics Lab", "مختبر فيزياء") },
  gen_chemistry: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("General Chemistry", "كيمياء عامة") },
  chem_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Chemistry Lab", "مختبر كيمياء") },
  cpp: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("C++", "برمجة كينونية (C++)") },
  digital_logic: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Digital Logic", "منطق رقمي") },
  linear_algebra: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Linear Algebra", "جبر خطي") },
  machine_components: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Machine Components", "أجزاء آلات") },
  dynamic_vibration: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Dynamics and Vibration", "ديناميكا واهتزازات") },
  circuits_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits 1", "دوائر كهربائية 1") },
  circuits_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits 2", "دوائر كهربائية 2") },
  circuits_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits Lab", "مختبر دوائر كهربائية") },
  signals: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Signals", "إشارات ونظم") },
  communication: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Communication", "اتصالات") },
  control: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Control", "أنظمة تحكم") },
  control_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Control Lab", "مختبر تحكم") },
  advance_control: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Advanced Control", "تحكم متقدم") },
  electronics_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electronics 1", "إلكترونيات 1") },
  electronics_1_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electronics 1 Lab", "مختبر إلكترونيات") },
  power_electronics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Power Electronics", "إلكترونيات القدرة") },
  power_electronics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Power Electronics Lab", "مختبر إلكترونيات القدرة") },
  electrical_machines: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electrical Machines 1", "آلات كهربائية 1") },
  machines_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electrical Machines Lab", "مختبر آلات كهربائية") },
  plc: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("PLC", "متحكمات منطقية مبرمجة") },
  plc_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("PLC Lab", "مختبر PLC") },
  assembly: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Assembly", "لغة التجميع") },
  assembly_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Assembly Lab", "مختبر لغة تجميع") },
  microprocessors: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessors", "معالجات دقيقة") },
  micro_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessor Lab", "مختبر معالجات دقيقة") },
  sensors: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Sensors and Actuators", "مجسات ومحولات طاقة") },
  sensors_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Sensors Lab", "مختبر مجسات") },
  industrial_processes: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Industrial Processes", "عمليات صناعية") },
  eng_materials: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Applied Engineering Materials", "مواد هندسية تطبيقية") },
  hydraulic_drive: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Hydraulic Drive", "قيادة هيدروليكية") },
  hydraulic_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Hydraulic Lab", "مختبر هيدروليك") },
  robotics_dynamics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Dynamics", "ديناميكا الروبوتات") },
  robotics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Lab", "مختبر روبوتات") },
  mechatronics_design: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Mechatronics Design", "تصميم أنظمة ميكاترونكس") },
  electric_drive: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electric Drive", "قيادة كهربائية") },
  electric_drive_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electric Drive Lab", "مختبر قيادة كهربائية") },
  renewable_energy: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Renewable Energy", "طاقة متجددة") },
  mems: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("MEMS", "أنظمة كهروميكانيكية صغرية") },
  cnc: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("CNC", "تحكم رقمي باستخدام الحاسوب") },
  robotics_eng: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Engineering", "هندسة روبوتات") },
  field_training: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Field Training", "تدريب ميداني") },
  grad_project_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Graduation Project 1", "مشروع تخرج 1") },
  grad_project_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Graduation Project 2", "مشروع تخرج 2") },
  scada: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("SCADA", "أنظمة سكادا") },
  cam_cad: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("CAM/CAD", "تصميم وتصنيع بالحاسوب") },
  special_topics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Special Topics", "مواضيع خاصة") },
  protection_devices: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Protection Devices", "أجهزة حماية") },
  eng_economy: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Economy", "اقتصاد هندسي") },
  military: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Military Sciences", "علوم عسكرية") },
};
