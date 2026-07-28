import React, { useState } from 'react';
import { X, Send, Phone, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WhatsAppOrder } from '../types';

interface WhatsAppOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledMedicine?: string;
}

export default function WhatsAppOrderForm({ isOpen, onClose, prefilledMedicine = '' }: WhatsAppOrderFormProps) {
  const [formData, setFormData] = useState<WhatsAppOrder>({
    customerName: '',
    mobileNumber: '',
    email: '',
    address: '',
    medicineName: prefilledMedicine,
    prescriptionUploaded: false,
    prescriptionFileName: '',
    message: '',
    preferredDeliveryTime: 'Immediate (As soon as possible)',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof WhatsAppOrder, string>>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WhatsAppOrder, string>> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Full Name is required';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.mobileNumber.replace(/\s+/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid phone number (min 10 digits)';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery Address is required';
    if (!formData.medicineName.trim()) newErrors.medicineName = 'Medicine details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof WhatsAppOrder]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        prescriptionUploaded: true,
        prescriptionFileName: file.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Format WhatsApp message
    const businessName = "Mister Medical Hall";
    const waNumber = "919798169367"; // 09798169367 -> Indian country code prefix 91

    const text = `Hello ${businessName},\n\n` +
      `*NEW MEDICINE ORDER*\n` +
      `-----------------------------------------\n` +
      `👤 *Customer Name:* ${formData.customerName}\n` +
      `📱 *Phone:* ${formData.mobileNumber}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n` +
      `💊 *Medicine Required:* ${formData.medicineName}\n` +
      `📍 *Delivery Address:* ${formData.address}\n` +
      `📄 *Prescription Included:* ${formData.prescriptionUploaded ? `Yes (${formData.prescriptionFileName})` : 'No'}\n` +
      `⏰ *Preferred Delivery:* ${formData.preferredDeliveryTime}\n` +
      `✍️ *Notes/Message:* ${formData.message || 'None'}\n` +
      `-----------------------------------------\n` +
      `Please confirm medicine availability and total bill amount.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedText}`;

    // Reset form and set success state
    setIsSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="order-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 transition-opacity backdrop-blur-xs"
          />

          {/* Slide-over Container */}
          <motion.div
            id="order-slideover"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 max-w-full sm:max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col h-full border-l border-slate-100 dark:border-slate-800"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-emerald-600 text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Order via WhatsApp</h2>
                <p className="text-xs text-emerald-100 mt-0.5">Send your medicine list and delivery details</p>
              </div>
              <button
                id="close-order-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-emerald-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Forming WhatsApp Message</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                    Redirecting you to WhatsApp to securely transmit your order. Please don't close this screen.
                  </p>
                </div>
              ) : (
                <form id="whatsapp-order-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Customer Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="customerName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                        errors.customerName ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.customerName && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                        errors.mobileNumber ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. 09798169367 or +91..."
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.mobileNumber}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      placeholder="yourname@example.com"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                        errors.address ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="House No, Street, Landmark, Gewalbigha, Gaya, Bihar"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Medicine Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="medicineName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Medicines Required <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="medicineName"
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                        errors.medicineName ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="Enter medicine names and quantities (e.g. Paracetamol 650mg - 2 strips, Shelcal - 1 strip)"
                    />
                    {errors.medicineName && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.medicineName}
                      </p>
                    )}
                  </div>

                  {/* Prescription Upload */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Upload Prescription <span className="text-slate-400 text-xs">(Recommended for Rx medicines)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-emerald-500/40 text-emerald-600 hover:bg-emerald-50/50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 rounded-lg cursor-pointer transition-colors text-xs font-semibold">
                        <Upload className="w-4 h-4" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        {formData.prescriptionUploaded
                          ? `✓ ${formData.prescriptionFileName}`
                          : 'No prescription selected'}
                      </span>
                    </div>
                  </div>

                  {/* Preferred Delivery Time */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredDeliveryTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Preferred Delivery Time
                    </label>
                    <select
                      id="preferredDeliveryTime"
                      name="preferredDeliveryTime"
                      value={formData.preferredDeliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="Immediate (As soon as possible)">Immediate (As soon as possible)</option>
                      <option value="Today Evening (4:00 PM - 8:00 PM)">Today Evening (4:00 PM - 8:00 PM)</option>
                      <option value="Tomorrow Morning (9:00 AM - 12:00 PM)">Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Schedule Call to Discuss">Schedule Call to Discuss</option>
                    </select>
                  </div>

                  {/* Message / Notes */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Additional Message or Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-950 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      placeholder="Any instructions for delivery agent..."
                    />
                  </div>

                  {/* Submission buttons */}
                  <div className="pt-3 space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Order via WhatsApp</span>
                    </button>
                    
                    <a
                      href="tel:+919798169367"
                      className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Pharmacist Now</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
