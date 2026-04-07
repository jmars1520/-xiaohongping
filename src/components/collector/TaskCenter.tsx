import { MapPin, Clock, Package, ChevronRight, Bell } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

interface TaskCenterProps {
  onNavigate: (page: string) => void;
}

const pendingTasks = [
  {
    id: "HY20260401001",
    address: "朝阳区建国路88号SOHO现代城",
    distance: "3.2km",
    count: 120,
    isMultiSpec: true,
    isSmall: false,
    estimatedPrice: "¥360 - ¥960",
    publishTime: "2小时前",
  },
  {
    id: "HY20260401006",
    address: "海淀区中关村大街1号",
    distance: "8.5km",
    count: 35,
    isMultiSpec: false,
    isSmall: true,
    estimatedPrice: "¥105 - ¥280",
    publishTime: "30分钟前",
  },
  {
    id: "HY20260401007",
    address: "西城区金融大街19号富凯大厦",
    distance: "5.1km",
    count: 200,
    isMultiSpec: true,
    isSmall: false,
    estimatedPrice: "¥600 - ¥1,600",
    publishTime: "1小时前",
  },
];

export default function TaskCenter({ onNavigate }: TaskCenterProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold">任务中心</h1>
          <button className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Bell size={18} />
          </button>
        </div>
        <p className="text-blue-200 text-sm mb-6">平台派单，优质货源</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">3</div>
            <div className="text-xs text-blue-200">待接任务</div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">2</div>
            <div className="text-xs text-blue-200">进行中</div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold">328</div>
            <div className="text-xs text-blue-200">已完成</div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="px-4 mt-4">
        <div className="text-sm font-semibold text-gray-700 mb-3">待接任务</div>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onNavigate("myTasks")}
              className="w-full bg-white rounded-2xl p-4 shadow-sm text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{task.id}</span>
                  {task.isMultiSpec && <StatusBadge status="多规格" />}
                  {task.isSmall && <StatusBadge status="小单" />}
                </div>
                <span className="text-xs text-gray-400">{task.publishTime}</span>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={14} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600 truncate">{task.address}</span>
                <span className="text-xs text-blue-500 font-medium shrink-0">{task.distance}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Package size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{task.count}具</span>
                  </div>
                  <span className="text-sm font-medium text-red-500">{task.estimatedPrice}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-500">
                  <span className="text-xs font-medium">接单</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mx-4 mt-4 bg-blue-50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={14} className="text-blue-500" />
          <span className="text-xs font-medium text-blue-700">接单提示</span>
        </div>
        <p className="text-xs text-blue-600">
          小单需选择预计上门日期，建议合理规划路线，提高回收效率
        </p>
      </div>
    </div>
  );
}
