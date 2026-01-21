import airportsJson from './airports.json';

export type Airport = {
  code: string;
  name: string;
  city: string;
};

const AIRPORTS: Airport[] = airportsJson;

export function listAirports(): Airport[] {
  return AIRPORTS;
}

export function findAirport(code: string): Airport | undefined {
  return AIRPORTS.find((airport) => airport.code === code.toUpperCase());
}
