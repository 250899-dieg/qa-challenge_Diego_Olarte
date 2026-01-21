import clsx from 'clsx';

type DatePickerProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
  error?: string;
};

export function DatePicker({ id, name, label, value, onChange, optional, error }: DatePickerProps) {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-600" htmlFor={id}>
        {label} {optional && <span className="text-xs text-neutral-400">Optional</span>}
      </label>
      {/* QA-DEFECT-003: No chronology guard ties this picker to departure date */}
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        className={clsx(
          'mt-2 w-full rounded-2xl border px-4 py-3 text-base shadow-sm focus:border-brand.sky focus:outline-none',
          error ? 'border-red-400' : 'border-neutral-200'
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
