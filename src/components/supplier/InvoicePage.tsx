import { useState } from "react";
import { ArrowLeft, FileText, Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface InvoicePageProps {
  onBack: () => void;
}

interface Invoice {
  id: string;
  orderId: string;
  amount: string;
  date: string;
  status: "pending" | "issued" | "failed";
  type: string;
}

const mockInvoices: Invoice[] = [
  { id: "INV20260402001", orderId: "HY20260401001", amount: "¥880", date: "2026-04-02", status: "pending", type: "增值税普通发票" },
  { id: "INV20260330001", orderId: "HY20260330002", amount: "¥510", date: "2026-03-30", status: "pending", type: "增值税普通发票" },
  { id: "INV20260325001", orderId: "HY20260325003", amount: "¥1,600", date: "2026-03-25", status: "issued", type: "增值税专用发票" },
  { id: "INV20260315001", orderId: "HY20260315005", amount: "¥1,200", date: "2026-03-15", status: "issued", type: "增值税普通发票" },
];

const statusConfig = {
  pending: { label: "待开票", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
  issued: { label: "已开票", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  failed: { label: "开票失败", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
};

export default function InvoicePage({ onBack }: InvoicePageProps) {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { key: "all", label: "全部" },
    { key: "pending", label: "待开票" },
    { key: "issued", label: "已开票" },
  ];

  const filteredInvoices = activeTab === "all" ? mockInvoices : mockInvoices.filter((inv) => inv.status === activeTab);
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (showApplyForm) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => setShowApplyForm(false)} className="p-1">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold">申请开票</h1>
        </div>

        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">发票类型</label>
            <div className="flex gap-2">
              <button className="flex-1 border-2 border-red-500 text-red-500 py-2 rounded-xl text-sm font-medium">增值税普通发票</button>
              <button className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-xl text-sm font-medium">增值税专用发票</button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">发票抬头</label>
            <input defaultValue="北京消防器材有限公司" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">税号</label>
            <input placeholder="请输入纳税人识别号" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">接收邮箱</label>
            <input placeholder="请输入邮箱地址" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">开票金额</label>
            <div className="bg-red-50 rounded-xl px-4 py-3 text-lg font-bold text-red-500">¥1,390.00</div>
          </div>
        </div>

        <div className="mx-4 mt-4">
          <button
            onClick={() => setShowApplyForm(false)}
            className="w-full bg-red-500 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg"
          >
            提交申请
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
        <h1 className="text-lg font-semibold flex-1">发票管理</h1>
        <button onClick={() => setShowApplyForm(true)} className="text-xs text-red-500 font-medium">申请开票</button>
      </div>

      {/* Summary */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-xs text-gray-500">待开票金额</div>
          <div className="text-xl font-bold text-orange-500 mt-1">¥1,390</div>
          <div className="text-xs text-gray-400 mt-1">2笔</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-xs text-gray-500">已开票金额</div>
          <div className="text-xl font-bold text-green-500 mt-1">¥2,800</div>
          <div className="text-xs text-gray-400 mt-1">2笔</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              activeTab === tab.key ? "bg-red-500 text-white" : "bg-white text-gray-500 shadow-sm"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Invoice List */}
      <div className="px-4 pt-4 space-y-3">
        {filteredInvoices.map((invoice) => {
          const config = statusConfig[invoice.status];
          const StatusIcon = config.icon;
          return (
            <div key={invoice.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <FileText size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{invoice.type}</div>
                    <div className="text-xs text-gray-400 mt-0.5">订单 {invoice.orderId}</div>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.color} ${config.bg}`}>
                  <StatusIcon size={12} />
                  {config.label}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                <span className="text-xs text-gray-400">{invoice.date}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-800">{invoice.amount}</span>
                  {invoice.status === "issued" && (
                    <button className="text-xs text-blue-500 flex items-center gap-0.5">
                      <Download size={12} />
                      下载
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
