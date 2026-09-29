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
  // Mapping every black box from your image
  english_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("English 1") },
  english_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("English 2") },
  tech_writing: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Technical Writing") },
  nat_edu: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("National Education") },
  app_arabic: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Applied Arabic") },
  innovation: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Innovation") },
  comp_skills: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Computer Skills") },
  eng_drawing: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Drawing") },
  workshop: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Workshop") },
  calculus_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Calculus 1") },
  calculus_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Calculus 2") },
  diff_eq: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Differential Equations") },
  numerical: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Numerical Methods") },
  probability: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Probability") },
  statics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Statics") },
  physics_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics 1") },
  physics_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics 2") },
  physics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Physics Lab") },
  gen_chemistry: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("General Chemistry") },
  chem_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Chemistry Lab") },
  cpp: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("C++") },
  digital_logic: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Digital Logic") },
  linear_algebra: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Linear Algebra") },
  machine_components: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Machine Components") },
  dynamic_vibration: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Dynamics and Vibration") },
  circuits_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits 1") },
  circuits_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits 2") },
  circuits_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Circuits Lab") },
  signals: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Signals") },
  communication: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Communication") },
  control: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Control") },
  control_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Control Lab") },
  advance_control: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Advanced Control") },
  electronics_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electronics 1") },
  electronics_1_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electronics 1 Lab") },
  power_electronics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Power Electronics") },
  power_electronics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Power Electronics Lab") },
  electrical_machines: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electrical Machines 1") },
  machines_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electrical Machines Lab") },
  plc: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("PLC") },
  plc_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("PLC Lab") },
  assembly: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Assembly") },
  assembly_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Assembly Lab") },
  microprocessors: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessors") },
  micro_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Microprocessor Lab") },
  sensors: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Sensors and Actuators") },
  sensors_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Sensors Lab") },
  industrial_processes: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Industrial Processes") },
  eng_materials: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Applied Engineering Materials") },
  hydraulic_drive: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Hydraulic Drive") },
  hydraulic_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Hydraulic Lab") },
  robotics_dynamics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Dynamics") },
  robotics_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Lab") },
  mechatronics_design: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Mechatronics Design") },
  electric_drive: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electric Drive") },
  electric_drive_lab: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Electric Drive Lab") },
  renewable_energy: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Renewable Energy") },
  mems: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("MEMS") },
  cnc: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("CNC") },
  robotics_eng: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Robotics Engineering") },
  field_training: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Field Training") },
  grad_project_1: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Graduation Project 1") },
  grad_project_2: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Graduation Project 2") },
  scada: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("SCADA") },
  cam_cad: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("CAM/CAD") },
  special_topics: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Special Topics") },
  protection_devices: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Protection Devices") },
  eng_economy: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Engineering Economy") },
  military: { coords: { x: 0, y: 0, w: 0, h: 0 }, content: empty("Military Sciences") },
};
