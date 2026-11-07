import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ category?: string }>;


export function CategoryFilter({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<div className="mb-6 h-6" />}>
      <CategoryLinks searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryLinks({ searchParams }: { searchParams: SearchParams }) {
  await connection();
  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <nav className="mb-6 flex gap-4">
      <Link href="/" className={!category ? "font-bold" : ""}>
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/?category=${c.slug}`}
          className={category === c.slug ? "font-bold" : ""}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}