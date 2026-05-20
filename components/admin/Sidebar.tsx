'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Megaphone, 
  LogOut,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Trajnimet', href: '/admin/trainings', icon: BookOpen },
  { name: 'Programet', href: '/admin/programs', icon: GraduationCap },
  { name: 'Njoftime', href: '/admin/announcements', icon: Megaphone },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-[#F8F9FA] border-[#E8E8E8]">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-[#E8E8E8]">
        <span className="text-xl font-bold text-[#2D4A3E] tracking-[-0.02em]">Smarter CMS</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-[14px] font-medium rounded-[6px] transition-colors ${
                  isActive 
                    ? 'bg-[#2D4A3E]/10 text-[#2D4A3E]' 
                    : 'text-[#6B6B6B] hover:bg-[#E8E8E8] hover:text-[#1A1A1A]'
                }`}
              >
                <item.icon
                  className={`mr-3 h-[18px] w-[18px] flex-shrink-0 ${
                    isActive ? 'text-[#2D4A3E]' : 'text-[#6B6B6B] group-hover:text-[#1A1A1A]'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-[#E8E8E8] space-y-1">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-3 py-2.5 text-[14px] font-medium rounded-[6px] text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-[18px] w-[18px] flex-shrink-0 text-red-600 group-hover:text-red-700" />
          Dilni (Log out)
        </button>
      </div>
    </div>
  );
}
