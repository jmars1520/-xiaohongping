import { useState } from "react";
import { ArrowLeft, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface OrderDetailProps {
  onBack: () => void;
}

const orderData = {
  totalQty: 120,
  estimatedPrice: 600, // 120具 × 5元/具
  confirmedPrice: 880, // 后台确认后的价格
  isPriceConfirmed: false, // 后台是否已确认价格
};

export default function OrderDetail({ onBack }: OrderDetailProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const isPriceConfirmed = confirmed || orderData.isPriceConfirmed;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">订单详情</h1>
      </div>

      {/* Status Banner */}
      {isPriceConfirmed ? (
        <div className="mx-4 mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-green-700">价格已确认</div>
            <div className="text-xs text-green-500 mt-0.5">后台已确认订单价格，货款已支付</div>
          </div>
        </div>
      ) : (
        <div className="mx-4 mt-4 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
            <Clock size={20} className="text-orange-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-orange-700">待客服定价</div>
            <div className="text-xs text-orange-500 mt-0.5">集货商已提交完整清单，等待后台客服定价</div>
          </div>
        </div>
      )}

      {/* Order Info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-3">订单信息</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">订单编号</span>
            <span className="text-gray-800 font-medium">HY20260401001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">发布模式</span>
            <span className="text-indigo-600 font-medium">精细发布 · 多规格</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">下单时间</span>
            <span className="text-gray-800">2026-04-01 14:30</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-medium text-gray-800">北京市朝阳区建国路88号SOHO现代城</div>
            <div className="text-xs text-gray-400 mt-1">联系人：张先生 138****8888</div>
          </div>
        </div>
      </div>

      {/* Price Info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-3">价格信息</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">总数量</span>
            <span className="text-sm font-bold text-gray-800">{orderData.totalQty} 具</span>
          </div>
          {isPriceConfirmed ? (
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-xs text-green-600 mb-1">订单总金额（后台已确认）</div>
              <div className="text-2xl font-bold text-green-600">¥{orderData.confirmedPrice.toLocaleString()}</div>
            </div>
          ) : (
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-xs text-orange-600 mb-1">订单预估价格</div>
              <div className="text-2xl font-bold text-orange-500">¥{orderData.estimatedPrice.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">按4kg干粉灭火器 × {orderData.totalQty}具 × 5元/具 估算，最终价格以后台确认为准</div>
            </div>
          )}
        </div>
      </div>

      {/* Collector Info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-3">集货商信息</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              李
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">李师傅回收</div>
              <div className="text-xs text-gray-400">服务评分 4.8 · 已完成328单</div>
            </div>
          </div>
          <button className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
            <Phone size={16} className="text-green-600" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      {isPriceConfirmed && !confirmed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
          <button className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium text-sm">
            申请客服介入
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium text-sm"
          >
            同意并确认
          </button>
        </div>
      )}

      {!isPriceConfirmed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <button className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl font-medium text-sm">
            取消订单
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-800 text-center mb-2">确认订单金额</h3>
            <p className="text-sm text-gray-500 text-center mb-2">后台已确认订单价格，确认后平台将支付货款</p>
            <div className="text-center text-3xl font-bold text-red-500 my-4">¥{orderData.confirmedPrice.toLocaleString()}</div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm font-medium"
              >
                取消
              </button>
              <button
                onClick={() => { setShowConfirmModal(false); setConfirmed(true); }}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium"
              >
                确认同意
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
