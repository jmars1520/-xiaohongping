import { Wallet, FileText, CreditCard, Star, ChevronRight, Settings, HelpCircle, LogOut, Shield, ArrowRightLeft, Smartphone } from "lucide-react";

interface MyPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  isCollector?: boolean;
  onSwitchToCollector?: () => void;
  onLogin?: () => void;
}

const menuItems = [
  { icon: Wallet, label: "我的钱包", badge: "¥2,580", color: "text-red-500", bg: "bg-red-50", page: "wallet" },
  { icon: CreditCard, label: "收款账户", badge: "", color: "text-blue-500", bg: "bg-blue-50", page: "paymentAccount" },
  { icon: FileText, label: "发票管理", badge: "2张待开", color: "text-orange-500", bg: "bg-orange-50", page: "invoices" },
  { icon: Star, label: "我的评价", badge: "", color: "text-yellow-500", bg: "bg-yellow-50", page: "reviews" },
  { icon: Shield, label: "企业认证", badge: "已认证", color: "text-green-500", bg: "bg-green-50", page: "certification" },
];

const settingsItems = [
  { icon: Settings, label: "设置" },
  { icon: HelpCircle, label: "帮助与反馈" },
];

export default function MyPage({ onNavigate, isLoggedIn, isCollector, onSwitchToCollector, onLogin }: MyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                张
              </div>
              <div>
                <div className="text-lg font-bold">北京消防器材有限公司</div>
                <div className="text-red-200 text-sm mt-0.5">张先生 · 138****8888</div>
              </div>
            </>
          ) : (
            <button onClick={onLogin} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Smartphone size={28} className="text-white/80" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">点击登录</div>
                <div className="text-red-200 text-sm mt-0.5">登录后查看更多信息</div>
              </div>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">5</div>
            <div className="text-xs text-red-200">总订单</div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">326</div>
            <div className="text-xs text-red-200">回收数(具)</div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">¥2.6k</div>
            <div className="text-xs text-red-200">总收入</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                idx < menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center`}>
                <Icon size={18} className={item.color} />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
              {item.badge && (
                <span className="text-xs text-gray-500 mr-1">{item.badge}</span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          );
        })}
      </div>

      {/* Settings */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {settingsItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                idx < settingsItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center">
                <Icon size={18} className="text-gray-500" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          );
        })}
      </div>

      {/* Collector Entrance - only shown if user is designated as collector and logged in */}
      {isLoggedIn && isCollector && (
        <div className="mx-4 mt-4">
          <button
            onClick={onSwitchToCollector}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl py-3.5 text-center text-sm text-white font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowRightLeft size={16} />
            切换到集货商端
          </button>
        </div>
      )}

      {/* Logout */}
      {isLoggedIn && (
        <div className="mx-4 mt-4">
          <button className="w-full bg-white rounded-2xl py-3 text-center text-sm text-red-500 font-medium shadow-sm flex items-center justify-center gap-2">
            <LogOut size={16} />
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
