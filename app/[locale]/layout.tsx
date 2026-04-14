import type { Metadata } from "next";
import "../globals.css";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Green Life - Sản phẩm thân thiện môi trường",
  description: "Cửa hàng cung cấp các sản phẩm bền vững và bảo vệ hành tinh.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <CartProvider>
              {children}
              <Analytics />
            </CartProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
