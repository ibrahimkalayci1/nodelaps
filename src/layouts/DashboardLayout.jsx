// src/layout/DashboardLayout.jsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserProfile } from "../store/slices/userSlice";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    // Check if user is authenticated, if not redirect to sign in
    const token = localStorage.getItem('accessToken');
    
    if (token && !user) {
      dispatch(getUserProfile());
    }

    // Only redirect if both token and isAuthenticated are false
    // This prevents redirecting right after successful login
    if (!token && !isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  // Don't render dashboard if not authenticated and no token exists
  const token = localStorage.getItem('accessToken');
  if (!token && !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <Navbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F8F8F8] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
