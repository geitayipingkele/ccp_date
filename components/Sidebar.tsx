'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BellRing, 
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: '数据上报监控',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: '告警规则配置',
    href: '/alarm-config',
    icon: BellRing,
  },
  {
    name: '数据链条溯源',
    href: '/traceability',
    icon: Network,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all hover:bg-gray-50",
                    isActive ? "sidebar-link-active" : "text-gray-600"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-[#4869F3]" : "text-gray-400")} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
