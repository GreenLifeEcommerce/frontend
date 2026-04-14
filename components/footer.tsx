"use client";

import { useTranslations } from "next-intl";

/**
 * Footer component.
 */
function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      {/* Footer text */}
      <p className="text-center text-sm leading-loose text-muted-foreground">
        {t("copyright", { year })}
      </p>
    </footer>
  );
}

export default Footer;
