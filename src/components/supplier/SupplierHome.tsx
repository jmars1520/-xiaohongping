import { Flame, ChevronRight, Recycle, TrendingUp, Truck, Play } from "lucide-react";

interface SupplierHomeProps {
  onNavigate: (page: string) => void;
}


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

      {/* Promo Video */}
      <div className="mx-4 mt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">回收业务介绍</span>
          <span className="text-xs text-gray-400">了解更多</span>
        </div>
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-sm aspect-video relative">
          {/* Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-3 border-2 border-white/40">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
            <div className="text-white font-bold text-base">小红瓶再生 · 回收业务宣传</div>
            <div className="text-white/70 text-xs mt-1">点击播放视频 · 02:30</div>
          </div>
          {/* Video Progress Bar Placeholder */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full w-0 bg-white rounded-full" />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400 text-center">了解灭火器合规回收全流程</div>
      </div>
    </div>
  );
}
