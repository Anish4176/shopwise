import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: {
    slug: string;
    name: string;
    price: number;
    images: string[];
    category: { name: string };
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="rounded-lg border p-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={600}
          height={600}
          className="rounded-md"
        />
        <p className="mt-2 text-sm text-gray-500">{product.category.name}</p>
        <h2 className="font-semibold">{product.name}</h2>
        <p>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}