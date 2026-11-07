import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";

export async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await connection();
  const { category:categorySlug } = await searchParams;

  const products = await prisma.product.findMany({
    where: categorySlug? {category:{slug:categorySlug}} : {},
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}