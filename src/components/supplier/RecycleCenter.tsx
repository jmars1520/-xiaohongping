import { Recycle, Leaf, Droplets, Wind, TreePine } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "1月", count: 45 },
  { month: "2月", count: 32 },
  { month: "3月", count: 68 },
  { month: "4月", count: 55 },
  { month: "5月", count: 80 },
  { month: "6月", count: 46 },
];

const typeData = [
  { name: "干粉", value: 180, color: "#ef4444" },
  { name: "CO₂", value: 85, color: "#f97316" },
  { name: "水基", value: 41, color: "#3b82f6" },
  { name: "泡沫", value: 20, color: "#22c55e" },
];

const tips = [
  { icon: Leaf, title: "灭火器为何要回收？", desc: "灭火器内含化学药剂，随意丢弃会污染土壤和水源" },
  { icon: Droplets, title: "干粉灭火器的危害", desc: "干粉中含磷酸铵盐，不当处理会造成水体富营养化" },
  { icon: Wind, title: "CO₂灭火器回收", desc: "高压气瓶需专业处理，避免爆炸风险" },
];

export default function RecycleCenter() {
  const totalRecycled = 326;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-1">
          <Recycle size={22} />
          <h1 className="text-xl font-bold">再生中心</h1>
        </div>
        <p className="text-green-100 text-sm mb-6">您的环保贡献，让地球更美好</p>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{totalRecycled}</div>
            <div className="text-xs text-green-100 mt-0.5">累计回收(具)</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">1.2</div>
            <div className="text-xs text-green-100 mt-0.5">减碳(吨)</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-green-100 mt-0.5">等同种树(棵)</div>
          </div>
        </div>
      </div>

      {/* Tree Icon */}
      <div className="flex justify-center -mt-5">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <TreePine size={20} className="text-white" />
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-4">月度回收趋势</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#ccc" />
            <YAxis tick={{ fontSize: 12 }} stroke="#ccc" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#22c55e" fill="url(#colorCount)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Type Distribution */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-4">回收类型分布</div>
        <div className="flex items-center">
          <ResponsiveContainer width="50%" height={140}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {typeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-gray-800">{item.value}具</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Knowledge Tips */}
      <div className="mx-4 mt-4 mb-4">
        <div className="text-sm font-semibold text-gray-700 mb-3">再生知识科普</div>
        <div className="space-y-3">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{tip.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{tip.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
