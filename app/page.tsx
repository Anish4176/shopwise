import { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import  {formatPrice}  from "@/lib/format";
import { connection } from "next/server";
import Link from "next/link";
import { ProductList } from "@/components/products/product-list";
import { ProductListSkeleton } from "@/components/products/product-list-skeleton";
import { CategoryFilter } from "@/components/products/category-filter";


export default function HomePage({searchParams,}:{
  searchParams:Promise<{category?:string}>
}) {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopwise</h1>
      <Suspense fallback={<div className="mb-6 h-6" />}>
        <CategoryFilter searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}