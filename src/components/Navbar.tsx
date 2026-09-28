import React, { useState } from 'react';
import { PageId } from '../types.ts';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Academic library', page: 'academic-library' },
    { label: 'Technical library', page: 'technical-library' },
    { label: 'About us', page: 'about-us' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* NAVBAR (fixed, z-index: 10) */}
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-transparent">
        {/* Logo (left): Replaced with uploaded logo photo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-xs"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleNavClick('home');
          }}
          aria-label="Mainframe Home"
        >
          <img
            src={logoImg}
            alt="Mainframe Logo"
            className="h-7 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Desktop nav links (center, hidden below md): separated with " ∙ " */}
        <nav
          className="hidden md:flex items-center text-[23px] text-black"
          aria-label="Primary Navigation"
        >
          {navLinks.map((item, index) => (
            <React.Fragment key={item.page}>
              <button
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`transition-opacity cursor-pointer bg-transparent border-0 p-0 text-[23px] text-black hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-xs ${
                  currentPage === item.page ? 'font-medium underline underline-offset-4' : ''
                }`}
              >
                {item.label}
              </button>
              {index < navLinks.length - 1 && (
                <span className="select-none mx-2 text-neutral-400 font-light" aria-hidden="true">
                  ∙
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md): Join us */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick('join-us')}
            className={`text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-xs ${
              currentPage === 'join-us' ? 'font-medium' : ''
            }`}
          >
            Join us
          </button>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-30 flex flex-col gap-[5px] md:hidden cursor-pointer p-2 focus-visible:outline-none"
        >
          <div
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <div
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 transition-all duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left text-[32px] font-medium text-black hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0"
        >
          <img src={logoImg} alt="Mainframe Logo" className="h-9 w-auto object-contain" />
          <span>Home</span>
        </button>
        {navLinks.map((item) => (
          <button
            key={item.page}
            type="button"
            onClick={() => handleNavClick(item.page)}
            className={`text-left text-[32px] font-medium text-black hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 ${
              currentPage === item.page ? 'underline underline-offset-4' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleNavClick('join-us')}
          className="text-left text-[32px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0"
        >
          Join us
        </button>
      </div>
    </>
  );
};
