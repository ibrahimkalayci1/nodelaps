import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/slices/userSlice'
import { toast } from 'react-toastify'
import logo from '../../assets/logo.png'
import dashboardIcon from '../../assets/Vector.png'
import transactionsIcon from '../../assets/Transactions.png'
import invoicesIcon from '../../assets/Invoices.png'
import walletsIcon from '../../assets/My Wallets.png'
import settingsIcon from '../../assets/Settings.png'
import helpIcon from '../../assets/Help.png'
import logoutIcon from '../../assets/Logout.png'

const Navbar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
    { path: '/dashboard/transactions', label: 'Transactions', icon: transactionsIcon },
    { path: '/dashboard/invoices', label: 'Invoices', icon: invoicesIcon },
    { path: '/dashboard/wallets', label: 'My Wallets', icon: walletsIcon },
    { path: '/dashboard/settings', label: 'Settings', icon: settingsIcon },
  ]

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser())
      if (logoutUser.fulfilled.match(result) || logoutUser.rejected.match(result)) {
        toast.success('Logged out successfully')
        navigate('/signin', { replace: true })
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.')
    }
  }

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname === path
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white flex flex-col shadow-lg lg:shadow-sm z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-[280px] sm:w-[280px] lg:w-[240px] xl:w-[280px] 2xl:w-[320px]
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#F4F4F4]">
          <img src={logo} alt="logo" className="w-[107.31px] h-auto" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden lg:block p-4 xl:p-6 border-b border-[#F4F4F4]">
          <img src={logo} alt="logo" className="w-[107.31px] h-auto" />
        </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 sm:px-4 py-4 xl:py-6 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => {
              // Close mobile menu on navigation (mobile/tablet)
              if (onClose) {
                onClose();
              }
            }}
            className={`flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 mb-2 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-[#C8EE44] text-[#1B212D] font-semibold shadow-sm'
                : 'text-[#78778B] hover:bg-[#F8F8F8] hover:translate-x-1'
            }`}
            style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
          >
            <img src={item.icon} alt={item.label} className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" />
            <span className="text-xs xl:text-sm truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="px-3 sm:px-4 py-3 xl:py-4 border-t border-[#F4F4F4]">
        <Link
          to="/dashboard/help"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 mb-2 rounded-lg text-[#78778B] hover:bg-[#F8F8F8] transition-all duration-200 hover:translate-x-1"
          style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
        >
          <img src={helpIcon} alt="Help" className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" />
          <span className="text-xs xl:text-sm">Help</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 mb-2 rounded-lg text-[#78778B] hover:bg-[#F8F8F8] transition-all duration-200 text-left hover:translate-x-1"
          style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
        >
          <img src={logoutIcon} alt="Logout" className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" />
          <span className="text-xs xl:text-sm">Logout</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default Navbar
