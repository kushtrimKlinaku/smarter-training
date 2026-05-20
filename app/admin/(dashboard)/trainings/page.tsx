'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, ChevronLeft } from 'lucide-react';

export default function TrainingsAdmin() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<'list' | 'create' | 'edit'>('list');
  const [currentTraining, setCurrentTraining] = useState<any>(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trainings');
      const data = await res.json();
      setTrainings(Array.isArray(data) ? data : []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Jeni të sigurt që dëshironi ta fshini këtë trajnim?')) return;
    
    try {
      await fetch(`/api/trainings?slug=${slug}`, { method: 'DELETE' });
      fetchTrainings();
    } catch(e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
    
    // We should map this to exactly the structure required.
    // Simplifying curriculum and benefits for the form.
    const trainingData = {
      ...currentTraining,
      ...dataObj,
      curriculum: currentTraining?.curriculum || [],
      benefits: currentTraining?.benefits || []
    };

    try {
      const method = formMode === 'edit' ? 'PUT' : 'POST';
      await fetch('/api/trainings', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainingData)
      });
      setFormMode('list');
      fetchTrainings();
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
              {formMode === 'create' ? 'Shto Trajnim të Ri' : 'Ndrysho Trajnimin'}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulli</label>
              <input required name="title" defaultValue={currentTraining?.title} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input required name="slug" readOnly={formMode === 'edit'} defaultValue={currentTraining?.slug} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nëntitulli</label>
              <input required name="subtitle" defaultValue={currentTraining?.subtitle} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cmimi</label>
              <input required name="price" defaultValue={currentTraining?.price} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input required name="date" defaultValue={currentTraining?.date} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokacioni</label>
              <input required name="location" defaultValue={currentTraining?.location} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Përshkrimi i Shkurtër</label>
            <textarea required name="description" defaultValue={currentTraining?.description} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Përshkrimi i Gjatë</label>
            <textarea required name="longDescription" defaultValue={currentTraining?.longDescription} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setFormMode('list')} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Anulo
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
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
        <h1 className="text-2xl font-bold text-gray-900">Menaxhimi i Trajnimeve</h1>
        <button
          onClick={() => { setCurrentTraining(null); setFormMode('create'); }}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          <Plus className="w-4 h-4" />
          Shto Trajnim
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titulli
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Çmimi
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Aksione</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Duke u ngarkuar...</td></tr>
              ) : trainings.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Nuk ka trajnime të regjistruara.</td></tr>
              ) : (
                trainings.map((t) => (
                  <tr key={t.slug} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{t.title}</div>
                      <div className="text-sm text-gray-500">{t.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => { setCurrentTraining(t); setFormMode('edit'); }}
                        className="text-teal-600 hover:text-teal-900 mr-4 inline-flex items-center gap-1"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(t.slug)}
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
