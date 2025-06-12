"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* 3D Animation Component for Services */
const ServiceAnimation = ({ type }: { type: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.enableZoom = false;

		let mesh;

		switch (type) {
			case "Mobile App Development":
				const phone = new THREE.Group();
				
				// Create phone shape
				const screen = new THREE.Mesh(
					new THREE.PlaneGeometry(0.8, 1.6),
					new THREE.MeshPhongMaterial({
						color: 0x00ffff,
						emissive: 0x00ffff,
						emissiveIntensity: 0.2,
					})
				);
				screen.position.z = 0.06;
				phone.add(screen);

				// Add app grid
				for (let i = 0; i < 12; i++) {
					const icon = new THREE.Mesh(
						new THREE.BoxGeometry(0.15, 0.15, 0.02),
						new THREE.MeshPhongMaterial({
							color: 0xff3366 + (i * 0x222222),
							emissive: 0xff3366 + (i * 0x222222),
							emissiveIntensity: 0.2,
						})
					);
					icon.position.x = ((i % 3) - 1) * 0.25;
					icon.position.y = (Math.floor(i / 3) - 1.5) * 0.25;
					icon.position.z = 0.07;
					phone.add(icon);
				}
				mesh = phone;
				break;

			case "Web Development":
				const webGroup = new THREE.Group();
				
				// Create browser window frame
				const browserBar = new THREE.Mesh(
					new THREE.BoxGeometry(2, 0.2, 0.1),
					new THREE.MeshPhongMaterial({ color: 0x4488ff })
				);
				browserBar.position.y = 0.9;
				webGroup.add(browserBar);

				// Add browser buttons
				[-0.8, -0.6, -0.4].forEach((x) => {
					const button = new THREE.Mesh(
						new THREE.CircleGeometry(0.05, 16),
						new THREE.MeshPhongMaterial({ color: 0xff3366 })
					);
					button.position.set(x, 0.9, 0.1);
					webGroup.add(button);
				});

				// Create responsive layout elements
				const layouts = [
					{ size: [2, 0.4], pos: [0, 0.6], color: 0x4488ff },
					{ size: [0.9, 1], pos: [-0.5, -0.2], color: 0x00ffcc },
					{ size: [0.9, 1], pos: [0.5, -0.2], color: 0xff3366 },
				];

				layouts.forEach(({ size, pos, color }) => {
					const element = new THREE.Mesh(
						new THREE.BoxGeometry(size[0], size[1], 0.05),
						new THREE.MeshPhongMaterial({
							color,
							transparent: true,
							opacity: 0.8,
							emissive: color,
							emissiveIntensity: 0.2,
						})
					);
					element.position.set(pos[0], pos[1], 0);
					webGroup.add(element);
				});
				mesh = webGroup;
				break;

			case "Custom Software Development":
				// Create brighter interconnected modules
				const moduleGroup = new THREE.Group();

				for (let i = 0; i < 8; i++) {
					const angle = (i / 8) * Math.PI * 2;
					const radius = 1;

					const groupModule = new THREE.Mesh(
						new THREE.OctahedronGeometry(0.2),
						new THREE.MeshPhongMaterial({
							color: 0xff00ff, // Magenta
							wireframe: true,
							transparent: true,
							opacity: 0.9,
							emissive: 0xff00ff,
							emissiveIntensity: 0.5,
						})
					);

					groupModule.position.x = Math.cos(angle) * radius;
					groupModule.position.y = Math.sin(angle) * radius;

					moduleGroup.add(groupModule);

					// Add connecting lines
					if (i > 0) {
						const line = new THREE.Mesh(
							new THREE.CylinderGeometry(0.02, 0.02, 2),
							new THREE.MeshPhongMaterial({ color: 0x4338ca })
						);
						line.position.x = Math.cos(angle - Math.PI / 8) * radius * 0.5;
						line.position.y = Math.sin(angle - Math.PI / 8) * radius * 0.5;
						line.lookAt(groupModule.position);
						moduleGroup.add(line);
					}
				}

				mesh = moduleGroup;
				break;

			case "Cloud Services":
				// Create enhanced cloud platform
				const cloudGroup = new THREE.Group();

				// Cloud platform with brighter color
				const platform = new THREE.Mesh(
					new THREE.CylinderGeometry(1, 1.2, 0.2, 32),
					new THREE.MeshPhongMaterial({
						color: 0xffff00, // Yellow
						transparent: true,
						opacity: 0.8,
						emissive: 0xffff00,
						emissiveIntensity: 0.3,
					})
				);
				cloudGroup.add(platform);

				// Add floating servers
				for (let i = 0; i < 5; i++) {
					const server = new THREE.Mesh(
						new THREE.BoxGeometry(0.3, 0.4, 0.2),
						new THREE.MeshPhongMaterial({ color: 0x4338ca })
					);
					const angle = (i / 5) * Math.PI * 2;
					server.position.set(
						Math.cos(angle) * 0.7,
						0.4,
						Math.sin(angle) * 0.7
					);
					cloudGroup.add(server);
				}

				mesh = cloudGroup;
				break;

			case "Database Management":
				const dbGroup = new THREE.Group();
				
				// Create data flow visualization
				for (let i = 0; i < 3; i++) {
					// Database cylinder
					const cylinder = new THREE.Mesh(
						new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32),
						new THREE.MeshPhongMaterial({
							color: 0x4488ff,
							transparent: true,
							opacity: 0.8,
							emissive: 0x4488ff,
							emissiveIntensity: 0.3,
						})
					);
					cylinder.position.y = i * 0.8 - 0.8;
					dbGroup.add(cylinder);

					// Add data flow particles
					for (let j = 0; j < 5; j++) {
						const particle = new THREE.Mesh(
							new THREE.SphereGeometry(0.05),
							new THREE.MeshPhongMaterial({
								color: 0x00ffcc,
								emissive: 0x00ffcc,
								emissiveIntensity: 0.5,
							})
						);
						particle.position.y = i * 0.8 - 0.8;
						particle.userData = {
							offset: j * (Math.PI * 2 / 5),
							speed: 0.02,
							radius: 0.7,
						};
						dbGroup.add(particle);
					}
				}
				mesh = dbGroup;
				break;

			case "UI/UX Design":
				// Create enhanced interactive UI elements
				const uiGroup = new THREE.Group();

				// Main canvas
				const canvas = new THREE.Mesh(
					new THREE.PlaneGeometry(2, 2),
					new THREE.MeshPhongMaterial({
						color: 0x50c7f0,
						transparent: true,
						opacity: 0.3,
					})
				);
				uiGroup.add(canvas);

				// UI Elements
				const shapes = [
					new THREE.CircleGeometry(0.2, 32),
					new THREE.BoxGeometry(0.3, 0.3, 0.05),
					new THREE.RingGeometry(0.15, 0.2, 32),
				];

				shapes.forEach((shape, i) => {
					const element = new THREE.Mesh(
						shape,
						new THREE.MeshPhongMaterial({
							color: 0x00ff00, // Bright green
							transparent: true,
							opacity: 0.9,
							emissive: 0x00ff00,
							emissiveIntensity: 0.5,
						})
					);
					element.position.set(
						Math.cos((i / shapes.length) * Math.PI * 2) * 0.7,
						Math.sin((i / shapes.length) * Math.PI * 2) * 0.7,
						0.1
					);
					uiGroup.add(element);
				});

				mesh = uiGroup;
				break;

			default:
				mesh = new THREE.Mesh(
					new THREE.SphereGeometry(1),
					new THREE.MeshPhongMaterial({
						color: 0x50c7f0,
						wireframe: true,
					})
				);
		}

		scene.add(mesh);

		// Update lighting for better visibility
		const lights: Array<{ color: number; position: [number, number, number]; intensity: number }> = [
			{ color: 0xffffff, position: [10, 10, 10], intensity: 2 },
			{ color: 0xffffff, position: [-10, -10, -10], intensity: 2 },
			{ color: 0xffffff, position: [0, 0, 5], intensity: 1.5 },
		];

		lights.forEach(({ color, position: [x, y, z], intensity }) => {
			const light = new THREE.PointLight(color, intensity);
			light.position.set(x, y, z);
			scene.add(light);
		});

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
		scene.add(ambientLight);

		// Custom animation based on service type
		const animate = () => {
			requestAnimationFrame(animate);
			if (mesh) {
				const time = Date.now() * 0.001;

				switch (type) {
					case "Mobile App Development":
						mesh.rotation.y = Math.sin(time * 0.5) * 0.2;
						mesh.children.forEach((child, i) => {
							if (i > 0) {
								child.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.1);
							}
						});
						break;

					case "Web Development":
						mesh.children.forEach((child, i) => {
							if (i > 3) { // Skip browser buttons
								child.position.z = Math.sin(time * 2 + i) * 0.1;
								child.rotation.z = Math.sin(time + i) * 0.05;
							}
						});
						break;

					case "Database Management":
						mesh.children.forEach((child, i) => {
							if (i > 2) { // Animate particles
								const { offset, speed, radius } = child.userData;
								child.position.x = Math.cos(time * speed + offset) * radius;
								child.position.z = Math.sin(time * speed + offset) * radius;
								child.scale.setScalar(0.8 + Math.sin(time * 2 + offset) * 0.2);
							}
						});
						break;

					case "Custom Software Development":
						mesh.rotation.y += 0.005;
						mesh.children.forEach((child, i) => {
							child.rotation.z += 0.005 * (i % 2 ? 1 : -1);
							if (i > 0) {
								child.scale.setScalar(1 + Math.sin(time + i) * 0.1);
							}
						});
						break;

					case "Cloud Services":
						mesh.rotation.y += 0.005;
						mesh.children.forEach((child, i) => {
							if (i > 0) {
								child.position.y = 0.4 + Math.sin(time + i) * 0.1;
								child.rotation.y += 0.02;
							}
						});
						break;

					case "UI/UX Design":
						mesh.rotation.z += 0.002;
						mesh.children.forEach((child, i) => {
							if (i > 0) {
								child.rotation.z -= 0.01;
								child.position.x = Math.cos((i / mesh.children.length) * Math.PI * 2) * (0.7 + Math.sin(time) * 0.1);
								child.position.y = Math.sin((i / mesh.children.length) * Math.PI * 2) * (0.7 + Math.sin(time) * 0.1);
							}
						});
						break;
					
					default:
						mesh.rotation.y += 0.01;
				}
			}

			controls.update();
			renderer.render(scene, camera);
		};

		animate();

		// Add mouse interaction
		const handleMouseMove = (event: MouseEvent) => {
			if (!containerRef.current || !mesh) return;
			const rect = containerRef.current.getBoundingClientRect();
			const x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
			const y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
			
			mesh.rotation.x += y * 0.01;
			mesh.rotation.y += x * 0.01;
		};

		containerRef.current.addEventListener('mousemove', handleMouseMove);

		return () => {
			if (container) {
				container.removeEventListener('mousemove', handleMouseMove);
				container.removeChild(renderer.domElement);
			}
		};
	}, [type]);

	return (
		<div className="h-[300px] w-full rounded-xl bg-gray-900/50" ref={containerRef} />
	);
};

