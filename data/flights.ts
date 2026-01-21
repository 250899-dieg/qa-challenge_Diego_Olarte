import type { Airport } from './airports';

export type FlightOption = {
  id: string;
  origin: Airport['code'];
  destination: Airport['code'];
  airline: string;
  departureDate: string;
  returnDate?: string;
  durationMinutes: number;
  price: number;
};

const FLIGHTS: FlightOption[] = [
  {
    id: 'SKY-1001',
    origin: 'BOG',
    destination: 'MEX',
    airline: 'Skyline Skyways',
    departureDate: '2026-02-15',
    returnDate: '2026-02-20',
    durationMinutes: 275,
    price: 450
  },
  {
    id: 'SKY-1002',
    origin: 'MIA',
    destination: 'JFK',
    airline: 'Aurora Air',
    departureDate: '2026-02-16',
    returnDate: '2026-02-18',
    durationMinutes: 190,
    price: 210
  },
  {
    id: 'SKY-1003',
    origin: 'MEX',
    destination: 'MAD',
    airline: 'Continental Breeze',
    departureDate: '2026-03-01',
    returnDate: '2026-03-11',
    durationMinutes: 680,
    price: 730
  },
  {
    id: 'SKY-1004',
    origin: 'BOG',
    destination: 'GRU',
    airline: 'Skyline Skyways',
    departureDate: '2026-02-25',
    returnDate: '2026-03-05',
    durationMinutes: 340,
    price: -100 // QA-DEFECT-005 intentional negative fare
  },
  {
    id: 'SKY-1005',
    origin: 'JFK',
    destination: 'MIA',
    airline: 'Aurora Air',
    departureDate: '2026-02-22',
    returnDate: '2026-02-27',
    durationMinutes: 205,
    price: 230
  }
];

export type FlightFilters = {
  origin: string;
  destination: string;
  departureDate: string;
};

export function listFlights(filters: FlightFilters): FlightOption[] {
  const { origin, destination, departureDate } = filters;
  return FLIGHTS.filter((flight) =>
    flight.origin === origin &&
    flight.destination === destination &&
    (!departureDate || flight.departureDate === departureDate)
  );
}

export function findById(id: string): FlightOption | undefined {
  return FLIGHTS.find((flight) => flight.id === id);
}
