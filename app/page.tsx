import { listAirports } from '@/data/airports';
import { SearchForm } from '@/components/forms/SearchForm';

export default function HomePage() {
  const airports = listAirports();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section className="rounded-3xl border border-neutral-100 bg-white/80 p-8 shadow-card">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-brand.sky">
            Skyline Skyways
          </p>
          <h1 className="text-4xl font-semibold text-neutral-900">
            Flight Management QA Challenge
          </h1>
          <p className="text-base text-neutral-600">
            Enter any origin, destination, and departure date to explore mock itineraries.
            Remember: this MVP intentionally hides a few defects—capture everything you find.
          </p>
        </div>
      </section>
      <SearchForm airports={airports} />
    </div>
  );
}