/* Services data array */
const services = [
	{
		title: "Mobile App Development",
		description:
			"We specialize in Mobile app development, crafting high-quality and user-friendly applications that engage your audience and boost your mobile presence.",
		longDescription:
			"Our mobile app development service covers everything from concept to deployment. We create native and cross-platform applications that deliver exceptional user experiences while ensuring optimal performance and scalability.",
		features: [
			"Native iOS and Android Development",
			"Cross-Platform Solutions",
			"UI/UX Design for Mobile",
			"App Store Optimization",
			"Performance Optimization",
			"Push Notifications",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		title: "Web Development",
		description:
			"We provide expert web development services, creating stunning and functional websites that enhance your online presence and drive business growth.",
		longDescription:
			"Our web development services focus on creating modern, responsive, and high-performance websites. We leverage cutting-edge technologies and best practices to deliver solutions that not only look great but also provide excellent user experience and business value.",
		features: [
			"Responsive Design",
			"Custom Web Applications",
			"E-commerce Solutions",
			"CMS Development",
			"SEO Optimization",
			"Performance Tuning",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			</svg>
		),
	},
	{
		title: "Custom Software Development",
		description:
			"Tailored software solutions to meet unique business needs, enhancing efficiency and performance with scalable, robust, and user-friendly applications.",
		longDescription:
			"We develop custom software solutions tailored to your specific business requirements. Our development process ensures high-quality, scalable, and maintainable software that drives business efficiency and growth.",
		features: [
			"Custom Business Solutions",
			"API Development",
			"Legacy System Updates",
			"Integration Services",
			"Quality Assurance",
			"Maintenance & Support",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
				/>
			</svg>
		),
	},
	{
		title: "Cloud Services",
		description:
			"Offering cloud architecture, deployment, migration, and DevOps services to optimize and scale your business with AWS, Azure, and Google Cloud.",
		longDescription:
			"We provide comprehensive cloud solutions to help businesses leverage the power of cloud computing. Our services include cloud migration, architecture design, and ongoing management to ensure optimal performance and cost-efficiency.",
		features: [
			"Cloud Migration",
			"Infrastructure as Code",
			"DevOps Implementation",
			"Serverless Architecture",
			"Cloud Security",
			"24/7 Monitoring",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
				/>
			</svg>
		),
	},
	{
		title: "Database Management",
		description:
			"Efficient database management services, including design, development, optimization, and data warehousing, ensuring robust and scalable solutions for your business needs.",
		longDescription:
			"Our database management services ensure your data is properly structured, secure, and optimized for performance. We handle everything from database design to maintenance and optimization.",
		features: [
			"Database Design",
			"Performance Optimization",
			"Data Migration",
			"Backup & Recovery",
			"Security Implementation",
			"Scaling Solutions",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
				/>
			</svg>
		),
	},
	{
		title: "UI/UX Design",
		description:
			"Enhancing user experiences through intuitive design, user research, prototyping, and usability testing to create engaging and responsive interfaces.",
		longDescription:
			"We create intuitive and engaging user interfaces that enhance user experience and drive engagement. Our design process combines aesthetics with functionality to deliver memorable digital experiences.",
		features: [
			"User Research",
			"Wireframing",
			"Interactive Prototypes",
			"Visual Design",
			"Usability Testing",
			"Design Systems",
		],
		icon: (
			<svg
				className="w-8 h-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
				/>
			</svg>
		),
	},
];

export default function Services() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-gray-900 to-black text-white">
			<Navbar />

			{/* Hero Section */}
			<section className="pt-32 pb-20 bg-gradient-to-r from-blue-900 to-purple-800">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-3xl mx-auto text-center"
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Our Services
						</h1>
						<p className="text-xl opacity-90 mb-8">
							Comprehensive digital solutions to help your business grow and
							succeed in the modern world
						</p>
						<div className="h-1 w-20 bg-blue-400 mx-auto"></div>
					</motion.div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-16">
						{services.map((service, index) => (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
							>
								<div className="grid md:grid-cols-2 gap-8 items-center">
									<div>
										<div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
											{service.icon}
										</div>
										<h2 className="text-2xl font-bold mb-4 text-white">
											{service.title}
										</h2>
										<p className="text-gray-400 mb-6">
											{service.longDescription}
										</p>
										<div className="space-y-4">
											<h3 className="text-lg font-semibold text-blue-400">
												Key Features
											</h3>
											<ul className="grid grid-cols-2 gap-3">
												{service.features?.map((feature, i) => (
													<li
														key={i}
														className="flex items-center text-gray-300"
													>
														<svg
															className="w-5 h-5 mr-2 text-blue-500"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</svg>
														{feature}
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="rounded-xl overflow-hidden">
										<ServiceAnimation type={service.title} />
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-2xl mx-auto"
					>
						<h2 className="text-3xl font-bold mb-6">
							Ready to Start Your Project?
						</h2>
						<p className="text-xl mb-8">
          Let&apos;s discuss how our services can help bring your ideas to life.
        </p>
						<a
							href="/contact"
							className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
						>
							Get in Touch
						</a>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
