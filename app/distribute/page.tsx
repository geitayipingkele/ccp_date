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
  Info,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const trendData = [
  { time: '09:00', current: 450, reference: 420, yoy: 430, mom: 440 },
  { time: '09:30', current: 480, reference: 430, yoy: 440, mom: 450 },
  { time: '10:00', current: 520, reference: 450, yoy: 460, mom: 470 },
  { time: '10:30', current: 410, reference: 460, yoy: 450, mom: 480 },
  { time: '11:00', current: 380, reference: 440, yoy: 420, mom: 450 },
  { time: '11:30', current: 460, reference: 450, yoy: 440, mom: 460 },
  { time: '12:00', current: 510, reference: 470, yoy: 480, mom: 490 },
];

const tableData = [
  { id: 1, name: '变压器监控-01', sn: 'SN20240301001', unit: '广州输电', object: '变压器', dataCaliber: '量测数据', type: '线路温度', target: '省侧监控平台', time: '2024-03-20 10:00', count: 520, ref: 450, diff: 70, percent: '15.5%' },
  { id: 2, name: '线路巡检-A2', sn: 'SN20240301002', unit: '佛山输电', object: '输电线路', dataCaliber: '图像数据', type: '山火', target: '应急指挥中心', time: '2024-03-20 10:00', count: 45, ref: 50, diff: -5, percent: '-10.0%' },
  { id: 3, name: '气象站-S3', sn: 'SN20240301003', unit: '中山输电', object: '气象站', dataCaliber: '量测数据', type: '地灾', target: '地质预警系统', time: '2024-03-20 10:00', count: 380, ref: 440, diff: -60, percent: '-13.6%' },
  { id: 4, name: '变电站安防-04', sn: 'SN20240301004', unit: '广州输电', object: '变电站', dataCaliber: '图像数据', type: '雷电', target: '省侧监控平台', time: '2024-03-20 10:00', count: 120, ref: 110, diff: 10, percent: '9.1%' },
  { id: 5, name: '变压器监控-05', sn: 'SN20240301005', unit: '佛山输电', object: '变压器', dataCaliber: '量测数据', type: '倾斜率', target: '设备管家系统', time: '2024-03-20 10:00', count: 490, ref: 480, diff: 10, percent: '2.1%' },
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

const ClearableSelect = ({ options, defaultValue = "", disabled = false, onChange }: { options: string[], defaultValue?: string, disabled?: boolean, onChange?: (val: string) => void }) => {
  const [val, setVal] = useState(defaultValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setVal(newVal);
    if (onChange) onChange(newVal);
  };

  const handleClear = () => {
    setVal('');
    if (onChange) onChange('');
  };

  return (
    <div className="relative">
      <select 
        value={val}
        onChange={handleChange}
        disabled={disabled}
        className={`input-field w-full pr-8 appearance-none ${!val ? 'text-gray-400' : 'text-gray-900'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <option value="" disabled hidden>请选择</option>
        {options.map(opt => <option key={opt} value={opt} className="text-gray-900">{opt}</option>)}
      </select>
      {val && !disabled && (
        <button onClick={handleClear} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          let name = '';
          if (entry.dataKey === 'current') name = '分发数（次）';
          if (entry.dataKey === 'reference') name = '参考值（次）';
          if (entry.dataKey === 'yoy') name = '同比（次）';
          if (entry.dataKey === 'mom') name = '环比（次）';
          
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-600">{name}:</span>
              <span className="font-medium text-gray-900">{entry.value}</span>
            </div>
          );
        })}
        {payload.find((p: any) => p.dataKey === 'current') && payload.find((p: any) => p.dataKey === 'reference') && (
          <>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
              <span className="text-gray-600">差额（次）:</span>
              <span className="font-medium text-gray-900">
                {payload.find((p: any) => p.dataKey === 'current').value - payload.find((p: any) => p.dataKey === 'reference').value}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
              <span className="text-gray-600">差额百分比（%）:</span>
              <span className="font-medium text-gray-900">
                {(((payload.find((p: any) => p.dataKey === 'current').value - payload.find((p: any) => p.dataKey === 'reference').value) / payload.find((p: any) => p.dataKey === 'reference').value) * 100).toFixed(1)}%
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default function DistributeMonitoringPage() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTemplateList, setShowTemplateList] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: '城北变压器日报', date: '2024-03-19' },
    { id: 2, name: '全量图像监控', date: '2024-03-18' },
  ]);
  const [templateName, setTemplateName] = useState('');
  const [dataCaliber, setDataCaliber] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName) return;
    setTemplates([...templates, { id: Date.now(), name: templateName, date: new Date().toISOString().split('T')[0] }]);
    setTemplateName('');
    setShowSaveModal(false);
  };

  const handleDeleteTemplate = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">数据分发监控</h2>
        </div>
      </div>

      {/* Query Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">设备名称</label>
            <ClearableInput placeholder="请输入设备名称" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">物联标识码</label>
            <ClearableInput placeholder="请输入物联标识码" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">数据口径</label>
            <ClearableSelect options={['量测数据', '图像数据']} onChange={setDataCaliber} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">数据类型</label>
            <ClearableSelect options={['地灾', '雷电', '倾斜率', '倾角', '山火', '线路温度']} disabled={dataCaliber === '图像数据'} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">分发目标</label>
            <ClearableInput placeholder="请输入分发目标" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">所属单位</label>
            <ClearableInput placeholder="请输入所属单位" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">领域</label>
            <ClearableSelect options={['输电', '变电', '配电', '安监']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">分区</label>
            <ClearableSelect options={['Ⅰ区', 'Ⅱ区', 'Ⅲ区', 'Ⅳ区', 'Ⅴ区']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">量测图像数据</label>
            <ClearableSelect options={['是', '否']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">统计周期</label>
            <ClearableSelect options={['30分钟', '60分钟', '天']} defaultValue="30分钟" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">时间范围</label>
            <DateRangePicker align="right" />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex gap-3">
            <button className="btn-primary flex items-center gap-2">查询</button>
            <button className="btn-secondary flex items-center gap-2">重置</button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowSaveModal(true)} className="btn-secondary flex items-center gap-2 border-[#4869F3] text-[#4869F3] hover:bg-[#4869F3]/5">
               保存模板
            </button>
            <div className="relative">
              <button onClick={() => setShowTemplateList(!showTemplateList)} className="btn-secondary flex items-center gap-2 border-[#4869F3] text-[#4869F3] hover:bg-[#4869F3]/5">
                 管理模板
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
                        <div key={t.id} onClick={() => setShowTemplateList(false)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex justify-between items-center group cursor-pointer">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.date}</p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => handleDeleteTemplate(t.id, e)} className="text-red-500 hover:text-red-700">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '分发总次数', value: '1,284', unit: '次', trend: '+12.5%', isUp: true },
          { label: '参考值总数', value: '1,150', unit: '次', trend: '+5.2%', isUp: true },
          { label: '差额', value: '134', unit: '次', trend: '-2.1%', isUp: false },
          { label: '差额百分比', value: '11.6%', unit: '', trend: '+1.4%', isUp: true },
        ].map((stat, i) => (
          <div key={i} className="card p-4 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
            <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
              {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.trend} <span className="text-gray-400 font-normal ml-1">较昨日</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">分发趋势分析</h3>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                参考值基于设备+分发目标近7天历史数据计算均值。
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4869F3]"></div>
              <span>当前分发数</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span>参考值</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>同比</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span>环比</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
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
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="current" stroke="#4869F3" strokeWidth={3} dot={{ r: 4, fill: '#4869F3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="reference" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="yoy" stroke="#4ADE80" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="mom" stroke="#C084FC" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">分发数据记录明细</h3>
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
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">所属单位</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">监测对象</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">数据口径</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">数据类型</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">分发目标</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">分发数</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">参考值</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">差额</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">差额百分比</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{row.sn}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{row.unit}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{row.object}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{row.dataCaliber}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      row.dataCaliber === '量测数据' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-[#4869F3]">{row.target}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium text-right">{row.count}</td>
                  <td className="px-6 py-3 text-sm text-gray-500 text-right">{row.ref}</td>
                  <td className={`px-6 py-3 text-sm font-medium text-right ${row.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.diff > 0 ? `+${row.diff}` : row.diff}
                  </td>
                  <td className={`px-6 py-3 text-sm font-bold text-right ${row.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {row.percent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">共 {tableData.length} 条记录</span>
          <nav className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">2</button>
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
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">模板名称</label>
                  <input 
                    type="text" 
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="请输入模板名称" 
                    className="input-field w-full" 
                    autoFocus
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setShowSaveModal(false)} className="btn-secondary">取消</button>
                <button onClick={handleSaveTemplate} disabled={!templateName} className="btn-primary">确认保存</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
