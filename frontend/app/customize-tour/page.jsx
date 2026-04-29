'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings, 
  Calendar, 
  Users, 
  Wallet, 
  Zap, 
  CheckCircle2, 
  ChevronDown, 
  MapPin, 
  Sparkles,
  Search,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { popularDestinations } from '../data/destinations';

const CustomizeTourPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    days: 7,
    people: 2,
    budget: 'Standard',
    pace: 'Balanced',
    preferences: [],
    mustVisit: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const budgetLevels = ['Budget', 'Standard', 'Luxury'];
  const travelPaces = ['Relaxed', 'Balanced', 'Active'];
  const preferenceOptions = [
    'Beach', 'Nature', 'Wildlife', 'Adventure', 'Hiking', 'Heritage', 'Culture', 'City', 
    'Photography', 'Surfing', 'Tea Gardens', 'Religious Sites', 'Water Sports', 
    'Whale Watching', 'Local Food', 'Shopping', 'Nightlife', 'History'
  ];

  const handlePreferenceToggle = (pref) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const handleMustVisitToggle = (destName) => {
    setFormData(prev => ({
      ...prev,
      mustVisit: prev.mustVisit.includes(destName)
        ? prev.mustVisit.filter(d => d !== destName)
        : [...prev.mustVisit, destName]
    }));
  };

  const [isBooking, setIsBooking] = useState(false);

  const generateItineraryLogic = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tours/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tour');
      }

      const data = await response.json();
      
      const days = parseInt(formData.days) || 7;
      const people = parseInt(formData.people) || 2;
      const budget = formData.budget || 'Standard';
      const budgetMultipliers = { 'Budget': 50, 'Standard': 120, 'Luxury': 350 };
      const totalPrice = days * people * (budgetMultipliers[budget] || 120);

      return { ...data, totalPrice };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const result = await generateItineraryLogic();
    if (result && !result.error) {
      setGeneratedItinerary(result);
      setIsGenerating(false);
      setIsSuccess(true);
      setShowBookingConfirm(false);
    } else {
      setIsGenerating(false);
      alert('Failed to generate itinerary. Please try again.');
    }
  };

  const handleBookNow = async () => {
    setIsBooking(true);
    try {
      const response = await fetch('http://localhost:8080/api/tours/book-generated', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedItinerary),
      });

      if (!response.ok) {
        throw new Error('Failed to book tour');
      }

      const booking = await response.json();
      alert(`Tour booked successfully! Booking ID: ${booking.id}`);
      setIsSuccess(false);
    } catch (error) {
      console.error(error);
      alert('Failed to book tour. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900">
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors font-medium text-sm">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-bold text-black tracking-tight">DreamLanka</span>
          </div>
          <div className="w-20 md:block hidden" />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100"
          >
            <Sparkles size={14} />
            AI-Powered Personalization
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-black mb-6 tracking-tight"
          >
            Create Your Custom Tour
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-xl mx-auto leading-relaxed"
          >
            Share your preferences and let our intelligent engine craft a personalized Sri Lankan adventure tailored specifically for you.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-[32px] border border-stone-200 shadow-xl shadow-stone-200/50 p-8 md:p-12 space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
                <Calendar size={16} className="text-emerald-500" />
                Number of Days
              </label>
              <input 
                type="number" 
                min="1" 
                max="30"
                value={formData.days}
                onChange={(e) => setFormData({...formData, days: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/40 transition-all font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
                <Users size={16} className="text-emerald-500" />
                Number of People
              </label>
              <input 
                type="number" 
                min="1" 
                max="20"
                value={formData.people}
                onChange={(e) => setFormData({...formData, people: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/40 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
                <Wallet size={16} className="text-emerald-500" />
                Budget Level
              </label>
              <div className="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
                {budgetLevels.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, budget: level})}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      formData.budget === level 
                        ? 'bg-white text-emerald-600 shadow-md' 
                        : 'text-zinc-500 hover:bg-white/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
                <Zap size={16} className="text-emerald-500" />
                Travel Pace
              </label>
              <div className="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
                {travelPaces.map(pace => (
                  <button
                    key={pace}
                    type="button"
                    onClick={() => setFormData({...formData, pace: pace})}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      formData.pace === pace 
                        ? 'bg-white text-emerald-600 shadow-md' 
                        : 'text-zinc-500 hover:bg-white/50'
                    }`}
                  >
                    {pace}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
              <CheckCircle2 size={16} className="text-emerald-500" />
              What interests you most?
            </label>
            <div className="flex flex-wrap gap-3">
              {preferenceOptions.map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => handlePreferenceToggle(pref)}
                  className={`px-6 py-3 rounded-full text-sm font-bold border transition-all ${
                    formData.preferences.includes(pref)
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-[1.02]'
                      : 'bg-white border-stone-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 relative">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 ml-1">
              <MapPin size={16} className="text-emerald-500" />
              Any must-visit places?
            </label>
            
            {formData.mustVisit.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.mustVisit.map(dest => (
                  <span key={dest} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                    {dest}
                    <button type="button" onClick={() => handleMustVisitToggle(dest)} className="hover:text-emerald-900">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer group hover:border-stone-300 transition-all"
              >
                <span className="text-zinc-500 font-medium">
                  {formData.mustVisit.length === 0 ? "Search or select destinations..." : `${formData.mustVisit.length} selected`}
                </span>
                <ChevronDown size={20} className={`text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white border border-stone-200 rounded-2xl shadow-2xl z-20 overflow-hidden"
                  >
                    <div className="p-4 border-b border-stone-100 flex items-center gap-3 bg-stone-50/50">
                      <Search size={18} className="text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="Type to search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent w-full focus:outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                      {popularDestinations
                        .filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(dest => (
                        <div 
                          key={dest.name}
                          onClick={() => handleMustVisitToggle(dest.name)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                            formData.mustVisit.includes(dest.name) 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'hover:bg-stone-50'
                          }`}
                        >
                          <span className="text-sm font-bold">{dest.name}</span>
                          {formData.mustVisit.includes(dest.name) && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isGenerating || isSuccess}
              className={`w-full py-5 rounded-[20px] font-extrabold text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                isSuccess 
                  ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30' 
                  : isGenerating
                    ? 'bg-zinc-900 text-white cursor-wait'
                    : 'bg-black text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200 hover:shadow-emerald-500/10 active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                    <Settings size={22} />
                  </motion.div>
                  <span>Crafting Your Itinerary...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={22} />
                  <span>Itinerary Ready!</span>
                </>
              ) : (
                <>
                  <Sparkles size={22} />
                  <span>Generate My Itinerary</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </main>

      <AnimatePresence>
        {isSuccess && generatedItinerary && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={() => setIsSuccess(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[40px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <AnimatePresence mode="wait">
                {!showBookingConfirm ? (
                  <motion.div 
                    key="itinerary-preview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col h-full overflow-hidden"
                  >
                    <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={28} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-black">Your Dream Tour is Ready!</h2>
                          <p className="text-zinc-500 text-sm font-medium">{formData.days} Days • {formData.people} People • {formData.budget} Budget</p>
                        </div>
                      </div>
                      <button onClick={() => setIsSuccess(false)} className="p-3 hover:bg-stone-200 rounded-full transition-colors text-zinc-400 hover:text-zinc-900">
                        <X size={24} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
                      {generatedItinerary.summary && (
                        <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 mb-6">
                          <h3 className="text-emerald-800 font-bold mb-2">Tour Summary</h3>
                          <p className="text-zinc-600 text-sm leading-relaxed">{generatedItinerary.summary}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedItinerary.itinerary && generatedItinerary.itinerary.map((dayPlan) => (
                          <div key={dayPlan.day} className="flex flex-col gap-2 p-5 rounded-3xl border border-stone-100 bg-stone-50/30 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Day {dayPlan.day}</span>
                              </div>
                              <h4 className="font-bold text-zinc-900">{dayPlan.places && dayPlan.places.join(", ")}</h4>
                              <div className="flex items-start gap-1.5 text-xs text-zinc-500 mt-2">
                                <Sparkles size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-3">{dayPlan.note}</span>
                              </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 border-t border-stone-100 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Estimated Total</span>
                        <span className="text-2xl font-black text-black">${generatedItinerary.totalPrice.toLocaleString()} <span className="text-sm font-medium text-zinc-500">USD</span></span>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button onClick={() => setIsSuccess(false)} className="flex-1 sm:px-8 py-4 bg-stone-100 text-zinc-600 rounded-2xl font-bold hover:bg-stone-200 transition-all text-sm">Start Over</button>
                        <button 
                          onClick={() => setShowBookingConfirm(true)}
                          className="flex-1 sm:px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all text-center text-sm shadow-xl shadow-emerald-600/20 whitespace-nowrap"
                        >
                          I'm Satisfied
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="booking-confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-12 text-center space-y-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles size={40} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-black mb-4">Would you like to book this tour?</h2>
                      <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
                        Your personalized {formData.days}-day journey is ready. Secure your spot now and let us handle the rest of the magic.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <button 
                        onClick={() => setShowBookingConfirm(false)}
                        className="px-10 py-4 bg-stone-100 text-zinc-600 rounded-2xl font-bold hover:bg-stone-200 transition-all"
                      >
                        Maybe Later
                      </button>
                      <button 
                        onClick={handleBookNow}
                        disabled={isBooking}
                        className="px-12 py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 active:scale-95"
                      >
                        {isBooking ? 'Booking...' : 'Yes, Book Now'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.1); }
      `}</style>
    </div>
  );
};

export default CustomizeTourPage;
