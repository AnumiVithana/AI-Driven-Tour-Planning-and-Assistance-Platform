"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { popularDestinations } from "../../data/destinations";
import { ArrowLeft, MapPin, Star, User, MessageCircle, Activity, X, CheckCircle2 } from "lucide-react";

export default function DestinationDetailsPage() {
	const pathname = usePathname();
	const id = parseInt(pathname.split("/").pop());
	const dest = popularDestinations.find((d) => d.place_id === id);

	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [reviewForm, setReviewForm] = useState({ rating: 5.0, comment: '' });
	const [reviews, setReviews] = useState(dest ? dest.reviews || [] : []);
	const [showSuccess, setShowSuccess] = useState(false);

	if (!dest) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-white">
				<h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
				<Link href="/destinations" className="text-emerald-600 hover:underline">Return to all destinations</Link>
			</div>
		);
	}

	const handleSubmitReview = (e) => {
		e.preventDefault();
		if (!reviewForm.comment.trim()) return;

		// Add new review locally to the state
		const newReview = { rating: parseFloat(reviewForm.rating).toFixed(1), text: reviewForm.comment };
		setReviews([newReview, ...reviews]);
		setIsReviewOpen(false);
		setShowSuccess(true);
		
		// Reset form and hide success toast after 3 seconds
		setReviewForm({ rating: 5.0, comment: '' });
		setTimeout(() => setShowSuccess(false), 3000);
	};

	return (
		<main className="min-h-screen bg-stone-50 pb-24 relative">
			{/* Navigation Header */}
			<div className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200">
				<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
					<Link href="/destinations" className="flex items-center gap-2 group text-stone-600 hover:text-black transition-colors font-medium">
						<ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
						Back to Destinations
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-lg font-bold text-black hidden sm:block">DreamLanka</span>
					</div>
				</div>
			</div>

			{/* Success Toast */}
			{showSuccess && (
				<div className="fixed top-24 left-0 right-0 mx-auto w-max z-50 bg-black text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center justify-center gap-3 animate-bounce">
					<CheckCircle2 className="text-emerald-400" />
					Review Submitted Successfully!
				</div>
			)}

			<div className="max-w-5xl mx-auto px-6 pt-12">
				{/* Header & Hero Image */}
				<div className="bg-white rounded-[2rem] p-4 sm:p-8 shadow-sm border border-stone-100 flex flex-col md:flex-row gap-8 mb-12">
					<div className="w-full md:w-1/2 rounded-3xl overflow-hidden relative min-h-[300px]">
						<img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
						<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-black rounded-full shadow-sm uppercase tracking-wider">
							{dest.category}
						</div>
					</div>
					
					<div className="w-full md:w-1/2 flex flex-col justify-center">
						<div className="flex items-center gap-2 text-emerald-600 font-medium text-sm mb-4">
							<MapPin size={18} />
							<span>{dest.location}</span>
						</div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-black mb-6">{dest.name}</h1>
						<div className="flex items-center gap-4 mb-8">
							<div className="flex items-center gap-1.5 bg-stone-100 px-4 py-2 rounded-xl text-black font-bold">
								<Star size={18} className="text-amber-400 fill-amber-400" />
								<span>{dest.averageRating} / 5</span>
							</div>
							<div className="text-stone-500 font-medium">
								{reviews.length} Verified Reviews
							</div>
						</div>
						<p className="text-stone-600 text-sm md:text-base leading-relaxed">
							{dest.description}
						</p>
					</div>
				</div>

				{/* Grid Layout for Activities & Highlights */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<div className="md:col-span-1 border border-stone-200 bg-white rounded-3xl p-8 shadow-sm">
						<div className="flex items-center gap-3 font-bold text-lg text-black mb-6">
							<Activity className="text-emerald-600" />
							Activities
						</div>
						<div className="flex flex-wrap gap-2">
							{dest.activities && dest.activities.map((activity, idx) => (
								<div key={idx} className="bg-stone-50 border border-stone-200 text-stone-700 px-4 py-2 rounded-full text-sm font-medium">
									{activity}
								</div>
							))}
						</div>
					</div>

					<div className="md:col-span-2 border border-stone-200 bg-white rounded-3xl p-8 shadow-sm">
						<div className="flex items-center gap-3 font-bold text-lg text-black mb-6">
							<Star className="text-emerald-600" />
							Destination Highlights
						</div>
						<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{dest.highlights && dest.highlights.map((highlight, idx) => (
								<li key={idx} className="flex items-center gap-3 text-stone-700">
									<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
									{highlight}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Reviews Section */}
				<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-stone-100 pb-8">
						<div>
							<h3 className="text-2xl font-extrabold text-black mb-2 flex items-center gap-3">
								<MessageCircle className="text-stone-400" size={28} />
								Traveler Reviews
							</h3>
							<p className="text-stone-500">Read what other explorers thought about {dest.name}</p>
						</div>
						<button 
							onClick={() => setIsReviewOpen(true)}
							className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-lg hover:shadow-xl active:scale-95 shrink-0"
						>
							Add Your Review
						</button>
					</div>

					<div className="space-y-6">
						{reviews.map((r, idx) => (
							<div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-100 flex flex-col gap-3">
								<div>
									<span className="bg-amber-100 text-amber-600 px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center">
										<Star size={12} className="inline mr-1 fill-amber-500 mb-0.5" />
										{r.rating || "5.0"} / 5.0
									</span>
								</div>
								<p className="text-stone-700 leading-relaxed italic">"{r.text}"</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Custom Add Review Modal Popup */}
			{isReviewOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
					<div className="bg-white max-w-lg w-full rounded-[2rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
						<button 
							onClick={() => setIsReviewOpen(false)}
							className="absolute top-6 right-6 p-2 bg-stone-100 text-stone-500 rounded-full hover:bg-stone-200 transition-colors"
						>
							<X size={20} />
						</button>
						
						<h3 className="text-2xl font-bold text-black mb-2">Write a Review</h3>
						<p className="text-stone-500 mb-8">Share your experience at {dest.name}</p>

						<form onSubmit={handleSubmitReview}>
							<div className="mb-6">
								<label className="block text-sm font-bold text-stone-700 mb-3">Your Rating (0.0 - 5.0)</label>
								<input
									type="number"
									min="0"
									max="5"
									step="0.1"
									required
									value={reviewForm.rating}
									onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
									className="w-full bg-stone-50 border border-stone-200 text-black p-4 rounded-xl outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-lg font-bold"
								/>
							</div>
							
							<div className="mb-8">
								<label className="block text-sm font-bold text-stone-700 mb-3">Your Comment</label>
								<textarea 
									required
									value={reviewForm.comment}
									onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
									placeholder="What did you love about this place?"
									className="w-full bg-stone-50 border border-stone-200 text-black p-4 rounded-xl h-32 outline-none focus:border-black focus:ring-1 focus:ring-black resize-none transition-all"
								></textarea>
							</div>

							<button 
								type="submit"
								className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-800 transition-all active:scale-95"
							>
								Submit Review
							</button>
						</form>
					</div>
				</div>
			)}
		</main>
	);
}
