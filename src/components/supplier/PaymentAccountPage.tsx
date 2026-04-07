import { useState } from "react";
import { ArrowLeft, Building2, User, Plus, CheckCircle2, CreditCard } from "lucide-react";

interface PaymentAccountPageProps {
  onBack: () => void;
}

interface Account {
  id: number;
  type: "corporate" | "personal";
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
}

const mockAccounts: Account[] = [
  { id: 1, type: "corporate", bankName: "招商银行", accountNumber: "****6789", accountHolder: "北京消防器材有限公司", isDefault: true },
  { id: 2, type: "personal", bankName: "工商银行", accountNumber: "****3456", accountHolder: "张先生", isDefault: false },
];

export default function PaymentAccountPage({ onBack }: PaymentAccountPageProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [accountType, setAccountType] = useState<"corporate" | "personal">("corporate");

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => setShowAddForm(false)} className="p-1">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold">添加收款账户</h1>
        </div>

        {/* Account Type Toggle */}
        <div className="mx-4 mt-4 bg-white rounded-xl p-1 flex shadow-sm">
          <button
            onClick={() => setAccountType("corporate")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              accountType === "corporate" ? "bg-red-500 text-white shadow" : "text-gray-500"
            }`}
          >
            对公账户
          </button>
          <button
            onClick={() => setAccountType("personal")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              accountType === "personal" ? "bg-red-500 text-white shadow" : "text-gray-500"
            }`}
          >
            对私账户
          </button>
        </div>

        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm space-y-4">
          {accountType === "corporate" ? (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">公司名称</label>
                <input placeholder="请输入公司全称" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">开户银行</label>
                <input placeholder="请输入开户银行" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">银行账号</label>
                <input placeholder="请输入银行账号" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">开户行支行</label>
                <input placeholder="请输入开户行支行名称" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">持卡人姓名</label>
                <input placeholder="请输入持卡人姓名" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">开户银行</label>
                <input placeholder="请输入开户银行" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">银行卡号</label>
                <input placeholder="请输入银行卡号" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">手机号码</label>
                <input placeholder="请输入预留手机号" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
            </>
          )}
        </div>

        <div className="mx-4 mt-4">
          <button
            onClick={() => setShowAddForm(false)}
            className="w-full bg-red-500 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg active:bg-red-600 transition"
          >
            保存账户
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">收款账户</h1>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {mockAccounts.map((account) => (
          <div key={account.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  account.type === "corporate" ? "bg-blue-50" : "bg-purple-50"
                }`}>
                  {account.type === "corporate"
                    ? <Building2 size={20} className="text-blue-500" />
                    : <User size={20} className="text-purple-500" />
                  }
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{account.bankName}</div>
                  <div className="text-xs text-gray-400">{account.type === "corporate" ? "对公" : "对私"} · {account.accountNumber}</div>
                </div>
              </div>
              {account.isDefault && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} />
                  默认
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CreditCard size={12} />
              {account.accountHolder}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-gray-500 text-sm hover:border-red-300 hover:text-red-500 transition"
        >
          <Plus size={16} />
          添加收款账户
        </button>
      </div>
    </div>
  );
}
