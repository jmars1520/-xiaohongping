import { Flame, ChevronRight, Recycle, TrendingUp, Truck, ShieldCheck } from "lucide-react";

interface SupplierHomeProps {
  onNavigate: (page: string) => void;
}

const mockOrders = [
  { id: "HY20260401001", status: "进行中", count: 120, date: "2026-04-02" },
  { id: "HY20260330002", status: "待确认价格", count: 85, date: "2026-03-30" },
];

export default function SupplierHome({ onNavigate }: SupplierHomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-1">
          <Flame size={24} />
          <h1 className="text-xl font-bold">小红瓶再生</h1>
        </div>
        <p className="text-red-100 text-sm mb-6">报废灭火器合规回收平台</p>

        {/* Main CTA */}
        <button
          onClick={() => onNavigate("createOrder")}
          className="w-full bg-white text-red-500 rounded-2xl py-4 px-6 flex items-center justify-between shadow-lg active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <Truck size={24} className="text-red-500" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">预约回收</div>
              <div className="text-sm text-gray-500">一键下单，上门回收</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Guide Price */}
      <div className="mx-4 -mt-3 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-red-500" />
            <span className="text-sm font-semibold text-gray-700">今日指导价</span>
          </div>
          <span className="text-xs text-gray-400">仅供参考</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">干粉灭火器</div>
            <div className="text-red-500 font-bold">3-8 <span className="text-xs font-normal">元/具</span></div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">CO₂灭火器</div>
            <div className="text-orange-500 font-bold">5-15 <span className="text-xs font-normal">元/具</span></div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">水基灭火器</div>
            <div className="text-amber-500 font-bold">2-6 <span className="text-xs font-normal">元/具</span></div>
          </div>
        </div>
      </div>

      {/* Environmental Contribution */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Recycle size={16} className="text-green-600" />
          <span className="text-sm font-semibold text-gray-700">我的环保贡献</span>
        </div>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">326</div>
            <div className="text-xs text-gray-500 mt-0.5">累计回收(具)</div>
          </div>
          <div className="w-px bg-green-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1.2</div>
            <div className="text-xs text-gray-500 mt-0.5">减碳(吨)</div>
          </div>
          <div className="w-px bg-green-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-xs text-gray-500 mt-0.5">完成订单</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">近期订单</span>
          <button onClick={() => onNavigate("orders")} className="text-xs text-red-500 flex items-center gap-0.5">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => onNavigate("orderDetail")}
              className="w-full bg-white rounded-xl p-4 shadow-sm text-left flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-gray-800">{order.id}</div>
                <div className="text-xs text-gray-400 mt-1">{order.date} · {order.count}具</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  order.status === "进行中"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-orange-100 text-orange-600"
                }`}>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mx-4 mt-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">合规处理</div>
              <div className="text-xs text-gray-400 mt-0.5">全程可追溯</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
              <Recycle size={20} className="text-green-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">环保回收</div>
              <div className="text-xs text-gray-400 mt-0.5">绿色再生</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
