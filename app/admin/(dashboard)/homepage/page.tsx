'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, CheckCircle, AlertCircle, Home, Loader2 } from 'lucide-react';

/* ─── Types ─── */
interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

interface ServicesSection {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

interface HomepageContent {
  services: ServicesSection;
}

/* ─── Toast component ─── */
function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 shadow-xl text-[14px] font-medium transition-all animate-in slide-in-from-bottom-4 ${
        type === 'success'
          ? 'bg-[#2D4A3E] text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 shrink-0" />
      )}
      {message}
    </div>
  );
}

/* ─── Default content structure ─── */
const DEFAULT_CONTENT: HomepageContent = {
  services: {
    title: 'Shërbimet',
    subtitle: 'Përfitoni në disa fusha. Çfarëdo qofshin nevojat e biznesit tuaj, shërbimet tona dhe përvoja shumë vjeçare u vijnë në ndihmë.',
    items: [
      { id: 'trajnime', title: 'Trajnime', description: '' },
      { id: 'coaching', title: 'Coaching', description: '' },
      { id: 'rekreacion', title: 'Rekreacion', description: '' },
      { id: 'matje', title: 'Matje e përforcim', description: '' },
      { id: 'manuale', title: 'Manuale', description: '' },
    ],
  },
};

export default function HomepageAdminPage() {
  const [content, setContent] = useState<HomepageContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  /* Fetch current content */
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/homepage');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: HomepageContent = await res.json();
        setContent(data);
      } catch (err) {
        console.error(err);
        setToast({ type: 'error', message: 'Gabim gjatë ngarkimit të të dhënave.' });
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  /* Update helpers */
  const updateSectionField = (field: keyof ServicesSection, value: string) => {
    setContent((prev) => ({
      ...prev,
      services: { ...prev.services, [field]: value },
    }));
  };

  const updateItem = (index: number, field: keyof ServiceItem, value: string) => {
    setContent((prev) => {
      const items = prev.services.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  /* Save */
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Save failed');
      setToast({ type: 'success', message: 'Ndryshimet u ruajtën me sukses!' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Gabim gjatë ruajtjes. Provo përsëri.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D4A3E]" />
          <p className="text-sm font-medium">Duke ngarkuar të dhënat...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2D4A3E]/10 flex items-center justify-center">
            <Home className="w-5 h-5 text-[#2D4A3E]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Home Page</h1>
            <p className="text-sm text-gray-500 mt-0.5">Menaxho përmbajtjen e faqes kryesore</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          id="save-homepage-btn"
          className="inline-flex items-center gap-2 bg-[#2D4A3E] text-white px-5 py-2.5 rounded-lg hover:bg-[#243d33] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-[14px] font-semibold shadow-sm"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Services Section Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-[15px] font-semibold text-gray-800">Seksioni i Shërbimeve — Titulli &amp; Nëntitulli</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Teksti kryesor i seksionit të shërbimeve në faqen kryesore</p>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label htmlFor="services-title" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Titulli
              </label>
              <input
                id="services-title"
                type="text"
                value={content.services.title}
                onChange={(e) => updateSectionField('title', e.target.value)}
                className="w-full px-3.5 py-2.5 text-[14px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 focus:border-[#2D4A3E] transition-colors"
                placeholder="Titulli i seksionit..."
              />
            </div>
            <div>
              <label htmlFor="services-subtitle" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Nëntitulli
              </label>
              <textarea
                id="services-subtitle"
                value={content.services.subtitle}
                onChange={(e) => updateSectionField('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 text-[14px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 focus:border-[#2D4A3E] transition-colors resize-none"
                placeholder="Nëntitulli i seksionit..."
              />
            </div>
          </div>
        </div>

        {/* Service Items */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-[15px] font-semibold text-gray-800">Shërbimet — Kartat Individuale</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Redakto titullin dhe përshkrimin për secilën kartë shërbimi</p>
          </div>
          <div className="divide-y divide-gray-100">
            {content.services.items.map((item, index) => (
              <div key={item.id} className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#2D4A3E]/10 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#2D4A3E]">{index + 1}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                    Shërbimi {index + 1} — <code className="font-mono text-[#2D4A3E] text-[12px] bg-[#2D4A3E]/5 px-1.5 py-0.5 rounded">#{item.id}</code>
                  </span>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label
                      htmlFor={`item-title-${item.id}`}
                      className="block text-[13px] font-medium text-gray-700 mb-1.5"
                    >
                      Titulli
                    </label>
                    <input
                      id={`item-title-${item.id}`}
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-[14px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 focus:border-[#2D4A3E] transition-colors"
                      placeholder="Titulli i shërbimit..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`item-desc-${item.id}`}
                      className="block text-[13px] font-medium text-gray-700 mb-1.5"
                    >
                      Përshkrimi
                    </label>
                    <textarea
                      id={`item-desc-${item.id}`}
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      rows={5}
                      className="w-full px-3.5 py-2.5 text-[14px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 focus:border-[#2D4A3E] transition-colors font-mono resize-y"
                      placeholder="Përshkrimi i shërbimit (mbështet \\n për rreshta të rinj)..."
                    />
                    <p className="text-[12px] text-gray-400 mt-1.5">Përdorni &#92;n për rreshta të rinj dhe • për lista</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save CTA at bottom */}
        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#2D4A3E] text-white px-6 py-3 rounded-lg hover:bg-[#243d33] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-[14px] font-semibold shadow-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
    </>
  );
}
