'use client';

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Save, 
  LayoutGrid, 
  Download, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const trendData = [
  { time: '09:00', current: 450, reference: 420 },
  { time: '09:30', current: 480, reference: 430 },
  { time: '10:00', current: 520, reference: 450 },
  { time: '10:30', current: 410, reference: 460 },
  { time: '11:00', current: 380, reference: 440 },
  { time: '11:30', current: 460, reference: 450 },
  { time: '12:00', current: 510, reference: 470 },
];

const tableData = [
  { id: 1, name: '变压器监控-01', sn: 'SN20240301001', unit: '城北供电局', object: '变压器', type: '量测数据', time: '2024-03-20 10:00', count: 520, ref: 450, diff: 70, percent: '15.5%' },
  { id: 2, name: '线路巡检-A2', sn: 'SN20240301002', unit: '城南供电局', object: '输电线路', type: '图像数据', time: '2024-03-20 10:00', count: 45, ref: 50, diff: -5, percent: '-10.0%' },
  { id: 3, name: '气象站-S3', sn: 'SN20240301003', unit: '城西供电局', object: '气象站', type: '量测数据', time: '2024-03-20 10:00', count: 380, ref: 440, diff: -60, percent: '-13.6%' },
  { id: 4, name: '变电站安防-04', sn: 'SN20240301004', unit: '城东供电局', object: '变电站', type: '图像数据', time: '2024-03-20 10:00', count: 120, ref: 110, diff: 10, percent: '9.1%' },
  { id: 5, name: '变压器监控-05', sn: 'SN20240301005', unit: '城北供电局', object: '变压器', type: '量测数据', time: '2024-03-20 10:00', count: 490, ref: 480, diff: 10, percent: '2.1%' },
];

export default function MonitoringPage() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTemplateList, setShowTemplateList] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: '城北变压器日报', date: '2024-03-19' },
    { id: 2, name: '全量图像监控', date: '2024-03-18' },
  ]);
  const [templateName, setTemplateName] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName) return;
    setTemplates([...templates, { id: Date.now(), name: templateName, date: new Date().toISOString().split('T')[0] }]);
    setTemplateName('');
    setShowSaveModal(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据上报监控</h2>
          <p className="text-gray-500 mt-1">实时监控物联网设备上报趋势与异常差额</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出数据
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> 手动刷新
          </button>
        </div>
      </div>

      {/* Query Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">设备名称/SN</label>
            <input type="text" placeholder="请输入设备名称或SN" className="input-field w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">所属单位</label>
            <select className="input-field w-full">
              <option>全部单位</option>
              <option>城北供电局</option>
              <option>城南供电局</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">数据口径</label>
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button className="flex-1 py-1 text-sm font-medium rounded bg-white shadow-sm">量测数据</button>
              <button className="flex-1 py-1 text-sm font-medium text-gray-500">图像数据</button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">单位时间值</label>
            <select className="input-field w-full">
              <option>30分钟</option>
              <option>60分钟</option>
              <option>天</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-6">
          <div className="flex gap-3">
            <button className="btn-primary flex items-center gap-2">
              <Search className="w-4 h-4" /> 查询
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> 重置
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowSaveModal(true)}
              className="btn-secondary flex items-center gap-2 border-[#4869F3] text-[#4869F3] hover:bg-[#4869F3]/5"
            >
              <Save className="w-4 h-4" /> 保存模板
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowTemplateList(!showTemplateList)}
                className="btn-secondary flex items-center gap-2 border-[#4869F3] text-[#4869F3] hover:bg-[#4869F3]/5"
              >
                <LayoutGrid className="w-4 h-4" /> 查询模板
              </button>
              
              <AnimatePresence>
                {showTemplateList && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">我的私有模板 ({templates.length}/10)</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {templates.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => setShowTemplateList(false)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex justify-between items-center group"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.date}</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Search className="w-3 h-3 text-[#4869F3]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '上报总次数', value: '1,284', unit: '次', trend: '+12.5%', isUp: true },
          { label: '参考值总数', value: '1,150', unit: '次', trend: '+5.2%', isUp: true },
          { label: '差额', value: '134', unit: '次', trend: '-2.1%', isUp: false },
          { label: '差额百分比', value: '11.6%', unit: '', trend: '+1.4%', isUp: true },
        ].map((stat, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
              {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.trend} <span className="text-gray-400 font-normal ml-1">较昨日</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">上报趋势分析</h3>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                参考值基于设备近7天历史数据计算均值。新设备采用同厂商同型号参考值。
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4869F3]"></div>
              <span>当前上报数</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span>参考值</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#4869F3" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#4869F3', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="reference" 
                stroke="#D1D5DB" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">上报数据记录明细</h3>
          <span className="text-xs text-gray-500">共 {tableData.length} 条记录</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">设备名称/SN</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">所属单位</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">监测对象</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">数据类型</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">上报数</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">参考值</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">差额</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">差额百分比</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.sn}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.object}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      row.type === '量测数据' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">{row.count}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-right">{row.ref}</td>
                  <td className={`px-6 py-4 text-sm font-medium text-right ${row.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.diff > 0 ? `+${row.diff}` : row.diff}
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${row.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.percent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <nav className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">&gt;</button>
          </nav>
        </div>
      </div>

      {/* Save Template Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">保存查询模板</h3>
                <p className="text-sm text-gray-500 mt-1">将当前查询条件保存为个人私有模板，方便下次快速查询。</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">模板名称</label>
                  <input 
                    type="text" 
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="请输入模板名称，如：城北变压器日报" 
                    className="input-field w-full" 
                    autoFocus
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="btn-secondary"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveTemplate}
                  disabled={!templateName}
                  className="btn-primary"
                >
                  确认保存
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
