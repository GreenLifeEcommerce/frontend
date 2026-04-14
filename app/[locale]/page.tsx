import { setRequestLocale } from "next-intl/server";
import Categories from "@/components/categories";
import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import NewsLetter from "@/components/news-letter";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <NewsLetter />
      <Footer />
    </>
  );
}
