"use client";

import { useState } from "react";
import Link from "next/link";
import { popularDestinations } from "../data/destinations";
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function DestinationsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 9;

	// Calculate pagination values
	const totalPages = Math.ceil(popularDestinations.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentDestinations = popularDestinations.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<main className="min-h-screen bg-white selection:bg-black selection:text-white pb-24">
			{/* Navigation Header */}
			<div className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
				<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2 group text-stone-600 hover:text-black transition-colors font-medium">
						<ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
						Back to Home
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-lg font-bold text-black hidden sm:block">DreamLanka</span>
					</div>
				</div>
			</div>

			{/* Page Header */}
			<div className="max-w-7xl mx-auto px-6 py-16 text-center">
				<h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
					Explore Sri Lanka
				</h1>
				<p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
					From majestic ancient ruins hidden deep in the jungle to pristine palm-fringed coastlines, discover the very best of what this beautiful island has to offer.
				</p>
			</div>

			{/* Grid Content */}
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{currentDestinations.map((dest) => (
						<div key={dest.place_id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all group flex flex-col h-full">
							<div className="relative h-64 w-full overflow-hidden shrink-0">
								<img
									src={dest.image}
									alt={dest.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
								/>
								<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-black rounded-full shadow-sm uppercase tracking-wider">
									{dest.category}
								</div>
							</div>
							<div className="p-8 flex flex-col flex-grow">
								<div className="flex items-center gap-2 text-emerald-600 font-medium text-sm mb-3">
									<MapPin size={16} />
									<span>{dest.location}</span>
								</div>
								<h2 className="text-2xl font-bold text-black mb-4 group-hover:text-stone-700 transition-colors">
									{dest.name}
								</h2>
								<p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow">
									{dest.description.length > 150 
										? dest.description.substring(0, 150) + "..." 
										: dest.description}
								</p>
								<div className="pt-6 border-t border-stone-100 flex items-center justify-between mt-auto">
									<Link href={`/destinations/${dest.place_id}`} className="text-sm font-bold text-black hover:text-emerald-600 transition-colors flex items-center gap-1 group/btn">
										View Details 
										<ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Prominent Pagination Controls */}
				{totalPages > 1 && (
					<div className="mt-16 flex flex-col items-center justify-center border-t border-stone-200 pt-10">
						<div className="text-stone-500 font-medium mb-4 uppercase tracking-widest text-xs">
							Page {currentPage} of {totalPages}
						</div>
						<div className="flex flex-wrap items-center justify-center gap-3">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-bold text-sm hover:border-black hover:text-black disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-700 transition-all"
							>
								<ChevronLeft size={18} />
								<span className="hidden sm:inline">Previous</span>
							</button>
							
							<div className="flex items-center gap-1.5 bg-stone-50 p-1.5 rounded-xl">
								{[...Array(totalPages)].map((_, index) => (
									<button
										key={index + 1}
										onClick={() => handlePageChange(index + 1)}
										className={`w-11 h-11 rounded-lg font-bold transition-all \${
											currentPage === index + 1
												? "bg-black text-white shadow-md scale-105"
												: "bg-white text-stone-600 shadow-sm hover:bg-stone-200"
										}`}
									>
										{index + 1}
									</button>
								))}
							</div>

							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-bold text-sm hover:border-black hover:text-black disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-700 transition-all"
							>
								<span className="hidden sm:inline">Next</span>
								<ChevronRight size={18} />
							</button>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
