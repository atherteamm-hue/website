// Ensure your data structure looks like this for all subjects
export const curriculumData: Record<string, Course> = {
  subj1: {
    id: "subj7",
    coords: { x: 45.8, y: 38.5, w: 7.2, h: 4.8 }, 
    content: {
      title: 'Communications',
      books: [{ label: 'Book Name', url: '/book.pdf' }],
      summaries: [
        { label: 'Summaries Folder', type: 'folder', items: [{ label: 'Summary 1', url: '/s1.pdf' }] }
      ],
      videos: [], mid: [], final: []
    }
  },
  // ... Repeat for all boxes
};
