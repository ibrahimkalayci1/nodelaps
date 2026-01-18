import React from 'react'
import { useAppSelector } from '../../store/hooks'
import ProfilePng from '../../assets/Ellipse 1.png'

const Header = () => {
  const { user } = useAppSelector((state) => state.user)
  const displayName = user?.fullName || 'User'

  return (
    <div className="bg-white px-8 py-6 flex items-center justify-between">
      {/* Search Bar Placeholder */}
      <h1 className="text-[24px] font-bold text-[#1A1D1F]">Dashboard</h1>

      {/* Right Side Tools */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button className="text-[#6F767E] hover:text-[#1A1D1F] transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-[#6F767E] hover:text-[#1A1D1F] transition-colors relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a2.5 2.5 0 00-5 0v.68C6.64 5.36 5 7.92 5 11v5l-2 2v1h18v-1l-2-2z" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-6">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={ProfilePng}
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-bold text-[#1A1D1F]">{displayName}</span>
          <button className="text-[#6F767E]">
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
