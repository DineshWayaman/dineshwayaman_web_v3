"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const FAQs = [
	{
		question: "What services do you offer?",
		answer:
			"I specialize in mobile app development (iOS and Android), full-stack development, UI/UX design, and web application development using modern technologies like React, Next.js, and Three.js.",
	},
	{
		question: "How long does a typical project take?",
		answer:
			"Project timelines vary based on complexity and scope. A typical website might take 4-6 weeks, while larger applications can take 2-3 months or more.",
	},
	{
		question: "What is your pricing structure?",
		answer:
			"I offer flexible pricing options including project-based and hourly rates. Each project is quoted individually based on specific requirements.",
	},
];

export default function Contact() {
	const [formStatus, setFormStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
			<Navbar />

			<main className="pt-20">
				<div className="container mx-auto px-4 py-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto"
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
							Let&apos;s Connect
						</h1>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							{/* Contact Info */}
							<div>
								<h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-400">
											Email
										</h3>
										<a
											href="mailto:dineshwayaman@gmail.com"
											className="text-blue-400 hover:text-blue-300"
										>
											dineshwayaman@gmail.com
										</a>
									</div>
									<div>
										<h3 className="text-lg font-medium text-gray-400">
											Phone
										</h3>
										<a
											href="tel:+94779780991"
											className="text-blue-400 hover:text-blue-300"
										>
											+94 779 780 991
										</a>
									</div>
									<div>
										<h3 className="text-lg font-medium text-gray-400">
											Location
										</h3>
										<p>Colombo, Sri Lanka</p>
									</div>
									<div>
										<h3 className="text-lg font-medium text-gray-400">
											Social
										</h3>
										<div className="flex space-x-4 mt-2">
											<a
												href="https://www.linkedin.com/in/dineshwayaman/"
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-400 hover:text-white"
											>
												LinkedIn
											</a>
											<a
												href="https://github.com/dineshwayaman"
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-400 hover:text-white"
											>
												GitHub
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Contact Form */}
							<motion.form
								onSubmit={async (e) => {
									e.preventDefault();
									setIsSubmitting(true);
									const formData = new FormData(e.currentTarget);
									const data = {
										name: formData.get("name"),
										email: formData.get("email"),
										message: formData.get("message"),
									};

									try {
										const response = await fetch("/api/contact", {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify(data),
										});

										const result = await response.json();

										if (result.success) {
											setFormStatus({
												type: "success",
												message: result.message,
											});
										} else {
											throw new Error(result.message);
										}
									} catch (error: unknown) {
										setFormStatus({
											type: "error",
											message:
												error instanceof Error ? error.message : "Failed to send message. Please try again.",
										});
									} finally {
										setIsSubmitting(false);
									}
								}}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="space-y-6"
							>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-2"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none"
										placeholder="Your name"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none"
										placeholder="Your email"
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none resize-none"
										placeholder="Your message"
									></textarea>
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium transition-all ${
										isSubmitting
											? "opacity-50 cursor-not-allowed"
											: "hover:opacity-90"
									}`}
								>
									{isSubmitting ? (
										<span className="flex items-center justify-center">
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Sending...
										</span>
									) : (
										"Send Message"
									)}
								</button>

								{/* Status Message */}
								{formStatus.type && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className={`mt-4 p-3 rounded-lg ${
											formStatus.type === "success"
												? "bg-green-500/20 text-green-100"
												: "bg-red-500/20 text-red-100"
										}`}
									>
										{formStatus.message}
									</motion.div>
								)}
							</motion.form>
						</div>
					</motion.div>
				</div>
			</main>

			{/* Availability Section */}
			<section className="py-16 bg-gray-900/50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto text-center"
					>
						<h2 className="text-3xl font-bold mb-8">Working Hours</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="p-6 rounded-lg bg-white/5">
								<h3 className="text-xl font-semibold mb-4">Weekdays</h3>
								<p className="text-gray-300">9:00 AM - 6:00 PM (UTC)</p>
							</div>
							<div className="p-6 rounded-lg bg-white/5">
								<h3 className="text-xl font-semibold mb-4">Weekend</h3>
								<p className="text-gray-300">By Appointment (Email)</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto"
					>
						<h2 className="text-3xl font-bold mb-8 text-center">
							Frequently Asked Questions
						</h2>
						<div className="space-y-6">
							{FAQs.map((faq, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
								>
									<h3 className="text-xl font-semibold mb-2">
										{faq.question}
									</h3>
									<p className="text-gray-300">{faq.answer}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Call to Action */}
			{/* <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto text-center"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Ready to Start Your Project?
						</h2>
						<p className="text-xl mb-8 text-gray-100">
							Let&apos;s create something amazing together
						</p>
						<motion.a
							href="#contact-form"
							whileHover={{ scale: 1.05 }}
							className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:bg-opacity-90 transition-colors"
						>
							Get Started Now
						</motion.a>
					</motion.div>
				</div>
			</section> */}

			{/* Social Links */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto text-center"
					>
						<h2 className="text-3xl font-bold mb-8">Connect With Me</h2>
						<div className="flex justify-center space-x-6">
							{[
								{ name: "GitHub", url: "https://github.com/dineshwayaman" },
								{
									name: "LinkedIn",
									url: "https://www.linkedin.com/in/dineshwayaman/",
								},
							].map((platform, index) => (
								<motion.a
									key={platform.name}
									href={platform.url}
									target="_blank"
									rel="noopener noreferrer"
									initial={{ opacity: 0, scale: 0.5 }}
									whileInView={{ opacity: 1, scale: 1 }}
									whileHover={{ y: -5 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
								>
									<span className="text-2xl">{platform.name[0]}</span>
								</motion.a>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
