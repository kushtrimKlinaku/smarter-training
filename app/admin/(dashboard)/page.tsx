'use client';

import { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Megaphone, Users } from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    trainingsCount: 0,
    programsCount: 0,
    loading: true
  });

  useEffect(() => {
    const fetchSummaryStats = async () => {
      try {
        const [trainingsRes, programsRes] = await Promise.all([
          fetch('/api/trainings'),
          fetch('/api/programs')
        ]);
        
        const trainingsData = await trainingsRes.json();
        const programsData = await programsRes.json();
        
        setStats({
          trainingsCount: trainingsData?.length || 0,
          programsCount: programsData?.length || 0,
          loading: false
        });
      } catch (err) {
        setStats(s => ({ ...s, loading: false }));
      }
    };
    
    fetchSummaryStats();
  }, []);

  const statCards = [
    { name: 'Total Trajnime', value: stats.trainingsCount, icon: BookOpen, color: 'text-[#2D4A3E]', bg: 'bg-[#2D4A3E]/10' },
    { name: 'Total Programe', value: stats.programsCount, icon: GraduationCap, color: 'text-[#E8845A]', bg: 'bg-[#E8845A]/10' },
    { name: 'Pjesëmarrës (Të pritur)', value: 'N/A', icon: Users, color: 'text-[#2D4A3E]', bg: 'bg-[#2D4A3E]/10' },
    { name: 'Njoftime Aktive', value: 'N/A', icon: Megaphone, color: 'text-[#E8845A]', bg: 'bg-[#E8845A]/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Përmbledhje e Platformës</h3>
        <p className="text-gray-500 mt-1">Statusi i përgjithshëm i të dhënave në Smarter Training.</p>
      </div>

      {stats.loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-xl h-32 border border-gray-100 p-6 flex flex-col justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <dt>
                <div className={`absolute rounded-md p-3 \${item.bg}`}>
                  <item.icon className={`h-6 w-6 \${item.color}`} aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              </dd>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-white border border-gray-100 rounded-xl p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Mirësevini në CMS</h3>
        <p className="text-gray-500 max-w-xl mx-auto">
          Zgjidhni nga menyja anësore për të menaxhuar të dhënat e platformës suaj. 
          Ndryshimet do të ruhen automatikisht dhe do të reflektohen drejtpërdrejt në website.
        </p>
      </div>
    </div>
  );
}
