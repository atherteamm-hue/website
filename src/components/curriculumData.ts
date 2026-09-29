export type PageId = 'home' | 'academic-library' | 'technical-library' | 'about-us' | 'join-us';

export interface ResearchPaper {
  id: string;
  title: string;
  subtitle: string;
  category: 'Cognitive Architecture' | 'Spatial Systems' | 'Generative Typography' | 'Kinetic Models';
  date: string;
  authors: string[];
  abstract: string;
  doi: string;
  citations: number;
  bibtex: string;
  tags: string[];
  findings: string[];
}

export interface TechnicalModule {
  id: string;
  name: string;
  version: string;
  badge: string;
  description: string;
  language: string;
  installCmd: string;
  codeSnippet: string;
  specs: {
    latency: string;
    throughput: string;
    memory: string;
    target: string;
  };
}
