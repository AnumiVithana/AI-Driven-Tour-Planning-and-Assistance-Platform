import Link from "next/link";
import { featuredTours } from "../data/tours";
import { MapPin, ArrowLeft, Settings } from "lucide-react";

export default function ToursPage() {
	return (
		<main className="min-h-screen bg-stone-50 pb-20 relative">
			{/* Top Bar minimal navigation */}
			<div className="w-full bg-white border-b border-stone-200">
				<div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2 group text-stone-600 hover:text-black transition-colors font-medium">
						<ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
						Back to Home
					</Link>
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-lg font-bold text-black">DreamLanka</span>
					</div>
				</div>
			</div>

			{/* Custom Tour Banner */}
			<div className="max-w-7xl mx-auto px-6 mt-12 mb-16">
				<div className="bg-black text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
					
					<div className="relative z-10 max-w-2xl text-center md:text-left">
						<h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
							Want to create your own customized tour?
						</h1>
						<p className="text-zinc-400 text-sm">
							Design your ideal Sri Lankan adventure from scratch with our intelligent AI trip builder.
						</p>
					</div>
					
					<button className="relative z-10 shrink-0 px-8 py-4 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] group">
						<Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" />
						Create Tour
					</button>
				</div>
			</div>

			{/* All Tours Grid */}
			<div className="max-w-7xl mx-auto px-6">
				<div className="mb-10 text-center">
					<h2 className="text-4xl font-bold text-black mb-4">All Tours</h2>
					<p className="text-stone-500">Discover all our expertly crafted travel packages.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredTours.map((tour) => (
						<Link
							href={`/tours/${tour.id}`}
							key={tour.id}
							className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer"
						>
							<div className="relative h-64 w-full overflow-hidden">
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
								<h3 className="text-xl font-bold text-black mb-2 group-hover:text-stone-700 transition-colors">
									{tour.title}
								</h3>
								<div className="flex items-center gap-2 text-sm text-stone-500 mb-5 font-medium">
									<span>{tour.duration}</span>
									<span className="w-1 h-1 rounded-full bg-stone-300" />
									<span className="text-emerald-600 font-bold">{tour.price}</span>
								</div>
								<div className="mt-auto">
									<p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3">
										Destinations Included
									</p>
									<div className="flex flex-wrap gap-2">
										{tour.destinations.map((dest, i) => (
											<span
												key={i}
												className="flex items-center gap-1 text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md border border-stone-200/60"
											>
												<MapPin size={12} className="text-stone-400" />
												{dest}
											</span>
										))}
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
