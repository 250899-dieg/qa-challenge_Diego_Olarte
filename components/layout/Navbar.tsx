import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-brand.sky/10 p-2">
            <span className="text-brand.sky text-lg font-semibold">✈︎</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Skyline</p>
            <p className="text-xl font-semibold text-neutral-900">Skyways</p>
          </div>
        </Link>
        <span className="text-xs font-medium text-neutral-500">
          QA Flight Management Challenge
        </span>
      </div>
    </header>
  );
}
