import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import dashboardIcon from '../../assets/Vector.png'
import transactionsIcon from '../../assets/Transactions.png'
import invoicesIcon from '../../assets/Invoices.png'
import walletsIcon from '../../assets/My Wallets.png'
import settingsIcon from '../../assets/Settings.png'
import helpIcon from '../../assets/Help.png'
import logoutIcon from '../../assets/Logout.png'

const Navbar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
    { path: '/dashboard/transactions', label: 'Transactions', icon: transactionsIcon },
    { path: '/dashboard/invoices', label: 'Invoices', icon: invoicesIcon },
    { path: '/dashboard/wallets', label: 'My Wallets', icon: walletsIcon },
    { path: '/dashboard/settings', label: 'Settings', icon: settingsIcon },
  ]

  const bottomItems = [
    { path: '/dashboard/help', label: 'Help', icon: helpIcon },
    { path: '/logout', label: 'Logout', icon: logoutIcon },
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname === path
  }

  return (
    <div className="w-[280px] h-screen sticky top-0 bg-white flex flex-col shadow-sm shrink-0">
      {/* Logo */}
      <div className="   p-6   ">
          <img src={logo} alt="logo" className="w-[107.31px] h-[30px]   " />
        </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-10">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 mb-2  rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-[#C8EE44] text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="px-4 py-4 border-t border-gray-200">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar
