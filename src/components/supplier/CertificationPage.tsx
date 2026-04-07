import { ArrowLeft, CheckCircle2, Building2, FileCheck, Upload, Clock } from "lucide-react";

interface CertificationPageProps {
  onBack: () => void;
}

interface CertItem {
  label: string;
  value: string;
  verified: boolean;
}

const certInfo: CertItem[] = [
  { label: "企业名称", value: "北京消防器材有限公司", verified: true },
  { label: "统一社会信用代码", value: "91110105MA01XXXX", verified: true },
  { label: "法定代表人", value: "张明", verified: true },
  { label: "注册地址", value: "北京市朝阳区建国路88号", verified: true },
  { label: "经营范围", value: "消防器材销售、消防工程", verified: true },
  { label: "认证时间", value: "2026-01-15", verified: true },
];

const documents = [
  { name: "营业执照", status: "verified", uploadDate: "2026-01-15" },
  { name: "法人身份证（正面）", status: "verified", uploadDate: "2026-01-15" },
  { name: "法人身份证（反面）", status: "verified", uploadDate: "2026-01-15" },
  { name: "危废经营许可证", status: "optional", uploadDate: "" },
];

export default function CertificationPage({ onBack }: CertificationPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">企业认证</h1>
      </div>

      {/* Status Banner */}
      <div className="mx-4 mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} className="text-green-500" />
        </div>
        <div>
          <div className="text-sm font-semibold text-green-700">企业认证已通过</div>
          <div className="text-xs text-green-600 mt-0.5">认证有效期至 2027-01-15</div>
        </div>
      </div>

      {/* Company Info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
          <Building2 size={16} className="text-red-500" />
          <span className="text-sm font-semibold text-gray-700">企业信息</span>
        </div>
        <div className="px-4 py-3 space-y-3">
          {certInfo.map((item) => (
            <div key={item.label} className="flex items-start justify-between">
              <span className="text-sm text-gray-500 shrink-0">{item.label}</span>
              <div className="flex items-center gap-1.5 text-right">
                <span className="text-sm text-gray-800">{item.value}</span>
                {item.verified && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
          <FileCheck size={16} className="text-red-500" />
          <span className="text-sm font-semibold text-gray-700">认证材料</span>
        </div>
        <div className="px-4 py-3 space-y-3">
          {documents.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  doc.status === "verified" ? "bg-green-50" : "bg-gray-50"
                }`}>
                  {doc.status === "verified"
                    ? <CheckCircle2 size={16} className="text-green-500" />
                    : <Upload size={16} className="text-gray-400" />
                  }
                </div>
                <div>
                  <div className="text-sm text-gray-800">{doc.name}</div>
                  {doc.status === "verified" ? (
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {doc.uploadDate}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 mt-0.5">选填</div>
                  )}
                </div>
              </div>
              {doc.status === "verified" ? (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">已验证</span>
              ) : (
                <button className="text-xs text-blue-500 bg-blue-50 px-3 py-1 rounded-full font-medium">上传</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mx-4 mt-4 bg-amber-50 rounded-2xl p-4">
        <div className="text-xs text-amber-700 font-medium mb-1">温馨提示</div>
        <div className="text-xs text-amber-600">
          企业认证信息变更请联系客服处理。认证到期前30天系统将自动提醒续期。
        </div>
      </div>
    </div>
  );
}
