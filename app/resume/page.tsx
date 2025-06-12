"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeTemplate from "@/components/ResumeTemplate";

// Add metadata removal for print
const handlePrint = () => {
  // Remove metadata before printing
  document.title = "Resume - Dinesh Wayaman";
  window.print();
  // Restore title after printing
  setTimeout(() => {
    document.title = "Dinesh Wayaman | Full-Stack Developer & UI/UX Designer";
  }, 100);
};

export default function Resume() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="pt-20 pb-16 print:p-0 print:bg-white print:!pt-0">
        <div className="container mx-auto px-4 print:p-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8 print:hidden">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                My Resume
              </h1>
              <motion.button
                onClick={handlePrint}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </motion.button>
            </div>

            <ResumeTemplate />
          </motion.div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
