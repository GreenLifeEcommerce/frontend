import { getTranslations } from "next-intl/server";
import { getOrdersByUser } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function OrderHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("OrderHistory");
  const orders = await getOrdersByUser();

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-10">
        <main className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("title")}</h1>
          
          {/* Container với viền xanh (border-blue-500) */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border-2 border-blue-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-50 text-blue-900 uppercase text-sm">
                  <tr>
                    <th className="p-5 font-semibold">{t("orderId")}</th>
                    <th className="p-5 font-semibold">Sản phẩm</th>
                    <th className="p-5 font-semibold">{t("date")}</th>
                    <th className="p-5 font-semibold">{t("total")}</th>
                    <th className="p-5 font-semibold">{t("status")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-5 font-medium text-blue-600">#{order.id}</td>
                      
                      {/* Chỉ hiển thị tên sản phẩm, không có ảnh */}
                      <td className="p-5">
                        <span className="font-medium text-gray-800">{order.productName}</span>
                      </td>

                      <td className="p-5 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString(locale)}
                      </td>
                      
                      <td className="p-5 font-bold text-gray-900">
                        {order.totalPrice.toLocaleString()}đ
                      </td>

                      <td className="p-5">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {t(`status_${order.status}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}