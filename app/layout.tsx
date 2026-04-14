import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";

export const metadata: Metadata = {
	title: "Green Life - Sản phẩm thân thiện môi trường",
	description: "Cửa hàng cung cấp các sản phẩm bền vững và bảo vệ hành tinh.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body className={`antialiased`}>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	);
}
