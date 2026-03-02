import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    hasNext,
    hasPrev,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-zinc-200 sm:px-6 rounded-b-lg">

            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrev}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1.5 -ml-1 text-zinc-500" aria-hidden="true" />
                Previous
            </button>

            {/* Current Page Display */}
            <div className="text-sm text-zinc-700">
                Page <span className="font-semibold">{currentPage}</span>
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
                Next
                <ChevronRight className="w-4 h-4 ml-1.5 -mr-1 text-zinc-500" aria-hidden="true" />
            </button>

        </div>
    );
}