import classNames from 'classnames';
import { forwardRef } from 'react';

const VARIANT_STYLES = {
  primary: 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50',
  ghost: 'bg-transparent hover:bg-indigo-50 focus:border-indigo-600',
};

const Button = forwardRef(
  (
    {
      className,
      isActive,
      isDisabled,
      children,
      variant = 'primary',
      rightIcon = null,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={classNames(
        VARIANT_STYLES[variant],
        'w-full flex items-center justify-center font-medium rounded-xl px-8 py-3 gap-2 transition border-2',
        isActive && 'ring-2 ring-indigo-600',
        isDisabled && 'opacity-50 cursor-not-allowed',
        'cursor-pointer border border-gray-200',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      <span className="flex-1 flex items-center justify-center">
        {children}
      </span>
      {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
