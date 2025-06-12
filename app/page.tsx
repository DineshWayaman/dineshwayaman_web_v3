"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 3D Model component using Three.js
const ThreeDModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = null; // Remove background for transparency
    scene.fog = null; // Remove fog for cleaner look

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Updated renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
    container.appendChild(renderer.domElement);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create a more complex 3D object
    const geometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0x50c7f0,
      wireframe: true,
      emissive: 0x1a365d,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Enhanced lighting
    const pointLight1 = new THREE.PointLight(0x4338ca, 2);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x50c7f0, 2);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Handle resize
    const handleResize = () => {
      if (!container) return;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Enhanced animation
    const animate = () => {
      requestAnimationFrame(animate);
      shape.rotation.x += 0.002;
      shape.rotation.y += 0.003;
      shape.rotation.z += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[600px]" />;
};

export default function Home() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Add the Navbar */}
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"
        >
          <ThreeDModel />
        </motion.div>

        <div className="container mx-auto px-4 z-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Dinesh Wayaman
              </span>
            </h1>

            <p className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto">
              Let&apos;s create something amazing together
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden"
              >
                <span className="relative z-10 text-white font-medium">Let&apos;s Create Something Amazing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full border border-gray-500 hover:border-white transition-colors duration-300"
              >
                Quick Contact
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2 text-gray-400">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center items-start p-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[400px]"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [-1, 1, -1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/myimg.webp"
                  alt="Dinesh Wayaman"
                  width={400}
                  height={400}
                  style={{ 
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: "contain",
                    objectPosition: "center bottom"
                  }}
                  priority
                  className="mx-auto"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                I create digital experiences that users love
              </h3>
              <p className="mb-6">
                I&apos;m currently accepting new projects
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Skills</h4>
                  <ul className="space-y-1">
                    <li>• Mobile App Development</li>
                    <li>• Full-Stack Development</li>
                    <li>• UI/UX Design</li>
                    <li>• 3D Animation</li>
                    <li>• SEO Optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Technologies</h4>
                  <ul className="space-y-1">
                    <li>• React Native / Flutter</li>
                    <li>• React / Next.js</li>
                    <li>• Three.js</li>
                    <li>• Node.js</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
              </div>
              <a
                href="/resume"
                target="_blank"
                className="inline-flex items-center text-blue-500 font-medium"
              >
                Download Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Services</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions to empower your digital presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mobile App Development",
                description: "We specialize in Mobile app development, crafting high-quality and user-friendly applications that engage your audience and boost your mobile presence.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Web Development",
                description: "We provide expert web development services, creating stunning and functional websites that enhance your online presence and drive business growth.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
              },
              {
                title: "Custom Software Development",
                description: "Tailored software solutions to meet unique business needs, enhancing efficiency and performance with scalable, robust, and user-friendly applications.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
              {
                title: "Cloud Services",
                description: "Offering cloud architecture, deployment, migration, and DevOps services to optimize and scale your business with AWS, Azure, and Google Cloud.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
              {
                title: "Database Management",
                description: "Efficient database management services, including design, development, optimization, and data warehousing, ensuring robust and scalable solutions for your business needs.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ),
              },
              {
                title: "UI/UX Design",
                description: "Enhancing user experiences through intuitive design, user research, prototyping, and usability testing to create engaging and responsive interfaces.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">My Work</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Check out some of my recent projects that showcase my skills and
              expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: project * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-60">
                  <Image
                    src={`/project${project}.jpg`}
                    alt={`Project ${project}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Project Title {project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    A short description of this amazing project and what
                    technologies were used to create it.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                      React
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs">
                      Three.js
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                      Tailwind
                    </span>
                  </div>
                  <a
                    href={`/project/${project}`}
                    className="text-blue-500 font-medium flex items-center"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
            >
              View All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Client Testimonials</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What clients are saying about working with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[800px] overflow-y-auto scrollbar-hide pb-6">
            {[
              {
                name: "Diganta Hasan Rubel",
                role: "Founder & CEO Topper IT",
                location: "Bangladesh",
                image: "/testimonials/hasan.png",
                content: "Highly Recommended for Android apps development and Publish on Google Play Store.",
              },
              {
                name: "Abhinav",
                role: "Google Ads Consultant",
                location: "India",
                image: "/testimonials/abhinav.jpg",
                content: "7 star service and quality of work. Will surely work with him again.",
              },
              {
                name: "JOHNDAMIANO",
                role: "Developer",
                location: "UK",
                image: "/testimonials/member-02.jpg",
                content: "Dinesh Wayaman is amazing skilled developer and OneSignal expert. A problem that we had on our app that no other could fix he fixed as a PRO! Thanks a lot! High recommended!",
              },
              {
                name: "Mahmoud Marzouq",
                role: "Growth Marketer",
                location: "Palestinian",
                image: "/testimonials/Mahmoud.jpg",
                content: "Amazing work, he's very responsive and hard working.",
              },
              {
                name: "Theagworld",
                role: "AG Digital World",
                location: "India",
                image: "/testimonials/Theagworld.jpg",
                content: "Thank You So Much For this Great work, I love your Work. Dinesh wayaman is a very good person he solved my all problems related to my website to application. I really appreciate your work.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-blue-400">{testimonial.role}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="relative">
                  <svg
                    className="absolute -top-4 -left-2 w-8 h-8 text-blue-500/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-300 relative z-10 italic">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Let&apos;s Work Together
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto">
              I&apos;m currently accepting new projects and would love to hear about your ideas
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              if (isSubmitting) return; // Prevent double submission
              
              setIsSubmitting(true);
              const formData = new FormData(e.currentTarget);
              const form = e.currentTarget;
              const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
              };

              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                  form.reset(); // Reset form before updating status
                  setFormStatus({
                    type: 'success',
                    message: 'Message sent successfully! I will get back to you soon.'
                  });
                } else {
                  throw new Error(result.message || 'Failed to send message');
                }
              } catch (error: unknown) {
                setFormStatus({
                  type: 'error',
                  message: error instanceof Error ? error.message : 'An error occurred'
                });
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white focus:outline-none text-white placeholder:text-white/60"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white focus:outline-none text-white placeholder:text-white/60"
                    placeholder="Your email"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label
                  htmlFor="subject"
                  className="block mb-2 font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white focus:outline-none text-white placeholder:text-white/60"
                  placeholder="What&apos;s this about?"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white focus:outline-none text-white placeholder:text-white/60 resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-white text-blue-600 rounded-full font-medium transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Status Message */}
                {formStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-lg ${
                      formStatus.type === 'success' 
                        ? 'bg-green-500/20 text-green-100' 
                        : 'bg-red-500/20 text-red-100'
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </motion.div>
            </form>
          </div>
        </div>
      </section>

      {/* Replace the existing footer with the new Footer component */}
      <Footer />
    </div>
  );
}
