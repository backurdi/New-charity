export default function Loading() {
  return (
    <div className="bg-background-two min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-3xl overflow-hidden bg-gray-100">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-12 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
