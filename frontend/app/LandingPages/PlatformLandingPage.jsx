"use client";

import Link from "next/link";
import { featuredTours } from "../data/tours";
import { popularDestinations } from "../data/destinations";
import {
	Settings,
	Bot,
	MessageSquare,
	Home,
	Map,
	MapPin,
	Phone,
	ChevronDown,
	PlusIcon,
	Users,
	Linkedin,
	Building2,
	Info,
	BookOpen,
	LogIn,
	ArrowRight,
	UserPlus,
	Play,
	Apple,
	Facebook,
	Slack,
	Twitch,
	Figma,
	Twitter,
	Mountain,
	Sun,
	Train,
	Camera,
	Coffee,
	Compass,
	Tent,
	Palmtree,
	LifeBuoy,
	Landmark,
	Sparkles,
	Github,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const PlatformLandingPage = () => {
	// Activities array
	const activities = [
		{ Icon: Palmtree, name: "Relaxing Beaches" },
		{ Icon: LifeBuoy, name: "White Water Rafting" },
		{ Icon: Compass, name: "Snorkeling" },
		{ Icon: Landmark, name: "Cultural Visits" },
		{ Icon: Camera, name: "Wildlife Safaris" },
		{ Icon: Mountain, name: "Hiking & Trekking" },
		{ Icon: Coffee, name: "Tea Tasting" },
		{ Icon: Train, name: "Scenic Train Rides" },
	];

	// Company icons array
	const companyIcons = [
		{ Icon: Apple, name: "Apple" },
		{ Icon: Slack, name: "Slack" },
		{ Icon: Twitter, name: "Twitter" },
		{ Icon: Twitch, name: "Twitch" },
		{ Icon: Figma, name: "Figma" },
		{ Icon: Facebook, name: "Facebook" },
		{ Icon: Apple, name: "Apple" },
		{ Icon: Slack, name: "Slack" },
		{ Icon: Twitter, name: "Twitter" },
		{ Icon: Figma, name: "Figma" },
		{ Icon: Facebook, name: "Facebook" },
	];

	// Testimonials array
	const testimonials = [
		{
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
			message:
				"This platform has transformed how I connect with clients and showcase my writing skills. The community is amazing!",
			name: "Sarah Johnson",
			designation: "Content Writer",
		},
		{
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
			message:
				"As a freelance writer, this platform has been a game-changer. I've found consistent work and built lasting relationships.",
			name: "Michael Chen",
			designation: "Freelance Writer",
		},
		{
			image:
				"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
			message:
				"The quality of writers here is exceptional. We've been able to scale our content marketing efforts significantly.",
			name: "Emily Rodriguez",
			designation: "Marketing Director",
		},
		{
			image:
				"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
			message:
				"I've been using this platform for over a year now. The support team is fantastic and the payment system is reliable.",
			name: "David Thompson",
			designation: "Technical Writer",
		},
		{
			image:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
			message:
				"Finding talented writers for our startup was challenging until we discovered this platform. Highly recommended!",
			name: "Lisa Wang",
			designation: "Startup Founder",
		},
		{
			image:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
			message:
				"The platform's interface is intuitive and the matching algorithm works perfectly. Great experience overall.",
			name: "James Wilson",
			designation: "Content Manager",
		},
	];

	// Twitter tweets array
	const tweets = [
		{
			avatar:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
			name: "Sarah Johnson",
			username: "@sarahwrites",
			content:
				"Just discovered this amazing writing platform! The community is incredible and I've already landed 3 new clients this week. Game changer! 🚀",
			time: "2h",
			likes: 42,
			retweets: 8,
		},
		{
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
			name: "Michael Chen",
			username: "@mikechen",
			content:
				"As a freelance writer, finding consistent work was always a challenge. This platform changed everything - now I have a steady stream of projects!",
			time: "4h",
			likes: 28,
			retweets: 5,
		},
		{
			avatar:
				"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
			name: "Emily Rodriguez",
			username: "@emilyro",
			content:
				"Our content marketing team has been using this platform for 6 months. The quality of writers is outstanding and the turnaround time is impressive!",
			time: "6h",
			likes: 35,
			retweets: 12,
		},
		{
			avatar:
				"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
			name: "David Thompson",
			username: "@davidthompson",
			content:
				"The payment system is so reliable and the support team responds quickly. Been using this platform for over a year now - highly recommend!",
			time: "8h",
			likes: 19,
			retweets: 3,
		},
		{
			avatar:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
			name: "Lisa Wang",
			username: "@lisawang",
			content:
				"Finding talented writers for our startup was impossible until we found this platform. Now we have a team of amazing writers!",
			time: "12h",
			likes: 31,
			retweets: 7,
		},
		{
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
			name: "James Wilson",
			username: "@jameswilson",
			content:
				"The interface is so intuitive and the matching algorithm works perfectly. Great experience overall - definitely worth trying!",
			time: "1d",
			likes: 24,
			retweets: 6,
		},
	];

	// Pricing plans array
	const pricingPlans = [
		{
			name: "Writer",
			price: "Free",
			period: "forever",
			description: "Perfect for individual writers starting their journey",
			features: [
				"Create unlimited profiles",
				"Browse job opportunities",
				"Apply to 5 projects per month",
				"Basic analytics dashboard",
				"Community support",
				"Standard payment processing",
			],
			ctaText: "Get Started Free",
			ctaStyle:
				"border border-zinc-300 bg-zinc-50 text-black hover:bg-zinc-100",
			popular: false,
		},
		{
			name: "Pro Writer",
			price: "$29",
			period: "per month",
			description: "For serious writers who want to scale their business",
			features: [
				"Everything in Writer plan",
				"Unlimited project applications",
				"Priority job matching",
				"Advanced analytics & insights",
				"Direct client communication",
				"Fast payment processing",
				"Portfolio showcase",
				"24/7 priority support",
			],
			ctaText: "Start Pro Trial",
			ctaStyle: "bg-black text-white hover:bg-zinc-800",
			popular: true,
		},
		{
			name: "Enterprise",
			price: "Custom",
			period: "pricing",
			description: "Tailored solutions for large teams and organizations",
			features: [
				"Everything in Pro Writer",
				"Custom integrations",
				"Dedicated account manager",
				"Advanced security features",
				"Custom analytics dashboard",
				"Priority support",
				"Team collaboration tools",
				"SLA guarantees",
			],
			ctaText: "Contact Us",
			ctaStyle:
				"border border-zinc-300 bg-zinc-50 text-black hover:bg-zinc-100",
			popular: false,
		},
	];

	// FAQ array
	const faqs = [
		{
			question: "How does the tour generator work?",
			answer:
				"It analyzes your preferences such as travel dates, budget, interests, and group size to create a personalized Sri Lanka itinerary tailored just for you.",
		},
		{
			question: "Can I fully customize my tour?",
			answer:
				"Yes! You can adjust destinations, duration, activities, and accommodation to match your exact travel style.",
		},
		{
			question: "Do I need to know where I want to go?",
			answer:
				"Not at all. You can simply enter your interests (like beaches, wildlife, or culture), and the system will suggest the best destinations for you.",
		},
		{
			question: "What can the chatbot help me with?",
			answer:
				"Our chatbot can help you plan your trip, suggest destinations, answer travel questions, and guide you through booking.",
		},
		{
			question: "Is the chatbot available 24/7?",
			answer:
				"Yes, the chatbot is available anytime to assist you instantly.",
		},
		{
			question: "Can I talk to a human instead?",
			answer:
				"Of course. If needed, you can request to connect with a human travel advisor. Just click on the Contact Us section.",
		},
	];

	// Footer links arrays
	const footerLinks = {
		product: [
			{ name: "Features", href: "#" },
			{ name: "Pricing", href: "#" },
			{ name: "API", href: "#" },
			{ name: "Integrations", href: "#" },
			{ name: "Changelog", href: "#" },
		],
		company: [
			{ name: "About", href: "#" },
			{ name: "Blog", href: "#" },
			{ name: "Careers", href: "#" },
			{ name: "Press", href: "#" },
			{ name: "Partners", href: "#" },
		],
		resources: [
			{ name: "Help Center", href: "#" },
			{ name: "Documentation", href: "#" },
			{ name: "Community", href: "#" },
			{ name: "Templates", href: "#" },
			{ name: "Status", href: "#" },
		],
		legal: [
			{ name: "Privacy Policy", href: "#" },
			{ name: "Terms of Service", href: "#" },
			{ name: "Cookie Policy", href: "#" },
			{ name: "GDPR", href: "#" },
			{ name: "Security", href: "#" },
		],
	};

	return (
		<div className="w-full h-full relative bg-gradient-to-tr from-white to-stone-50 overflow-hidden">
			<div className="relative max-w-7xl mx-auto border-l border-r border-dashed border-stone-300">
				{/* Header */}
				<nav className="relative flex justify-between items-center px-6 py-4 border-b border-stone-300 border-dashed">
					{/* Crosshair Markers */}
					<div className="absolute -bottom-2 -left-2 w-4 h-4 flex items-center justify-center">
						<PlusIcon size={16} className="text-stone-400" />
					</div>
					<div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center">
						<PlusIcon size={16} className="text-stone-400" />
					</div>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-lg font-bold text-black">DreamLanka</span>
					</div>

					<div className="flex gap-2 group">
						<button className="text-black p-2 hover:text-zinc-900 hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1 text-sm">
							<Home size={16} />
							Home
						</button>
						<Link href="/tours" className="text-black p-2 hover:text-zinc-900 hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1 text-sm">
							<Map size={16} />
							Tours
						</Link>
						<Link href="/destinations" className="text-black p-2 hover:text-zinc-900 hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1 text-sm">
							<MapPin size={16} />
							Destinations
						</Link>
						<button 
							onClick={() => document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' })}
							className="text-black p-2 hover:text-zinc-900 hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1 text-sm"
						>
							<Phone size={16} />
							Contact Us
						</button>
					</div>
					<div className="flex gap-2">
						<Link href="/chat" className="px-3 py-1.5 bg-black text-white rounded-xl hover:shadow-xl transition-colors flex items-center gap-1 text-xs">
							<MessageSquare size={14} />
							Chat with us
						</Link>
					</div>
				</nav>

				{/* Hero Section */}
				<div className="py-20 space-y-4 text-center ">
					<h1 className="text-5xl font-extrabold text-black mb-2 leading-tight">
						Your Dream Tour to Sri Lanka!
					</h1>
					<p className="text-zinc-600 mb-8 max-w-md mx-auto">
						Customize your perfect journey and explore Sri Lanka your way with
						smart planning and real-time assistance.
					</p>
					<br />
					<div className="flex gap-4 justify-center">
						<Link href="/customize-tour" className="px-6 py-3 text-sm bg-black text-white rounded-xl hover:bg-zinc-800 hover:shadow-xl transition-colors font-medium flex items-center gap-2">
							<Settings size={18} />
							Customize my tour
						</Link>
						<Link href="/chat" className="px-6 py-3 text-sm border border-zinc-300 bg-zinc-50 text-black rounded-xl hover:bg-zinc-200 hover:shadow-xl transition-colors font-medium flex items-center gap-2">
							<Bot size={18} />
							Chat with travel assistant
						</Link>
					</div>

					{/* User Count Section */}
					<div className="pt-10">
						<div className="flex items-center justify-center gap-12 text-sm text-zinc-600">
							<div className="text-center">
								<div className="text-4xl font-extrabold text-black mb-1">5+</div>
								<div>Tours</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-extrabold text-black mb-1">20+</div>
								<div>Destinations</div>
							</div>
							<div className="text-center">
								<div className="text-4xl font-extrabold text-black mb-1">70+</div>
								<div>Happy Travelers</div>
							</div>
						</div>
					</div>

					{/* Trusted By Section */}
					<div className="pt-12">
						<div className="relative border-t border-b border-dashed border-zinc-200 w-full">
							<div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center">
								<PlusIcon size={16} className="text-stone-400" />
							</div>
							<div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center">
								<PlusIcon size={16} className="text-stone-400" />
							</div>
							<div className="absolute -bottom-2 -left-2 w-4 h-4 flex items-center justify-center">
								<PlusIcon size={16} className="text-stone-400" />
							</div>
							<div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center">
								<PlusIcon size={16} className="text-stone-400" />
							</div>
							<div className="flex items-center justify-between gap-8 max-w-5xl mx-auto py-6 px-6">
								<p className="text-sm font-medium text-zinc-500 tracking-wide uppercase whitespace-nowrap flex-shrink-0">
									Top Activities
								</p>
								<div className="flex-1 overflow-hidden">
									<motion.div
										className="flex items-center gap-4"
										animate={{ x: [0, -600] }}
										transition={{
											duration: 20,
											repeat: Infinity,
											ease: "linear",
										}}
									>
										{/* First set of icons */}
										{activities.map(({ Icon, name }, index) => (
											<motion.div
												key={`first-${name}-${index}`}
												className="group cursor-pointer px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all flex-shrink-0 shadow-sm"
											>
												<Icon
													size={20}
													className="text-zinc-500 group-hover:text-black transition-colors"
												/>
												<span className="text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">
													{name}
												</span>
											</motion.div>
										))}
										{/* Second set of icons for seamless loop */}
										{activities.map(({ Icon, name }, index) => (
											<motion.div
												key={`second-${name}-${index}`}
												className="group cursor-pointer px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all flex-shrink-0 shadow-sm"
											>
												<Icon
													size={20}
													className="text-zinc-500 group-hover:text-black transition-colors"
												/>
												<span className="text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">
													{name}
												</span>
											</motion.div>
										))}
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Our Specialty Section */}
				<div className="py-16 px-6 bg-white border-t border-b border-dashed border-zinc-200">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-black mb-4">
							Our Specialty
						</h2>
						<p className="text-zinc-600 max-w-md mx-auto">
							Experience seamless travel planning powered by advanced AI
						</p>
					</div>

					<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Chatbot Tile */}
						<div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group">
							<div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
								<Bot size={28} className="text-white" />
							</div>
							<h3 className="text-xl font-bold text-black mb-3 group-hover:text-zinc-700 transition-colors">
								Travel Assistant Chatbot
							</h3>
							<p className="text-zinc-600 text-sm leading-relaxed">
								Chat instantly with our dedicated AI travel bot to get accurate information about destinations, activities, and local tips. It's like having a local expert in your pocket!
							</p>
						</div>

						{/* Customize Tour Generator Tile */}
						<div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group">
							<div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
								<Sparkles size={28} className="text-white" />
							</div>
							<h3 className="text-xl font-bold text-black mb-3 group-hover:text-zinc-700 transition-colors">
								Customized Tour Generator
							</h3>
							<p className="text-zinc-600 text-sm leading-relaxed">
								Build your perfect itinerary in seconds. Share your budget, available time, and preferences, and our smart AI generator will craft a personalized tour designed just for you.
							</p>
						</div>
					</div>
				</div>

				{/* Featured Tours Section */}
				<div className="pt-20 pb-8 px-6 bg-white shrink-0 w-full overflow-hidden">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-black mb-4">
							Featured Tours
						</h2>
						<p className="text-zinc-600 max-w-md mx-auto">
							From wild safaris to serene tea country getaways, discover hand-picked journeys crafted from Sri Lanka's finest destinations.
						</p>
					</div>

					<div className="w-full pb-12 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory flex gap-6 px-4 md:px-12">
						{featuredTours.map((tour) => (
							<div
								key={tour.id}
								className="snap-center md:snap-start flex-shrink-0 w-[300px] md:w-[380px] bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
							>
								<div className="relative h-56 w-full overflow-hidden">
									<img
										src={tour.image}
										alt={tour.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-black rounded-full shadow-sm">
										{tour.category}
									</div>
								</div>
								<div className="p-6 flex flex-col flex-1">
									<h3 className="text-xl font-bold text-black mb-2 line-clamp-1">
										{tour.title}
									</h3>
									<div className="flex items-center gap-2 text-sm text-zinc-500 mb-5 font-medium">
										<span>{tour.duration}</span>
										<span className="w-1 h-1 rounded-full bg-zinc-300" />
										<span className="text-emerald-600 font-bold">{tour.price}</span>
									</div>
									<div className="mt-auto">
										<p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-3">Destinations Included</p>
										<div className="flex flex-wrap gap-2">
											{tour.destinations.map((dest, i) => (
												<span key={i} className="flex items-center gap-1 text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md border border-zinc-200/60">
													<MapPin size={12} className="text-zinc-400" />
													{dest}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-center mt-4 mb-8">
						<Link href="/tours" className="w-[300px] py-4 bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium text-lg flex items-center justify-center gap-2 group whitespace-nowrap shadow-sm hover:shadow-md">
							View Tour Details
							<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>

				{/* Destinations Section */}
				<div className="pt-8 md:pt-12 shrink-0 w-full overflow-hidden">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-black mb-4">
							Popular Destinations
						</h2>
						<p className="text-zinc-600 max-w-md mx-auto">
							Explore the most iconic and breathtaking locations across Sri Lanka.
						</p>
					</div>

					<div className="relative border-t border-b border-dashed border-zinc-200 w-full">
						<div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>
						<div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>
						<div className="absolute -bottom-2 -left-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>
						<div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>

						<div className="overflow-hidden py-8">
							<motion.div
								className="flex gap-6"
								animate={{ x: [0, -1200] }}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear",
								}}
							>
								{/* First set of destinations */}
								{popularDestinations.slice(0, 10).map((dest, index) => (
									<Link
										href={`/destinations/${dest.place_id}`}
										key={`first-${index}`}
										className="flex-shrink-0 w-80 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-200 group cursor-pointer block"
									>
										<div className="relative h-48 w-full overflow-hidden">
											<img
												src={dest.image}
												alt={dest.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
											/>
											<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-black rounded-full shadow-sm">
												{dest.category}
											</div>
										</div>
										<div className="p-6">
											<h4 className="font-bold text-xl text-black mb-2 group-hover:text-zinc-700 transition-colors">
												{dest.name}
											</h4>
											<p className="text-zinc-600 text-sm leading-relaxed">
												{dest.description}
											</p>
										</div>
									</Link>
								))}
								{/* Second set of destinations for seamless loop */}
								{popularDestinations.slice(0, 10).map((dest, index) => (
									<Link
										href={`/destinations/${dest.place_id}`}
										key={`second-${index}`}
										className="flex-shrink-0 w-80 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-200 group cursor-pointer block"
									>
										<div className="relative h-48 w-full overflow-hidden">
											<img
												src={dest.image}
												alt={dest.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
											/>
											<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-black rounded-full shadow-sm">
												{dest.category}
											</div>
										</div>
										<div className="p-6">
											<h4 className="font-bold text-xl text-black mb-2 group-hover:text-zinc-700 transition-colors">
												{dest.name}
											</h4>
											<p className="text-zinc-600 text-sm leading-relaxed">
												{dest.description}
											</p>
										</div>
									</Link>
								))}
							</motion.div>
						</div>
					</div>

					<div className="flex justify-center mt-12 mb-24">
						<Link href="/destinations" className="w-[300px] py-4 bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium text-lg flex items-center justify-center gap-2 group whitespace-nowrap shadow-sm hover:shadow-md">
							View All Destinations
							<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>


				{/* Meet the Creators Section */}
				<div id="creators" className="py-16 px-6 bg-white">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-black mb-4">
							Meet the Creators
						</h2>
						<p className="text-zinc-600 max-w-md mx-auto">
							The foundational team behind DreamLanka's innovative travel platform.
						</p>
					</div>

					<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Card 1: Lathika Dilshan */}
						<div className="bg-stone-50 rounded-3xl p-8 border border-stone-200 text-center flex flex-col items-center hover:shadow-xl transition-all">

							<h3 className="text-2xl font-bold text-black mb-1">Lathika Dilshan</h3>
							<h4 className="text-emerald-600 font-semibold mb-4">Founder & ML Engineer</h4>
							<p className="text-zinc-600 leading-relaxed text-sm mb-4">
								Spearheaded the integration of Machine Learning and developed the two core AI models. Contributed extensively towards developing the core backend infrastructure and the frontend web experience.
							</p>
							<a href="https://www.linkedin.com/in/lathikadilshan/" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 w-full max-w-[220px] bg-black text-white rounded-xl hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 font-bold text-sm">
								<Linkedin size={18} /> Contact via LinkedIn
							</a>
						</div>

						{/* Card 2: Anumi Vithana */}
						<div className="bg-stone-50 rounded-3xl p-8 border border-stone-200 text-center flex flex-col items-center hover:shadow-xl transition-all">

							<h3 className="text-2xl font-bold text-black mb-1">Anumi Vithana</h3>
							<h4 className="text-emerald-600 font-semibold mb-4">Founder, PM & Cloud Architect</h4>
							<p className="text-zinc-600 leading-relaxed text-sm mb-4">
								Acted as the lead Project Manager and designed the Cloud Architecture and DevOps pipelines. Extensively co-developed the platform's backend and frontend systems.
							</p>
							<a href="https://www.linkedin.com/in/anumi-vithana-96239b296" target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 w-full max-w-[220px] bg-black text-white rounded-xl hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 font-bold text-sm">
								<Linkedin size={18} /> Contact via LinkedIn
							</a>
						</div>
					</div>
				</div>

				{/* FAQ Section */}
				<div className="py-12">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-black mb-2">
							Frequently Asked Questions
						</h2>
						<p className="text-zinc-600 max-w-md mx-auto text-sm">
							Everything you need to know about our platform
						</p>
					</div>

					<div className="max-w-md mx-auto px-6">
						<div className="space-y-2">
							{faqs.map((faq, index) => (
								<details
									key={index}
									className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors group"
								>
									<summary className="p-4 cursor-pointer list-none flex items-center justify-between text-sm font-medium text-black hover:text-zinc-700 transition-colors">
										<span>{faq.question}</span>
										<svg
											className="w-4 h-4 transition-transform group-open:rotate-180"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</summary>
									<div className="px-4 pb-4 pt-0">
										<p className="text-zinc-600 text-xs leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</details>
							))}
						</div>
					</div>
				</div>



				{/* Footer */}
				<footer className="text-black max-w-7xl mx-auto">
					{/* Footer Links */}




					<div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-12 border-t border-dashed border-stone-300 relative">
						<div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>
						<div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center">
							<PlusIcon size={16} className="text-stone-400" />
						</div>
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
								<div className="w-3 h-3 bg-white rounded-full"></div>
							</div>
							<span className="text-sm text-zinc-600">
								© 2026 DreamLanka. All rights reserved.
							</span>
						</div>

						<div className="flex items-center gap-6">
							<a
								href="https://github.com/AnumiVithana/AI-Driven-Tour-Planning-and-Assistance-Platform.git"
								target="_blank"
								rel="noopener noreferrer"
								className="text-zinc-400 hover:text-black transition-colors flex items-center gap-2 text-sm font-medium"
							>
								<Github size={20} />
								<span>GitHub Repository</span>
							</a>
						</div>
					</div>


				</footer>
			</div>
		</div>
	);
};

export default PlatformLandingPage;
