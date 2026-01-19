import React from 'react';
import { formatDateTime, formatCurrencySimple } from '../utils/formatters';

// Assets
import AvatarPng from '../assets/Avater.png';
import Ellipse6Png from '../assets/Ellipse 6.png';
import Ellipse6_1Png from '../assets/Ellipse 6 (1).png';
import Ellipse6_2Png from '../assets/Ellipse 6 (2).png';
import Ellipse6_3Png from '../assets/Ellipse 6 (3).png';

// This component contains the Wallet and Scheduled Transfers UI logic
export const RestoredWalletWidgets = ({ wallet, scheduledTransfers, totalBalance }) => {
  // Extract cards from wallet data
  let cards = wallet?.cards ? [...wallet.cards] : [];

  if (cards.length > 0) {
      // Logic to add extra cards removed as per user request
  }
  
  // Extract transfers from scheduledTransfers data
  const transfersList = scheduledTransfers?.transfers || [];

  // Map user names to imported images
  const avatarMap = {
    'Saleh Ahmed': AvatarPng,
    'Delower Hossain': Ellipse6Png,
    'Delowar Hossain': Ellipse6Png, // Variation
    'Moinul Hasan Nayem': Ellipse6_1Png,
    'Dr Jubed Ahmed': Ellipse6_2Png,
    'Dr. Jubed Ahmed': Ellipse6_2Png, // Variation
    'AR. Jakir Alp': Ellipse6_3Png,
    'AR Jakir Alp': Ellipse6_3Png // Variation
  };

  return (
    <div className="w-full xl:w-[340px] shrink-0 xl:ml-4 space-y-6 lg:space-y-8">
        
        {/* My Wallet Widget */}
        <div className="bg-white p-6 lg:p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 animate-slide-in">
          <h2 className="text-lg lg:text-[18px] font-bold text-[#1A1D1F] mb-6" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            Wallet
          </h2>
          
          {/* Cards Container */}
          <div className="relative h-[320px]">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div 
                  key={card.id || index}
                  className={`absolute left-0 w-full h-[180px] rounded-[20px] p-6 ${card.color === '#FFFFFF' ? 'text-[#1A1D1F]' : 'text-white'} overflow-hidden shadow-lg transition-transform duration-300 hover:z-20 hover:-translate-y-2`}
                  style={{ 
                    backgroundColor: card.color || '#1A1D1F',
                    zIndex: index === 1 ? 20 : 10 - index,
                    top: `${index * 115}px`,
                    transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
                    opacity: 1 - index * 0.1
                  }}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black rounded-full blur-2xl opacity-10 translate-y-1/3 -translate-x-1/3"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        {/* Dynamic Bank Name with styling if it matches the pattern */}
                        <div className="text-xs mb-1" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                           {(() => {
                              const rawBank = card.bank || 'Universal Bank';
                              const bankName = rawBank.replace('Maglo', 'Fintech.');
                              const textColor = card.color === '#FFFFFF' ? 'text-[#1B212D]' : 'text-white';
                              
                              if (bankName.includes('|')) {
                                return (
                                  <>
                                    <span className={`${textColor} font-semibold`}>{bankName.split('|')[0].trim()}</span>
                                    <span className="text-[#626260]"> | {bankName.split('|')[1].trim()}</span>
                                  </>
                                );
                              }
                              return <span className={`${textColor} font-semibold`}>{bankName}</span>;
                           })()}
                        </div>
                        {/* Balance removed as per user request */}
                      </div>
                    </div>

                    <div>
                       <div className="flex justify-between items-end mb-4">
                        <div className="text-base lg:text-lg tracking-widest font-mono" style={{ fontFamily: 'monospace' }}>
                          {card.cardNumber || '**** **** **** 8844'}
                        </div>
                       </div>
                       <div className="flex justify-between items-center text-xs opacity-80" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                          <div>
                             <div className="opacity-60 text-[10px] mb-0.5">Card Holder</div>
                             <div>{card.name || 'Card Holder'}</div>
                          </div>
                          <div>
                            <div className="opacity-60 text-[10px] mb-0.5">Expires</div>
                            <div>
                                {card.expiryMonth && card.expiryYear 
                                  ? `${String(card.expiryMonth).padStart(2, '0')}/${String(card.expiryYear).slice(-2)}` 
                                  : '12/24'}
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="text-center py-10 text-gray-400 text-sm">No cards found</div>
            )}
          </div>
          

        </div>

        {/* Scheduled Transfers */}
        <div className="bg-white p-6 lg:p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 animate-slide-in">
           <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg lg:text-[18px] font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Scheduled Transfers
            </h2>
            <button className="text-[#10B981] text-xs font-bold hover:underline" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              View All &gt;
            </button>
          </div>
          
          <div className="space-y-6">
            {transfersList.length > 0 ? (
              transfersList.map((transfer, idx) => {
                const transferImg = avatarMap[transfer.name?.trim()] || transfer.image;
                
                return (
                  <div key={idx} className="flex items-center gap-4 hover:bg-[#F8F9FB] p-2 rounded-lg transition-all duration-200 -mx-2">
                    <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#F4F4F4] flex items-center justify-center shrink-0 overflow-hidden">
                       {transferImg ? (
                          <img src={transferImg} alt={transfer.name} className="w-full h-full object-cover" />
                       ) : (
                          <div className="text-xs font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                            {transfer.name?.charAt(0) || 'U'}
                          </div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#1A1D1F] truncate" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {transfer.name || 'Unknown User'}
                      </div>
                      <div className="text-[11px] text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {(() => {
                          const date = transfer.date || Date.now();
                          const formattedDate = new Date(date).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          });
                          const time = transfer.time || '11:00';
                          return `${formattedDate} at ${time}`;
                        })()}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                      {transfer.amount < 0 ? '-' : ''}{formatCurrencySimple(Math.abs(transfer.amount || 0))}
                    </div>
                  </div>
                );
              })
            ) : (
                <div className="text-sm text-[#6F767E] text-center py-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  No scheduled transfers
                </div>
            )}
          </div>
        </div>
    </div>
  );
};
