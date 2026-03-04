import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function RequireAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User registration */}
        <Route path="/" element={<RegisterPage />} />

        {/* Admin */}
        <Route
          path="/admin/login"
          element={<AdminLogin onSuccess={() => window.location.assign("/admin")} />}
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard onLogout={() => window.location.assign("/admin/login")} />
            </RequireAdmin>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}