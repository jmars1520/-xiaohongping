import { ArrowLeft, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MyIncomeProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const weeklyData = [
  { day: "周一", amount: 45 },
  { day: "周二", amount: 72 },
  { day: "周三", amount: 36 },
  { day: "周四", amount: 90 },
  { day: "周五", amount: 54 },
  { day: "周六", amount: 0 },
  { day: "周日", amount: 0 },
];

const recentIncomes = [
  { id: "HY20260401001", count: 120, fee: 360, date: "2026-04-02", status: "已结算" },
  { id: "HY20260330002", count: 85, fee: 255, date: "2026-03-30", status: "待结算" },
  { id: "HY20260325003", count: 200, fee: 600, date: "2026-03-25", status: "已结算" },
  { id: "HY20260320004", count: 30, fee: 90, date: "2026-03-20", status: "已结算" },
];

export default function MyIncome({ onBack, onNavigate }: MyIncomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">我的收入</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/15 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp size={14} className="text-blue-200" />
              <span className="text-xs text-blue-200">今日收入</span>
            </div>
            <div className="text-2xl font-bold">¥90</div>
            <div className="text-xs text-blue-200 mt-1">30具 × 3元</div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-1 mb-2">
              <Wallet size={14} className="text-blue-200" />
              <span className="text-xs text-blue-200">本月收入</span>
            </div>
            <div className="text-2xl font-bold">¥1,305</div>
            <div className="text-xs text-blue-200 mt-1">435具 × 3元</div>
          </div>
        </div>

        <div className="mt-3 bg-white/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-200">待结算金额</span>
            <span className="text-lg font-bold ml-2">¥255</span>
          </div>
          <button
            onClick={() => onNavigate?.("collectorWithdraw")}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
          >
            提现 <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-4">本周收入趋势</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#ccc" />
            <YAxis tick={{ fontSize: 12 }} stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income Details */}
      <div className="mx-4 mt-4">
        <div className="text-sm font-semibold text-gray-700 mb-3">收入明细</div>
        <div className="space-y-3">
          {recentIncomes.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-medium text-gray-800">{item.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.status === "已结算"
                    ? "bg-green-100 text-green-600"
                    : "bg-purple-100 text-purple-600"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{item.date}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">+¥{item.fee}</div>
                  <div className="text-xs text-gray-400">{item.count}具 × 3元</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
