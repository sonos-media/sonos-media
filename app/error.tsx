"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Une erreur s&apos;est produite
        </h1>
        <p className="text-secondary text-sm font-mono mb-6 p-4 bg-black/30 rounded overflow-auto max-h-40">
          {error.message}
        </p>
        {error.stack && (
          <details className="text-secondary text-xs font-mono mb-6 p-4 bg-black/30 rounded overflow-auto max-h-32">
            <summary className="cursor-pointer text-accent">Stack trace</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
          </details>
        )}
        <button
          onClick={reset}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-alt transition-colors font-medium"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
