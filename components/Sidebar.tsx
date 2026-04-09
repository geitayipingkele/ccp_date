'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BellRing, 
  Network, 
  Calculator,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: '数据上报监控',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: '上报异常告警配置',
    href: '/alarm-config',
    icon: BellRing,
  },
  {
    name: '数据链条溯源',
    href: '/traceability',
    icon: Network,
  },
  {
    name: '参考值计算',
    href: '/reference-values',
    icon: Calculator,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-[#4869F3] p-2 rounded-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-bold text-lg tracking-tight">电力物联网监控</h1>
      </div>
      
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

      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            PM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">资深产品经理</p>
            <p className="text-xs text-gray-500 truncate">ahphaek2022@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
