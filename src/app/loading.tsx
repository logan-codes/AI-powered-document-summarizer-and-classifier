export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white animate-pulse">
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl bg-slate-200 aspect-[16/9] md:aspect-[21/9] w-full" />
        </section>

        {/* Features Section Skeleton */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="h-10 bg-slate-200 rounded w-1/3" />
            <div className="h-6 bg-slate-200 rounded w-2/3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <article
                key={i}
                className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200 h-[200px]"
              >
                <div className="h-10 w-10 bg-slate-200 rounded-lg mb-4" />
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-full mb-1" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
              </article>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer Skeleton */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-4">
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-1/4" />
        </div>
      </footer>
    </div>
  );
}
