import { getAllProducts, getProductById } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import { useTranslations } from "next-intl";
import { Product } from "@/types";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return notFound();

  return <ProductContent product={product} />;
}

function ProductContent({ product }: { product: Product }) {
  const t = useTranslations("ProductDetail");

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-[80vh] py-12">
        <div className="container mx-auto px-4 py-4 md:py-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-sm">
            {/* The product image */}
            <div className="relative aspect-square w-full">
              <Image
                src={product.image || "/placeholder/400x400.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* The product details */}
            <div className="flex flex-col space-y-6 justify-center">
              <div>
                <p className="text-sm font-medium text-green-600 mb-2 uppercase tracking-wider">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
              </div>

              <p className="text-2xl text-gray-900 font-bold">
                {product.price.toLocaleString()}đ
              </p>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("description")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-4">
                <AddToCartButton
                  product={product}
                  className="w-full md:w-auto px-12 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
