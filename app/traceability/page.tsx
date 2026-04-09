'use client';

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Database,
  Share2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockTraceData = [
  { 
    id: 'MSG_20240320_002', 
    deviceName: '湿度传感器222', 
    receiveTime: '2024-03-20 10:30:12', 
    processTime: '2024-03-20 10:30:15', 
    dispatchTime: '2024-03-20 10:30:25',
    target: '城北生产管理系统',
    status: '失败',
    total: '13s'
  },
  { 
    id: 'MSG_20240320_001', 
    deviceName: '温度传感器111', 
    receiveTime: '2024-03-20 10:00:05', 
    processTime: '2024-03-20 10:00:08', 
    dispatchTime: '2024-03-20 10:00:12',
    target: '城北生产管理系统',
    status: '成功',
    total: '7s'
  },
];

const ClearableInput = ({ placeholder }: { placeholder: string }) => {
  const [val, setVal] = useState('');
  return (
    <div className="relative">
      <input 
        type="text" 
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder} 
        className="input-field w-full pr-8" 
      />
      {val && (
        <button onClick={() => setVal('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const ClearableSelect = ({ options, defaultValue = "", onChange }: { options: string[], defaultValue?: string, onChange?: (val: string) => void }) => {
  const [val, setVal] = useState(defaultValue);
  
  const handleChange = (newVal: string) => {
    setVal(newVal);
    if (onChange) onChange(newVal);
  };

  return (
    <div className="relative">
      <select 
        value={val}
        onChange={(e) => handleChange(e.target.value)}
        className={`input-field w-full pr-8 appearance-none ${!val ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value="" disabled hidden>请选择</option>
        {options.map(opt => <option key={opt} value={opt} className="text-gray-900">{opt}</option>)}
      </select>
      {val && (
        <button onClick={() => handleChange('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const DateRangePicker = () => (
  <div className="flex items-center gap-1">
    <input type="datetime-local" className="input-field w-full text-xs px-2" />
    <span className="text-gray-400">-</span>
    <input type="datetime-local" className="input-field w-full text-xs px-2" />
  </div>
);

export default function TraceabilityPage() {
  const [selectedMsg, setSelectedMsg] = useState<typeof mockTraceData[0] | null>(null);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据链条溯源</h2>
        </div>
      </div>

      {/* Search Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">设备名称</label>
            <ClearableInput placeholder="请输入设备名称" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">消息 ID</label>
            <ClearableInput placeholder="请输入消息 ID" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">分发目标</label>
            <ClearableInput placeholder="请输入分发目标" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">分发状态</label>
            <ClearableSelect options={['成功', '失败']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">接收时间</label>
            <DateRangePicker />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
          <button className="btn-primary flex items-center justify-center gap-2">
             查询
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
             重置
          </button>
        </div>
      </div>

      {/* Trace Log Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">消息 ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">接收时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">处理时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">分发时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">分发目标</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">分发状态</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">全链路耗时</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTraceData.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm text-gray-900">{msg.deviceName}</td>
                  <td className="px-6 py-3">
                    <span className="text-sm font-mono text-gray-900">{msg.id}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{msg.receiveTime}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{msg.processTime}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{msg.dispatchTime}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{msg.target}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1.5">
                      {msg.status === '成功' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${msg.status === '成功' ? 'text-green-600' : 'text-red-600'}`}>{msg.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-bold text-right">{msg.total}</td>
                  <td className="px-6 py-3 text-right">
                    <button 
                      onClick={() => setSelectedMsg(msg)}
                      className="text-[#4869F3] text-sm font-bold hover:underline"
                    >
                      查看轨迹
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">共 {mockTraceData.length} 条记录</span>
          <nav className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">&gt;</button>
          </nav>
        </div>
      </div>

      {/* Traceability Visualization Modal */}
      <AnimatePresence>
        {selectedMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMsg(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">全链路轨迹图</h3>
                <button onClick={() => setSelectedMsg(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <div className="text-sm text-gray-500">
                    消息ID: <span className="font-mono text-[#4869F3]">{selectedMsg.id}</span>
                  </div>
                </div>

                <div className="relative flex justify-between items-start max-w-3xl mx-auto">
                  {/* Progress Line */}
                  <div className="absolute top-10 left-0 right-0 h-0.5 bg-gray-100 -z-10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: selectedMsg.status === '成功' ? '100%' : '50%' }}
                      className={`h-full ${selectedMsg.status === '成功' ? 'bg-[#4869F3]' : 'bg-red-400'}`}
                    />
                  </div>

                  {/* Node 1: Receive */}
                  <div className="flex flex-col items-center gap-4 bg-white px-4 relative group">
                    <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center border-2 border-[#4869F3] shadow-lg shadow-blue-100 cursor-help">
                      <Database className="w-8 h-8 text-[#4869F3]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">平台接收</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedMsg.receiveTime}</p>
                    </div>
                    
                    {/* Raw Message Hover Card */}
                    <div className="absolute top-full mt-2 hidden group-hover:block z-50 w-64 bg-gray-900 text-gray-300 text-xs rounded-lg shadow-xl p-4">
                      <p className="font-bold text-white mb-2 border-b border-gray-700 pb-2">原始消息</p>
                      <pre className="font-mono whitespace-pre-wrap">
{`{
  "id": "Alice",
  "date": "125243434344",
  "time": "2026112501"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="pt-8 text-gray-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>

                  {/* Node 2: Process */}
                  <div className="flex flex-col items-center gap-4 bg-white px-4">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center border-2 border-indigo-500 shadow-lg shadow-indigo-100">
                      <Network className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">平台处理</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedMsg.processTime}</p>
                    </div>
                  </div>

                  <div className="pt-8 text-gray-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>

                  {/* Node 3: Dispatch */}
                  <div className="flex flex-col items-center gap-4 bg-white px-4">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 shadow-lg ${
                      selectedMsg.status === '成功' ? 'bg-green-50 border-green-500 shadow-green-100' : 'bg-red-50 border-red-500 shadow-red-100'
                    }`}>
                      <Share2 className={`w-8 h-8 ${selectedMsg.status === '成功' ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">平台分发</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedMsg.dispatchTime}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded ${
                        selectedMsg.status === '成功' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {selectedMsg.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center gap-12">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">全链路总耗时</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedMsg.total}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">分发目标系统</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedMsg.target}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
