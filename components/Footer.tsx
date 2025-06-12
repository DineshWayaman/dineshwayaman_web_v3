"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with contact and links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-16">
          {/* Logo & Info */}
          <motion.div 
            {...fadeInUpAnimation}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">
              Dinesh<span className="text-blue-500">.</span>
            </h3>
            <p className="text-gray-400 max-w-xs">
              Creating digital experiences that combine aesthetic appeal with functional excellence.
            </p>
            <div className="pt-2 flex space-x-4">
              <SocialLink platform="GitHub" url="https://github.com/dineshwayaman" />
              <SocialLink platform="LinkedIn" url="https://linkedin.com/in/dineshwayaman" />
              <SocialLink platform="Instagram" url="https://instagram.com/dineshwayaman" />
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            {...fadeInUpAnimation}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-12 after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/resume"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div 
            {...fadeInUpAnimation}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-12 after:bg-blue-500">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 mt-0.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dineshwayaman@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  dineshwayaman@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 mt-0.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+94779780991" className="text-gray-400 hover:text-white transition-colors">
                  + 94 779 780 991
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 mt-0.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  Colombo, Sri Lanka
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom Section with copyright */}
        <div className="border-t border-gray-800 px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Dinesh Wayaman. All rights reserved.
            </p>
            {/* <div className="mt-4 sm:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-500">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Link Component
const SocialLink = ({ platform, url }: { platform: string; url: string }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
    >
    
      {platform === "GitHub" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      )}
      {platform === "LinkedIn" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
        </svg>
      )}
      {platform === "Instagram" && (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.06-.976.044-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.054-.06 1.37-.06 4.04 0 2.67.01 2.986.06 4.04.044.976.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.046 1.37.06 4.04.06 2.67 0 2.987-.01 4.04-.06.976-.044 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.054.06-1.37.06-4.04 0-2.67-.01-2.986-.06-4.04-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.047-1.37-.06-4.04-.06zm0 3.064a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
        </svg>
      )}
    </a>
  );
};

export default Footer;
