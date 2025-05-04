import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useFetcher } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./pages/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import Charts from "./pages/Charts";
import SideBar from "./pages/SideBar";
import { extendTheme, useColorScheme } from "@mui/joy/styles";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { user, completeProfile } = useContext(AuthContext);
  const { mode, setMode } = useColorScheme();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <>
      <Navbar drawerIsOpen={drawerIsOpen} mode={mode} />
      {user && (
        <SideBar user={user} setDrawerIsOpen={setDrawerIsOpen} mode={mode} />
      )}
      <Routes>
        <Route path="/login" element={<Login mode={mode} />} />
        <Route path="/register" element={<Register mode={mode} />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard mode={mode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions mode={mode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <PrivateRoute>
              <Budgets mode={mode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports mode={mode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories mode={mode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <PrivateRoute>
              <Charts mode={mode} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
