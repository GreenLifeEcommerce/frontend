"use client";

import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export const OrderHistoryButton = () => {
  const t = useTranslations("Hero");

  return (
    <Button 
      asChild 
      variant="outline" 
      className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all"
    >
      <Link href="/profile/orders" className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        {t("orderHistory")}
        Lịch sử đơn hàng
      </Link>
    </Button>
  );
};