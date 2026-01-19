import React from 'react';
import { formatCurrencySimple, getAmount, getCurrency } from '../../utils/formatters';
import { SkeletonSummaryCard } from '../skeleton/SkeletonCard';
import Icon from '../../assets/Icon.png';
import Icon1Png from '../../assets/Icon1.png';
import Icon2Png from '../../assets/Icon2.png';

/**
 * Summary Cards Component
 * Displays financial summary cards (Total balance, Total spending, Total saved)
 */
const SummaryCards = ({ summary, loading }) => {
  const summaryData = summary?.data || summary;

  const summaryCards = [
    {
      title: 'Total balance',
      amount: getAmount(summaryData?.totalBalance),
      currency: getCurrency(summaryData?.totalBalance),
      icon: Icon,
      bgColor: 'bg-[#2D3139]',
      textColor: 'text-white',
      iconBg: 'bg-[#3A3F48]'
    },
    {
      title: 'Total spending',
      amount: getAmount(summaryData?.totalExpense),
      currency: getCurrency(summaryData?.totalExpense),
      icon: Icon1Png,
      bgColor: 'bg-[#F8F8F8]',
      textColor: 'text-[#1A1D1F]',
      iconBg: 'bg-[#EDEDF2]'
    },
    {
      title: 'Total saved',
      amount: getAmount(summaryData?.totalSavings),
      currency: getCurrency(summaryData?.totalSavings),
      icon: Icon2Png,
      bgColor: 'bg-[#F8F8F8]',
      textColor: 'text-[#1A1D1F]',
      iconBg: 'bg-[#EDEDF2]'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonSummaryCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[15px]">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} ${card.textColor} flex items-center gap-[15px] rounded-[10px] w-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 animate-scale-in`}
          style={{ 
            height: '105px', 
            padding: '24px 20px', 
            fontFamily: 'Kumbh Sans, sans-serif',
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className={`${card.iconBg} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
            <img src={card.icon} alt={card.title} className="w-6 h-6 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-xs mb-1 truncate ${card.textColor === 'text-white' ? 'opacity-60' : 'opacity-70'}`} style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {card.title}
            </div>
            <div className="text-[20px] font-bold truncate" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {formatCurrencySimple(card.amount, card.currency)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
