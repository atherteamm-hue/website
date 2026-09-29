export interface CourseContent {
  title: string;
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

const empty = (title: string): CourseContent => ({
  title, books: [], summaries: [], videos: [], mid: [], final: []
});

export const curriculumData: Record<string, Course> = {
  // UNIVERSITY COMPULSORY (Top Left Area)
  english_1: { coords: { x: 40, y: 37, w: 215, h: 109 } },
  english_2: { coords: { x: 40, y: 211, w: 215, h: 108 } },
  tech_writing: { coords: { x: 40, y: 379, w: 215, h: 108 } },
  nat_edu: { coords: { x: 270, y: 53, w: 235, h: 109 } },
  app_arabic: { coords: { x: 290, y: 206, w: 214, h: 108 } },
  innovation: { coords: { x: 290, y: 365, w: 214, h: 140 } },
  
  // COLLEGE COMPULSORY (Top Middle/Right)
  eng_drawing: { coords: { x: 526, y: 37, w: 215, h: 138 } },
  comp_skills: { coords: { x: 526, y: 260, w: 215, h: 105 } },
  workshop: { coords: { x: 791, y: 37, w: 215, h: 108 } },
  calculus_1: { coords: { x: 1028, y: 37, w: 215, h: 108 } },
  calculus_2: { coords: { x: 1309, y: 37, w: 215, h: 108 } },
  diff_eq: { coords: { x: 782, y: 219, w: 214, h: 108 } },
  numerical: { coords: { x: 1002, y: 219, w: 214, h: 108 } },
  probability: { coords: { x: 1222, y: 214, w: 228, h: 108 } },
  statics: { coords: { x: 1631, y: 37, w: 215, h: 108 } },
  physics_1: { coords: { x: 2179, y: 37, w: 215, h: 108 } },
  physics_2: { coords: { x: 2179, y: 205, w: 215, h: 108 } },
  physics_lab: { coords: { x: 1875, y: 205, w: 215, h: 108 } },
  eng_economy: { coords: { x: 2457, y: 32, w: 215, h: 141 } },
  military: { coords: { x: 2457, y: 179, w: 215, h: 140 } },
  gen_chemistry: { coords: { x: 2736, y: 32, w: 215, h: 108 } },
  chem_lab: { coords: { x: 2736, y: 219, w: 215, h: 80 } },
  
  // MAJOR COMPULSORY (Center/Lower Flow)
  cpp: { coords: { x: 829, y: 365, w: 215, h: 108 } },
  digital_logic: { coords: { x: 1109, y: 365, w: 215, h: 108 } },
  linear_algebra: { coords: { x: 1410, y: 344, w: 215, h: 109 } },
  machine_components: { coords: { x: 1631, y: 205, w: 215, h: 108 } },
  dynamic_vibration: { coords: { x: 1631, y: 373, w: 215, h: 108 } },
  circuits_1: { coords: { x: 1875, y: 389, w: 215, h: 108 } },
  circuits_2: { coords: { x: 2336, y: 319, w: 215, h: 108 } },
  circuits_lab: { coords: { x: 2336, y: 470, w: 215, h: 100 } },
  signals: { coords: { x: 1875, y: 574, w: 215, h: 108 } },
  communication: { coords: { x: 1410, y: 531, w: 215, h: 108 } },
  control: { coords: { x: 1875, y: 716, w: 215, h: 109 } },
  control_lab: { coords: { x: 2150, y: 716, w: 215, h: 109 } },
  advance_control: { coords: { x: 1656, y: 846, w: 215, h: 109 } },
  electronics_1: { coords: { x: 2397, y: 667, w: 215, h: 109 } },
  electronics_1_lab: { coords: { x: 2722, y: 667, w: 215, h: 109 } },
  power_electronics: { coords: { x: 2398, y: 850, w: 215, h: 109 } },
  power_electronics_lab: { coords: { x: 2736, y: 850, w: 215, h: 108 } },
  electrical_machines: { coords: { x: 2720, y: 373, w: 215, h: 108 } },
  machines_lab: { coords: { x: 2720, y: 533, w: 215, h: 108 } },
  plc: { coords: { x: 2193, y: 977, w: 250, h: 109 } },
  plc_lab: { coords: { x: 2236, y: 1224, w: 165, h: 110 } },
  assembly: { coords: { x: 762, y: 542, w: 215, h: 108 } },
  assembly_lab: { coords: { x: 481, y: 542, w: 215, h: 107 } },
  microprocessors: { coords: { x: 0, y: 0, w: 0, h: 0 } },
  micro_lab: { coords: { x: 0, y: 0, w: 0, h: 0 } },
  sensors: { coords: { x: 762, y: 752, w: 215, h: 108 } },
  sensors_lab: { coords: { x: 495, y: 731, w: 215, h: 150 } },
  industrial_processes: { coords: { x: 1325, y: 649, w: 250, h: 109 } },
  eng_materials: { coords: { x: 1325, y: 806, w: 250, h: 140 } },
  hydraulic_drive: { coords: { x: 1226, y: 990, w: 250, h: 108 } },
  hydraulic_lab: { coords: { x: 1558, y: 990, w: 267, h: 108 } },
  robotics_dynamics: { coords: { x: 904, y: 1081, w: 250, h: 141 } },
  robotics_lab: { coords: { x: 557, y: 925, w: 250, h: 141 } },
  mechatronics_design: { coords: { x: 1579, y: 1200, w: 215, h: 109 } },
  electric_drive: { coords: { x: 1875, y: 1331, w: 215, h: 108 } },
  electric_drive_lab: { coords: { x: 1579, y: 1332, w: 215, h: 105 } },

  // BOTTOM / ELECTIVES
  renewable_energy: { coords: { x: 696, y: 1247, w: 281, h: 141 } },
  mems: { coords: { x: 1040, y: 1316, w: 214, h: 108 } },
  cnc: { coords: { x: 1289, y: 1316, w: 215, h: 108 } },
  robotics_eng: { coords: { x: 557, y: 1086, w: 250, h: 109 } },
  field_training: { coords: { x: 2496, y: 1145, w: 215, h: 108 } },
  grad_project_1: { coords: { x: 2722, y: 1130, w: 215, h: 141 } },
  grad_project_2: { coords: { x: 2723, y: 1313, w: 215, h: 105 } },
  scada: { coords: { x: 2701, y: 993, w: 250, h: 109 } },
  cam_cad: { coords: { x: 990, y: 769, w: 250, h: 139 } },
  special_topics: { coords: { x: 899, y: 925, w: 250, h: 141 } },
  protection_devices: { coords: { x: 1998, y: 1102, w: 245, h: 109 } },
  industrial_processes_lab: { coords: { x: 996, y: 558, w: 250, h: 108 } },
};
