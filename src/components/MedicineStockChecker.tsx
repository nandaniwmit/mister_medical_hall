import React, { useState, useMemo } from 'react';
import { Search, Info, PackageCheck, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight } from 'lucide-react';
import { Medicine } from '../types';
import medicineData from '../medicineStock.json';

interface MedicineStockCheckerProps {
  onOrderClick: (medicineName: string) => void;
}

export default function MedicineStockChecker({ onOrderClick }: MedicineStockCheckerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Parse stock data from JSON
  const medicines = medicineData as Medicine[];

  // Retrieve unique categories
  const categories = useMemo(() => {
    const list = new Set(medicines.map(m => m.category));
    return ['All', ...Array.from(list)];
  }, [medicines]);

  // Filter medicines based on search term and category
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch = med.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            med.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            med.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchTerm, selectedCategory]);

  return (
    <div className="glass-container rounded-3xl p-6 shadow-xl">
      {/* Intro section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PackageCheck className="w-5.5 h-5.5 text-emerald-600" />
          Real-Time Stock Checker
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search our catalog for medicine availability, brands, and pricing. Order directly via WhatsApp if in stock.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search input */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            id="med-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            placeholder="Search by Medicine Name, Brand, or Ingredient..."
          />
        </div>

        {/* Category filter */}
        <div>
          <select
            id="med-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock Cards Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedicines.map((med) => {
            // Choose colors based on status
            let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30';
            let statusIcon = <PackageCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
            
            if (med.status === 'Limited Stock') {
              badgeBg = 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30';
              statusIcon = <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
            } else if (med.status === 'Out of Stock') {
              badgeBg = 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30';
              statusIcon = <AlertOctagon className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />;
            }

            return (
              <div
                key={med.id}
                className="glass-card rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-md glass-card-hover"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-50/50 dark:bg-emerald-950/20">
                      {med.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                      {statusIcon}
                      {med.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {med.medicineName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Brand: <span className="font-medium">{med.brand}</span>
                  </p>
                  
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 line-clamp-2">
                    {med.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 mt-4 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">MRP</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      ₹{med.mrp.toFixed(2)}
                    </span>
                  </div>

                  {med.status !== 'Out of Stock' ? (
                    <button
                      onClick={() => onOrderClick(med.medicineName)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-600 px-3 py-1.5 rounded-lg cursor-not-allowed"
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="font-semibold text-slate-900 dark:text-white">No medicines found</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            We couldn't find any results matching "{searchTerm}". Please check spelling or search for a generic category instead.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Informative Note */}
      <div className="mt-5 p-3.5 rounded-xl glass-card border border-white/20 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong>Note:</strong> Medicines subject to stock fluctuations. If a required medication is listed as "Out of Stock" or is not found in our database, please contact our counter team at <a href="tel:+919798169367" className="font-bold text-emerald-600 hover:underline">09798169367</a>. We can source non-stock items within 24 hours.
        </p>
      </div>
    </div>
  );
}
