/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Medicine {
  id: string;
  medicineName: string;
  brand: string;
  mrp: number;
  availableQuantity: number;
  expiry: string;
  status: 'Available' | 'Limited Stock' | 'Out of Stock';
  category: string;
  description: string;
}

export interface WhatsAppOrder {
  customerName: string;
  mobileNumber: string;
  email: string;
  address: string;
  medicineName: string;
  prescriptionUploaded: boolean;
  prescriptionFileName?: string;
  message: string;
  preferredDeliveryTime: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
  isVerified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'store' | 'medicines' | 'products' | 'equipment';
}

export interface HealthTip {
  id: string;
  title: string;
  summary: string;
  content: string;
  readTime: string;
  date: string;
  category: string;
}
