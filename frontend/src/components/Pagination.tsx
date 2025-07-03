import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex space-x-3 mt-10 justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`px-5 py-2 rounded-full font-semibold transition border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm
            ${page === currentPage ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
