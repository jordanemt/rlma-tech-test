import { forwardRef } from 'react';
import classNames from 'classnames';

const Checkbox = forwardRef(({ checked, label, className, ...props }, ref) => (
  <label
    className={classNames(
      'flex items-center gap-3 cursor-pointer select-none',
      className
    )}
  >
    <span className="relative inline-flex items-center justify-center w-6 h-6">
      <input
        type="checkbox"
        checked={checked}
        ref={ref}
        className="cursor-pointer peer appearance-none w-6 h-6 border border-gray-300 rounded-md bg-white checked:bg-teal-400 checked:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
        {...props}
      />
      <svg
        className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline
          points="5 11 9 15 15 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span className="font-semibold text-gray-900">{label}</span>
  </label>
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
