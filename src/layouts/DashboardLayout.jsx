// src/layout/DashboardLayout.jsx
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserProfile } from "../store/slices/userSlice";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* Sağ taraf */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
