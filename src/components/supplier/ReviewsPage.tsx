import { ArrowLeft, Star, ThumbsUp, MessageSquare } from "lucide-react";

interface ReviewsPageProps {
  onBack: () => void;
}

interface Review {
  id: number;
  orderId: string;
  collectorName: string;
  rating: number;
  content: string;
  date: string;
  tags: string[];
  reply?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    orderId: "HY20260325003",
    collectorName: "李师傅回收",
    rating: 5,
    content: "非常专业，上门准时，价格公道。灭火器分类清点很细致，态度好，推荐！",
    date: "2026-03-26",
    tags: ["准时上门", "价格合理", "服务专业"],
    reply: "感谢您的认可，我们会继续提供优质服务！",
  },
  {
    id: 2,
    orderId: "HY20260315005",
    collectorName: "王师傅车队",
    rating: 4,
    content: "整体不错，就是等了一会儿才来，但清点和搬运很利索。",
    date: "2026-03-16",
    tags: ["搬运利索"],
  },
  {
    id: 3,
    orderId: "HY20260301010",
    collectorName: "张师傅回收",
    rating: 5,
    content: "第三次合作了，每次都很满意。200多具灭火器一个多小时就处理完了，效率很高。",
    date: "2026-03-02",
    tags: ["效率高", "多次合作", "值得信赖"],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage({ onBack }: ReviewsPageProps) {
  const avgRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white sticky top-0 z-40 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">我的评价</h1>
      </div>

      {/* Summary */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm text-center">
        <div className="text-3xl font-bold text-gray-800">{avgRating}</div>
        <div className="flex items-center justify-center mt-1">
          <StarRating rating={Math.round(Number(avgRating))} />
        </div>
        <div className="text-xs text-gray-400 mt-2">共 {mockReviews.length} 条评价</div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{mockReviews.filter((r) => r.rating >= 4).length}</div>
            <div className="text-xs text-gray-400">好评</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-500">{mockReviews.filter((r) => r.rating === 3).length}</div>
            <div className="text-xs text-gray-400">中评</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-500">{mockReviews.filter((r) => r.rating < 3).length}</div>
            <div className="text-xs text-gray-400">差评</div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="px-4 pt-4 space-y-3">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                  {review.collectorName[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{review.collectorName}</div>
                  <div className="text-xs text-gray-400">订单 {review.orderId}</div>
                </div>
              </div>
              <div className="text-right">
                <StarRating rating={review.rating} />
                <div className="text-xs text-gray-400 mt-0.5">{review.date}</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3">{review.content}</p>

            {review.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {review.tags.map((tag) => (
                  <span key={tag} className="bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-xs flex items-center gap-0.5">
                    <ThumbsUp size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {review.reply && (
              <div className="mt-3 bg-gray-50 rounded-xl p-3 flex items-start gap-2">
                <MessageSquare size={14} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 font-medium">集货商回复</div>
                  <div className="text-xs text-gray-600 mt-0.5">{review.reply}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
