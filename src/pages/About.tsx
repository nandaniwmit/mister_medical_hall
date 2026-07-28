import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Target,
  Eye,
  HeartHandshake,
  Award,
  History,
  Building,
  UserCheck,
  CheckCircle2,
  ShieldAlert,
  MapPin,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Mister Medical Hall",
    "description": "Learn about Mister Medical Hall, a trusted licensed pharmacy in Gewalbigha, Gaya. Read our story, corporate values, mission, vision, owner message, and history of serving Bihar.",
    "publisher": {
      "@type": "Pharmacy",
      "name": "Mister Medical Hall",
      "logo": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600"
    }
  };

  const corporateValues = [
    {
      title: 'Therapeutic Purity',
      desc: 'We enforce absolute zero-tolerance against duplicate, counterfeit, or expired medications. Every batch is cataloged with legal invoices.',
      icon: <Award className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Empathy in Care',
      desc: 'Healthcare is a human right. We maintain low-margin medication prices and provide special subsidy packages to senior citizens in Gaya.',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Pharmacist Integrity',
      desc: 'All medicine dispensing operations are overseen by qualified pharmacists on our counter. Safe drug combination counseling is guaranteed.',
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Advanced Storage Tech',
      desc: 'Biologics and life-saving insulin are storage-sensitive. We run redundant cooling units to keep cold chains completely intact.',
      icon: <Building className="w-6 h-6 text-emerald-600" />
    }
  ];

  const timelineMilestones = [
    {
      year: 'Establishment Phase',
      title: 'Setting Deep Roots in Gewalbigha',
      desc: 'Mister Medical Hall was established in Gaya, Bihar. Located strategically near Munni Masjid, we opened a tiny counter with the primary goal of providing authentic drugs to local residents.'
    },
    {
      year: 'Operational Scaling',
      title: 'Introducing Cold-Chain Storage',
      desc: 'To address local diabetic needs, we imported high-efficiency pharmaceutical grade refrigeration units. This allowed us to preserve fragile insulin vials and vital pediatric vaccines safely.'
    },
    {
      year: 'Digitization & Delivery',
      title: 'Superfast WhatsApp Order Logistics',
      desc: 'Recognizing that senior patients struggle with physical transit to the counter, we launched our customized express home-delivery protocol powered by instant WhatsApp communication.'
    },
    {
      year: 'Present Day & Future',
      title: 'Bihar Quality Excellence Award',
      desc: 'Recognized locally for maintaining unmatched stock availability and batch verification protocols. Today we manage a massive database of regular medicine lines and serve thousands of households.'
    }
  ];

  return (
    <>
      <SEO
        title="Our Story & About Us"
        description="Read the story, vision, and mission of Mister Medical Hall, Gaya. Learn about our strict drug sourcing standards, on-duty pharmacist counseling, and history."
        keywords="About Mister Medical Hall, Gaya Pharmacy background, Gewalbigha medical shop history, drug authenticity Bihar, certified pharmacist Gaya"
        canonicalPath="/about"
        schema={aboutSchema}
      />

      {/* Hero Banner for About Us */}
      <section className="bg-transparent py-16 border-b border-white/20 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Established with purpose</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              About Mister Medical Hall
            </h1>
            <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed">
              Serving Gaya with unmatched healthcare supply security, direct-sourced biological inventory, and community health empathy.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Overview & Story */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Story text */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <History className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Our Sacred Story</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                From a Small Local Counter to Gaya's Trust Circle
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                Mister Medical Hall was founded in Gewalbigha, Gaya on a simple but critical core belief: <strong>Healthcare results should never be compromised by suspicious or substandard medicines.</strong> In local regions, drug duplication can have tragic consequences, which is why we established an absolute, zero-compromise sourcing architecture.
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-455 leading-relaxed">
                Over the years, we grew our operations near Munni Masjid, Gaya - Bodhgaya Road. We built strong, unmediated trade contracts with top manufacturers like Cipla, Alkem, Micro Labs, Abbott, and Mankind. This allows us to offer therapeutic certainty to the patients of leading regional clinicians at highly subsidized MRPs.
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-455 leading-relaxed">
                Our facilities are continuously upgraded. We operate clinical-grade cold-chain refrigerators to keep temperature-vulnerable insulin pens and vaccines at optimal bio-availability.
              </p>
            </div>

            {/* Visual Grid and Highlights */}
            <div className="glass-container p-6 sm:p-8 rounded-2xl relative">
              <span className="absolute -top-3.5 left-6 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-sm shadow-xs">
                Quality Safeguards
              </span>

              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white mb-5">Our Storage and Verification Standards</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Batch & Invoice Tracking</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Every single medicine we sell is tracked by its original distributor invoice, securing therapeutic authenticity.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Strict Expire Quarantine</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">We utilize automated software alerts to flag and quarantine near-expiry medications, removing them weeks before.' </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Full-Time Registered Pharmacists</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Our medical counter is managed by registered medical store professionals. We verify prescription safety instructions diligently.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-transparent border-y border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Mission */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                To guarantee that no household in Gaya and Bodhgaya compromises on clinical quality due to lack of availability or duplicate medicines. We work endlessly to distribute 100% authentic pharmaceuticals, surgical necessities, and mother care goods at optimized prices with professional pharmacist guidelines.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                To become the gold standard of pharmaceutical safety and automated stock checking in Bihar. We aim to integrate smart healthcare inventory checkers in every town, making medicine stock checks and home-deliveries completely painless for elder citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Core Values */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">How We Stand Tall</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Our Core Operational Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateValues.map((val, idx) => (
              <div
                key={idx}
                className="p-5 glass-card rounded-2xl space-y-3 glass-card-hover transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100/50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <h4 className="font-extrabold text-sm text-slate-950 dark:text-white">{val.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner Message */}
      <section className="py-16 bg-transparent border-t border-white/20 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-container p-6 sm:p-10 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left col: photo placeholder */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 h-48 rounded-2xl overflow-hidden relative border-4 border-slate-100 dark:border-slate-800 shadow-md">
                  <div className="absolute inset-0 bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <UserCheck className="w-16 h-16 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Right col: message */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-sm font-bold uppercase tracking-wider inline-block">
                  Manager Desk Message
                </span>
                
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  "Our goal is absolute safety and medical confidence."
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  "As the managers of Mister Medical Hall, we understand that a pharmacy is not just a commercial outlet; it is a critical gatekeeper of community health. When a customer walks in or sends an order near Munni Masjid, they trust us with their family's survival and comfort. We honors that trust by verifying batch purity and ensuring zero fake drugs enter our shelves. Thank you for making us Gaya's number-one choice."
                </p>

                <div>
                  <span className="font-extrabold text-sm text-slate-950 dark:text-white block">Management Team</span>
                  <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Mister Medical Hall, Gewalbigha, Gaya</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Business Timeline */}
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Our Journey</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Historical Milestones
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {timelineMilestones.map((mil, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row relative ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline circle marker */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 z-10" />

                {/* Content Box */}
                <div className="w-full sm:w-[46%] pl-10 sm:pl-0">
                  <div className="glass-card p-5 rounded-xl space-y-2 text-left hover:shadow-md transition-all duration-300">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {mil.year}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                      {mil.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {mil.desc}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-[8%]" />
                <div className="hidden sm:block w-[46%]" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
