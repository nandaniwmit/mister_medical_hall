import React, { useState, useEffect } from 'react';
import { MessageSquareText, PhoneCall, ArrowUp, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingControlsProps {
  onOpenOrderForm: () => void;
}

export default function FloatingControls({ onOpenOrderForm }: FloatingControlsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showEmergencyBadge, setShowEmergencyBadge] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
      
      {/* Emergency Mini Banner Widget */}
      <AnimatePresence>
        {showEmergencyBadge && (
          <motion.div
            id="floating-emergency-widget"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto bg-red-600 text-white rounded-xl py-2 px-3 shadow-lg flex items-center gap-2 max-w-[280px] border border-red-500"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 animate-pulse text-amber-300" />
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">Emergency 24/7 Desk</span>
              <a href="tel:+919798169367" className="text-xs font-bold hover:underline">
                Call +91 97981 69367
              </a>
            </div>
            <button
              onClick={() => setShowEmergencyBadge(false)}
              className="p-1 rounded-md hover:bg-red-700 text-red-200 hover:text-white transition-colors"
              aria-label="Dismiss emergency banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Group of floating buttons */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Floating Call Button */}
        <motion.a
          href="tel:+919798169367"
          id="floating-call-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-13 h-13 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all cursor-pointer relative group border border-blue-500"
          title="Call Pharmacist"
        >
          <PhoneCall className="w-5.5 h-5.5" />
          {/* Label tooltip */}
          <span className="absolute right-15 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
            Call Pharmacist
          </span>
        </motion.a>

        {/* Floating WhatsApp Medicine Order Button */}
        <motion.button
          onClick={onOpenOrderForm}
          id="floating-whatsapp-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-13 h-13 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all cursor-pointer relative group border border-emerald-500"
          title="WhatsApp Medicine Order"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <MessageSquareText className="w-5.5 h-5.5" />
          {/* Label tooltip */}
          <span className="absolute right-15 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
            Order on WhatsApp
          </span>
        </motion.button>

        {/* Scroll Back To Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={scrollToTop}
              id="back-to-top-btn"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-13 h-13 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Scroll to Top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-5.5 h-5.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
