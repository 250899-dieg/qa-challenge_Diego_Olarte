import { ResultsList } from '@/components/results/ResultsList';

interface ResultsPageProps {
  searchParams: {
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
  };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="rounded-3xl border border-neutral-100 bg-white/80 p-6 shadow-card">
        <h2 className="text-3xl font-semibold text-neutral-900">Flight Results</h2>
        <p className="text-sm text-neutral-600">
          Showing availability for {searchParams.origin ?? '???'} → {searchParams.destination ?? '???'} on{' '}
          {searchParams.departureDate ?? 'unspecified date'}.
        </p>
      </header>
      <ResultsList params={searchParams} />
    </div>
  );
}
