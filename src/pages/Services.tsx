import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  HeartPulse,
  Syringe,
  Baby,
  Activity,
  Award,
  SmartphoneNfc,
  CheckCircle,
  Stethoscope,
  ChevronRight,
  Info
} from 'lucide-react';
import SEO from '../components/SEO';
import MedicineStockChecker from '../components/MedicineStockChecker';

interface ServicesProps {
  onOpenOrderForm: (prefilledMed?: string) => void;
}

export default function Services({ onOpenOrderForm }: ServicesProps) {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Pharmaceutical Dispensing and Health Supplies",
    "provider": {
      "@type": "Pharmacy",
      "name": "Mister Medical Hall",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Munni Masjid, Gaya - Bodhgaya Road, Gewalbigha",
        "addressLocality": "Gaya",
        "addressRegion": "Bihar",
        "postalCode": "823001"
      }
    }
  };

  const medicineCategories = [
    {
      title: 'Prescription Medicines',
      desc: 'Critical drugs covering cardiology, oncology, diabetes, nephrology, respiratory care, and psychiatric treatments.',
      highlights: ['Sourced from Cipla, Abbott, USV, Alkem, Mankind', 'Fever, cough, blood pressure, insulin, thyroid therapies', 'Cold-chain vaccines stored under continuous cooling'],
      icon: <Syringe className="w-5.5 h-5.5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Mother & Baby Care',
      desc: 'Nourishing formulas, sensitive infant diapers, pediatrician-approved baby shampoos, and mother wellness capsules.',
      highlights: ['Himalaya, Johnson & Johnson, Dexolac, Cerelac lines', 'Safe, toxic-free baby skincare and hygienic wipes', 'Maternal protein powders and feeding essentials'],
      icon: <Baby className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
    },
    {
      title: 'Supplements & Multi-Vitamins',
      desc: 'Immune boosters, organic calcium + D3 combos, herbal health drinks, dietary proteins, and antioxidant capsules.',
      highlights: ['Daily multi-minerals for adult stamina', 'Bone density support supplements', 'Weight management formulations and diabetic proteins'],
      icon: <Award className="w-5.5 h-5.5 text-amber-600 dark:text-amber-400" />
    },
    {
      title: 'Health Monitors & Devices',
      desc: 'Digital monitoring devices for active home tracking of vitals. Clinically accurate glucometers and BP cuffs.',
      highlights: ['Accu-Chek, Dr. Morepen, Omron clinical devices', 'Nebulizers, vaporizers, and heating pads', 'Highly accurate infrared thermometers'],
      icon: <Activity className="w-5.5 h-5.5 text-rose-600 dark:text-rose-400" />
    },
    {
      title: 'OTC General Medicines',
      desc: 'Standard over-the-counter remedies for everyday self-limiting conditions. Pain relievers, cough syrups, and digestive aids.',
      highlights: ['Dettol, Eno, ORS, Vicks, pain creams', 'Indigestion syrups, antacids, throat lozenges', 'Bandages, medical adhesive tapes, gauze rolls'],
      icon: <ShieldCheck className="w-5.5 h-5.5 text-purple-600 dark:text-purple-400" />
    },
    {
      title: 'Surgical & Surgical Aids',
      desc: 'Clinical-grade disposable medical items for hospital wards, local clinics, nursing homes, and home nursing.',
      highlights: ['Sterilized gloves, masks, syringes, cannula', 'Orthopedic knee braces, wrist wraps, crepe bandages', 'Antiseptic cleansers and surgical cotton sheets'],
      icon: <Stethoscope className="w-5.5 h-5.5 text-indigo-600 dark:text-indigo-400" />
    }
  ];

  return (
    <>
      <SEO
        title="Medicine Stock Checker & Pharmaceutical Services"
        description="Search real-time medicine availability via our exclusive Medicine Stock Checker. Browse custom categories from prescription drugs to baby care at Gaya."
        keywords="Medicine Stock Gaya, online pharmacy inventory Bihar, Dolo 650 availability, diabetic drugs Gewalbigha, blood pressure monitors, Abbott supplies"
        canonicalPath="/services"
        schema={servicesSchema}
      />

      {/* Hero Header */}
      <section className="bg-transparent py-16 border-b border-white/20 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Comprehensive Inventory</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Our Pharmaceutical Services
            </h1>
            <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed">
              Find complete categories of healthcare essentials. Use our searchable inventory tracker below to check medicine availability instantly.
            </p>
          </div>
        </div>
      </section>

      {/* 1. EXCLUSIVE FEATURE: Medicine Stock Checker Section */}
      <section className="py-16 bg-transparent scroll-mt-20" id="stock-checker-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Exclusive Portal</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Mister Medicine Availability Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Type the brand name or generic compound below. Our database syncs stock status immediately.
            </p>
          </div>

          {/* Render Checker Component */}
          <MedicineStockChecker onOrderClick={onOpenOrderForm} />

        </div>
      </section>

      {/* 2. Medicine Categories Grid */}
      <section className="py-16 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">What We Carry</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Medicine Categories & Healthcare Goods
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              We stock an extensive supply of medical supplies to cover chronic illnesses, mother-infant needs, and surgical requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicineCategories.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 glass-card-hover"
              >
                <div>
                  {/* Category icon header */}
                  <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-4">
                    {cat.icon}
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white mb-2">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                    {cat.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {cat.highlights.map((hl, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-350">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-850 mt-2">
                  <button
                    onClick={() => onOpenOrderForm(`Inquiry about ${cat.title}`)}
                    className="w-full inline-flex items-center justify-between font-bold text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-350 py-1 cursor-pointer"
                  >
                    <span>Inquire this category</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Safety Compliance Banner */}
      <section className="py-12 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-container rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">Rx Prescription Dispensing Protocol</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As a fully certified and licensed pharmacy conforming to standard pharmaceutical norms of Bihar, Mister Medical Hall complies with Indian drug rules. Drugs listed under Schedule H, H1, or X will strictly NOT be dispensed unless a legitimate physical or digital prescription signed by a registered clinician is presented. We appreciate your cooperation in supporting safe clinical habits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
