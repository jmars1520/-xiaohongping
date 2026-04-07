interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  待接单: "bg-yellow-100 text-yellow-700",
  进行中: "bg-blue-100 text-blue-700",
  待确认价格: "bg-orange-100 text-orange-700",
  价格争议中: "bg-red-100 text-red-700",
  已完成: "bg-green-100 text-green-700",
  已取消: "bg-gray-100 text-gray-500",
  待结算: "bg-purple-100 text-purple-700",
  小单: "bg-amber-100 text-amber-700",
  多规格: "bg-indigo-100 text-indigo-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass = statusColors[status] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
}
