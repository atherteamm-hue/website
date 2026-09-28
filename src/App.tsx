import React, { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { VideoBackground } from './components/VideoBackground.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AcademicLibraryPage } from './pages/AcademicLibraryPage.tsx';
import { TechnicalLibraryPage } from './pages/TechnicalLibraryPage.tsx';
import { AboutUsPage } from './pages/AboutUsPage.tsx';
import { JoinUsPage } from './pages/JoinUsPage.tsx';

export default function App() {
  // Sync state with URL hash for browser history and bookmarking
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'academic-library' || hash === 'technical-library' || hash === 'about-us' || hash === 'join-us') {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'academic-library' || hash === 'technical-library' || hash === 'about-us' || hash === 'join-us') {
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
      {currentPage === 'academic-library' && <AcademicLibraryPage />}
      {currentPage === 'technical-library' && <TechnicalLibraryPage />}
      {currentPage === 'about-us' && <AboutUsPage />}
      {currentPage === 'join-us' && <JoinUsPage />}
    </div>
  );
}
