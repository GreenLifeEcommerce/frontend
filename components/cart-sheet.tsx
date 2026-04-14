import { ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useCart } from "@/hooks/use-cart";

/**
 * The `CartSheet` component is a sheet that can be opened with a trigger button
 * and contains a list of items in the cart. It also displays the subtotal of
 * the items and provides a link to checkout.
 *
 * When the cart is empty, it displays a message and a button to continue shopping.
 *
 * When the cart is not empty, it displays a list of items with their names,
 * prices and a button to remove them from the cart. It also displays the subtotal
 * of the items and provides a link to checkout.
 *
 * The `CartSheet` component is connected to the `useCart` hook, which provides
 * the items in the cart and functions to remove items and clear the cart.
 *
 * The `CartSheet` component is a higher-order component, which means it wraps
 * the provided `children` with a `Sheet` component.
 */
export default function CartSheet() {
  const { items, removeFromCart, clearCart } = useCart();

  const totalItems = items.length;
  const subtotal = items.reduce((total, item) => total + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Giỏ hàng ({totalItems})</SheetTitle>
        </SheetHeader>

        {totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">
                Giỏ hàng của bạn đang trống
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.
              </p>
            </div>
            <Button asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[65vh]">
              <div className="space-y-4 px-8 pt-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.price.toLocaleString()}đ
                      </p>
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Xóa</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Total */}
            <Separator />
            <div className="space-y-4 mt-4 px-8">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tổng cộng</span>
                <span className="font-medium">
                  {subtotal.toLocaleString()}đ
                </span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Phí vận chuyển và thuế sẽ được tính khi thanh toán.
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/checkout">Thanh toán</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => clearCart()}
                >
                  Xóa giỏ hàng
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
