'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Save, CheckCircle, AlertCircle, Home, Loader2,
  Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Image as ImageIcon
} from 'lucide-react';

/* ─── Types ─── */
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ServicesSection {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

interface HomepageContent {
  services: ServicesSection;
}

/* ─── Available images ─── */
const AVAILABLE_IMAGES = [
  { label: 'Arben Salihu 1', value: '/images/programs/Arben Salihu-1.png' },
  { label: 'Arben Salihu 2', value: '/images/programs/Arben Salihu-2.png' },
  { label: 'Arben Salihu 3', value: '/images/programs/Arben Salihu.png' },
  { label: 'Shitje & B2B', value: '/images/programs/sales.png' },
  { label: 'In-house Trajnim', value: '/images/programs/in_house.png' },
  { label: 'Coaching', value: '/images/programs/coaching.png' },
  { label: 'Lidership', value: '/images/programs/leadership.png' },
  { label: 'Soft Skills', value: '/images/programs/soft_skills.png' },
];

/* ─── Toast ─── */
function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 shadow-xl text-[14px] font-medium ${
      type === 'success' ? 'bg-[#2D4A3E] text-white' : 'bg-red-600 text-white'
    }`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
      {message}
    </div>
  );
}

/* ─── Default content ─── */
const DEFAULT_CONTENT: HomepageContent = {
  services: {
    title: 'Shërbimet',
    subtitle: 'Përfitoni në disa fusha. Çfarëdo qofshin nevojat e biznesit tuaj, shërbimet tona dhe përvoja shumë vjeçare u vijnë në ndihmë.',
    items: [
      { id: 'trajnime', title: 'Trajnime', description: '', image: '/images/programs/Arben Salihu-1.png' },
      { id: 'coaching', title: 'Coaching', description: '', image: '/images/programs/Arben Salihu-2.png' },
      { id: 'rekreacion', title: 'Rekreacion', description: '', image: '/images/programs/Arben Salihu.png' },
      { id: 'matje', title: 'Matje e përforcim', description: '', image: '/images/programs/sales.png' },
      { id: 'manuale', title: 'Manuale', description: '', image: '/images/programs/in_house.png' },
    ],
  },
};

/* ─── Unique ID generator ─── */
function generateId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36);
}

export default function HomepageAdminPage() {
  const [content, setContent] = useState<HomepageContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/homepage');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: HomepageContent = await res.json();
        // Migrate old items that don't have image field
        if (data.services?.items) {
          const imageMap: Record<string, string> = {
            trajnime: '/images/programs/Arben Salihu-1.png',
            coaching: '/images/programs/Arben Salihu-2.png',
            rekreacion: '/images/programs/Arben Salihu.png',
            matje: '/images/programs/sales.png',
            manuale: '/images/programs/in_house.png',
          };
          data.services.items = data.services.items.map((item) => ({
            ...item,
            image: item.image || imageMap[item.id] || AVAILABLE_IMAGES[0].value,
          }));
        }
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

  /* ─── Update helpers ─── */
  const updateSectionField = (field: keyof ServicesSection, value: string) => {
    setContent((prev) => ({ ...prev, services: { ...prev.services, [field]: value } }));
  };

  const updateItem = (index: number, field: keyof ServiceItem, value: string) => {
    setContent((prev) => {
      const items = prev.services.items.map((item, i) => i === index ? { ...item, [field]: value } : item);
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  const addItem = () => {
    const newItem: ServiceItem = {
      id: generateId('sherbim-i-ri'),
      title: 'Shërbimi i Ri',
      description: '',
      image: AVAILABLE_IMAGES[0].value,
    };
    setContent((prev) => ({
      ...prev,
      services: { ...prev.services, items: [...prev.services.items, newItem] },
    }));
  };

  const deleteItem = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((item) => item.id !== id),
      },
    }));
    setDeleteConfirm(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    setContent((prev) => {
      const items = [...prev.services.items];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= items.length) return prev;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  /* ─── Save ─── */
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
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Section Header Fields */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-[15px] font-semibold text-gray-800">Seksioni i Shërbimeve — Titulli & Nëntitulli</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Teksti kryesor i seksionit të shërbimeve në faqen kryesore</p>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label htmlFor="services-title" className="block text-[13px] font-medium text-gray-700 mb-1.5">Titulli</label>
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
              <label htmlFor="services-subtitle" className="block text-[13px] font-medium text-gray-700 mb-1.5">Nëntitulli</label>
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
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-800">Shërbimet — Kartat Individuale</h2>
              <p className="text-[13px] text-gray-500 mt-0.5">
                {content.services.items.length} shërbime • Mund t&apos;i shtosh, fshish ose ndryshosh rendin
              </p>
            </div>
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 bg-[#2D4A3E]/10 text-[#2D4A3E] hover:bg-[#2D4A3E]/20 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              Shto Shërbim
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {content.services.items.map((item, index) => (
              <div key={item.id} className="p-6">
                {/* Item Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <div className="w-6 h-6 rounded-full bg-[#2D4A3E]/10 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-[#2D4A3E]">{index + 1}</span>
                    </div>
                    <span className="text-[13px] font-semibold text-gray-600 uppercase tracking-wider">
                      Shërbimi {index + 1}
                    </span>
                  </div>

                  {/* Controls: move up/down + delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      title="Lëviz lart"
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === content.services.items.length - 1}
                      title="Lëviz poshtë"
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {deleteConfirm === item.id ? (
                      <div className="flex items-center gap-2 ml-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                        <span className="text-[12px] text-red-600 font-medium">Fshi?</span>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-[12px] font-bold text-red-600 hover:text-red-800 transition-colors"
                        >
                          Po
                        </button>
                        <span className="text-red-300">|</span>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Jo
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        title="Fshi shërbimin"
                        className="ml-2 p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid gap-4">
                  {/* Title */}
                  <div>
                    <label htmlFor={`item-title-${item.id}`} className="block text-[13px] font-medium text-gray-700 mb-1.5">
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

                  {/* Description */}
                  <div>
                    <label htmlFor={`item-desc-${item.id}`} className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Përshkrimi
                    </label>
                    <textarea
                      id={`item-desc-${item.id}`}
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      rows={5}
                      className="w-full px-3.5 py-2.5 text-[14px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 focus:border-[#2D4A3E] transition-colors font-mono resize-y"
                      placeholder="Përshkrimi i shërbimit..."
                    />
                    <p className="text-[12px] text-gray-400 mt-1.5">Përdorni \n për rreshta të rinj dhe • për lista</p>
                  </div>

                  {/* Image Picker */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-2">
                      <ImageIcon className="w-3.5 h-3.5 inline mr-1.5 text-gray-500" />
                      Foto e sfondit
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AVAILABLE_IMAGES.map((img) => (
                        <button
                          key={img.value}
                          type="button"
                          onClick={() => updateItem(index, 'image', img.value)}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                            item.image === img.value
                              ? 'border-[#2D4A3E] ring-2 ring-[#2D4A3E]/30'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.value}
                            alt={img.label}
                            className="w-full h-16 object-cover"
                          />
                          <div className={`absolute inset-x-0 bottom-0 py-1 text-[10px] font-medium text-center truncate px-1 ${
                            item.image === img.value ? 'bg-[#2D4A3E] text-white' : 'bg-black/50 text-white'
                          }`}>
                            {img.label}
                          </div>
                          {item.image === img.value && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-[#2D4A3E] rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add new service at bottom */}
          <div className="px-6 py-4 border-t border-dashed border-gray-200 bg-gray-50/50">
            <button
              onClick={addItem}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[14px] font-medium text-gray-500 hover:border-[#2D4A3E] hover:text-[#2D4A3E] hover:bg-[#2D4A3E]/5 transition-all"
            >
              <Plus className="w-4 h-4" />
              + Shto Shërbim të Ri
            </button>
          </div>
        </div>

        {/* Save CTA at bottom */}
        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#2D4A3E] text-white px-6 py-3 rounded-lg hover:bg-[#243d33] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-[14px] font-semibold shadow-sm"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
          </button>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
    </>
  );
}
