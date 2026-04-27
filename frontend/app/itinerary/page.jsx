'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Wallet, 
  MapPin, 
  CheckCircle2, 
  Download, 
  Share2, 
  Sparkles,
  ChevronRight,
  Clock,
  Navigation
} from 'lucide-react';
import Link from 'next/link';
import { popularDestinations } from '../data/destinations';

const ItineraryContent = () => {
  const searchParams = useSearchParams();
  
  const tripData = useMemo(() => {
    const days = parseInt(searchParams.get('days')) || 7;
    const people = parseInt(searchParams.get('people')) || 2;
    const budget = searchParams.get('budget') || 'Standard';
    const pace = searchParams.get('pace') || 'Balanced';
    const preferences = searchParams.get('preferences')?.split(',') || [];
    const mustVisit = searchParams.get('mustVisit')?.split(',') || [];

    // Calculate Price
    const budgetMultipliers = { 'Budget': 50, 'Standard': 120, 'Luxury': 350 };
    const totalPrice = days * people * (budgetMultipliers[budget] || 120);

    // Itinerary Generation Logic
    let itinerary = [];
    let usedDestinations = new Set();

    // 1. Add Must Visit places
    mustVisit.forEach(name => {
      const dest = popularDestinations.find(d => d.name === name);
      if (dest && itinerary.length < days) {
        itinerary.push(dest);
        usedDestinations.add(dest.name);
      }
    });

    // 2. Add Preferred places
    if (itinerary.length < days) {
      const preferred = popularDestinations.filter(d => 
        !usedDestinations.has(d.name) && preferences.some(p => d.category.includes(p))
      );
      
      preferred.forEach(dest => {
        if (itinerary.length < days) {
          itinerary.push(dest);
          usedDestinations.add(dest.name);
        }
      });
    }

    // 3. Fill the rest with popular places
    if (itinerary.length < days) {
      const remaining = popularDestinations.filter(d => !usedDestinations.has(d.name));
      remaining.forEach(dest => {
        if (itinerary.length < days) {
          itinerary.push(dest);
          usedDestinations.add(dest.name);
        }
      });
    }

    // Final mapping to day objects
    const dayPlan = itinerary.slice(0, days).map((dest, index) => {
      // Pick a logical activity
      const activity = dest.activities?.[index % dest.activities.length] || "Sightseeing & Exploration";
      
      return {
        day: index + 1,
        destination: dest.name,
        category: dest.category,
        image: dest.image,
        activity: activity,
        description: dest.description.split('.')[0] + '.' // Just the first sentence
      };
    });

    return { days, people, budget, pace, totalPrice, dayPlan };
  }, [searchParams]);

  const { days, people, budget, pace, totalPrice, dayPlan } = tripData;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-zinc-900 pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/customize-tour" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors font-medium text-sm">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Modify Preferences</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-bold text-black tracking-tight">DreamLanka</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-stone-100 rounded-lg text-zinc-500 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-zinc-800 transition-all">
              <Download size={16} />
              <span className="hidden sm:inline">Save PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-stone-200 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border border-emerald-100">
                <Sparkles size={12} />
                Personalized Itinerary
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                Your Sri Lankan Journey
              </h1>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Calendar size={18} className="text-emerald-500" />
                  {days} Days
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Users size={18} className="text-emerald-500" />
                  {people} People
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Clock size={18} className="text-emerald-500" />
                  {pace} Pace
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Wallet size={18} className="text-emerald-500" />
                  {budget} Budget
                </div>
              </div>
            </div>
            
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-[24px] min-w-[240px]">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Estimated Total Price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-black">${totalPrice.toLocaleString()}</span>
                <span className="text-zinc-500 text-sm font-medium">USD</span>
              </div>
              <button className="w-full mt-4 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]">
                Book This Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="space-y-12">
          {dayPlan.map((item, index) => (
            <motion.div 
              key={item.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 md:gap-10 group"
            >
              {/* Day Indicator */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-emerald-600 font-black text-lg md:text-xl shadow-lg shadow-emerald-500/10 z-10">
                  {item.day}
                </div>
                {index !== dayPlan.length - 1 && (
                  <div className="w-0.5 flex-1 bg-emerald-200/50 my-2" />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white rounded-[32px] border border-stone-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-emerald-100 transition-all duration-500">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-56 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.destination} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 md:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Navigation size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Day {item.day} Destination</span>
                      </div>
                      <ChevronRight size={20} className="text-stone-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-black mb-2">{item.destination}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-100 group-hover:bg-emerald-50/50 group-hover:border-emerald-100 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-500 shadow-sm">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Activity of the Day</p>
                          <p className="text-sm font-bold text-zinc-800">{item.activity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End of Journey */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-black text-white rounded-[40px] p-10 md:p-16 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to embark?</h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8 text-sm md:text-base">
              Secure your personalized Sri Lankan tour today and let us handle all the logistics for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/20 active:scale-[0.98]">
                Book This Tour Now
              </button>
              <button className="px-10 py-5 bg-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md">
                Talk to Advisor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ItineraryPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="text-emerald-500"
        >
          <Settings size={40} />
        </motion.div>
      </div>
    }>
      <ItineraryContent />
    </Suspense>
  );
};

export default ItineraryPage;
