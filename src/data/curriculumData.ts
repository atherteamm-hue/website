export interface CourseContent {
  title: string;
  iconName: string; // Used instead of emojis
  books: { label: string; url: string }[];
  summaries: (
    | { label: string; url: string; type?: 'file' }
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

// Template for all subjects visible on the map
export const curriculumData: Record<string, Course> = {
  // UNIVERSITY COMPULSORY
  "english_1": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("English 1") },
  "english_2": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("English 2") },
  "tech_writing": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Technical Writing") },
  "nat_edu": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("National Education") },
  "app_arabic": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Applied Arabic") },
  "innovation": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Innovation") },
  "military": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Military Sciences") },

  // COLLEGE COMPULSORY
  "calculus_1": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Calculus 1") },
  "calculus_2": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Calculus 2") },
  "physics_1": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Physics 1") },
  "physics_2": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Physics 2") },
  "comp_skills": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Computer Skills") },
  "programming": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Programming for Engineers") },
  "eng_drawing": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Engineering Drawing") },
  "workshop": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Engineering Workshop") },

  // MAJOR COMPULSORY
  "circuits_1": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Electric Circuits 1") },
  "signals": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Signals and Systems") },
  "control": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Control Systems") },
  "communication": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Communications") },
  "microprocessors": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Microprocessors") },
  "sensors": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Sensors and Actuators") },
  "mechatronics_design": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Mechatronics Design") },
  "robotics": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Robotics Engineering") },
  
  // LABS (Black Boxes with high borders)
  "physics_lab": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Physics Lab") },
  "circuits_lab": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Circuits Lab") },
  "control_lab": { coords: { x: 0, y: 0, w: 0, h: 0 }, content: emptyContent("Control Lab") },
};

// Helper to create empty structures quickly
function emptyContent(title: string): CourseContent {
  return {
    title, iconName: 'Book',
    books: [], summaries: [], videos: [], mid: [], final: []
  };
}
