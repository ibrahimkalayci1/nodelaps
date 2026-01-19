import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { 
  fetchFinancialSummary, 
  fetchWorkingCapital, 
  fetchWallet, 
  fetchRecentTransactions, 
  fetchScheduledTransfers 
} from '../../store/slices/financialSlice'
import { toast } from 'react-toastify'

// Components
import SummaryCards from '../../components/dashboard/SummaryCards'
import WorkingCapitalChart from '../../components/dashboard/WorkingCapitalChart'
import RecentTransactions from '../../components/dashboard/RecentTransactions'
import { RestoredWalletWidgets } from '../../components/RestoredWalletWidgets'


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

  const { errors } = useAppSelector((state) => state.financial)

  // Fetch data when authenticated - optimized with early return
  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch all financial data in parallel for better performance
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchFinancialSummary()),
          dispatch(fetchWorkingCapital()),
          dispatch(fetchWallet()),
          dispatch(fetchRecentTransactions()),
          dispatch(fetchScheduledTransfers())
        ]);
      } catch (error) {
        // Errors are handled by individual thunks and error state
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated])

  // Handle errors with toast notifications - optimized to only show when errors exist
  useEffect(() => {
    const errorEntries = Object.entries(errors).filter(([_, error]) => error);
    
    if (errorEntries.length > 0) {
      errorEntries.forEach(([key, error]) => {
        toast.error(`Failed to load ${key}: ${error}`, {
          toastId: `error-${key}`, // Prevent duplicate toasts
          autoClose: 5000
        });
      });
    }
  }, [errors])

  const summaryData = summary?.data || summary;

  return (
    <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
      {/* LEFT CONTENT (approx 70%) */}
      <div className="flex-1 space-y-6 lg:space-y-8">
        {/* Summary Cards */}
        <SummaryCards summary={summary} loading={loading.summary} />

        {/* Working Capital Chart */}
        <WorkingCapitalChart workingCapital={workingCapital} loading={loading.workingCapital} />

        {/* Recent Transaction */}
        <RecentTransactions transactions={recentTransactions} loading={loading.recentTransactions} />
      </div>

      {/* RIGHT SIDEBAR */}
      <RestoredWalletWidgets 
        wallet={wallet} 
        scheduledTransfers={scheduledTransfers} 
        totalBalance={summaryData?.totalBalance?.amount !== undefined ? summaryData.totalBalance.amount : (summaryData?.totalBalance || 0)}
      />




    </div>
  )
}

export default DashboardHome

