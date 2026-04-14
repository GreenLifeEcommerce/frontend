"use client";

import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

/**
 * The hero section of the homepage, which displays a title, a
 * descriptive paragraph, and a call-to-action button.
 */
const HeroSection = () => {
  const t = useTranslations("Hero");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
      {/* The content container */}
      <div className="flex flex-col items-center gap-4 text-center">
        {/* The heading and paragraph */}
        <div className="space-y-2 px-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            {t("description")}
          </p>
        </div>

        {/* The call-to-action button */}
        <div className="mt-4">
          <Button asChild size="lg">
            <Link href="/products">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
