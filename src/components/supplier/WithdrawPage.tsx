import { useState } from "react";
import { ArrowLeft, ArrowUpRight, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

interface WithdrawPageProps {
  onBack: () => void;
}

const bankAccounts = [
  { id: 1, bank: "招商银行", number: "****6789", type: "对私", isDefault: true },
  { id: 2, bank: "工商银行", number: "****3456", type: "对公", isDefault: false },
];

const quickAmounts = [100, 500, 1000, 2000, 2580];

export default function WithdrawPage({ onBack }: WithdrawPageProps) {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const balance = 2580;

  const handleWithdrawAll = () => {
    setAmount(String(balance));
  };

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0 || Number(amount) > balance) return;
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <div className="text-xl font-bold text-gray-800 mb-2">提现申请已提交</div>
        <div className="text-sm text-gray-500 text-center mb-2">
          提现金额：<span className="text-red-500 font-bold">¥{Number(amount).toLocaleString()}</span>
        </div>
        <div className="text-sm text-gray-500 text-center mb-6">
          到账账户：{bankAccounts.find(a => a.id === selectedAccount)?.bank} {bankAccounts.find(a => a.id === selectedAccount)?.number}
        </div>
        <div className="text-xs text-gray-400 text-center mb-8">预计1-3个工作日内到账，请注意查收</div>
        <button
          onClick={onBack}
          className="w-full bg-red-500 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg"
        >
          返回钱包
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">提现</h1>
      </div>

      {/* Balance Card */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white">
        <div className="text-sm text-red-200">可提现余额（元）</div>
        <div className="text-3xl font-bold mt-1">¥{balance.toLocaleString()}</div>
      </div>

      {/* Amount Input */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">提现金额</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-red-500">¥</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="请输入提现金额"
            className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-2xl font-bold text-gray-800 focus:outline-none focus:border-red-400 placeholder:text-base placeholder:font-normal placeholder:text-gray-300"
            min={0}
            max={balance}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">最低提现金额 ¥1.00</span>
          <button onClick={handleWithdrawAll} className="text-xs text-red-500 font-medium">
            全部提现
          </button>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {quickAmounts.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(String(q > balance ? balance : q))}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                amount === String(q)
                  ? "bg-red-500 text-white"
                  : "bg-red-50 text-red-500 border border-red-100"
              }`}
            >
              ¥{q.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Bank Account Selection */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-1">
          <CreditCard size={14} className="text-red-500" />
          到账银行卡
        </label>
        <div className="space-y-2">
          {bankAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition ${
                selectedAccount === account.id
                  ? "border-red-400 bg-red-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <CreditCard size={18} className="text-red-500" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    {account.bank} {account.number}
                  </div>
                  <div className="text-xs text-gray-400">{account.type}账户</div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedAccount === account.id
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}>
                {selectedAccount === account.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="mx-4 mt-4 bg-orange-50 rounded-2xl p-4 flex gap-2">
        <AlertCircle size={16} className="text-orange-400 mt-0.5 shrink-0" />
        <div className="text-xs text-orange-600 space-y-1">
          <div>提现将在1-3个工作日内到账</div>
          <div>每日最多可提现3次，单次最高50,000元</div>
          <div>如遇问题请联系客服：400-888-8888</div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button
          onClick={handleSubmit}
          disabled={!amount || Number(amount) <= 0 || Number(amount) > balance}
          className={`w-full py-3.5 rounded-xl font-semibold text-base shadow-lg flex items-center justify-center gap-2 transition ${
            amount && Number(amount) > 0 && Number(amount) <= balance
              ? "bg-red-500 text-white active:bg-red-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ArrowUpRight size={18} />
          确认提现{amount && Number(amount) > 0 ? ` ¥${Number(amount).toLocaleString()}` : ""}
        </button>
      </div>
    </div>
  );
}
