'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft } from 'lucide-react';

export default function AnnouncementsAdmin() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [currentItem, setCurrentItem] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Jeni të sigurt që dëshironi ta fshini këtë njoftim?')) return;
    
    try {
      await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch(e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
    
    const itemData = {
      ...currentItem,
      ...dataObj,
      date: currentItem?.date || new Date().toISOString()
    };

    try {
      const method = formMode === 'edit' ? 'PUT' : 'POST';
      await fetch('/api/announcements', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      setFormMode('list');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  if (formMode !== 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setFormMode('list')} className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              {formMode === 'create' ? 'Shto Njoftim të Ri' : 'Ndrysho Njoftimin'}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titulli</label>
            <input required name="title" defaultValue={currentItem?.title} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Përmbajtja</label>
            <textarea required name="content" defaultValue={currentItem?.content} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setFormMode('list')} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Anulo
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
              Ruaj
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menaxhimi i Njoftimeve</h1>
        <button
          onClick={() => { setCurrentItem(null); setFormMode('create'); }}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          <Plus className="w-4 h-4" />
          Shto Njoftim
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titulli & Data
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Aksione</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Duke u ngarkuar...</td></tr>
              ) : announcements.length === 0 ? (
                <tr><td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Nuk ka njoftime të regjistruara.</td></tr>
              ) : (
                announcements.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => { setCurrentItem(item); setFormMode('edit'); }}
                        className="text-teal-600 hover:text-teal-900 mr-4 inline-flex items-center gap-1"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
