import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Category, Product } from "@/types";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.name);

  return <CategoryContent category={category} products={products} />;
}

function CategoryContent({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const t = useTranslations("Products");

  return (
    <>
      <Navbar />
      <section className="w-full py-12">
        <div className="container mx-auto px-4 py-4 md:py-6 md:px-8">
          <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium">{t("noProducts")}</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
