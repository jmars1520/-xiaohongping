import { useState } from "react";
import { ArrowLeft, Plus, Trash2, AlertTriangle, MapPin, Calendar, ChevronDown, Phone, MessageSquare, LocateFixed } from "lucide-react";

interface OrderCreateProps {
  onBack: () => void;
  onRequireLogin?: (callback: () => void) => void;
}

interface SpecItem {
  id: number;
  type: string;
  form: string;
  weight: string;
  condition: string;
  quantity: number;
}

const fireTypes = ["干粉灭火器", "CO₂灭火器", "水基灭火器", "泡沫灭火器"];
const forms = ["手提式", "推车式"];
const weights = ["1kg", "2kg", "3kg", "4kg", "5kg", "8kg", "35kg", "50kg"];
const conditions = ["完好", "过期", "损坏", "锈蚀"];

const provinces = ["北京市", "上海市", "广东省", "浙江省", "江苏省", "四川省", "湖北省", "山东省", "河南省", "福建省", "天津市", "重庆市"];
const cityMap: Record<string, string[]> = {
  "北京市": ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "通州区", "顺义区", "大兴区", "昌平区"],
  "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "浦东新区", "闵行区", "宝山区", "嘉定区"],
  "广东省": ["广州市", "深圳市", "东莞市", "佛山市", "珠海市", "中山市", "惠州市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市"],
  "江苏省": ["南京市", "苏州市", "无锡市", "常州市", "南通市"],
  "四川省": ["成都市", "绵阳市", "德阳市", "宜宾市"],
  "湖北省": ["武汉市", "宜昌市", "襄阳市", "荆州市"],
  "山东省": ["济南市", "青岛市", "烟台市", "潍坊市"],
  "河南省": ["郑州市", "洛阳市", "开封市", "南阳市"],
  "福建省": ["福州市", "厦门市", "泉州市", "漳州市"],
  "天津市": ["和平区", "河西区", "南开区", "河东区", "滨海新区"],
  "重庆市": ["渝中区", "江北区", "沙坪坝区", "九龙坡区", "南岸区"],
};
const districtMap: Record<string, string[]> = {
  "朝阳区": ["建国路", "朝阳北路", "三里屯", "望京", "CBD", "国贸"],
  "海淀区": ["中关村", "五道口", "西二旗", "学院路", "上地"],
  "西城区": ["金融大街", "西单", "新街口", "德胜门"],
  "东城区": ["王府井", "东直门", "崇文门", "安定门"],
  "丰台区": ["丰台科技园", "方庄", "南三环", "大红门"],
};

