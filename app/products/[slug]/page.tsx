import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import  {formatPrice}  from "@/lib/format";

async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return notFound();

  return (
        <div className="rounded-lg border p-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500">{product.category.name}</p>
          <h1 className="font-semibold">{product.name}</h1>
          <p>{product.description}</p>
          <p>{formatPrice(product.price)}</p>
          <p>{product.stock>0 ? `${product.stock} in Stock` : "Out of Stock"}</p>
        </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-200" />}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}