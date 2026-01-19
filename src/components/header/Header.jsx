import React from 'react'
import { useAppSelector } from '../../store/hooks'
import ProfilePng from '../../assets/Ellipse 1.png'

const Header = ({ onMenuClick }) => {
  const { user } = useAppSelector((state) => state.user)
  const displayName = user?.fullName || 'User'

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex items-center justify-between border-b border-[#F4F4F4]">
      {/* Left Side - Hamburger Menu + Dashboard Title */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Hamburger Menu Button (Mobile/Tablet) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-[#1B212D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-[#1B212D] animate-fade-in" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          Dashboard
        </h1>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Search */}
        <button className="text-[#78778B] hover:text-[#1B212D] transition-all duration-200 hover:scale-110 active:scale-95 p-1">
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-[#78778B] hover:text-[#1B212D] transition-all duration-200 hover:scale-110 active:scale-95 p-1">
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a2.5 2.5 0 00-5 0v.68C6.64 5.36 5 7.92 5 11v5l-2 2v1h18v-1l-2-2z" />
          </svg>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-[#F4F4F4]">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img 
              src={ProfilePng}
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-[#1B212D]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            {displayName}
          </span>
          <button className="text-[#78778B]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
