import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { BusinessSubmission } from '../types';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BusinessSubmission>({
    businessName: '',
    category: 'Food & Dining',
    contactName: '',
    email: '',
    instagramHandle: '',
    location: 'Chandigarh',
    pitch: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state for display
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      businessName: '',
      category: 'Food & Dining',
      contactName: '',
      email: '',
      instagramHandle: '',
      location: 'Chandigarh',
      pitch: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Partner With Chandigarh Adda</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Feature Your Business or Event
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Get discovered by over 50,000+ tastemakers and locals across Chandigarh, Mohali, and Panchkula.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Brand / Business / Event Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Roasters Lab, Sunday Indie Gig, Mohali D2C App"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Concerts & Events">Concerts & Events</option>
                    <option value="Startup & Tech">Startup & Tech</option>
                    <option value="Lifestyle & Fashion">Lifestyle & Fashion</option>
                    <option value="Weekend Escape / Stay">Weekend Escape / Stay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tricity Zone *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Mohali">Mohali</option>
                    <option value="Panchkula">Panchkula</option>
                    <option value="Nearby Escapes (Kasauli/Shimla)">Nearby Escapes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Official Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="contact@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What makes your story / spot special? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell our editorial team about your concept, special offerings, or event dates..."
                  value={formData.pitch}
                  onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Submit for Editorial Review
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="mt-4 text-xl font-black text-stone-900">Submission Received!</h3>
            <p className="mt-2 text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Thank you for pitching <strong className="text-stone-900">{formData.businessName}</strong>. Our Chandigarh Adda curation team reviews submissions within 48 hours. We may reach out to you via email or Instagram!
            </p>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
            >
              Back to Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
