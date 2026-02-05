"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-6">
          <div className="max-w-3xl w-full rounded-3xl bg-white shadow-xl p-10 md:p-14 text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            </div>

            {/* Text */}
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Oops — something broke
            </h1>

            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              We hit an unexpected error while loading this page. Don’t worry —
              your data is safe. Try refreshing or go back.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-900 text-white px-6 py-3 hover:opacity-90 transition"
              >
                Try again
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50 transition"
              >
                Go home
              </button>
            </div>

            {/* Optional dev-only error */}
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-8 text-left bg-slate-100 p-4 rounded-xl text-xs text-slate-700 overflow-auto">
                {error.message}
              </pre>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
