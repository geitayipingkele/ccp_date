'use client';

import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Database,
  Share2,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

const mockTraceData = [
  { 
    id: 'MSG_20240320_001', 
    deviceId: 'SN20240301001', 
    receiveTime: '2024-03-20 10:00:05', 
    processTime: '2024-03-20 10:00:08', 
    dispatchTime: '2024-03-20 10:00:12',
    target: '城北生产管理系统',
    status: '成功',
    count: 1,
    receiveToProcess: '3s',
    processToDispatch: '4s',
    total: '7s'
  },
  { 
    id: 'MSG_20240320_002', 
    deviceId: 'SN20240301001', 
    receiveTime: '2024-03-20 10:30:12', 
    processTime: '2024-03-20 10:30:15', 
    dispatchTime: '2024-03-20 10:30:25',
    target: '城北生产管理系统',
    status: '失败',
    count: 3,
    receiveToProcess: '3s',
    processToDispatch: '10s',
    total: '13s'
  },
];

export default function TraceabilityPage() {
  const [selectedMsg, setSelectedMsg] = useState(mockTraceData[0]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">数据链条溯源</h2>
        <p className="text-gray-500 mt-1">追踪单条数据从平台接收、处理到分发的全生命周期轨迹</p>
      </div>

      {/* Search Section */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">设备ID <span className="text-red-500">*</span></label>
            <input type="text" placeholder="请输入设备SN或ID" className="input-field w-full" defaultValue="SN20240301001" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">消息ID (选填)</label>
            <input type="text" placeholder="请输入消息唯一标识" className="input-field w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">时间范围 <span className="text-red-500">*</span></label>
            <input type="date" className="input-field w-full" />
          </div>
          <div className="flex items-end gap-3">
            <button className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> 溯源查询
            </button>
            <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> 重置
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <Info className="w-3 h-3" />
          <span>支持查询近3个月内的设备上报数据链路轨迹。</span>
        </div>
      </div>

      {/* Traceability Visualization */}
      <div className="card p-8">
        <div className="flex justify-between items-center mb-12">
          <h3 className="font-bold text-gray-900">全链路轨迹图</h3>
          <div className="text-sm text-gray-500">
            消息ID: <span className="font-mono text-[#4869F3]">{selectedMsg.id}</span>
          </div>
        </div>

        <div className="relative flex justify-between items-start max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gray-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: selectedMsg.status === '成功' ? '100%' : '50%' }}
              className={`h-full ${selectedMsg.status === '成功' ? 'bg-[#4869F3]' : 'bg-red-400'}`}
            />
          </div>

          {/* Node 1: Receive */}
          <div className="flex flex-col items-center gap-4 bg-white px-4">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center border-2 border-[#4869F3] shadow-lg shadow-blue-100">
              <Database className="w-8 h-8 text-[#4869F3]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">平台接收</p>
              <p className="text-xs text-gray-500 mt-1">{selectedMsg.receiveTime}</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded">已接收</span>
            </div>
          </div>

          <div className="pt-8 text-gray-300">
            <div className="text-[10px] font-bold text-gray-400 mb-1 text-center">耗时: {selectedMsg.receiveToProcess}</div>
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
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded">处理成功</span>
            </div>
          </div>

          <div className="pt-8 text-gray-300">
            <div className="text-[10px] font-bold text-gray-400 mb-1 text-center">耗时: {selectedMsg.processToDispatch}</div>
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
                {selectedMsg.status} (分发{selectedMsg.count}次)
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

      {/* Trace Log Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">溯源记录列表</h3>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-1 px-3">导出轨迹</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">消息ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">接收时间</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">分发目标</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">分发次数</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">总耗时</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTraceData.map((msg) => (
                <tr 
                  key={msg.id} 
                  onClick={() => setSelectedMsg(msg)}
                  className={`cursor-pointer transition-colors ${selectedMsg.id === msg.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-900">{msg.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{msg.receiveTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{msg.target}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {msg.status === '成功' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${msg.status === '成功' ? 'text-green-600' : 'text-red-600'}`}>{msg.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">{msg.count}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold text-right">{msg.total}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#4869F3] text-sm font-bold hover:underline">查看轨迹</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
