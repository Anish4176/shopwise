import { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import  formatPrice  from "@/lib/format";

async function ProductList() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg border p-3">
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
      ))}
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopwise</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </main>
  );
}