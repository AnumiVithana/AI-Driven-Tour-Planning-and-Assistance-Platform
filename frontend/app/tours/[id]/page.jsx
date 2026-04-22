"use client";

import { useState, use } from "react";
import Link from "next/link";
import { featuredTours } from "../../data/tours";
import { MapPin, ArrowLeft, CheckCircle, XCircle, Map } from "lucide-react";
import { notFound } from "next/navigation";

export default function TourDetailsPage({ params }) {
	// Unwrap params promise in Next.js 15
	const { id } = use(params);
	
	const tourId = parseInt(id, 10);
	const tour = featuredTours.find(t => t.id === tourId);

	const [bookingStatus, setBookingStatus] = useState("idle");

	if (!tour) {
		notFound();
	}

	const handleBookNow = () => setBookingStatus("success");
	const handleCancelBooking = () => setBookingStatus("canceled");

	return (
		<main className="min-h-screen bg-stone-50 pb-20 relative">
			{/* Minimal Nav */}
			<div className="w-full bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<Link href="/tours" className="flex items-center gap-2 group text-stone-600 hover:text-black transition-colors font-medium">
						<ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
						Back to All Tours
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-lg font-bold text-black hidden sm:block">DreamLanka</span>
					</div>
				</div>
			</div>

			{/* Main Content Split */}
			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Tour Header */}
				<div className="mb-10">
					<div className="inline-block bg-stone-200/50 backdrop-blur-md px-3 py-1 text-xs font-bold text-stone-700 uppercase tracking-wider rounded-lg mb-4 border border-stone-200">
						{tour.category}
					</div>
					<h1 className="text-3xl md:text-5xl font-extrabold text-black mb-4">
						{tour.title}
					</h1>
					<div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-stone-600 font-medium">
						<span className="flex items-center gap-1.5"><Map size={18} className="text-stone-400"/> {tour.duration}</span>
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
						<span className="font-bold flex items-center gap-1.5">
							<MapPin size={18} className="text-emerald-500"/> 
							{tour.destinations.length} Key Locations
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left Column (Details & Itinerary) */}
					<div className="lg:col-span-2 space-y-12">
						<div className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-stone-100">
							<img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
						</div>
					<section>
						<h2 className="text-2xl font-bold text-black mb-4">Tour Overview</h2>
						<p className="text-stone-600 text-sm leading-relaxed">{tour.description}</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-black mb-6">Day by Day Itinerary</h2>
						<div className="space-y-8 pl-4 border-l-2 border-stone-200">
							{tour.itinerary.map((day, idx) => (
								<div key={idx} className="relative pl-6">
									<div className="absolute -left-[26px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 shadow-sm" />
									<div className="inline-block px-2 py-1 bg-stone-100 text-stone-600 font-extrabold text-xs uppercase tracking-widest rounded-lg mb-2 shadow-sm border border-stone-200/50">
										{day.day}
									</div>
									<h3 className="text-xl font-bold text-black mb-2">{day.title}</h3>
									<p className="text-stone-600 text-sm leading-relaxed">{day.description}</p>
								</div>
							))}
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-black mb-4">Destinations Map Highlights</h2>
						<div className="flex flex-wrap gap-2">
							{tour.destinations.map((dest, i) => (
								<span
									key={i}
									className="flex items-center gap-1.5 text-sm font-medium bg-white text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm"
								>
									<MapPin size={16} className="text-stone-400" />
									{dest}
								</span>
							))}
						</div>
					</section>
				</div>

				{/* Right Column (Sticky Booking Card) */}
				<div className="lg:col-span-1">
					<div className="sticky top-24 bg-white rounded-3xl border border-stone-200 shadow-xl p-8">
						<h3 className="text-2xl font-bold text-black mb-6 border-b border-stone-100 pb-4">Booking Details</h3>
						
						<div className="mb-8">
							<p className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-2">Total Price</p>
							<p className="text-4xl font-black text-emerald-600">{tour.budgetDetails.total}</p>
						</div>

						<div className="mb-6 space-y-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
							<p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">What's Included</p>
							<ul className="space-y-2 text-sm text-stone-700 font-medium">
								{tour.budgetDetails.included.map((item, i) => (
									<li key={i} className="flex items-start gap-3">
										<CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="mb-8 space-y-3 p-4 bg-red-50/50 rounded-2xl border border-red-100">
							<p className="text-sm font-bold text-red-800 uppercase tracking-widest">What's Excluded</p>
							<ul className="space-y-2 text-sm text-stone-600 font-medium">
								{tour.budgetDetails.excluded.map((item, i) => (
									<li key={i} className="flex items-start gap-3">
										<XCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
										{item}
									</li>
								))}
							</ul>
						</div>

						{/* Booking Controls */}
						<div className="pt-6 border-t border-stone-100">
							{bookingStatus === "idle" && (
								<button onClick={handleBookNow} className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-stone-800 transition-colors shadow-md hover:shadow-xl hover:-translate-y-0.5">
									Book Now
								</button>
							)}
							
							{bookingStatus === "success" && (
								<div className="space-y-4 animate-in fade-in zoom-in duration-300">
									<div className="w-full py-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-sm">
										<CheckCircle size={22} className="text-emerald-600" />
										Booking successful!
									</div>
									<button onClick={handleCancelBooking} className="w-full py-3 bg-white border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">
										Cancel Booking
									</button>
								</div>
							)}

							{bookingStatus === "canceled" && (
								<div className="w-full py-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-bold text-center flex flex-col items-center justify-center gap-2 animate-in fade-in duration-300">
									<XCircle size={24} className="text-red-600" />
									<span>Booking canceled successfully.</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			</div>
		</main>
	);
}
