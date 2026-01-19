import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./components/ErrorBoundary";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Users from "./pages/dashboard/Users";
import Transactions from "./pages/dashboard/Transactions";
import Invoices from "./pages/dashboard/Invoices";
import Wallets from "./pages/dashboard/Wallets";
import Settings from "./pages/dashboard/Settings";
import Help from "./pages/dashboard/Help";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/signin" />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/signin" />} />

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
