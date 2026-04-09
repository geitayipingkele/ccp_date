'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Bell,
  Clock,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockRules = [
  { id: 1, name: '城北变压器差额告警', type: '上报差额告警', dataTypes: ['量测数据'], domains: ['输电'], partitions: ['Ⅲ区'], scope: '城北供电局 / 变压器', threshold: '差额百分比 >= 20%', status: '启用', time: '2024-03-15 10:00', devices: [{ id: 1, name: '温度传感器111', sn: '576dgd121113', model: '型号1', domain: '输电', unit: '广州输电', partition: 'Ⅲ区', status: '在线' }] },
  { id: 2, name: '全网图像超时告警', type: '超时未上报告警', dataTypes: ['图像数据'], domains: ['变电', '配电'], partitions: ['Ⅰ区', 'Ⅱ区'], scope: '全网 / 图像设备', threshold: '超时 > 24小时', status: '启用', time: '2024-03-14 15:30', devices: [] },
  { id: 3, name: '城南线路巡检异常', type: '上报差额告警', dataTypes: ['量测数据', '图像数据'], domains: ['安监'], partitions: ['Ⅳ区'], scope: '城南供电局 / 输电线路', threshold: '差额百分比 ∈ [30%, 100%]', status: '停用', time: '2024-03-12 09:00', devices: [] },
];

