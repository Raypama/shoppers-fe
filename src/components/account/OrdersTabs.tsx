"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { tabs, statusTabMap } from "@/lib/orderStatus";

type Props = {
  orders: any[];
};

export default function OrderTabs({ orders }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "all";

  function changeTab(tab: string) {
    router.push(`/account?tab=${tab}`);
  }

  // 🔢 hitung jumlah order per tab
  const tabCount = tabs.reduce((acc: any, tab) => {
    if (tab.key === "all") {
      acc[tab.key] = orders.length;
    } else {
      acc[tab.key] = orders.filter(
        (o) => statusTabMap[o.status] === tab.key
      ).length;
    }
    return acc;
  }, {});

  return (
    <div className="flex gap-6 border-b mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => changeTab(tab.key)}
          className={`pb-3 text-sm font-medium border-b-2 transition
            ${
              activeTab === tab.key
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-500"
            }`}
        >
          {tab.label}
          {tabCount[tab.key] > 0 && (
            <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
              {tabCount[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
