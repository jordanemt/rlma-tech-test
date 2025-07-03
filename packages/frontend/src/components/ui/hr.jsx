import { forwardRef } from 'react';
import classNames from 'classnames';

const COLOR_MAP = {
  teal: {
    lineR: 'bg-gradient-to-r from-transparent via-teal-300 to-teal-300',
    lineL: 'bg-gradient-to-l from-transparent via-teal-300 to-teal-300',
    text: 'border-teal-300 bg-teal-50/60 text-teal-600',
  },
  indigo: {
    lineR: 'bg-gradient-to-r from-transparent via-indigo-600 to-indigo-600',
    lineL: 'bg-gradient-to-l from-transparent via-indigo-600 to-indigo-600',
    text: 'border-indigo-600 bg-indigo-50/60 text-indigo-600',
  },
};

const Hr = forwardRef(
  ({ children, className, color = 'teal', ...props }, ref) => {
    const colorStyles = COLOR_MAP[color] || COLOR_MAP.teal;
    return (
      <div
        ref={ref}
        className={classNames('flex items-center w-full', className)}
        {...props}
      >
        <div
          className={classNames('flex-grow h-px opacity-70', colorStyles.lineR)}
        />
        {children && (
          <span
            className={classNames(
              'mx-4 px-4 py-1 font-semibold rounded-md border whitespace-nowrap text-base shadow-sm',
              colorStyles.text
            )}
          >
            {children}
          </span>
        )}
        <div
          className={classNames('flex-grow h-px opacity-70', colorStyles.lineL)}
        />
      </div>
    );
  }
);

Hr.displayName = 'Hr';

export default Hr;
