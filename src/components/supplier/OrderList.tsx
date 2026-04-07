import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

interface OrderListProps {
  onBack: () => void;
  onViewDetail: () => void;
}

const mockOrders = [
  { id: "HY20260401001", status: "进行中", type: "精细发布", count: 120, total: "¥960", date: "2026-04-02", tags: ["多规格"] },
  { id: "HY20260330002", status: "平台估价中", type: "简易发布", count: 85, total: "¥255 - ¥680", date: "2026-03-30", tags: [] },
  { id: "HY20260328006", status: "待用户确认", type: "精细发布", count: 60, total: "¥510", date: "2026-03-28", tags: ["多规格"] },
  { id: "HY20260325003", status: "已完成", type: "精细发布", count: 200, total: "¥1,600", date: "2026-03-25", tags: ["多规格"] },
  { id: "HY20260320004", status: "待接单", type: "简易发布", count: 30, total: "¥90 - ¥240", date: "2026-03-20", tags: ["小单"] },
  { id: "HY20260315005", status: "已完成", type: "简易发布", count: 150, total: "¥1,200", date: "2026-03-15", tags: [] },
];

export default function OrderList({ onBack, onViewDetail }: OrderListProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold flex-1">我的订单</h1>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl flex items-center gap-2 px-4 py-2.5 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="搜索订单号"
            className="flex-1 text-sm focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-4 flex gap-2 overflow-x-auto">
        {["全部", "待接单", "进行中", "平台估价中", "待用户确认", "已完成"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              i === 0 ? "bg-red-500 text-white" : "bg-white text-gray-500 shadow-sm"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="px-4 pt-4 space-y-3">
        {mockOrders.map((order) => (
          <button
            key={order.id}
            onClick={onViewDetail}
            className="w-full bg-white rounded-2xl p-4 shadow-sm text-left"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-gray-800">{order.id}</span>
                <span className="ml-2 text-xs text-gray-400">{order.type}</span>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-400">{order.date}</div>
                <div className="text-xs text-gray-400">{order.count}具</div>
                {order.tags.map((tag) => (
                  <StatusBadge key={tag} status={tag} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-red-500">{order.total}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
