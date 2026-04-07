import { Home, ClipboardList, Leaf, User } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (page: string) => void;
  role: "supplier" | "collector";
}

const supplierTabs = [
  { key: "home", label: "首页", icon: Home },
  { key: "orders", label: "订单", icon: ClipboardList },
  { key: "recycle", label: "再生中心", icon: Leaf },
  { key: "mine", label: "我的", icon: User },
];

const collectorTabs = [
  { key: "tasks", label: "任务中心", icon: Home },
  { key: "myTasks", label: "我的任务", icon: ClipboardList },
  { key: "income", label: "我的收入", icon: Leaf },
  { key: "profile", label: "我的资料", icon: User },
];

export default function BottomNav({ active, onNavigate, role }: BottomNavProps) {
  const tabs = role === "supplier" ? supplierTabs : collectorTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.key)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? (role === "collector" ? "text-blue-600" : "text-red-500") : "text-gray-400"
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
            <span className="text-xs mt-0.5 font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
