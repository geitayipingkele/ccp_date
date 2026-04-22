'use client';

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download,
  X,
  FileJson
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockConsistencyData = [
  { id: 1, name: '湿度传感器222', sn: 'SN20240301001', measureId: 'M_20260421_001', fileId: 'F_20260421_001', folder: '/uploads/2026/04/21', filename: 'img_sensor_001.jpg', status: '一致', measureTime: '2026-04-21 10:30:12', fileTime: '2026-04-21 10:30:15' },
  { id: 2, name: '温度传感器111', sn: 'SN20240301002', measureId: 'M_20260421_002', fileId: 'F_20260421_002', folder: '/uploads/2026/04/21', filename: 'img_sensor_002.jpg', status: '不一致', measureTime: '2026-04-21 10:45:00', fileTime: '2026-04-21 11:00:20' },
  { id: 3, name: '倾角传感器A', sn: 'SN20240301003', measureId: 'M_20260421_003', fileId: '-', folder: '-', filename: '-', status: '不一致', measureTime: '2026-04-21 11:15:30', fileTime: '-' },
  { id: 4, name: '摄像头B', sn: 'SN20240301004', measureId: '-', fileId: 'F_20260421_004', folder: '/img/2026/04', filename: 'cam_b_01.png', status: '不一致', measureTime: '-', fileTime: '2026-04-21 12:05:10' },
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

const ClearableSelect = ({ options, defaultValue = "" }: { options: string[], defaultValue?: string }) => {
  const [val, setVal] = useState(defaultValue);
  return (
    <div className="relative">
      <select 
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={`input-field w-full pr-8 appearance-none ${!val ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value="" disabled hidden>请选择</option>
        {options.map(opt => <option key={opt} value={opt} className="text-gray-900">{opt}</option>)}
      </select>
      {val && (
        <button onClick={() => setVal('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const DateRangePicker = ({ align = 'left' }: { align?: 'left' | 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [display, setDisplay] = useState('');

  const formatTime = (t: string) => {
    if (!t) return '';
    const d = new Date(t);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  };

  const handleConfirm = () => {
    if (start && end) {
      setDisplay(`${formatTime(start)}-${formatTime(end)}`);
    } else {
      setDisplay('');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="input-field w-full flex items-center justify-between cursor-pointer text-sm min-h-[38px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={display ? 'text-gray-900' : 'text-gray-400'}>
          {display || '请选择'}
        </span>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[50]" onClick={() => setIsOpen(false)}></div>
          <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-1 bg-white border border-gray-200 shadow-xl rounded-lg p-4 z-[60] w-80`}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">开始时间</label>
                <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="input-field w-full text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">结束时间</label>
                <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="input-field w-full text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => setIsOpen(false)} className="btn-secondary text-xs py-1.5 px-3">取消</button>
                <button onClick={handleConfirm} className="btn-primary text-xs py-1.5 px-3">确定</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function ConsistencyPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据一致性监控</h2>
        </div>
      </div>

      {/* Query Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">设备名称</label>
            <ClearableInput placeholder="请输入设备名称" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">物联标识码</label>
            <ClearableInput placeholder="请输入物联标识码" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">量测数据ID</label>
            <ClearableInput placeholder="请输入量测数据ID" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">图像文件ID</label>
            <ClearableInput placeholder="请输入图像文件ID" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">一致性状态</label>
            <ClearableSelect options={['一致', '不一致']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">接收时间</label>
            <DateRangePicker align="right" />
          </div>
        </div>

        <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
          <button className="btn-primary flex items-center gap-2">查询</button>
          <button className="btn-secondary flex items-center gap-2">重置</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">一致性记录明细</h3>
          <button className="btn-secondary flex items-center gap-2 text-sm py-1.5 px-3">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">物联标识码</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">量测数据ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">图像文件ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">图像文件目录</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">图像文件名</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">一致性状态</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">量测数据接收时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">图像文件接收时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockConsistencyData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{row.sn}</td>
                  <td className="px-6 py-3">
                    <div className="relative group/id inline-block">
                      <span className="text-sm font-mono text-gray-700 border-b border-dashed border-gray-400 cursor-help">{row.measureId}</span>
                      <div className="hidden group-hover/id:block absolute bottom-full left-0 mb-2 w-72 bg-gray-900 text-gray-200 text-xs rounded-lg shadow-xl p-4 z-50">
                        <p className="font-bold text-white mb-2 flex items-center gap-1 border-b border-gray-700 pb-2"><FileJson className="w-3 h-3" /> 量测数据原始JSON</p>
                        <pre className="font-mono whitespace-pre-wrap">
                          {`{\n  "id": "${row.measureId}",\n  "value": 25.4,\n  "unit": "C"\n}`}
                        </pre>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="relative group/id inline-block">
                      <span className="text-sm font-mono text-gray-700 border-b border-dashed border-gray-400 cursor-help">{row.fileId}</span>
                      <div className="hidden group-hover/id:block absolute bottom-full left-0 mb-2 w-72 bg-gray-900 text-gray-200 text-xs rounded-lg shadow-xl p-4 z-50">
                        <p className="font-bold text-white mb-2 flex items-center gap-1 border-b border-gray-700 pb-2"><FileJson className="w-3 h-3" /> 图像文件原始JSON</p>
                        <pre className="font-mono whitespace-pre-wrap">
                          {`{\n  "id": "${row.fileId}",\n  "size": "2.4MB",\n  "type": "image/jpeg"\n}`}
                        </pre>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 truncate max-w-[150px]" title={row.folder}>{row.folder}</td>
                  <td className="px-6 py-3 text-sm text-gray-600 truncate max-w-[150px]" title={row.filename}>{row.filename}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      row.status === '一致' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{row.measureTime}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{row.fileTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">共 {mockConsistencyData.length} 条记录</span>
          <nav className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">&gt;</button>
          </nav>
        </div>
      </div>
    </div>
  );
}
