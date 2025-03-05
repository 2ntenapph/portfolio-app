export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
          <h1 className="text-5xl font-bold text-center text-red-600">404</h1>
          <p className="text-center text-[var(--foreground)] text-lg">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          {/* Go Home Link */}
          <a href="/" className="block w-full text-center px-4 py-2 text-white bg-[var(--primary)] rounded-md transition duration-300 hover:bg-[var(--highlight)]">
            Go Back Home
          </a>
        </div>
      </div>
    );
  }
  