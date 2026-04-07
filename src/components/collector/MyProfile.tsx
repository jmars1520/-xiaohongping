import { ArrowLeft, User, Truck, MapPin, Shield, FileCheck, Camera, CreditCard, ChevronRight, ArrowRightLeft } from "lucide-react";

interface MyProfileProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onSwitchToSupplier?: () => void;
}

export default function MyProfile({ onBack, onNavigate, onSwitchToSupplier }: MyProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">我的资料</h1>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            李
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow">
            <Camera size={14} className="text-white" />
          </button>
        </div>
        <div className="mt-3 text-lg font-bold text-gray-800">李师傅回收</div>
        <div className="flex items-center gap-1 mt-1">
          <Shield size={14} className="text-green-500" />
          <span className="text-xs text-green-600 font-medium">已认证集货商</span>
        </div>
      </div>

      {/* Certification Info */}
      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileCheck size={16} className="text-blue-500" />
            认证信息
          </div>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">姓名</span>
            <span className="text-sm text-gray-800">李明</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">身份证号</span>
            <span className="text-sm text-gray-800">110***********8899</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">联系电话</span>
            <span className="text-sm text-gray-800">139****6666</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">认证状态</span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">已认证</span>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Truck size={16} className="text-blue-500" />
            车辆信息
          </div>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">车牌号</span>
            <span className="text-sm text-gray-800">京A·12345</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">车辆类型</span>
            <span className="text-sm text-gray-800">小型货车</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">载重量</span>
            <span className="text-sm text-gray-800">2吨</span>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            服务区域
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {["朝阳区", "海淀区", "丰台区", "西城区", "东城区"].map((area) => (
              <span key={area} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                {area}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400 text-center">
            服务区域由平台管理员统一配置，如需调整请联系管理员
          </div>
        </div>
      </div>

      {/* Payment Account */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => onNavigate?.("collectorPaymentAccount")}
          className="w-full px-4 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">收款账户</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">2个账户</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User size={16} className="text-blue-500" />
            服务数据
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-50 py-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">328</div>
            <div className="text-xs text-gray-500 mt-1">完成订单</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">4.8</div>
            <div className="text-xs text-gray-500 mt-1">服务评分</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">98%</div>
            <div className="text-xs text-gray-500 mt-1">好评率</div>
          </div>
        </div>
      </div>
      {/* Switch to Supplier */}
      <div className="mx-4 mt-4 mb-6">
        <button
          onClick={onSwitchToSupplier}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 rounded-2xl py-3.5 text-center text-sm text-white font-medium shadow-sm flex items-center justify-center gap-2"
        >
          <ArrowRightLeft size={16} />
          切换到供货端
        </button>
      </div>
    </div>
  );
}
