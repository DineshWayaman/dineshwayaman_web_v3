"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, notFound } from "next/navigation";
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
  images?: string[];
  challenges?: string;
  solutions?: string;
  results?: string;
};

// Sample project data - this would typically be fetched from an API
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
    github: "https://github.com/dineshwayaman/ecommerce-platform",
    images: ["/project1.jpg", "/project2.jpg", "/project3.jpg"],
    challenges: "The main challenge was implementing a real-time inventory system that would update across all clients when products were added to carts or purchased. Additionally, ensuring secure payment processing while maintaining a smooth user experience was particularly demanding.",
    solutions: "Implemented WebSockets for real-time updates to inventory levels across all connected clients. Utilized Stripe's secure payment processing API with custom UI components to maintain brand consistency while ensuring PCI compliance. Built a responsive design system from the ground up to ensure consistent experience across all devices.",
    results: "The platform successfully launched with 99.9% uptime and handled over 10,000 transactions in the first month. Average page load times were under 1.5 seconds, and the responsive design led to a 35% increase in mobile conversions compared to the previous platform."
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
    github: "https://github.com/dineshwayaman/data-dashboard",
    images: ["/project2.jpg", "/project1.jpg", "/project3.jpg"],
    challenges: "Rendering complex visualizations with large datasets (>100,000 data points) without affecting performance was the primary challenge. Users needed to be able to customize filters and visualization options in real-time.",
    solutions: "Applied data windowing techniques and implemented virtual rendering to handle large datasets. Created a modular architecture that allowed for lazy-loading of visualization components. Used Web Workers to process data transformations off the main thread.",
    results: "The dashboard successfully handled datasets with over 500,000 points while maintaining 60fps rendering performance. Users reported a 40% reduction in time spent analyzing data compared to previous tools."
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
    github: "https://github.com/dineshwayaman/3d-product-configurator",
    images: ["/project3.jpg", "/project1.jpg", "/project2.jpg"],
    challenges: "Creating a 3D configurator that worked smoothly across devices, including mobile, while maintaining high visual fidelity was challenging. Loading times for 3D models needed to be minimized while ensuring textures and materials rendered correctly.",
    solutions: "Implemented progressive loading of 3D models with level-of-detail optimizations. Created a custom shader system for real-time material previews without requiring full rendering passes. Used texture compression and mesh optimization to reduce asset sizes.",
    results: "The configurator achieved an average load time of 2.5 seconds even on moderate mobile connections. User engagement increased by 70%, and the client reported a 25% increase in average order value for configurable products."
  },
  {
    id: 4,
    title: "AI-Powered Content Management System",
    description: "CMS with integrated AI for content optimization and analytics.",
    longDescription: "Built a next-generation content management system with AI-driven features including content recommendation, SEO optimization, and automated tagging. Implemented a user-friendly interface with drag-and-drop editing and version control.",
    image: "/project1.jpg",
    technologies: ["Next.js", "AI APIs", "PostgreSQL", "GraphQL"],
    category: "CMS Development",
    link: "https://ai-cms-platform.com",
    github: "https://github.com/dineshwayaman/ai-cms",
    images: ["/project1.jpg", "/project3.jpg", "/project2.jpg"],
  },
  {
    id: 5,
    title: "Cross-Platform Mobile Application",
    description: "Feature-rich mobile app with offline capabilities and real-time sync.",
    longDescription: "Designed and developed a cross-platform mobile application with offline-first functionality, background synchronization, and push notifications. Implemented secure authentication and optimized for performance across different devices.",
    image: "/project2.jpg",
    technologies: ["React Native", "Redux", "Firebase", "REST APIs"],
    category: "Mobile Development",
    link: "https://mobile-app-example.com",
    github: "https://github.com/dineshwayaman/cross-platform-app",
    images: ["/project2.jpg", "/project1.jpg", "/project3.jpg"],
  },
  {
    id: 6,
    title: "Real-time Collaboration Tool",
    description: "Cloud-based platform for team collaboration and document sharing.",
    longDescription: "Created a collaborative workspace platform enabling real-time document editing, task management, and team communication. Implemented WebRTC for video conferencing and optimized data synchronization for seamless collaboration.",
    image: "/project3.jpg",
    technologies: ["WebSockets", "React", "Node.js", "MongoDB"],
    category: "Collaboration Tools",
    link: "https://collab-tool-demo.com",
    github: "https://github.com/dineshwayaman/collaboration-platform",
    images: ["/project3.jpg", "/project2.jpg", "/project1.jpg"],
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (params.id) {
      const projectId = parseInt(params.id as string, 10);
      const foundProject = projectsData.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        notFound();
      }
    }
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link href="/projects" className="inline-flex items-center text-blue-300 hover:text-white">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Projects
              </Link>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {project.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              <span className="px-3 py-1 bg-blue-800 text-blue-100 rounded-full text-sm">
                {project.category}
              </span>
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 bg-blue-700/50 text-blue-100 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              {project.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 flex-wrap"
            >
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-colors inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live Site
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View Source Code
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.images && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Project Gallery</h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images?.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative h-64 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p>{project.longDescription}</p>
              </div>
            </motion.div>

            {/* Challenges and Solutions */}
            {(project.challenges || project.solutions) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Challenges & Solutions</h2>
                
                {project.challenges && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">The Challenges</h3>
                    <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                      <p>{project.challenges}</p>
                    </div>
                  </div>
                )}
                
                {project.solutions && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">The Solutions</h3>
                    <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                      <p>{project.solutions}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Results */}
            {project.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Results & Impact</h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                  <p>{project.results}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Have a similar project in mind?</h2>
            <p className="text-xl mb-8">
              Let&apos;s discuss how we can collaborate
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
