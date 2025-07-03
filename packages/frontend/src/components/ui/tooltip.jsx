import { forwardRef, useState } from 'react';
import classNames from 'classnames';

const Tooltip = forwardRef(
  ({ content, children, className, placement = 'top', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <span
        ref={ref}
        className={classNames('relative inline-block w-full', className)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        {...props}
      >
        {children}
        {visible && (
          <span
            className={classNames(
              'absolute z-50 px-3 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap shadow transition-opacity',
              placement === 'top' &&
                'bottom-full left-1/2 -translate-x-1/2 mb-2',
              placement === 'bottom' &&
                'top-full left-1/2 -translate-x-1/2 mt-2',
              placement === 'left' &&
                'right-full top-1/2 -translate-y-1/2 mr-2',
              placement === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2'
            )}
          >
            {content}
          </span>
        )}
      </span>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
