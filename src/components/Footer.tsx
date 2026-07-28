import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Heart, ExternalLink, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  useEffect(() => {
    const TRACKING_ENDPOINT = 'https://tools.cprajapati.com/tracker/track.php';
    const urlParams = new URLSearchParams(window.location.search);
    
    let cid = urlParams.get('cid') || localStorage.getItem('wmit_active_cid');
    if (urlParams.get('cid')) {
        localStorage.setItem('wmit_active_cid', urlParams.get('cid'));
    }
    
    if (!cid) return;

    let visitorId = localStorage.getItem('wmit_visitor_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wmit_visitor_id', visitorId);

    let sessionId = sessionStorage.getItem('wmit_session_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wmit_session_id', sessionId);

    const getPageName = () => {
        const path = window.location.pathname;
        const segment = path.replace(/\/$/, "").split("/").pop();
        return segment ? segment.split('?')[0] : 'Home';
    };

    const sendInitPayload = () => {
        const payload = {
            cid: cid, 
            visitor_id: visitorId, 
            session_id: sessionId,
            page_name: getPageName(), 
            referrer: document.referrer || '',
            device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
            browser: navigator.userAgent, 
            action: 'init'
        };
        fetch(TRACKING_ENDPOINT, { 
            method: 'POST', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(payload) 
        }).catch(err => {});
    };

    const sendExitPayload = () => {
        const payload = { 
            cid: cid, 
            session_id: sessionId, 
            page_name: getPageName(), 
            action: 'page_change' 
        };
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(TRACKING_ENDPOINT, blob);
        } else {
            fetch(TRACKING_ENDPOINT, { 
                method: 'POST', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload), 
                keepalive: true 
            }).catch(err => {});
        }
    };

    sendInitPayload();

    // === IDLE TIMEOUT LOGIC FOR REACT ===
    let idleTimer: NodeJS.Timeout;
    let isIdle = false;

    const resetIdleTimer = () => {
        if (isIdle) {
            isIdle = false;
            sendInitPayload(); // Wake up! Resume tracking
        }
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            isIdle = true;
            sendExitPayload(); // Inactive! Stop tracking
        }, 60000); // 60 Seconds
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => document.addEventListener(evt, resetIdleTimer, { passive: true }));
    resetIdleTimer(); // Initialize idle timer
    // ====================================

    const handleLocationChange = () => {
        sendExitPayload();
        setTimeout(sendInitPayload, 100);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') { 
            sendExitPayload(); 
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', sendExitPayload);
    
    return () => {
        window.removeEventListener('popstate', handleLocationChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pagehide', sendExitPayload);
        activityEvents.forEach(evt => document.removeEventListener(evt, resetIdleTimer));
        clearTimeout(idleTimer);
    };
  }, [location.pathname]); // Added location.pathname dependency to ensure tracking works perfectly for SPA route updates!

  return (
    <footer id="global-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Business Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-lg">
                M
              </div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                Mister Medical Hall
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your highly trusted community pharmacy in Gewalbigha, Gaya. Sourcing only 100% authentic, temperature-managed medicines, infant care, wellness items, and diagnostics straight from authorized pharmaceutical distributors.
            </p>
            {/* Social channels */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors block py-0.5">Home Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors block py-0.5">Our Story & About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors block py-0.5">Medicine Stock & Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors block py-0.5">Photo & Store Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors block py-0.5">Contact & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Hours & Support
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-semibold block text-slate-200">Store Timings</span>
                  <span>Monday - Sunday: 8:00 AM - 10:30 PM</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Emergency support available</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919798169367" className="hover:text-emerald-400 font-semibold text-slate-200">
                  +91 97981 69367
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:mistermedicalhall@gmail.com" className="hover:text-emerald-400 truncate">
                  mistermedicalhall@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location Map Preview */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2 border-l-2 border-emerald-500 pl-2.5">
              Locate Our Store
            </h3>
            <div className="rounded-xl overflow-hidden border border-slate-900 bg-slate-900 h-28 relative">
              <iframe
                title="Mister Medical Hall Map Preview"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3370335805796!2d84.99617467610488!3d24.783856279998637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2993bf26dfd0f%3A0x6b245e99f0e13768!2sGewalbigha%2C%20Gaya%2C%20Bihar%20823001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 filter invert grayscale opacity-75 focus:outline-hidden"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[10px] text-slate-500 flex items-start gap-1.5 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              Munni Masjid, Gaya - Bodhgaya Road, Gewalbigha, Gaya, Bihar 823001
            </p>
          </div>

        </div>

        {/* Legal Policies, Terms & Disclaimer Section */}
        <div className="border-t border-slate-900 pt-8 pb-4 flex flex-col gap-4 text-xs text-slate-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-2">
              <span className="font-bold text-slate-350 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Important Medical Disclaimer
              </span>
              <p className="text-[11px] leading-relaxed text-slate-500">
                The searchable online inventory medicine stock checking feature is intended for informational verification purposes only. Mister Medical Hall does not sell prescription drugs without a valid original written prescription from a licensed medical practitioner. Please consult with your doctor before taking any medications. This platform is not a substitute for professional clinical advice.
              </p>
            </div>
            
            <div className="flex flex-wrap lg:justify-end gap-x-5 gap-y-1">
              <Link to="/about" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link to="/services" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-emerald-400 transition-colors">Medicine Guidelines</Link>
            </div>
          </div>
        </div>

        {/* Brand Copyright and Credits */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Mister Medical Hall. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Developed by</span>
            <a
              href="https://main.webmakerit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 font-semibold hover:underline inline-flex items-center gap-0.5 group"
            >
              WMIT
              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
