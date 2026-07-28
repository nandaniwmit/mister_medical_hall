import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, MessageSquare, Compass } from 'lucide-react';
import SEO from '../components/SEO';

interface ContactProps {
  onOpenOrderForm: (prefilledMed?: string) => void;
}

export default function Contact({ onOpenOrderForm }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Medicine Stock Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [submitted, setSubmitted] = useState(false);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mister Medical Hall",
    "description": "Get directions, contact details, and customer support for Mister Medical Hall near Munni Masjid, Gaya. Submit a stock inquiry or connect on WhatsApp.",
    "publisher": {
      "@type": "Pharmacy",
      "name": "Mister Medical Hall"
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
    }
    if (!formData.message.trim()) newErrors.message = 'Message details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Medicine Stock Inquiry',
        message: ''
      });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <SEO
        title="Contact Us & Directions"
        description="Connect with Mister Medical Hall in Gewalbigha, Gaya. Check store coordinates, open timings, contact form, telephone line, and WhatsApp order options."
        keywords="Contact Mister Medical Hall, pharmacy phone number Gaya, Gewalbigha medical shop address, locate pharmacy Bihar, Gaya Bodhgaya road maps"
        canonicalPath="/contact"
        schema={contactSchema}
      />

      {/* Hero Header */}
      <section className="bg-transparent py-16 border-b border-white/20 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Get in touch</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Contact & Directions
            </h1>
            <p className="text-sm sm:text-base text-slate-555 dark:text-slate-400 leading-relaxed">
              We are situated near Munni Masjid on the main road between Gaya and Bodhgaya. Connect with our pharmacologists today for prompt assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form Section */}
            <div className="lg:col-span-7 glass-container p-6 sm:p-8 rounded-3xl relative">
              <span className="absolute -top-3.5 left-6 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-sm shadow-xs">
                Inquiry Counter
              </span>

              {submitted ? (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">Inquiry Transmitted Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    Thank you. Your medical catalog or stock inquiry has been securely stored. One of our counter pharmacists will call you back shortly.
                  </p>
                </div>
              ) : (
                <form id="contact-inquiry-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Submit a Stock or Order Inquiry</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Need specific medications? Write to us and we will check shelves.</p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. 09798169367"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="yourname@gmail.com"
                    />
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Inquiry Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="Medicine Stock Inquiry">Medicine Stock Inquiry</option>
                      <option value="Surgical / Device Quotation">Surgical / Device Quotation</option>
                      <option value="Home Delivery Setup">Home Delivery Setup</option>
                      <option value="Feedback / Complaints">Feedback / Complaints</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/40 dark:bg-slate-950/40 text-slate-950 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="Please list medicine names, specifications, strengths, and pack sizes here..."
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-850 dark:hover:bg-slate-50 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Online Inquiry</span>
                  </button>

                </form>
              )}
            </div>

            {/* Right Column: Timings & Business Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Box 1: Business Details */}
              <div className="glass-container p-6 rounded-3xl space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Store Desk Coordinates</h3>
                
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Our Address</strong>
                      <span className="text-slate-500 dark:text-slate-400 block leading-relaxed">
                        Munni Masjid, Gaya - Bodhgaya Road, Gewalbigha, Gaya, Bihar 823001
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Call Helpline</strong>
                      <a href="tel:+919798169367" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold block mt-0.5">
                        +91 97981 69367
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Email Address</strong>
                      <a href="mailto:mistermedicalhall@gmail.com" className="text-slate-500 dark:text-slate-400 hover:underline block mt-0.5">
                        mistermedicalhall@gmail.com
                      </a>
                    </div>
                  </li>
                </ul>

                {/* Micro Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-150 dark:border-slate-850">
                  <a
                    href="tel:+919798169367"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Counter</span>
                  </a>

                  <button
                    onClick={() => onOpenOrderForm()}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Box 2: Timings */}
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Timings & Availability</h3>
                </div>

                <div className="border-t border-slate-150 dark:border-slate-850 pt-2 text-xs text-slate-500 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-150/40 dark:border-slate-850/40">
                    <span className="font-semibold text-slate-850 dark:text-slate-350">Monday - Friday</span>
                    <span>8:00 AM - 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-150/40 dark:border-slate-850/40">
                    <span className="font-semibold text-slate-850 dark:text-slate-350">Saturday - Sunday</span>
                    <span>8:00 AM - 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-slate-850 dark:text-slate-350">Emergency Support Desk</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Available 24 Hours</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Google Map Embedding */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-850 shadow-xs h-96 relative">
            <iframe
              title="Mister Medical Hall Interactive Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3370335805796!2d84.99617467610488!3d24.783856279998637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2993bf26dfd0f%3A0x6b245e99f0e13768!2sGewalbigha%2C%20Gaya%2C%20Bihar%20823001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 focus:outline-hidden"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Quick map floating banner overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-container p-4 rounded-xl shadow-lg max-w-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">Directions Mor Landmark</h4>
                <p className="text-[10px] text-slate-500 leading-normal">Located near Munni Masjid. Perfect location for travelers on Gaya - Bodhgaya Road.</p>
                <a
                  href="https://maps.google.com/?q=Munni+Masjid,+Gewalbigha,+Gaya,+Bihar+823001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] font-bold text-emerald-600 hover:underline pt-0.5"
                >
                  Open in Google Maps App
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
