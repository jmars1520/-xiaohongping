import { useState } from "react";
import { ArrowLeft, MapPin, Phone, Plus, Trash2, AlertTriangle, Navigation, ChevronDown, MessageSquare } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

interface MyTasksProps {
  onBack: () => void;
}

interface PriceItem {
  id: number;
  type: string;
  form: string;
  weight: string;
  condition: string;
  qty: number;
  unitPrice: number;
}

const fireTypes = ["干粉灭火器", "CO₂灭火器", "水基灭火器", "泡沫灭火器"];
const forms = ["手提式", "推车式"];
const weights = ["1kg", "2kg", "3kg", "4kg", "5kg", "8kg", "35kg", "50kg"];
const conditions = ["完好", "过期", "损坏", "锈蚀"];

const mockTasks = [
  { id: "HY20260401001", status: "进行中", address: "朝阳区建国路88号", count: 120, isMultiSpec: true },
  { id: "HY20260330008", status: "待确认", address: "丰台区南三环西路16号", count: 85, isMultiSpec: false },
  { id: "HY20260325003", status: "已完成", address: "西城区金融大街19号", count: 200, isMultiSpec: true },
];

export default function MyTasks({ onBack }: MyTasksProps) {
  const [activeTab, setActiveTab] = useState("进行中");
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    { id: 1, type: "干粉灭火器", form: "手提式", weight: "4kg", condition: "过期", qty: 50, unitPrice: 5 },
    { id: 2, type: "干粉灭火器", form: "推车式", weight: "35kg", condition: "完好", qty: 10, unitPrice: 25 },
    { id: 3, type: "CO₂灭火器", form: "手提式", weight: "3kg", condition: "过期", qty: 40, unitPrice: 8 },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [priceRemark, setPriceRemark] = useState("");

  const tabs = ["进行中", "待确认", "已完成"];
  const filteredTasks = mockTasks.filter((t) => t.status === activeTab);

  const addPriceItem = () => {
    setPriceItems([
      ...priceItems,
      { id: Date.now(), type: "干粉灭火器", form: "手提式", weight: "4kg", condition: "完好", qty: 1, unitPrice: 5 },
    ]);
  };

  const removePriceItem = (id: number) => {
    if (priceItems.length > 1) {
      setPriceItems(priceItems.filter((item) => item.id !== id));
    }
  };

  const updatePriceItem = (id: number, field: keyof PriceItem, value: string | number) => {
    setPriceItems(priceItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const grandTotal = priceItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const totalQty = priceItems.reduce((sum, item) => sum + item.qty, 0);

  if (showPriceForm) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => setShowPriceForm(false)} className="p-1">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold">提交成交价格</h1>
        </div>

        {/* Original Order Info */}
        <div className="mx-4 mt-4 bg-blue-50 rounded-2xl p-4">
          <div className="text-sm font-semibold text-blue-700 mb-2">货源方原始清单</div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>干粉灭火器 · 手提式 · 4kg · 过期 × 50具</div>
            <div>干粉灭火器 · 推车式 · 35kg · 完好 × 10具</div>
            <div>CO₂灭火器 · 手提式 · 3kg · 过期 × 40具</div>
          </div>
        </div>

        {/* Price Items */}
        <div className="mx-4 mt-4 space-y-3">
          <div className="text-sm font-semibold text-gray-700">多规格分项报价</div>
          {priceItems.map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">规格 {index + 1}</span>
                {priceItems.length > 1 && (
                  <button onClick={() => removePriceItem(item.id)} className="text-gray-400 p-1">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">类型</label>
                  <div className="relative">
                    <select
                      value={item.type}
                      onChange={(e) => updatePriceItem(item.id, "type", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {fireTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">形式</label>
                  <div className="relative">
                    <select
                      value={item.form}
                      onChange={(e) => updatePriceItem(item.id, "form", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {forms.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">公斤数</label>
                  <div className="relative">
                    <select
                      value={item.weight}
                      onChange={(e) => updatePriceItem(item.id, "weight", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {weights.map((w) => <option key={w} value={w}>{w}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">状态</label>
                  <div className="relative">
                    <select
                      value={item.condition}
                      onChange={(e) => updatePriceItem(item.id, "condition", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">实际数量</label>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updatePriceItem(item.id, "qty", Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    min={1}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">协商单价(元)</label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updatePriceItem(item.id, "unitPrice", Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    min={0}
                  />
                </div>
              </div>

              <div className="mt-2 text-right text-xs text-gray-500">
                单项总价：<span className="text-blue-600 font-bold">¥{(item.qty * item.unitPrice).toLocaleString()}</span>
              </div>
            </div>
          ))}

          <button
            onClick={addPriceItem}
            className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-gray-500 text-sm hover:border-blue-300 hover:text-blue-500 transition"
          >
            <Plus size={16} />
            新增现场实际规格
          </button>

          {/* Summary */}
          <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">合计数量</span>
              <span className="font-bold text-gray-800">{totalQty} 具</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">整体成交总价</span>
              <span className="text-xl font-bold text-blue-600">¥{grandTotal.toLocaleString()}</span>
            </div>
            <div className="border-t border-blue-200 pt-3 mt-2">
              <label className="text-sm font-semibold text-blue-700 mb-2 block">最终确认回收总价格（元）</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 font-bold text-sm">¥</span>
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  placeholder="请输入最终确认的回收总价格"
                  className="w-full border-2 border-blue-300 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400"
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
              <MessageSquare size={14} className="text-blue-500" />
              备注
            </label>
            <textarea
              value={priceRemark}
              onChange={(e) => setPriceRemark(e.target.value)}
              placeholder="请输入备注信息（如现场情况说明、特殊事项等）"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg active:bg-blue-700 transition"
            >
              提交报价
            </button>
          ) : (
            <div className="text-center text-sm text-green-600 font-medium py-3">
              报价已提交，等待货源方确认
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">我的任务</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-gray-500 shadow-sm"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks */}
      <div className="px-4 pt-4 space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">{task.id}</span>
                <StatusBadge status={task.status} />
                {task.isMultiSpec && <StatusBadge status="多规格" />}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{task.address}</span>
              <span className="text-xs text-gray-400 ml-auto">{task.count}具</span>
            </div>

            {task.status === "进行中" && (
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-xs font-medium">
                  <Navigation size={14} />
                  导航
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-xs font-medium">
                  <Phone size={14} />
                  联系
                </button>
                <button
                  onClick={() => setShowPriceForm(true)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-medium"
                >
                  提交报价
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 border border-orange-200 text-orange-500 py-2 rounded-xl text-xs font-medium">
                  <AlertTriangle size={14} />
                  异常
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">暂无{activeTab}任务</div>
        )}
      </div>
    </div>
  );
}
