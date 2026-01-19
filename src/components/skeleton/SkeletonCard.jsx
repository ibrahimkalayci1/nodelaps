import React from 'react';

/**
 * Skeleton Card Component with Shimmer Effect
 * Used for loading states
 */
const SkeletonCard = ({ className = '', height = '105px' }) => {
  return (
    <div
      className={`bg-gray-200 rounded-[10px] animate-pulse ${className}`}
      style={{ height }}
    >
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-[10px]"></div>
    </div>
  );
};

/**
 * Skeleton for Summary Cards
 */
export const SkeletonSummaryCard = () => {
  return (
    <div className="flex items-center gap-[15px] rounded-[10px] w-full shadow-sm bg-gray-200 animate-pulse" style={{ height: '105px', padding: '24px 20px' }}>
      <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0"></div>
      <div className="flex-1">
        <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Chart
 */
export const SkeletonChart = () => {
  return (
    <div className="bg-white p-8 rounded-[24px] shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-6">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-[280px] w-full bg-gray-100 rounded-lg animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-lg"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton for Table Row
 */
export const SkeletonTableRow = () => {
  return (
    <tr>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="py-4 hidden sm:table-cell">
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-4">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-4 hidden md:table-cell">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
      </td>
    </tr>
  );
};

export default SkeletonCard;
