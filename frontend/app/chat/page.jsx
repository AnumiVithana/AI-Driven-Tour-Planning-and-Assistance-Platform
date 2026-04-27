'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ChevronLeft, Sparkles, MessageSquare, X, Info, ShieldAlert, Zap } from 'lucide-react';
import Link from 'next/link';

const ChatPage = () => {
  const initialMessage = {
    id: 1,
    role: 'assistant',
    content: "Ayubowan! I'm your DreamLanka AI assistant. How can I help you plan your perfect Sri Lankan getaway today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `That sounds like a wonderful idea! Sri Lanka has so much to offer. Based on your interest in "${input}", I'd recommend exploring the lush tea plantations of Nuwara Eliya or the golden beaches of Mirissa. Would you like me to create a custom itinerary for you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleNewSession = () => {
    setMessages([initialMessage]);
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-600">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-zinc-900">DreamLanka AI</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-zinc-500 font-medium">Always Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-600">
          <button
            onClick={() => setIsSafetyModalOpen(true)}
            className="px-4 py-2 hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <Info size={16} />
            Safety Guidelines
          </button>
          <button
            onClick={handleNewSession}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-all active:scale-95 border border-zinc-200 flex items-center gap-2"
          >
            <Zap size={16} className="text-emerald-500" />
            New Session
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 md:px-0 py-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${message.role === 'user'
                    ? 'bg-zinc-100 border border-zinc-200 text-zinc-600'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                  }`}>
                  {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>

                <div className={`flex flex-col max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-4 rounded-2xl shadow-sm ${message.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm'
                    }`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mt-2">
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div className="bg-zinc-50 border border-zinc-200 px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 1] }}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2, times: [0, 0.5, 1] }}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4, times: [0, 0.5, 1] }}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-6 md:pb-10 bg-gradient-to-t from-white via-white to-transparent">
        <form
          onSubmit={handleSend}
          className="max-w-3xl mx-auto relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your Sri Lanka tour..."
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-500/50 rounded-2xl px-6 py-4 pr-16 outline-none transition-all placeholder:text-zinc-400 text-zinc-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${input.trim() && !isLoading
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 active:scale-95'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
          >
            <Send size={20} />
          </button>

          <div className="flex items-center gap-4 mt-4 px-2">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
              <MessageSquare size={12} className="text-zinc-400" />
              <span>Personalized Recommendations</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-200" />
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
              <Sparkles size={12} className="text-emerald-500/60" />
              <span>Real-time Itineraries</span>
            </div>
          </div>
        </form>
      </footer>

      {/* Safety Guidelines Modal */}
      <AnimatePresence>
        {isSafetyModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSafetyModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              >
                <div className="relative p-8">
                  <button
                    onClick={() => setIsSafetyModalOpen(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ShieldAlert size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900">Safety Guidelines</h2>
                      <p className="text-zinc-500 text-sm font-medium">Use DreamLanka AI effectively</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-500" />
                        Best Practices
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span>Be specific about your interests (e.g., "beaches", "hiking", "culture") for better results.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span>Use the custom tour generator to create your own personalized tour.</span>
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldAlert size={14} className="text-amber-500" />
                        Safety & Privacy
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          <span>Do not share sensitive personal information like credit card details or passwords.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          <span>AI suggestions are for guidance. Always verify travel advisories with official sources.</span>
                        </li>
                      </ul>
                    </section>
                  </div>

                  <button
                    onClick={() => setIsSafetyModalOpen(false)}
                    className="w-full mt-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 active:scale-[0.98]"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
