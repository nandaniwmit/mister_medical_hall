import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Filter, Image as ImageIcon, MessageSquare, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import { GalleryItem } from '../types';

interface GalleryProps {
  onOpenOrderForm: (prefilledMed?: string) => void;
}

export default function Gallery({ onOpenOrderForm }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Mister Medical Hall Store Gallery",
    "description": "Visual tour of Mister Medical Hall in Gewalbigha, Gaya. Check our medicine shelves, authorized healthcare products, clinical diagnostics, and store frontend.",
    "publisher": {
      "@type": "Pharmacy",
      "name": "Mister Medical Hall"
    }
  };

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Pharmacy Frontend Counter',
      description: 'Our primary patient-facing counter near Munni Masjid. Clean, hygienic, and organized for fast medicine collection.',
      imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600',
      category: 'store'
    },
    {
      id: '2',
      title: 'Batch-Verified Medicine Shelves',
      description: 'Alphabetically organized, clean, dust-free storage racks ensuring medicine packs are kept dry and easy to audit.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      category: 'medicines'
    },
    {
      id: '3',
      title: 'Diagnostics & Glucometers',
      description: 'Authorized local distributorship stock of Accu-Chek, Omron, and Dr. Morepen digital monitors.',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
      category: 'equipment'
    },
    {
      id: '4',
      title: 'Cold-Chain Insulin Storage Unit',
      description: 'Clinical grade deep-cooling cabinets keeping biotics and diabetic insulin vials at continuous, monitored levels.',
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
      category: 'store'
    },
    {
      id: '5',
      title: 'OTC Health & Baby Care Kits',
      description: 'Wide variety of baby formula, organic creams, clinical wipes, and pediatric hygiene supplements on shelf.',
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600',
      category: 'products'
    },
    {
      id: '6',
      title: 'Surgical & Orthopedic Support Desk',
      description: 'Crepe bandages, knee braces, wrist braces, sterilized surgical dressings, and disposable ward consumables.',
      imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600',
      category: 'equipment'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'store', label: 'Store Interior' },
    { value: 'medicines', label: 'Medicine Racks' },
    { value: 'products', label: 'OTC & Baby Products' },
    { value: 'equipment', label: 'Diagnostic Devices' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <SEO
        title="Store Gallery & Medical Facilities"
        description="Take a visual tour of Mister Medical Hall in Gewalbigha, Gaya. Browse images of our authentic drug storage, cooling chambers, and diagnostics."
        keywords="Mister Medical Hall gallery, Gaya pharmacy photos, Gewalbigha medical store view, medicine shelves Gaya, cooling fridge insulin, medical shop Bihar"
        canonicalPath="/gallery"
        schema={gallerySchema}
      />

      {/* Hero Header */}
      <section className="bg-transparent py-16 border-b border-white/20 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Visual Tour</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Our Store Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-555 dark:text-slate-400 leading-relaxed">
              Explore our sanitized storage facilities, clinical cooling setups, prescription cabinets, and diagnostic equipment shelves in Gewalbigha, Gaya.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`filter-pill-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedCategory === cat.value
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          {filteredItems.length > 0 ? (
            <motion.div
              id="gallery-grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setActiveLightbox(item)}
                    className="group glass-card rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-zoom-in relative glass-card-hover"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Hover eye overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                          <Eye className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {item.category}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white">No images in category</h4>
              <p className="text-xs text-slate-500 mt-1">Please try clearing filters to view all store photos.</p>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox / Zoom Dialog Overlay */}
      <AnimatePresence>
        {activeLightbox && (
          <>
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-slate-950 z-50 backdrop-blur-xs cursor-pointer"
            />

            {/* Lightbox container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-4 inset-y-10 sm:inset-x-12 sm:inset-y-16 lg:inset-x-24 lg:inset-y-20 glass-container rounded-[32px] overflow-hidden z-50 shadow-2xl flex flex-col md:flex-row max-w-5xl mx-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 text-white rounded-full transition-colors z-10 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image box */}
              <div className="flex-1 bg-slate-950 flex items-center justify-center overflow-hidden h-[50%] md:h-full">
                <img
                  src={activeLightbox.imageUrl}
                  alt={activeLightbox.title}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Column: Metadata & Actions */}
              <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 flex flex-col justify-between h-[50%] md:h-full bg-transparent border-l border-white/20">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-sm inline-block">
                      {activeLightbox.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mt-2">
                      {activeLightbox.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                    {activeLightbox.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <button
                    onClick={() => {
                      const text = `Inquiry about item in Gallery: ${activeLightbox.title}`;
                      setActiveLightbox(null);
                      onOpenOrderForm(text);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire items via WhatsApp</span>
                  </button>

                  <a
                    href="https://maps.google.com/?q=Munni+Masjid,+Gewalbigha,+Gaya,+Bihar+823001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Get Directions to Store</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
