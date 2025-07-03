import React from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

type SortOrder = 'ASC' | 'DESC';

interface SortHeaderProps {
  currentSort: string;
  currentOrder: SortOrder;
  onSortChange: (sort: string, order: SortOrder) => void;
  columns: { key: string; label: string }[];
}

const SortHeader: React.FC<SortHeaderProps> = ({ currentSort, currentOrder, onSortChange, columns }) => {
  const handleSort = (key: string) => {
    if (currentSort === key) {
      onSortChange(key, currentOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      onSortChange(key, 'ASC');
    }
  };
  return (
    <div className="flex space-x-3 mb-6 justify-center">
      {columns.map(col => (
        <button
          key={col.key}
          className={`px-4 py-2 rounded-full border font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm
            ${currentSort === col.key ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
          onClick={() => handleSort(col.key)}
        >
          {col.label}
          {currentSort === col.key && (currentOrder === 'ASC' ? React.createElement(FaSortUp as any, { className: "inline ml-1 align-middle" }) : React.createElement(FaSortDown as any, { className: "inline ml-1 align-middle" }))}
        </button>
      ))}
    </div>
  );
};

export default SortHeader;
