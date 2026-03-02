import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', wrapperClassName = '', ...props }, ref) => {
        return (
            <div className={`relative flex items-center w-full max-w-md ${wrapperClassName}`}>

                {/* Search Icon */}
                <Search
                    className="absolute left-3 w-4 h-4 text-zinc-400 pointer-events-none"
                    aria-hidden="true"
                />


                <input
                    ref={ref}
                    type="search"
                    className={`
            w-full py-2.5 pl-9 pr-4 text-sm 
            text-zinc-900 bg-white 
            border border-zinc-300 rounded-lg shadow-sm 
            placeholder:text-zinc-400 
            transition-all duration-200 ease-in-out
            hover:border-zinc-400 hover:shadow-md
            focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
            disabled:opacity-50 disabled:bg-zinc-50 disabled:cursor-not-allowed
            /* This hides the default webkit search clear 'x' button so you can use a custom one if needed */
            [&::-webkit-search-cancel-button]:appearance-none
            ${className}
          `}
                    {...props}
                />
            </div>
        );
    }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;