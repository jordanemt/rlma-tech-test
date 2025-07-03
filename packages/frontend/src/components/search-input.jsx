import classNames from 'classnames';
import { Search } from 'lucide-react';
import { forwardRef } from 'react';

const SearchInput = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className={classNames('relative', className)}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
        <div className="bg-gray-100 p-3 rounded-xl">
          <Search className="w-5 h-4 text-gray-400 " />
        </div>
      </span>
      <input
        ref={ref}
        type="text"
        placeholder="Search"
        className={classNames(
          'h-12 pl-13 pr-4 py-2 w-full rounded-xl border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition',
          error ? 'border-red-500' : ''
        )}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">{error}</span>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
