'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BellRing, 
  Network,
  Database,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: '数据上报监控',
    icon: LayoutDashboard,
    children: [
      { name: '数据上报监控', href: '/' },
      { name: '数据分发监控', href: '/distribute' },
    ]
  },
  {
    name: '数据一致性监控',
    href: '/consistency',
    icon: Database,
  },
  {
    name: '告警规则配置',
    href: '/alarm-config',
    icon: BellRing,
  },
  {
    name: '数据链路溯源',
    href: '/traceability',
    icon: Network,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({
    '数据上报监控': true
  });

  const toggleParent = (name: string) => {
    setOpenParents(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some(child => pathname === child.href);
              const isOpen = openParents[item.name];
              return (
                <li key={item.name} className="flex flex-col">
                  <button
                    onClick={() => toggleParent(item.name)}
                    className={cn(
                      "flex items-center justify-between px-6 py-3 text-sm font-medium transition-all hover:bg-gray-50",
                      isChildActive && !isOpen ? "text-[#4869F3]" : "text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5", isChildActive && !isOpen ? "text-[#4869F3]" : "text-gray-500")} />
                      {item.name}
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <ul className="pl-14 space-y-1 mt-1">
                      {item.children.map(child => {
                        const isActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block py-2 text-sm font-medium transition-all hover:text-[#4869F3]",
                                isActive ? "text-[#4869F3]" : "text-gray-500"
                              )}
                            >
                              {child.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              );
            }

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
                  <item.icon className={cn("w-5 h-5", isActive ? "text-[#4869F3]" : "text-gray-500")} />
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
