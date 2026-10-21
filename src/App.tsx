import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageId } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { VideoBackground } from './components/VideoBackground.tsx';
import { HomePage } from './pages/HomePage.tsx';
// The other pages (and everything they pull in — pdf-lib, the PDF tools,
// the member photos, the curriculum data) are split into their own chunks
// and fetched only when the visitor actually navigates there. This keeps the
// home page's critical-path bundle small.
const AcademicLibraryPage = lazy(() =>
  import('./pages/AcademicLibraryPage.tsx').then((m) => ({ default: m.AcademicLibraryPage }))
);
const TechnicalLibraryPage = lazy(() =>
  import('./pages/TechnicalLibraryPage.tsx').then((m) => ({ default: m.TechnicalLibraryPage }))
);
const AboutUsPage = lazy(() =>
  import('./pages/AboutUsPage.tsx').then((m) => ({ default: m.AboutUsPage }))
);

const PageFallback: React.FC = () => (
  <div className="relative z-[1] flex items-center justify-center min-h-screen" role="status" aria-live="polite">
    <span className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
    <span className="sr-only">Loading…</span>
  </div>
);

export default function App() {
  // Sync state with URL hash for browser history and bookmarking
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'academic-library' || hash === 'technical-library' || hash === 'about-us') {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // The curriculum flowchart is a 1 MB SVG and it is the LCP element of the
  // academic library page. Start fetching it the moment the visitor heads
  // there, so it downloads in parallel with the page's own code chunk
  // instead of only after React has rendered the <img>.
  useEffect(() => {
    if (currentPage !== 'academic-library') return;

    const base = import.meta.env.BASE_URL || './';
    const href = `${base.endsWith('/') ? base : `${base}/`}flowchart-en.svg`;
    if (document.querySelector(`link[data-preload-flowchart]`)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.setAttribute('data-preload-flowchart', '');
    document.head.appendChild(link);
  }, [currentPage]);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'academic-library' || hash === 'technical-library' || hash === 'about-us') {
        setCurrentPage(hash as PageId);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
  };

  return (
    <div className="relative w-full min-h-screen text-black bg-white select-none">
      {/* Background Video: Active and scrubbing across all pages */}
      <VideoBackground dimmed={currentPage !== 'home'} />

      {/* Navbar: Academic library ∙ Technical library ∙ About us & Join us */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Page Routing */}
      {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
      <Suspense fallback={<PageFallback />}>
        {currentPage === 'academic-library' && <AcademicLibraryPage />}
        {currentPage === 'technical-library' && <TechnicalLibraryPage />}
        {currentPage === 'about-us' && <AboutUsPage />}
      </Suspense>
    </div>
  );
}
