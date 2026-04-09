'use client';

import React from 'react';
import { 
  Calculator, 
  History, 
  Info, 
  CheckCircle2,
  Settings,
  ShieldCheck
} from 'lucide-react';

export default function ReferenceValuesPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">参考值计算规则说明</h2>
        <p className="text-gray-500 mt-1">系统自动基于历史数据计算上报与分发参考值，作为异常判定的动态基准</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Rules */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-[#4869F3]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">核心计算规则</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500">01</div>
                <div>
                  <p className="font-bold text-gray-900">计算窗口</p>
                  <p className="text-sm text-gray-600 mt-1">默认计算每个设备 <span className="text-[#4869F3] font-bold">近7天</span> 的历史数据。系统每小时自动更新一次参考值库。</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500">02</div>
                <div>
                  <p className="font-bold text-gray-900">冷启动逻辑 (新接入设备)</p>
                  <p className="text-sm text-gray-600 mt-1">针对新接入或无历史数据的设备，系统自动采用 <span className="text-[#4869F3] font-bold">同厂商且同型号</span> 设备的聚合参考值作为初始基准。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500">03</div>
                <div>
                  <p className="font-bold text-gray-900">分发参考值</p>
                  <p className="text-sm text-gray-600 mt-1">分发参考值采用与上报参考值 <span className="text-[#4869F3] font-bold">完全相同</span> 的计算规则与时间窗口。</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
              <Info className="w-5 h-5 text-[#4869F3] shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                参考值计算由后端自动化任务执行，最大支持回溯30天内的历史数据进行加权计算。前端监控看板中的“参考值”字段会随页面刷新自动获取最新计算结果。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <History className="w-5 h-5 text-gray-400" />
                <h4 className="font-bold text-gray-900">上报参考值对象</h4>
              </div>
              <ul className="space-y-3">
                {['量测数据 (含量测图像)', '图像数据 (原始报文)', '地灾/雷电专项数据'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-gray-400" />
                <h4 className="font-bold text-gray-900">计算维度</h4>
              </div>
              <ul className="space-y-3">
                {['设备ID (唯一标识)', '厂商-型号 (聚合维度)', '统计时间节点 (30/60/天)'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card p-6 bg-gradient-to-br from-[#4869F3] to-[#637FFF] text-white border-none">
            <ShieldCheck className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="text-lg font-bold">数据权威性保障</h3>
            <p className="text-sm opacity-90 mt-2 leading-relaxed">
              所有参考值计算均经过平台数据治理引擎清洗，剔除离群值与异常波动点，确保监控基准的科学性与准确性。
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex justify-between text-xs opacity-80">
                <span>当前计算引擎版本</span>
                <span>v2.4.0-stable</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h4 className="font-bold text-gray-900 mb-4">常见问题</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-800">Q: 为什么新设备也有参考值？</p>
                <p className="text-xs text-gray-500 mt-1">A: 系统会自动匹配同厂商同型号的聚合均值作为冷启动基准。</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Q: 参考值多久更新一次？</p>
                <p className="text-xs text-gray-500 mt-1">A: 后端任务每小时执行一次全量重算。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
