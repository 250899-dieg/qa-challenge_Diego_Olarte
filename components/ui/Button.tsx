import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Intent = 'primary' | 'secondary';
type Size = 'md' | 'icon';

const baseStyles =
  'inline-flex items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand.sky disabled:opacity-60';

const intentMap: Record<Intent, string> = {
  primary: 'bg-brand.sky text-white border-brand.sky shadow-card',
  secondary: 'bg-white text-brand.sky border-brand.sky/40'
};

const sizeMap: Record<Size, string> = {
  md: 'px-6 py-3 text-sm font-semibold',
  icon: 'p-3'
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: Intent;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent = 'primary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={twMerge(clsx(baseStyles, intentMap[intent], sizeMap[size], className))}
      {...props}
    />
  )
);

Button.displayName = 'Button';
