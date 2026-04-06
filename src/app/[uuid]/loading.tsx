export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        {/* Title skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        {/* Button skeleton */}
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full border border-gray-200 rounded-lg bg-white shadow-sm p-4 space-y-4">
          <div className="h-10 border-b border-gray-100 bg-gray-100/50 rounded w-full animate-pulse" />
          <div className="h-12 bg-gray-50 rounded w-full animate-pulse" />
          <div className="h-12 bg-gray-50 rounded w-full animate-pulse" />
          <div className="h-12 bg-gray-50 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
