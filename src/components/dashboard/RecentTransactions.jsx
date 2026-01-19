import React from 'react';
import { formatDate, formatCurrencySimple, getAmount, getCurrency } from '../../utils/formatters';
import { SkeletonTableRow } from '../skeleton/SkeletonCard';

/**
 * Recent Transactions Component
 * Displays a table of recent financial transactions
 */
const RecentTransactions = ({ transactions, loading }) => {
  const transactionsData = transactions?.data?.transactions 
    || transactions?.transactions 
    || (Array.isArray(transactions) ? transactions : []);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-[24px] shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#6F767E] text-[12px] border-b border-[#F4F4F4]">
                <th className="pb-4 font-normal" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>NAME/BUSINESS</th>
                <th className="pb-4 font-normal hidden sm:table-cell" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>TYPE</th>
                <th className="pb-4 font-normal" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>AMOUNT</th>
                <th className="pb-4 font-normal hidden md:table-cell" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F4]">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonTableRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 lg:p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="text-lg lg:text-[18px] font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          Recent Transaction
        </h2>
        <button className="text-[#10B981] text-xs font-bold hover:underline" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          View All &gt;
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[#6F767E] text-[12px] border-b border-[#F4F4F4]">
              <th className="pb-4 font-normal" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>NAME/BUSINESS</th>
              <th className="pb-4 font-normal hidden sm:table-cell" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>TYPE</th>
              <th className="pb-4 font-normal" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>AMOUNT</th>
              <th className="pb-4 font-normal hidden md:table-cell" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F4F4]">
            {transactionsData.length > 0 ? (
              transactionsData.slice(0, 4).map((t, idx) => {
                const amount = getAmount(t);
                const currency = getCurrency(t);
                const date = t.date || t.createdAt || Date.now();

                return (
                  <tr key={idx} className="group hover:bg-[#F8F9FB] transition-all duration-200">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F4F4F4] overflow-hidden flex items-center justify-center shrink-0">
                          {t.image ? (
                            <img src={t.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-6 h-6 bg-[#D2D2D2] rounded"></div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#1A1D1F] truncate" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                            {t.name || t.description || t.merchant || 'Unknown'}
                          </div>
                          <div className="text-[11px] text-[#6F767E] truncate" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                            {t.company || t.business || 'Company Inc.'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 hidden sm:table-cell">
                      <span className="text-xs text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {t.category || t.type || 'Other'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {formatCurrencySimple(amount, currency)}
                      </span>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <span className="text-xs text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {formatDate(date, 'en-GB')}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-[#6F767E] text-sm italic" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
