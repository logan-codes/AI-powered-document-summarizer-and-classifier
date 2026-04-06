export default function DraftLoading() {
  return (
    <div className="flex h-screen overflow-hidden w-full bg-gray-50">
      <div className="flex-1 h-full p-4 sm:p-6 flex flex-col items-center">
        {/* Editor Skeleton */}
        <div className="bg-white shadow border w-full max-w-4xl min-h-[800px] p-4 sm:p-8 animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
      </div>
      {/* Sidebar Skeleton (Visible on Desktop) */}
      <div className="hidden lg:flex flex-col w-[320px] bg-gray-100 border-l animate-pulse p-4 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-16 bg-white rounded shadow-sm" />
        <div className="h-24 bg-white rounded shadow-sm" />
        <div className="h-16 bg-white rounded shadow-sm" />
      </div>
    </div>
  );
}