const mockDevices = [
  { id: 1, name: '温度传感器111', sn: '576dgd121113', model: '型号1', domain: '输电', unit: '广州输电', partition: 'Ⅲ区', status: '在线' },
  { id: 2, name: '湿度传感器222', sn: '576dgd121114', model: '型号2', domain: '变电', unit: '佛山输电', partition: 'Ⅱ区', status: '离线' },
  { id: 3, name: '压力传感器333', sn: '576dgd121115', model: '型号1', domain: '配电', unit: '中山输电', partition: 'Ⅰ区', status: '在线' },
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

const MultiSelect = ({ options, values, onChange, placeholder = "请选择" }: { options: string[], values: string[], onChange: (v: string[]) => void, placeholder?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOption = (opt: string) => {
    if (values.includes(opt)) onChange(values.filter(v => v !== opt));
    else onChange([...values, opt]);
  };

  const removeOption = (e: React.MouseEvent, opt: string) => {
    e.stopPropagation();
    onChange(values.filter(v => v !== opt));
  };

  return (
    <div className="relative">
      <div 
        className="input-field w-full min-h-[38px] flex flex-wrap items-center gap-1.5 cursor-pointer py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {values.length === 0 && <span className="text-gray-400 text-sm">{placeholder}</span>}
        {values.map(v => (
          <span key={v} className="flex items-center gap-1 bg-[#4869F3]/10 text-[#4869F3] px-2 py-0.5 rounded text-xs font-medium">
            {v}
            <X className="w-3 h-3 hover:text-blue-700 cursor-pointer" onClick={(e) => removeOption(e, v)} />
          </span>
        ))}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[50]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-lg py-1 z-[60] max-h-48 overflow-y-auto">
            {options.map(opt => (
              <div 
                key={opt} 
                className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                onClick={() => toggleOption(opt)}
              >
                <input type="checkbox" checked={values.includes(opt)} readOnly className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                <span className="text-gray-700">{opt}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function AlarmConfigPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showViewDevicesModal, setShowViewDevicesModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [isEdit, setIsEdit] = useState(false);
  const [viewingDevices, setViewingDevices] = useState<typeof mockDevices>([]);

  // Form State
  const [ruleName, setRuleName] = useState('');
  const [alarmType, setAlarmType] = useState('');
  const [ruleStatus, setRuleStatus] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState<typeof mockDevices>([]);
  const [ruleDataTypes, setRuleDataTypes] = useState<string[]>([]);
  const [ruleDomains, setRuleDomains] = useState<string[]>([]);
  const [rulePartitions, setRulePartitions] = useState<string[]>([]);
  
  const [selectedDevicesPage, setSelectedDevicesPage] = useState(1);
  const selectedDevicesPageSize = 5;
  const totalSelectedPages = Math.max(1, Math.ceil(selectedDevices.length / selectedDevicesPageSize));
  const paginatedSelectedDevices = selectedDevices.slice((selectedDevicesPage - 1) * selectedDevicesPageSize, selectedDevicesPage * selectedDevicesPageSize);

  const handleAddDeviceToggle = (device: typeof mockDevices[0]) => {
    if (selectedDevices.find(d => d.id === device.id)) {
      setSelectedDevices(selectedDevices.filter(d => d.id !== device.id));
    } else {
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const handleRemoveDevice = (id: number) => {
    const newDevices = selectedDevices.filter(d => d.id !== id);
    setSelectedDevices(newDevices);
    const newTotalPages = Math.max(1, Math.ceil(newDevices.length / selectedDevicesPageSize));
    if (selectedDevicesPage > newTotalPages) {
      setSelectedDevicesPage(newTotalPages);
    }
  };

  const handleBatchRemoveDevices = () => {
    setSelectedDevices([]);
  };

  const openAddModal = () => {
    setIsEdit(false);
    setRuleName('');
    setAlarmType('');
    setRuleStatus(true);
    setSelectedDevices([]);
    setRuleDataTypes([]);
    setRuleDomains([]);
    setRulePartitions([]);
    setSelectedDevicesPage(1);
    setShowAddModal(true);
  };

  const openEditModal = (rule: typeof mockRules[0]) => {
    setIsEdit(true);
    setRuleName(rule.name);
    setAlarmType(rule.type);
    setRuleStatus(rule.status === '启用');
    setSelectedDevices(rule.devices || []);
    setRuleDataTypes(rule.dataTypes || []);
    setRuleDomains(rule.domains || []);
    setRulePartitions(rule.partitions || []);
    setSelectedDevicesPage(1);
    setShowAddModal(true);
  };

  const openViewDevicesModal = (devices: typeof mockDevices) => {
    setViewingDevices(devices);
    setShowViewDevicesModal(true);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">告警规则配置</h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">规则名称</label>
            <ClearableInput placeholder="请输入规则名称" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">告警类型</label>
            <ClearableSelect options={['上报差额告警', '超时未上报告警']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">数据类型</label>
            <ClearableInput placeholder="请输入数据类型" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">阈值配置</label>
            <ClearableInput placeholder="请输入阈值配置" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">状态</label>
            <ClearableSelect options={['启用', '停用']} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">更新时间</label>
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
          <button 
            onClick={openAddModal}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> 新增
          </button>
        </div>
      </div>

      {/* Rules Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-1 px-3">批量启用</button>
            <button className="btn-secondary text-xs py-1 px-3">批量停用</button>
            <button className="btn-secondary text-xs py-1 px-3 text-red-600 border-red-100 hover:bg-red-50">批量删除</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">规则ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">规则名称</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">告警类型</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">数据类型</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">所属领域</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">适用设备</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">阈值配置</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <input type="checkbox" className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{rule.id}</td>
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-gray-900">{rule.name}</p>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {rule.type === '上报差额告警' ? (
                        <Bell className="w-4 h-4 text-orange-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-600">{rule.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      {rule.dataTypes.map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">输电</td>
                  <td className="px-6 py-3">
                    <button 
                      onClick={() => openViewDevicesModal(rule.devices)}
                      className="text-[#4869F3] text-sm hover:underline"
                    >
                      查看设备
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{rule.threshold}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      rule.status === '启用' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${rule.status === '启用' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-500">{rule.time}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(rule)} className="p-1.5 hover:bg-white rounded border border-gray-200 text-gray-600 hover:text-[#4869F3]" title="编辑">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setShowDeleteConfirm(true)} className="p-1.5 hover:bg-white rounded border border-gray-200 text-gray-600 hover:text-red-600" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">共 {mockRules.length} 条记录</span>
          <nav className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">&gt;</button>
          </nav>
        </div>
      </div>

      {/* Add/Edit Rule Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">{isEdit ? '编辑告警规则' : '新增告警规则'}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Basic Info */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    基础信息
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">规则名称 <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                        placeholder="请输入规则名称" 
                        className="input-field w-full" 
                        maxLength={30} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">告警类型 <span className="text-red-500">*</span></label>
                      <select 
                        className="input-field w-full" 
                        disabled={isEdit}
                        value={alarmType}
                        onChange={(e) => setAlarmType(e.target.value)}
                      >
                        <option value="" disabled hidden>请选择告警类型</option>
                        <option value="上报差额告警">上报差额告警</option>
                        <option value="超时未上报告警">超时未上报告警</option>
                      </select>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        状态
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={ruleStatus}
                            onChange={(e) => setRuleStatus(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4869F3]"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                </section>

                {/* Scope */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    适用范围
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">数据类型 <span className="text-red-500">*</span></label>
                      <MultiSelect 
                        options={['地灾', '雷电', '倾斜率', '倾角', '山火', '量测数据', '图像数据']} 
                        values={ruleDataTypes} 
                        onChange={setRuleDataTypes} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">所属领域 <span className="text-red-500">*</span></label>
                      <MultiSelect 
                        options={['输电', '变电', '配电', '安监']} 
                        values={ruleDomains} 
                        onChange={setRuleDomains} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">所属单位</label>
                      <input type="text" placeholder="请输入所属单位" className="input-field w-full" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">所属分区</label>
                      <MultiSelect 
                        options={['Ⅰ区', 'Ⅱ区', 'Ⅲ区', 'Ⅳ区', 'Ⅴ区']} 
                        values={rulePartitions} 
                        onChange={setRulePartitions} 
                      />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="text-sm font-medium text-gray-700">选择设备</label>
                      <div>
                        <button 
                          onClick={() => setShowDeviceModal(true)}
                          className="btn-secondary text-sm py-1.5 px-3"
                        >
                          选择设备
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedDevices.length > 0 && (
                    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-2 flex justify-between items-center border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">已选设备 ({selectedDevices.length})</span>
                      </div>
                      <div className="max-h-40 overflow-y-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 font-medium text-gray-500">设备名称</th>
                              <th className="px-4 py-2 font-medium text-gray-500">物联标识码</th>
                              <th className="px-4 py-2 font-medium text-gray-500">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {paginatedSelectedDevices.map(d => (
                              <tr key={d.id}>
                                <td className="px-4 py-2">{d.name}</td>
                                <td className="px-4 py-2">{d.sn}</td>
                                <td className="px-4 py-2">
                                  <button onClick={() => handleRemoveDevice(d.id)} className="text-red-500 hover:text-red-700">删除</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">共 {selectedDevices.length} 条记录</span>
                        <nav className="flex gap-1">
                          <button 
                            onClick={() => setSelectedDevicesPage(p => Math.max(1, p - 1))}
                            disabled={selectedDevicesPage === 1}
                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50 text-xs"
                          >&lt;</button>
                          <button className="w-6 h-6 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white text-xs">{selectedDevicesPage}</button>
                          <button 
                            onClick={() => setSelectedDevicesPage(p => Math.min(totalSelectedPages, p + 1))}
                            disabled={selectedDevicesPage === totalSelectedPages}
                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 text-xs disabled:opacity-50"
                          >&gt;</button>
                        </nav>
                      </div>
                    </div>
                  )}
                </section>

                {/* Threshold */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    阈值配置
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {alarmType === '上报差额告警' ? (
                      <div className="space-y-1 col-span-2">
                        <label className="text-sm font-medium text-gray-700">差额阈值 (%) <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-3">
                          <input type="number" placeholder="下限" className="input-field w-full" />
                          <span className="text-gray-400">-</span>
                          <input type="number" placeholder="上限" className="input-field w-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 col-span-2">
                        <label className="text-sm font-medium text-gray-700">超时阈值 <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <input type="number" placeholder="请输入超时阈值" className="input-field flex-1" />
                          <select className="input-field w-24">
                            <option>分钟</option>
                            <option>小时</option>
                            <option>天</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary">取消</button>
                <button onClick={() => setShowAddModal(false)} className="btn-primary">确认</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Device Selection Modal */}
      <AnimatePresence>
        {showDeviceModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeviceModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">选择设备</h3>
                <button onClick={() => setShowDeviceModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-4 gap-4">
                  <ClearableInput placeholder="设备名称" />
                  <ClearableInput placeholder="物联标识码" />
                  <ClearableInput placeholder="设备型号" />
                  <select className="input-field w-full">
                    <option value="" disabled hidden>请选择状态</option>
                    <option value="在线">在线</option>
                    <option value="离线">离线</option>
                  </select>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="btn-secondary text-sm py-1.5 px-3">重置</button>
                  <button className="btn-primary text-sm py-1.5 px-3">查询</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-2 w-10">
                        <input type="checkbox" className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                      </th>
                      <th className="px-4 py-2 font-medium text-gray-500">设备名称</th>
                      <th className="px-4 py-2 font-medium text-gray-500">物联标识码</th>
                      <th className="px-4 py-2 font-medium text-gray-500">设备型号</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属领域</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属单位</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属分区</th>
                      <th className="px-4 py-2 font-medium text-gray-500">设备状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDevices.map(d => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <input 
                            type="checkbox" 
                            checked={selectedDevices.some(sd => sd.id === d.id)}
                            onChange={() => handleAddDeviceToggle(d)}
                            className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" 
                          />
                        </td>
                        <td className="px-4 py-2">{d.name}</td>
                        <td className="px-4 py-2">{d.sn}</td>
                        <td className="px-4 py-2">{d.model}</td>
                        <td className="px-4 py-2">{d.domain}</td>
                        <td className="px-4 py-2">{d.unit}</td>
                        <td className="px-4 py-2">{d.partition}</td>
                        <td className="px-4 py-2">{d.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">共 {mockDevices.length} 条</span>
                <button onClick={() => setShowDeviceModal(false)} className="btn-primary">完成</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Devices Modal */}
      <AnimatePresence>
        {showViewDevicesModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowViewDevicesModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">适用设备</h3>
                <button onClick={() => setShowViewDevicesModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-2 font-medium text-gray-500">设备名称</th>
                      <th className="px-4 py-2 font-medium text-gray-500">物联标识码</th>
                      <th className="px-4 py-2 font-medium text-gray-500">设备型号</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属领域</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属单位</th>
                      <th className="px-4 py-2 font-medium text-gray-500">所属分区</th>
                      <th className="px-4 py-2 font-medium text-gray-500">设备状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {viewingDevices.length > 0 ? viewingDevices.map(d => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{d.name}</td>
                        <td className="px-4 py-2">{d.sn}</td>
                        <td className="px-4 py-2">{d.model}</td>
                        <td className="px-4 py-2">{d.domain}</td>
                        <td className="px-4 py-2">{d.unit}</td>
                        <td className="px-4 py-2">{d.partition}</td>
                        <td className="px-4 py-2">{d.status}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">暂无适用设备</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">共 {viewingDevices.length} 条记录</span>
                <nav className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 disabled:opacity-50" disabled>&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4869F3] bg-[#4869F3] text-white">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">&gt;</button>
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">确认删除</h3>
                <p className="text-sm text-gray-600">确认删除该告警规则？</p>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">取消</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="btn-primary bg-red-600 hover:bg-red-700 border-red-600">确认</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
