export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card-white shadow-card" aria-hidden="true">
      <div className="aspect-square animate-pulse bg-gray-200" />
      <div className="flex flex-col gap-2.5 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-9 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  )
}
