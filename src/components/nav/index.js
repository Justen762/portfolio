import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ReactiveNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollY } = useScroll();
  
  // Add effect to handle body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Add effect to track active section
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const projectsSection = document.getElementById('projects');
      
      if (!aboutSection || !projectsSection) return;

      const aboutRect = aboutSection.getBoundingClientRect();
      const projectsRect = projectsSection.getBoundingClientRect();
      
      // If projects section is in view
      if (projectsRect.top <= window.innerHeight / 2) {
        setActiveSection('projects');
      } 
      // If about section is in view
      else if (aboutRect.top <= window.innerHeight / 2) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform scroll positions
  const navbarHeight = useTransform(scrollY, [0, 100], [64, 48]);
  const buttonScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const buttonSpacing = useTransform(scrollY, [0, 100], [64, 48]);
  const logoScale = useTransform(scrollY, [0, 100], [1, .8]);
  const logoTranslateY = useTransform(scrollY, [0, 100], [0, -5]);
  const logoTranslateX = useTransform(scrollY, [0, 100], [0, -5]);
  const buttonTranslateY = useTransform(scrollY, [0, 100], [0, 4]);


  // Scroll handlers
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      style={{ height: navbarHeight }}
      className="fixed top-0 inset-x-0 z-50 shadow-sm backdrop-blur bg-gray-400/50"
      id="nav"
    > 
      <motion.div
        style={{ 
          scale: logoScale,
          translateY: logoTranslateY,
          translateX: logoTranslateX
        }}
        whileHover={{ scale: 1, translateY: 0, translateX: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed left-1 top-1"
        id="logo"
      >
        <Image src="/logo.png" alt="Logo" width={150} height={150} className="w-13 h-13"/>
      </motion.div>

      <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.button
          style={{ scale: buttonScale }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="absolute right-4 md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <motion.div 
          style={{ 
            gap: buttonSpacing,
            translateY: buttonTranslateY
          }}
          whileHover={{ gap: 64}}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 mb-2"
        >
          <NavButton 
            onClick={() => scrollToSection('about')} 
            scale={buttonScale}
            isActive={activeSection === 'about'}
          >
            About
          </NavButton>
          <NavButton 
            onClick={() => scrollToSection('projects')} 
            scale={buttonScale}
            isActive={activeSection === 'projects'}
          >
            Projects
          </NavButton>
          <NavButton onClick={() => scrollToSection('contact')} scale={buttonScale}>Contact Me</NavButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              exit={{ x: "100vw" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 h-screen w-screen bg-gray-400 text-white"
            >
              <motion.button
                style={{ scale: buttonScale }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <X size={24} />
              </motion.button>

              <MobileLink onClick={() => scrollToSection('about')}>About</MobileLink>
              <MobileLink onClick={() => scrollToSection('projects')}>Projects</MobileLink>
              <MobileLink onClick={() => scrollToSection('contact')}>Contact Me</MobileLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavButton({ children, onClick, scale, isActive }) {
  return (
    <motion.button
      style={{ scale }}
      onClick={onClick}
      className="relative py-2 px-4 font-semibold text-black transition-transform duration-200 overflow-hidden rounded-md"
      whileHover="hover"
      initial="rest"
      animate={isActive ? "hover" : "rest"}
    >
      <motion.div
        variants={{
          rest: {
            width: "5vw",
            height: ".75vh",
            opacity: 1,
            borderRadius: "0.75rem",
            top: "calc(100% - .75vh)",
            left: "50%",
            x: "-50%",
            background: "#4505f4",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          },
          hover: {
            width: "100%",
            height: "100%",
            borderRadius: "0.5rem",
            top: 0,
            background: "#4505f4",
            opacity: .75,
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }
        }}
        transition={{ duration: 0.3 }}
        className="absolute z-0"
        style={{ pointerEvents: "none" }}
      />
      <span className="relative z-10 cursor-pointer">{children}</span>
    </motion.button>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="text-2xl font-medium hover:text-purple-600 transition-colors"
    >
      {children}
    </motion.button>
  );
}
