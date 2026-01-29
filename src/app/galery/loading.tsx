export default function Loading() {
    return (
        <main className="min-h-screen w-full gradienteGaleria flex items-center justify-center p-6">
            <div className="w-full max-w-5xl animate-pulse space-y-8">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="h-10 w-48 rounded-xl bg-gray-300/60" />
                    <div className="h-10 w-32 rounded-xl bg-gray-300/60" />
                </div>

                {/* Hero Skeleton */}
                <div className="h-64 w-full rounded-3xl bg-gray-300/60" />

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 w-full rounded-2xl bg-gray-300/60"
                        />
                    ))}
                </div>

                {/* Text Skeleton */}
                <div className="space-y-3">
                    <div className="h-4 w-full rounded-full bg-gray-300/60" />
                    <div className="h-4 w-5/6 rounded-full bg-gray-300/60" />
                    <div className="h-4 w-4/6 rounded-full bg-gray-300/60" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex justify-center pt-6">
                    <div className="h-6 w-40 rounded-full bg-gray-300/60" />
                </div>
            </div>
        </main>
    );
}