export default function OrderCreate({ onBack, onRequireLogin }: OrderCreateProps) {
  const [mode, setMode] = useState<"simple" | "detailed">("simple");
  const [simpleCount, setSimpleCount] = useState<string>("");
  const [specItems, setSpecItems] = useState<SpecItem[]>([
    { id: 1, type: "干粉灭火器", form: "手提式", weight: "4kg", condition: "过期", quantity: 30 },
  ]);
  const [showSmallOrderWarning, setShowSmallOrderWarning] = useState(false);
  const [province, setProvince] = useState("北京市");
  const [city, setCity] = useState("朝阳区");
  const [district, setDistrict] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [remark, setRemark] = useState("");
  const [showSubmitted, setShowSubmitted] = useState(false);

  const totalDetailedCount = specItems.reduce((sum, item) => sum + item.quantity, 0);
  const isSmallOrder = mode === "simple"
    ? Number(simpleCount) > 0 && Number(simpleCount) < 50
    : totalDetailedCount > 0 && totalDetailedCount < 50;

  const addSpec = () => {
    setSpecItems([
      ...specItems,
      { id: Date.now(), type: "干粉灭火器", form: "手提式", weight: "4kg", condition: "完好", quantity: 1 },
    ]);
  };

  const removeSpec = (id: number) => {
    if (specItems.length > 1) {
      setSpecItems(specItems.filter((item) => item.id !== id));
    }
  };

  const updateSpec = (id: number, field: keyof SpecItem, value: string | number) => {
    setSpecItems(specItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const doSubmit = () => {
    if (isSmallOrder) {
      setShowSmallOrderWarning(true);
      return;
    }
    setShowSubmitted(true);
  };

  const handleSubmit = () => {
    if (onRequireLogin) {
      onRequireLogin(doSubmit);
    } else {
      doSubmit();
    }
  };

  const confirmSmallOrder = () => {
    setShowSmallOrderWarning(false);
    setShowSubmitted(true);
  };

  if (showSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">订单提交成功!</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">平台将尽快为您匹配集货商，请耐心等待</p>
        <button onClick={onBack} className="bg-red-500 text-white px-8 py-3 rounded-xl font-medium">
          返回首页
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
        <h1 className="text-lg font-semibold">预约回收</h1>
      </div>

      {/* Mode Tabs */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-1 flex shadow-sm">
        <button
          onClick={() => setMode("simple")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === "simple" ? "bg-red-500 text-white shadow" : "text-gray-500"
          }`}
        >
          简易发布
        </button>
        <button
          onClick={() => setMode("detailed")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === "detailed" ? "bg-red-500 text-white shadow" : "text-gray-500"
          }`}
        >
          精细发布
        </button>
      </div>

      {mode === "simple" ? (
        /* Simple Mode */
        <div className="mx-4 mt-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <label className="text-sm font-semibold text-gray-700 block mb-3">预估总数量（具）</label>
            <input
              type="number"
              value={simpleCount}
              onChange={(e) => setSimpleCount(e.target.value)}
              placeholder="请输入灭火器数量"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
            />
            {Number(simpleCount) > 0 && (
              <div className="mt-4 bg-red-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">预估回收价格</div>
                <div className="text-2xl font-bold text-red-500 mt-1">
                  ¥{(Number(simpleCount) * 5).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">按4kg干粉灭火器 × {simpleCount}具 × 5元/具 估算</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Detailed Mode */
        <div className="mx-4 mt-4 space-y-3">
          {specItems.map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">规格 {index + 1}</span>
                {specItems.length > 1 && (
                  <button onClick={() => removeSpec(item.id)} className="text-gray-400 p-1">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">类型</label>
                  <div className="relative">
                    <select
                      value={item.type}
                      onChange={(e) => updateSpec(item.id, "type", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      {fireTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">形式</label>
                  <div className="relative">
                    <select
                      value={item.form}
                      onChange={(e) => updateSpec(item.id, "form", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      {forms.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">公斤数</label>
                  <div className="relative">
                    <select
                      value={item.weight}
                      onChange={(e) => updateSpec(item.id, "weight", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      {weights.map((w) => <option key={w} value={w}>{w}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">状态</label>
                  <div className="relative">
                    <select
                      value={item.condition}
                      onChange={(e) => updateSpec(item.id, "condition", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs text-gray-500 mb-1 block">数量（具）</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateSpec(item.id, "quantity", Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                  min={1}
                />
              </div>
              <div className="mt-2 text-right text-xs text-gray-500">
                预估价：<span className="text-red-500 font-medium">¥{(item.quantity * 3).toLocaleString()} - ¥{(item.quantity * 8).toLocaleString()}</span>
              </div>
            </div>
          ))}

          <button
            onClick={addSpec}
            className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-gray-500 text-sm hover:border-red-300 hover:text-red-500 transition"
          >
            <Plus size={16} />
            添加一种灭火器
          </button>

          {/* Detailed Summary */}
          <div className="bg-red-50 rounded-2xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">总数量</span>
              <span className="font-bold text-gray-800">{totalDetailedCount} 具</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">预估总价区间</span>
              <span className="font-bold text-red-500">
                ¥{(totalDetailedCount * 3).toLocaleString()} - ¥{(totalDetailedCount * 8).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Address & Time */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <MapPin size={14} className="text-red-500" />
              回收地址
            </label>
            <button className="flex items-center gap-1 text-xs text-red-500 font-medium bg-red-50 px-2.5 py-1.5 rounded-lg active:bg-red-100 transition">
              <LocateFixed size={14} />
              获取当前位置
            </button>
          </div>
          {/* Province / City / District */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="relative">
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  const cities = cityMap[e.target.value] || [];
                  setCity(cities[0] || "");
                  setDistrict("");
                }}
                className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setDistrict("");
                }}
                className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="">请选择</option>
                {(cityMap[province] || []).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-xs appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="">请选择</option>
                {(districtMap[city] || []).map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <input
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="请输入详细地址（楼栋、门牌号等）"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
            <Phone size={14} className="text-red-500" />
            联系方式
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="联系人姓名"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="联系电话"
              type="tel"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </div>

        {/* Appointment Time */}
        <div>
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
            <Calendar size={14} className="text-red-500" />
            预约时间
          </label>
          <input
            type="date"
            defaultValue="2026-04-05"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
            <MessageSquare size={14} className="text-red-500" />
            备注
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="请输入备注信息（如特殊要求、上门时间偏好等）"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3.5 rounded-xl font-semibold text-base shadow-lg active:bg-red-600 transition"
        >
          提交订单
        </button>
      </div>

      {/* Small Order Warning Modal */}
      {showSmallOrderWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={20} className="text-amber-500" />
              <h3 className="font-bold text-gray-800">小单提示</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              您的订单数量不足50具，属于小单。小单可能延迟3-5天上门回收，请知悉。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSmallOrderWarning(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm font-medium"
              >
                返回修改
              </button>
              <button
                onClick={confirmSmallOrder}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
