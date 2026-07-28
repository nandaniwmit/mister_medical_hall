import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MessageSquare,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  HeartPulse,
  Truck,
  Star,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
  Stethoscope,
  Send
} from 'lucide-react';
import SEO from '../components/SEO';

interface HomeProps {
  onOpenOrderForm: (prefilledMed?: string) => void;
}

export default function Home({ onOpenOrderForm }: HomeProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Local Business Schema Markup
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "name": "Mister Medical Hall",
    "image": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600",
    "@id": "https://ais-dev-mf23q4ibl2fcb7dtoqa4ne-457061730116.asia-southeast1.run.app/#pharmacy",
    "url": "https://ais-dev-mf23q4ibl2fcb7dtoqa4ne-457061730116.asia-southeast1.run.app/",
    "telephone": "+919798169367",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Munni Masjid, Gaya - Bodhgaya Road, Gewalbigha",
      "addressLocality": "Gaya",
      "addressRegion": "Bihar",
      "postalCode": "823001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.783856",
      "longitude": "84.996174"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "22:30"
    },
    "sameAs": [
      "https://www.facebook.com",
      "https://www.instagram.com"
    ]
  };

  const servicesPreview = [
    {
      title: 'Prescription Drugs',
      desc: '100% authentic, batch-verified critical medicines and chronic healthcare refills.',
      icon: <Stethoscope className="w-5.5 h-5.5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Baby & Infant Care',
      desc: 'Top brand formulas, diapers, gentle lotions, and pediatrician-recommended supplies.',
      icon: <HeartPulse className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
    },
    {
      title: 'Chronic Illness Support',
      desc: 'Dedicated kits and continuous supplies for Diabetes, High BP, Asthma, and Thyroid care.',
      icon: <ShieldCheck className="w-5.5 h-5.5 text-amber-600 dark:text-amber-400" />
    }
  ];

  const featuredProducts = [
    {
      name: 'Accu-Chek Active Monitor',
      category: 'Diagnostic Devices',
      price: 1450,
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300',
      tag: 'Best Seller'
    },
    {
      name: 'Dr. Morepen BP Monitor',
      category: 'Health Monitors',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=300',
      tag: 'New Arrival'
    },
    {
      name: 'Shelcal 500 Calcium Tablets',
      category: 'Supplements',
      price: 112,
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300',
      tag: 'Essential'
    },
    {
      name: 'Dettol Antiseptic Liquid',
      category: 'First Aid / OTC',
      price: 165,
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=300',
      tag: 'Popular'
    }
  ];

  const reviews = [
    {
      name: 'Rakesh Kumar Sinha',
      role: 'Regular Customer (Gewalbigha)',
      stars: 5,
      comment: 'Very professional. All medicines are 100% genuine and fresh batches. Unlike other stores in Gaya, they keep insulin perfectly stored in refrigerator. I always order via WhatsApp and get it within 1 hour!',
      date: '10 days ago'
    },
    {
      name: 'Dr. Anita Roy',
      role: 'Local Practitioner (Gaya)',
      stars: 5,
      comment: 'Highly reliable medical hall in Gewalbigha area. I often refer my patients here because they carry hard-to-find oncology and diabetes medicines. Extremely courteous on-duty pharmacists.',
      date: '1 month ago'
    }
  ];

  const faqs = [
    {
      q: 'Do you require prescriptions for all medicines?',
      a: 'We strictly require an original prescription from a registered medical practitioner for Schedule H and Rx drugs. Non-prescription (OTC) items, vitamins, and general personal care do not require prescriptions.'
    },
    {
      q: 'How does the WhatsApp Medicine Delivery work?',
      a: 'Simply click "Order via WhatsApp", fill out our quick delivery form on this website, and submit. The form will prefill a neat message in your WhatsApp. Send it alongside a photo of your prescription, and our dispatch rider will deliver it.'
    },
    {
      q: 'Do you deliver to Bodhgaya and surrounding landmarks?',
      a: 'Yes! We provide home delivery services across Gewalbigha, Gewalbigha Mor, Gaya - Bodhgaya main road, and nearby Bodhgaya limits. Contact us directly to check delivery slots.'
    }
  ];

  const healthTips = [
    {
      title: 'How to Store Insulin & Vaccines Safely at Home',
      date: 'July 24, 2026',
      read: '3 min read',
      excerpt: 'Temperature control is vital for biologics. Discover the correct refrigerator shelf placement to prevent crystallization and potency loss.'
    },
    {
      title: 'Understanding Diabetes Monitoring Protocols',
      date: 'July 18, 2026',
      read: '4 min read',
      excerpt: 'Are you checking blood sugar levels at the right time? Here is the clinical difference between Fasting, PP, and HbA1c testing cycles.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <SEO
        title="Genuine Pharmacy in Gewalbigha, Gaya"
        description="Mister Medical Hall in Gewalbigha, Gaya offers 100% genuine medicines, temperature-controlled cold storage, wellness products, and superfast WhatsApp home delivery."
        keywords="Mister Medical Hall, Pharmacy Gaya, Medical Store Gewalbigha, Home Delivery Medicines Gaya, Genuine Medicines Gaya, Chemist Gaya, Bihar Pharmacy"
        canonicalPath="/"
        schema={localBusinessSchema}
      />

      {/* 1. Hero Section */}
      <section id="home-hero" className="relative bg-transparent overflow-hidden py-16 lg:py-24 border-b border-white/20 dark:border-white/5">
        {/* Soft atmospheric gradient vector circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Trusted Healthcare Partner in Gaya
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-tight tracking-tight"
              >
                Your Trusted Medical Store for <span className="text-emerald-600 dark:text-emerald-400">Genuine Medicines</span> & Healthcare Needs
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-650 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Providing genuine medicines, healthcare products, surgical supplies, baby care, personal care and daily medical essentials at affordable prices.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => onOpenOrderForm()}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Order</span>
                </button>

                <a
                  href="tel:+919798169367"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold py-3.5 px-7 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Call Store Desk</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Munni+Masjid,+Gewalbigha,+Gaya,+Bihar+823001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Compass className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
              </motion.div>

              {/* Trust markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 max-w-lg mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">100%</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Genuine Drugs</span>
                </div>
                <div className="text-center lg:text-left border-x border-slate-200 dark:border-slate-850 px-2">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">8am-10pm</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Open Daily</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">1-Hr</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Gaya Delivery</span>
                </div>
              </motion.div>
            </div>

            {/* Right Col: Hero Interactive Graphic Card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass-container rounded-[32px] p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Embedded dynamic illustration banner */}
                <div className="h-48 rounded-xl overflow-hidden relative mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600"
                    alt="Mister Medical Hall Counter"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider mb-1 inline-block">Established Pharmacy</span>
                      <h3 className="text-white font-extrabold text-sm sm:text-base">Serving Gewalbigha & Gaya since years</h3>
                    </div>
                  </div>
                </div>

                {/* Pharmacy Quick Action List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Direct Sourced Inventory</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Strictly verified batches, no duplicate medications.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Truck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Temperature Managed Logistics</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Insulin & cold-chain drugs kept active under strict 2-8°C.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    Our Counter is open daily: <strong>8:00 AM - 10:30 PM</strong>
                  </p>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Short About Preview */}
      <section id="about-preview" className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: stats & illustration */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 rounded-2xl glass-card text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Guarantee</p>
                  <p className="text-3xl font-extrabold text-[#0A8F6A] dark:text-[#0dcaf0]">100%</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">Genuine Drugs</span>
                </div>
                <div className="p-6 rounded-2xl glass-card text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Families</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">10k+</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">Satisfied Users</span>
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="p-6 rounded-2xl glass-card text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Experience</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">15+ Yrs</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">Combined Expertise</span>
                </div>
                <div className="p-6 rounded-2xl glass-card text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Support</p>
                  <p className="text-3xl font-extrabold text-[#0A8F6A] dark:text-[#0dcaf0]">24 Hours</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">Emergency Desk</span>
                </div>
              </div>
            </div>

            {/* Right side: narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="border-l-4 border-emerald-500 pl-4">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Who We Are</span>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                  Mister Medical Hall: Preserving Gaya's Community Health
                </h2>
              </div>
              
              <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                Mister Medical Hall, located strategically near Munni Masjid on the main Gaya - Bodhgaya Road, is Gewalbigha's leading certified pharmacy. We specialize in providing a complete, multi-tiered catalog of authentic drugs, surgical supplies, chronic wellness gear, and high-quality mother and baby essentials.
              </p>
              
              <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                Our operations are guided by certified pharmacists. Every drug is sourced directly from authorized manufacturers to maintain chemical sanctity, preventing the circulation of duplicate or sub-potent medicines in Gaya.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <span>Explore Our History & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services */}
      <section id="services-preview" className="py-16 bg-transparent border-y border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Our Care Services</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Customized Solutions for Every Healthcare Need
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              We provide comprehensive pharmacy inventory categories coupled with dedicated support metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesPreview.map((serv, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-5 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-4">
                  {serv.icon}
                </div>
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white mb-2">{serv.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{serv.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 bg-emerald-600/10 hover:bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 px-6 py-3 rounded-xl text-xs font-bold tracking-wide transition-colors"
            >
              <span>View Category-wise Services & Medicine Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section id="why-us" className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Setting Standards</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Why Gaya Chooses Mister Medical Hall
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              We stand apart in Bihar's medical landscape by emphasizing technical control and complete integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 glass-card rounded-2xl glass-card-hover transition-all duration-300">
              <Award className="w-9 h-9 text-emerald-600 mb-3" />
              <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mb-1.5">Direct Authorized Sourcing</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We only source medicines from licensed pharmaceutical distributors and original manufacturers.
              </p>
            </div>

            <div className="p-5 glass-card rounded-2xl glass-card-hover transition-all duration-300">
              <HeartPulse className="w-9 h-9 text-emerald-600 mb-3" />
              <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mb-1.5">Strict Cold Chain Storage</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Vital biological injections, insulins, and vaccines are kept constantly under active refrigerator monitoring.
              </p>
            </div>

            <div className="p-5 glass-card rounded-2xl glass-card-hover transition-all duration-300">
              <Clock className="w-9 h-9 text-emerald-600 mb-3" />
              <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mb-1.5">Superb Delivery Logistics</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No need to leave home. We dispatch delivery agents to deliver standard medical orders to your doorstep.
              </p>
            </div>

            <div className="p-5 glass-card rounded-2xl glass-card-hover transition-all duration-300">
              <Users className="w-9 h-9 text-emerald-600 mb-3" />
              <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mb-1.5">Qualified Counseling Desk</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our in-house professional pharmacists clarify dosages, safety protocols, and possible drug interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section id="featured-products" className="py-16 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Popular items</span>
              <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                Popular Healthcare & Devices
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Check complete medical stocks</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-600 text-white shadow-xs">
                      {prod.tag}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white line-clamp-1">
                      {prod.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-50 dark:border-slate-850 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Est Price</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      ₹{prod.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenOrderForm(prod.name)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Customer Reviews Preview */}
      <section id="reviews-preview" className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: metrics block */}
            <div className="lg:col-span-4 space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Testimonials</span>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                  What Gaya's Locals Say
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Real feedback from regular customers, local doctors, and families residing in Gewalbigha and nearby Gaya localities.
              </p>

              <div className="p-5 rounded-2xl glass-card space-y-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                  <Star className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
                  <span className="font-extrabold text-base text-slate-950 dark:text-white pl-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none">Aggregated score based on 145+ local Google Reviews.</p>
              </div>
            </div>

            {/* Right side: review list */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-850/80 mt-4 pt-3 flex justify-between items-center text-[11px]">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{rev.name}</span>
                      <span className="text-slate-450">{rev.role}</span>
                    </div>
                    <span className="text-slate-400">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ Preview */}
      <section id="faq-preview" className="py-16 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Queries Answered</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5" id="faq-accordion-group">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-emerald-500 font-bold text-lg transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-850 pt-3 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 font-bold text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              <span>See location map & full contact details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. CTA Section */}
      <section id="homepage-cta" className="relative bg-emerald-600 text-white overflow-hidden py-12 lg:py-16">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-900/40 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Need Authentic Chronic Disease Medicines Fast?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Send your medical prescription list directly to our certified pharmacist counter in Gewalbigha. We verify availability, calculate bulk discounts, and deliver right to your location.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenOrderForm()}
              className="bg-white hover:bg-slate-50 text-emerald-700 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              Order Medicine Now
            </button>
            <a
              href="tel:+919798169367"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm border border-emerald-500 transition-all hover:scale-[1.02]"
            >
              Call 24/7 Desk: 09798169367
            </a>
          </div>
        </div>
      </section>

      {/* 9. Latest Health Tips */}
      <section id="health-tips" className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Wellness Blog</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Latest Health & Medicine Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthTips.map((tip, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>{tip.date}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{tip.read}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
                    {tip.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-4">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    <span>Read Full wellness article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Newsletter Section */}
      <section id="newsletter" className="py-14 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Updates & Discounts</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Subscribe to Health Alerts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Join our newsletter list to receive seasonal disease warnings, lifestyle check tips, and bulk coupon medicine updates in Gaya.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="email"
              id="newsletter-email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-850 dark:hover:bg-slate-50 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1 transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>

          {newsletterSubmitted && (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ✓ Successfully registered! Thank you for staying informed.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
