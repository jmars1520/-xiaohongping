import { useState } from "react";
import { X, Smartphone, Shield, ChevronRight } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<"auth" | "success">("auth");
  const [agreed, setAgreed] = useState(false);

  const handleWechatAuth = () => {
    if (!agreed) return;
    setStep("success");
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-t-3xl animate-slide-up">
        {step === "auth" ? (
          <div className="px-6 pt-6 pb-8">
            {/* Close Button */}
            <div className="flex justify-end">
              <button onClick={onClose} className="p-1 text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Logo & Title */}
            <div className="flex flex-col items-center mt-2 mb-8">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">再</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">登录小红瓶再生</h2>
              <p className="text-sm text-gray-500 mt-1">登录后可提交回收订单</p>
            </div>

            {/* WeChat Phone Auth Button */}
            <button
              onClick={handleWechatAuth}
              disabled={!agreed}
              className={`w-full py-3.5 rounded-xl text-base font-medium flex items-center justify-center gap-2 transition-all ${
                agreed
                  ? "bg-green-500 text-white shadow-sm active:bg-green-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Smartphone size={18} />
              微信手机号快捷登录
            </button>

            {/* Phone Number Login */}
            <button className="w-full mt-3 py-3 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 flex items-center justify-center gap-2">
              <Smartphone size={16} />
              其他手机号登录
              <ChevronRight size={14} />
            </button>

            {/* Agreement */}
            <div className="flex items-start gap-2 mt-6">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  agreed ? "bg-red-500 border-red-500" : "border-gray-300"
                }`}
              >
                {agreed && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <p className="text-xs text-gray-400 leading-relaxed">
                我已阅读并同意
                <span className="text-red-500">《用户服务协议》</span>
                和
                <span className="text-red-500">《隐私政策》</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 pt-10 pb-12 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">登录成功</h3>
            <p className="text-sm text-gray-500 mt-1">138****8888</p>
            <div className="mt-4 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">正在跳转...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
