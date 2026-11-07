export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}