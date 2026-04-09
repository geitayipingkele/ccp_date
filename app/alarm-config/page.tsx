'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Copy, 
  Trash2, 
  Power,
  Bell,
  Clock,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockRules = [
  { id: 1, name: '城北变压器差额告警', type: '上报差额告警', interval: '30分钟', dataTypes: ['量测数据'], scope: '城北供电局 / 变压器', threshold: '差额百分比 >= 20%', status: '启用', creator: '张工', time: '2024-03-15 10:00' },
  { id: 2, name: '全网图像超时告警', type: '超时未上报告警', interval: '天', dataTypes: ['图像数据'], scope: '全网 / 图像设备', threshold: '超时 > 24小时', status: '启用', creator: '李工', time: '2024-03-14 15:30' },
  { id: 3, name: '城南线路巡检异常', type: '上报差额告警', interval: '60分钟', dataTypes: ['量测数据', '图像数据'], scope: '城南供电局 / 输电线路', threshold: '差额百分比 ∈ [30%, 100%]', status: '停用', creator: '王工', time: '2024-03-12 09:00' },
];

export default function AlarmConfigPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [alarmType, setAlarmType] = useState('diff'); // 'diff' or 'timeout'

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">上报异常告警配置</h2>
          <p className="text-gray-500 mt-1">灵活配置上报差额与超时告警规则，确保数据采集完整性</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> 新增告警规则
        </button>
      </div>

      {/* Filter Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">规则名称</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索规则名称" className="input-field w-full pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">告警类型</label>
            <select className="input-field w-full">
              <option>全部类型</option>
              <option>上报差额告警</option>
              <option>超时未上报告警</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">状态</label>
            <select className="input-field w-full">
              <option>全部状态</option>
              <option>启用</option>
              <option>停用</option>
            </select>
          </div>
          <div className="flex items-end gap-3">
            <button className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" /> 筛选
            </button>
            <button className="btn-secondary flex-1">重置</button>
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-4">
            <button className="text-sm font-bold text-[#4869F3] border-b-2 border-[#4869F3] pb-1">全部规则 ({mockRules.length})</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-1">已启用 (2)</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-1">已停用 (1)</button>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-1 px-3">批量启用</button>
            <button className="btn-secondary text-xs py-1 px-3 text-red-600 border-red-100 hover:bg-red-50">批量删除</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">规则名称</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">告警类型</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">统计粒度</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">适用范围</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">阈值配置</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-[#4869F3] focus:ring-[#4869F3]" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{rule.name}</p>
                    <div className="flex gap-1 mt-1">
                      {rule.dataTypes.map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {rule.type === '上报差额告警' ? (
                        <Bell className="w-4 h-4 text-orange-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-600">{rule.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rule.interval}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rule.scope}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{rule.threshold}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      rule.status === '启用' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${rule.status === '启用' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{rule.time}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-400 hover:text-[#4869F3]" title="编辑">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-400 hover:text-[#4869F3]" title="复制">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-400 hover:text-red-600" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rule Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">新增告警规则</h3>
                  <p className="text-sm text-gray-500">配置多维度阈值规则，实时捕捉数据异常</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Basic Info */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    基础信息
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">规则名称 <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="请输入规则名称" className="input-field w-full" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">告警类型 <span className="text-red-500">*</span></label>
                      <div className="flex bg-gray-100 p-1 rounded-md">
                        <button 
                          onClick={() => setAlarmType('diff')}
                          className={`flex-1 py-1.5 text-sm font-medium rounded transition-all ${alarmType === 'diff' ? 'bg-white shadow-sm text-[#4869F3]' : 'text-gray-500'}`}
                        >
                          上报差额告警
                        </button>
                        <button 
                          onClick={() => setAlarmType('timeout')}
                          className={`flex-1 py-1.5 text-sm font-medium rounded transition-all ${alarmType === 'timeout' ? 'bg-white shadow-sm text-[#4869F3]' : 'text-gray-500'}`}
                        >
                          超时未上报
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Scope */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    适用范围 (多条件取交集)
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">所属单位</label>
                      <select className="input-field w-full">
                        <option>全部单位</option>
                        <option>城北供电局</option>
                        <option>城南供电局</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">设备型号</label>
                      <input type="text" placeholder="请输入设备型号" className="input-field w-full" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">适用数据类型 <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-2">
                        {['量测数据', '图像数据', '地灾数据', '雷电数据'].map(t => (
                          <label key={t} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#4869F3] has-[:checked]:bg-blue-50">
                            <input type="checkbox" className="hidden" />
                            <span className="text-xs font-medium text-gray-600">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Threshold */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#4869F3] rounded-full"></div>
                    阈值设置
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">统计粒度 <span className="text-red-500">*</span></label>
                      <select className="input-field w-full">
                        <option>30分钟</option>
                        <option>60分钟</option>
                        <option>天</option>
                      </select>
                    </div>
                    
                    {alarmType === 'diff' ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">差额百分比阈值 (%) <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-3">
                          <input type="number" placeholder="下限" className="input-field w-full" />
                          <span className="text-gray-400">-</span>
                          <input type="number" placeholder="上限" className="input-field w-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">超时阈值 <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <input type="number" placeholder="请输入数值" className="input-field flex-1" />
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

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary">取消</button>
                <button onClick={() => setShowAddModal(false)} className="btn-primary">确认新增</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
