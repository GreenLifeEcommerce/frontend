export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[]; // Bạn có thể chi tiết hơn tùy vào schema
}