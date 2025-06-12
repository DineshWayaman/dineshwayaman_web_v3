"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Project type definition
type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
};

// Sample project data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured online shopping experience with real-time inventory.",
    longDescription: "Developed a comprehensive e-commerce solution featuring product catalog management, secure payment processing, user authentication, and order tracking. Implemented real-time inventory updates using websockets and optimized for mobile responsiveness.",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    category: "Web Development",
    link: "https://example-ecommerce.com",
    github: "https://github.com/dineshwayaman/ecommerce-platform"
  },
  {
    id: 2,
    title: "Interactive Data Visualization Dashboard",
    description: "Data visualization platform with customizable charts and real-time updates.",
    longDescription: "Created an interactive dashboard for visualizing complex datasets with customizable filters, export options, and shareable reports. Implemented real-time data updates and optimized rendering for handling large datasets efficiently.",
    image: "/project2.jpg",
    technologies: ["Vue.js", "D3.js", "Firebase", "Express"],
    category: "Data Visualization",
    link: "https://data-viz-example.com",
    github: "https://github.com/dineshwayaman/data-dashboard"
  },
  {
    id: 3,
    title: "3D Product Configurator",
    description: "Interactive 3D product customization tool for e-commerce.",
    longDescription: "Engineered a real-time 3D product configurator allowing users to customize products with different colors, materials, and components. Implemented efficient rendering techniques and optimized asset loading for smooth user experience.",
    image: "/project3.jpg",
    technologies: ["Three.js", "React", "WebGL", "Node.js"],
    category: "3D Web Development",
    link: "https://3d-configurator-demo.com",
    github: "https://github.com/dineshwayaman/3d-product-configurator"
  },
  {
    id: 4,
    title: "AI-Powered Content Management System",
    description: "CMS with integrated AI for content optimization and analytics.",
    longDescription: "Built a next-generation content management system with AI-driven features including content recommendation, SEO optimization, and automated tagging. Implemented a user-friendly interface with drag-and-drop editing and version control.",
    image: "/project1.jpg", // Using placeholder, replace with actual image
    technologies: ["Next.js", "AI APIs", "PostgreSQL", "GraphQL"],
    category: "CMS Development",
    link: "https://ai-cms-platform.com",
    github: "https://github.com/dineshwayaman/ai-cms"
  },
  {
    id: 5,
    title: "Cross-Platform Mobile Application",
    description: "Feature-rich mobile app with offline capabilities and real-time sync.",
    longDescription: "Designed and developed a cross-platform mobile application with offline-first functionality, background synchronization, and push notifications. Implemented secure authentication and optimized for performance across different devices.",
    image: "/project2.jpg", // Using placeholder, replace with actual image
    technologies: ["React Native", "Redux", "Firebase", "REST APIs"],
    category: "Mobile Development",
    link: "https://mobile-app-example.com",
    github: "https://github.com/dineshwayaman/cross-platform-app"
  },
  {
    id: 6,
    title: "Real-time Collaboration Tool",
    description: "Cloud-based platform for team collaboration and document sharing.",
    longDescription: "Created a collaborative workspace platform enabling real-time document editing, task management, and team communication. Implemented WebRTC for video conferencing and optimized data synchronization for seamless collaboration.",
    image: "/project3.jpg", // Using placeholder, replace with actual image
    technologies: ["WebSockets", "React", "Node.js", "MongoDB"],
    category: "Collaboration Tools",
    link: "https://collab-tool-demo.com",
    github: "https://github.com/dineshwayaman/collaboration-platform"
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  
  // Create a unique array of categories while avoiding Set iteration issues
  const uniqueCategories = ["All"];
  projectsData.forEach(project => {
    if (!uniqueCategories.includes(project.category)) {
      uniqueCategories.push(project.category);
    }
  });

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects Portfolio</h1>
            <p className="text-xl opacity-90 mb-8">
              Explore my latest work showcasing creativity, technical expertise, and problem-solving capabilities
            </p>
            <div className="h-1 w-20 bg-blue-400 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueCategories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-60 overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                          aria-label="Visit website"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                          aria-label="View source code"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center text-blue-500 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    View Project Details
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-1.5 h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in working together?</h2>
            <p className="text-xl mb-8">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <Link 
              href="/#contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
