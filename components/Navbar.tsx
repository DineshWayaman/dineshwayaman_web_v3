"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["contact", "services", "home"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the 100px threshold as needed
          if (rect.top <= 100 && rect.bottom >= 100) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for active section
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    closeMenu();
    
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL without causing a jump
      history.pushState(null, "", id === "home" ? "/" : `#${id}`);
    }
  };

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/"
          onClick={(e) => handleNavigation(e, "home", "/")}
          className="text-xl font-bold z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className={`text-xl md:text-2xl font-bold ${
              scrolled || isOpen ? "text-black dark:text-white" : "text-white"
            }`}>
              Dinesh<span className="text-blue-500">.</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: "home", label: "Home", href: "/" },
            { id: "services", label: "Services", href: "/services" },
            { id: "contact", label: "Contact", href: "/contact" }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavigation(e, item.id, item.href)}
                className={`font-medium hover:text-blue-500 transition-colors ${
                  scrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
                } ${activeSection === item.id ? "text-blue-500" : ""}`}
              >
                {item.label}
              </a>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/resume"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Resume
            </Link>
          </motion.div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden z-20">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className={`w-7 flex flex-col items-end space-y-1.5 ${isOpen && 'fixed right-4'}`}>
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                  width: isOpen ? "100%" : "100%",
                }}
                className={`block h-0.5 transition-all ${
                  scrolled || isOpen ? "bg-black dark:bg-white" : "bg-white"
                }`}
              ></motion.span>
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  width: "75%",
                }}
                className={`block h-0.5 transition-all ${
                  scrolled || isOpen ? "bg-black dark:bg-white" : "bg-white"
                }`}
              ></motion.span>
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                  width: isOpen ? "100%" : "50%",
                }}
                className={`block h-0.5 transition-all ${
                  scrolled || isOpen ? "bg-black dark:bg-white" : "bg-white"
                }`}
              ></motion.span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 md:hidden pt-20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col h-full">
              <ul className="flex flex-col space-y-8 text-center">
                {[
                  { id: "home", label: "Home", href: "/" },
                  { id: "services", label: "Services", href: "/#services" },
                  { id: "contact", label: "Contact", href: "/contact" }
                ].map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavigation(e, item.id, item.href)}
                      className="text-xl font-medium text-gray-800 dark:text-white hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Link
                    href="/resume"
                    onClick={closeMenu}
                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-all"
                  >
                    Resume
                  </Link>
                </motion.li>
              </ul>
              <div className="mt-auto pb-8">
                <div className="flex justify-center space-x-6">
                  {["Twitter", "GitHub", "LinkedIn"].map((platform, index) => (
                    <motion.a
                      key={platform}
                      href={`https://${platform.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      <SocialIcon platform={platform} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Social icon components
const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "Twitter":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      );
    case "GitHub":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default Navbar;
