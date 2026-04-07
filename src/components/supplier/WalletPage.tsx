import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

interface WalletPageProps {
  onBack: () => void;
}

const transactions = [
  { id: 1, type: "income", label: "订单 HY20260401001 货款", amount: "+¥880", date: "2026-04-02 14:30", status: "已到账" },
  { id: 2, type: "income", label: "订单 HY20260325003 货款", amount: "+¥1,600", date: "2026-03-25 10:15", status: "已到账" },
  { id: 3, type: "withdraw", label: "提现到招商银行 ****6789", amount: "-¥1,500", date: "2026-03-20 09:00", status: "已完成" },
  { id: 4, type: "income", label: "订单 HY20260315005 货款", amount: "+¥1,200", date: "2026-03-15 16:45", status: "已到账" },
  { id: 5, type: "withdraw", label: "提现到招商银行 ****6789", amount: "-¥600", date: "2026-03-10 11:20", status: "已完成" },
];

export default function WalletPage({ onBack }: WalletPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">我的钱包</h1>
        </div>

        <div className="text-center mb-2">
          <div className="text-red-200 text-sm">账户余额（元）</div>
          <div className="text-4xl font-bold mt-2">2,580.00</div>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="mx-4 -mt-3 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-xs text-gray-500">累计收入</div>
          <div className="text-xl font-bold text-red-500 mt-1">¥5,680</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-xs text-gray-500">累计提现</div>
          <div className="text-xl font-bold text-gray-700 mt-1">¥2,100</div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">交易记录</span>
          <button className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            全部
          </button>
        </div>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "income" ? "bg-green-50" : "bg-orange-50"
                  }`}>
                    {tx.type === "income"
                      ? <ArrowDownLeft size={14} className="text-green-500" />
                      : <ArrowUpRight size={14} className="text-orange-500" />
                    }
                  </div>
                  <div>
                    <div className="text-sm text-gray-800">{tx.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${tx.type === "income" ? "text-green-500" : "text-gray-700"}`}>
                    {tx.amount}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{tx.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
