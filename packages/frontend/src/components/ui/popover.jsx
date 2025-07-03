import { useRef, useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames';

const Popover = forwardRef(
  ({ trigger, children, className, placement = 'bottom' }, ref) => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);
    const triggerRef = useRef(null);

    // Allow parent to access the popover DOM node if needed
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(popoverRef.current);
        } else {
          ref.current = popoverRef.current;
        }
      }
    }, [ref, open]);

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      }
      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open]);

    return (
      <div className={classNames('relative inline-block w-full', className)}>
        <span ref={triggerRef} onClick={() => setOpen((v) => !v)}>
          {trigger}
        </span>
        {open && (
          <div
            ref={popoverRef}
            className={classNames(
              'absolute z-50 min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 mt-2',
              placement === 'bottom' && 'left-0 top-full',
              placement === 'top' && 'left-0 bottom-full mb-2'
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = 'Popover';

export default Popover;
