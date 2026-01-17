import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { 
  fetchFinancialSummary, 
  fetchWorkingCapital, 
  fetchWallet, 
  fetchRecentTransactions, 
  fetchScheduledTransfers 
} from '../../store/slices/financialSlice'

// Assets
import Icon from '../../assets/Icon.png'
import Icon1Png from '../../assets/Icon1.png'
import Icon2Png from '../../assets/Icon2.png'
import WalletSchedulePng from '../../assets/WalletSchedule.png'

const DashboardHome = () => {
  const dispatch = useAppDispatch()
  const { 
    summary, 
    recentTransactions, 
    wallet, 
    workingCapital, 
    scheduledTransfers,
    loading
  } = useAppSelector((state) => state.financial)
  
  const { isAuthenticated } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFinancialSummary())
      dispatch(fetchWorkingCapital())
      dispatch(fetchWallet())
      dispatch(fetchRecentTransactions())
      dispatch(fetchScheduledTransfers())
    }
  }, [dispatch, isAuthenticated])

  // Data mapping logic - ensuring we extract data correctly from different response structures
  // API returns { success: true, data: { ... } } which is already unwrapped to payload by slice
  // But inside payload:
  // summary: { totalBalance: { amount, currency... }, ... }
  // recentTransactions: { transactions: [ ... ], summary: { ... } }
  
  const summaryData = summary?.data || summary;
  
  // recentTransactions might be an array (old format) or object with transactions array (new format)
  const transactionsData = recentTransactions?.data?.transactions 
    || recentTransactions?.transactions 
    || (Array.isArray(recentTransactions) ? recentTransactions : []);

  const workingCapitalData = workingCapital?.data || (Array.isArray(workingCapital) ? workingCapital : []);

  useEffect(() => {
    if (summary) console.log('DEBUG Summary:', summary);
    if (recentTransactions) console.log('DEBUG Recent Transactions:', recentTransactions);
  }, [summary, recentTransactions]);

  // Summary Cards Data
  const summaryCards = [
    {
      title: 'Total balance',
      // Check if totalBalance is an object with amount, or a direct value
      amount: `$${(summaryData?.totalBalance?.amount !== undefined ? summaryData.totalBalance.amount : (summaryData?.totalBalance || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Icon,
      bgColor: 'bg-[#2D3139]',
      textColor: 'text-white',
      iconBg: 'bg-[#3A3F48]'
    },
    {
      title: 'Total spending',
      amount: `$${(summaryData?.totalExpense?.amount !== undefined ? summaryData.totalExpense.amount : (summaryData?.totalExpense || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Icon1Png,
      bgColor: 'bg-[#F8F8F8]',
      textColor: 'text-[#1A1D1F]',
      iconBg: 'bg-[#EDEDF2]'
    },
    {
      title: 'Total saved',
      amount: `$${(summaryData?.totalSavings?.amount !== undefined ? summaryData.totalSavings.amount : (summaryData?.totalSavings || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Icon2Png,
      bgColor: 'bg-[#F8F8F8]',
      textColor: 'text-[#1A1D1F]',
      iconBg: 'bg-[#EDEDF2]'
    }
  ]

  // Chart Logic
  const chartData = workingCapitalData.length > 0 ? workingCapitalData.slice(-7).map((item) => ({
    date: item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    income: item.income || 0,
    expenses: Math.abs(item.expenses || 0)
  })) : [
    { date: 'Apr 14', income: 3000, expenses: 2500 },
    { date: 'Apr 15', income: 3500, expenses: 2800 },
    { date: 'Apr 16', income: 4000, expenses: 3000 },
    { date: 'Apr 17', income: 5500, expenses: 3200 },
    { date: 'Apr 18', income: 5000, expenses: 3500 },
    { date: 'Apr 19', income: 6000, expenses: 3800 },
    { date: 'Apr 20', income: 6500, expenses: 4000 }
  ]

  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expenses)), 1000)
  const chartWidth = 700

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT CONTENT (approx 70%) */}
      <div className="flex-1 space-y-8">
        {/* Summary Cards */}
        {/* Summary Cards */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} ${card.textColor} flex items-center gap-[15px] rounded-[10px] w-full max-w-[222px]`}
              style={{ height: '105px', padding: '24px 20px' }}
            >
              <div className={`${card.iconBg} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
                <img src={card.icon} alt={card.title} className="w-6 h-6 object-contain" />
              </div>
              <div className="min-w-0">
                <div className="text-xs opacity-60 mb-1 truncate">{card.title}</div>
                <div className="text-[20px] font-bold truncate">{card.amount}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Working Capital Chart */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[18px] font-bold text-[#1A1D1F]">Working Capital</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span className="text-xs text-[#6F767E]">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8EE44]"></span>
                <span className="text-xs text-[#6F767E]">Expenses</span>
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#F4F4F4] text-xs font-semibold px-4 py-2 pr-8 rounded-lg cursor-pointer outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#6F767E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <svg width="100%" height="280" viewBox={`0 0 ${chartWidth} 280`} preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + (1 - v) * 200}
                  x2={chartWidth - 20}
                  y2={40 + (1 - v) * 200}
                  stroke="#F4F4F4"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y-axis labels */}
              {[0, 3000, 5000, 7000, 10000].map((val, i) => (
                <text key={i} x="0" y={240 - (val/10000)*200 + 5} fontSize="10" fill="#9A9FA5">
                  {val === 0 ? '0K' : `${val/1000}K`}
                </text>
              ))}

              {/* Data Lines */}
              <path
                d={chartData.map((d, i) => {
                  const x = 40 + i * ((chartWidth - 60) / (chartData.length - 1))
                  const y = 240 - (d.income / maxValue) * 180
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                }).join(' ')}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
              <path
                d={chartData.map((d, i) => {
                  const x = 40 + i * ((chartWidth - 60) / (chartData.length - 1))
                  const y = 240 - (d.expenses / maxValue) * 180
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                }).join(' ')}
                fill="none"
                stroke="#C8EE44"
                strokeWidth="2"
              />
              
              {/* X-axis labels */}
              {chartData.map((d, i) => (
                <text 
                  key={i} 
                  x={40 + i * ((chartWidth - 60) / (chartData.length - 1))} 
                  y="270" 
                  fontSize="10" 
                  fill="#9A9FA5" 
                  textAnchor="middle"
                >
                  {d.date}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Transaction */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[18px] font-bold text-[#1A1D1F]">Recent Transaction</h2>
            <button className="text-[#10B981] text-xs font-bold hover:underline">View All &gt;</button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-[#6F767E] text-[12px] border-b border-[#F4F4F4]">
                <th className="pb-4 font-normal">NAME/BUSINESS</th>
                <th className="pb-4 font-normal">TYPE</th>
                <th className="pb-4 font-normal">AMOUNT</th>
                <th className="pb-4 font-normal">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F4]">
              {transactionsData.length > 0 ? (
                transactionsData.slice(0, 4).map((t, idx) => (
                  <tr key={idx} className="group hover:bg-[#F8F9FB] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F4F4F4] overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                          {t.image ? (
                            <img src={t.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-6 h-6 bg-[#D2D2D2] rounded"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1A1D1F]">
                            {t.name || t.description || t.merchant || 'Unknown'}
                          </div>
                          <div className="text-[11px] text-[#6F767E]">
                            {t.company || t.business || 'Company Inc.'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-xs text-[#6F767E]">{t.category || t.type || 'Other'}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-bold text-[#1A1D1F]">
                        ${Math.abs(t.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-xs text-[#6F767E]">
                        {new Date(t.date || t.createdAt || Date.now()).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-[#6F767E] text-sm italic">
                    {loading.recentTransactions ? 'Loading transactions...' : 'No transactions found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Adjusted to prevent overlap and fix clipping) */}
      <div className="w-full lg:w-[340px] shrink-0 lg:ml-4 mt-6 overflow-visible">
        <img 
          src={WalletSchedulePng} 
          alt="Wallet and Schedule" 
          className="w-full h-auto object-contain rounded-[24px] lg:translate-x-4"
          style={{ maxHeight: '720px' }}
        />
      </div>
    </div>
  )
}

export default DashboardHome

