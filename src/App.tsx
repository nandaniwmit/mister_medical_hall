import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import WhatsAppOrderForm from './components/WhatsAppOrderForm';

// Lazy load pages for optimal initial bundles and fast loading performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

// Component to handle scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Fallback spinner for lazy loading Suspense states
function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-colors">
      <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin" />
      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-4 tracking-wide">
        Loading healthcare portal...
      </span>
    </div>
  );
}

export default function App() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [prefilledMedicine, setPrefilledMedicine] = useState('');

  // Open WhatsApp slide-over order panel, optionally prefilling a searched medicine
  const handleOpenOrderForm = (medicineName: string = '') => {
    setPrefilledMedicine(medicineName);
    setIsOrderFormOpen(true);
  };

  // Sync / Initialize Dark Mode Theme Class on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Main Container Shell */}
      <div className="min-h-screen flex flex-col glass-body text-slate-800 dark:text-slate-200 transition-colors duration-300">
        
        {/* Navigation Header */}
        <Navbar onOpenOrderForm={() => handleOpenOrderForm()} />

        {/* Dynamic Route Pages View Area */}
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home onOpenOrderForm={handleOpenOrderForm} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services onOpenOrderForm={handleOpenOrderForm} />} />
              <Route path="/gallery" element={<Gallery onOpenOrderForm={handleOpenOrderForm} />} />
              <Route path="/contact" element={<Contact onOpenOrderForm={handleOpenOrderForm} />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer (Integrates tracking logic and rich brand info) */}
        <Footer />

        {/* Floating controls (Call, WhatsApp form trigger, Scroll-To-Top) */}
        <FloatingControls onOpenOrderForm={() => handleOpenOrderForm()} />

        {/* Slide-over Form Overlay for placing WhatsApp orders */}
        <WhatsAppOrderForm
          isOpen={isOrderFormOpen}
          onClose={() => setIsOrderFormOpen(false)}
          prefilledMedicine={prefilledMedicine}
        />

      </div>
    </Router>
  );
}
