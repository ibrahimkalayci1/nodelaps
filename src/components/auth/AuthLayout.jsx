import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* SOL */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* SAĞ */}
      <div className="hidden lg:flex bg-[#e6e7ea] items-end justify-center relative">
        <img
          src="/clock.png"
          className="h-[85%] object-contain z-10"
        />
        <div className="absolute bottom-0 w-full h-40 bg-[#f1e1d6] rounded-t-full"></div>
      </div>

    </div>
  );
}
