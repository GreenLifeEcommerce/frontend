import { Product, Category } from "@/types";

const products: Product[] = [
  {
    id: "1",
    name: "Ống hút tre tự nhiên",
    description:
      "Bộ 10 ống hút tre tự nhiên, có thể tái sử dụng nhiều lần, kèm cọ rửa.",
    price: 45000,
    image: "/placeholder/400x400.svg",
    category: "Đồ gia dụng",
  },
  {
    id: "2",
    name: "Bình nước giữ nhiệt Inox 304",
    description:
      "Bình nước 500ml giữ nhiệt cực tốt, giúp giảm thiểu rác thải nhựa từ chai nước một lần.",
    price: 150000,
    image: "/placeholder/400x400.svg",
    category: "Phụ kiện",
  },
  {
    id: "3",
    name: "Túi vải Canvas đi chợ",
    description:
      "Túi vải Canvas bền đẹp, chịu lực tốt, thay thế hoàn toàn túi nilon.",
    price: 35000,
    image: "/placeholder/400x400.svg",
    category: "Phụ kiện",
  },
  {
    id: "4",
    name: "Bàn chải tre kháng khuẩn",
    description:
      "Bàn chải làm từ tre tự nhiên, lông bàn chải mềm mại, phân hủy sinh học.",
    price: 25000,
    image: "/placeholder/400x400.svg",
    category: "Cá nhân",
  },
  {
    id: "5",
    name: "Hộp cơm bã mía",
    description:
      "Bộ 50 hộp cơm làm từ bã mía, an toàn cho sức khỏe, tự phân hủy hoàn toàn.",
    price: 120000,
    image: "/placeholder/400x400.svg",
    category: "Đồ gia dụng",
  },
  {
    id: "6",
    name: "Xà bông thảo mộc handmade",
    description:
      "Xà bông làm từ tinh dầu tự nhiên, không hóa chất độc hại, bao bì giấy tái chế.",
    price: 65000,
    image: "/placeholder/400x400.svg",
    category: "Cá nhân",
  },
  {
    id: "7",
    name: "Lót ly gỗ bần",
    description:
      "Bộ 4 lót ly làm từ gỗ bần tự nhiên, chống thấm và cách nhiệt tốt.",
    price: 40000,
    image: "/placeholder/400x400.svg",
    category: "Trang trí",
  },
  {
    id: "8",
    name: "Sổ tay giấy tái chế",
    description:
      "Sổ tay được làm hoàn toàn từ giấy tái chế, thân thiện với môi trường.",
    price: 55000,
    image: "/placeholder/400x400.svg",
    category: "Văn phòng",
  },
];

const categories: Category[] = [
  {
    id: "1",
    name: "Đồ gia dụng",
    slug: "do-gia-dung",
    image: "/placeholder/300x300.svg",
  },
  {
    id: "2",
    name: "Phụ kiện",
    slug: "phu-kien",
    image: "/placeholder/300x300.svg",
  },
  {
    id: "3",
    name: "Cá nhân",
    slug: "ca-nhan",
    image: "/placeholder/300x300.svg",
  },
  {
    id: "4",
    name: "Trang trí",
    slug: "trang-tri",
    image: "/placeholder/300x300.svg",
  },
  {
    id: "5",
    name: "Văn phòng",
    slug: "van-phong",
    image: "/placeholder/300x300.svg",
  },
];

/**
 * Retrieves all products.
 * @returns {Product[]} An array of all product objects.
 */
export function getAllProducts(): Product[] {
  // Return the list of all products
  return products;
}

/**
 * Retrieves the first 4 products from the list.
 * @returns {Product[]} An array of the first 4 product objects.
 */
export function getFeaturedProducts(): Product[] {
  // Return the first 4 products
  return products.slice(0, 4);
}

/**
 * Retrieves a product by its unique identifier.
 * @param {string} id - The unique identifier of the product.
 * @returns {Product | undefined} The product object if found, otherwise undefined.
 */
export function getProductById(id: string): Product | undefined {
  // Find and return the product with the matching id
  return products.find((product) => product.id === id);
}

/**
 * Retrieves all categories.
 * @returns {Category[]} An array of all category objects.
 */
export function getAllCategories(): Category[] {
  // Return the list of all categories
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  // Find and return the category with the matching slug
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((product) => product.category === categoryName);
}
