import { FlightOption } from '@/data/flights';
import { BookNowOverlay } from '@/components/results/BookNowOverlay';
import { Button } from '@/components/ui/Button';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function FlightCard({ flight }: { flight: FlightOption }) {
  const price = priceFormatter.format(flight.price);
  const durationHours = Math.floor(flight.durationMinutes / 60);
  const durationMinutes = flight.durationMinutes % 60;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white/90 p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">{flight.airline}</p>
          <p className="text-2xl font-semibold text-neutral-900">
            {flight.origin} → {flight.destination}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-neutral-500">Duration</p>
          <p className="text-lg font-semibold text-neutral-900">
            {durationHours}h {durationMinutes}m
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="text-sm text-neutral-600">
          <p>Depart: {flight.departureDate}</p>
          {flight.returnDate && <p>Return: {flight.returnDate}</p>}
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-neutral-500">Price</p>
          <p className="text-2xl font-semibold text-brand.sky">{price}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <Button intent="secondary">Book Flight</Button>
      </div>
      <BookNowOverlay />
    </article>
  );
}
