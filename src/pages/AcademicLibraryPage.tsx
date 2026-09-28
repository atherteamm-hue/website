import React, { useState } from 'react';
import { CurriculumFlowchart } from '../components/CurriculumFlowchart';
import { CourseModal } from '../components/CourseModal';

export const AcademicLibraryPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-24 px-5 sm:px-10 max-w-7xl mx-auto">
      <div className="mb-20">
        <h1 className="text-6xl font-bold tracking-tighter mb-4">ACADEMIC<br/>LIBRARY</h1>
        <p className="text-xl text-neutral-500 max-w-xl">
          An interactive graph of the Mechatronics curriculum. Click nodes to access lecture notes, past papers, and textbook archives.
        </p>
      </div>

      <CurriculumFlowchart onCourseClick={(key) => setSelectedCourse(key)} />

      {selectedCourse && (
        <CourseModal 
          courseKey={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </main>
  );
};


