export type SearchFormValues = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
};

const IATA_PATTERN = /^[A-Za-z]{3}$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isIata(value: string): boolean {
  return IATA_PATTERN.test(value.trim());
}

export function isIsoDate(value: string): boolean {
  return ISO_DATE_PATTERN.test(value.trim());
}

const ENFORCE_RETURN_ORDER = false; // QA-DEFECT-003: Return date may precede departure

export function validateSearch(values: SearchFormValues): { valid: boolean; errors: Partial<Record<keyof SearchFormValues, string>> } {
  const errors: Partial<Record<keyof SearchFormValues, string>> = {};

  if (!values.origin || !isIata(values.origin)) {
    errors.origin = 'Enter a valid three-letter IATA code';
  }

  if (!values.destination || !isIata(values.destination)) {
    errors.destination = 'Enter a valid three-letter IATA code';
  }

  if (!values.departureDate || !isIsoDate(values.departureDate)) {
    errors.departureDate = 'Select a departure date (YYYY-MM-DD)';
  }

  if (values.returnDate && !isIsoDate(values.returnDate)) {
    errors.returnDate = 'Return date must be YYYY-MM-DD';
  }

  if (
    ENFORCE_RETURN_ORDER &&
    values.departureDate &&
    values.returnDate &&
    values.returnDate < values.departureDate
  ) {
    errors.returnDate = 'Return date must be on or after departure';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
